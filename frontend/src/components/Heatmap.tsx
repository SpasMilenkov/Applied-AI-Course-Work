import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import HeatmapChartData from '../interfaces/HeatmapChartData';
import { useQuery } from '@tanstack/react-query';
import { fetchHeatmapData } from '../services/dataService';

const Heatmap = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [heatmapData, setHeatmapData] = useState<HeatmapChartData[]>([]);

  const chartRef = useRef(null);
  const margin = { top: 80, right: 25, bottom: 30, left: 60 };
  const width = 500 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const options = ['Bad Rate', 'New Customer Rate', 'NTU Rate', 'Application Count'];

  const { data, isLoading } = useQuery({
    queryKey: ['heatmap'],
    queryFn: fetchHeatmapData,
  })

  useEffect(() =>{
    if(data === undefined) return; 

    const dataWithFilter = data.map((item) =>{
      const heatItem = {
        duration: item.duration,
        loanAmount: item.loanLendedAmount,
        value: selectedStatus === 'Application Count' ? 
        item.applicationCount : selectedStatus === 'Bad Rate' ?
        item.badRate : selectedStatus === 'New Customer Rate' ?
        item.newCustomerRate : item.ntuRate
      }

      return heatItem;
    })

    setHeatmapData(dataWithFilter);
  }, [data, selectedStatus])

  useEffect(() => {
    if (data === undefined) return;

    d3.select(chartRef.current).selectAll('svg').remove();

    const svg = d3
    .select(chartRef.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    const rows = Array.from(new Set(heatmapData.map((d) => d.duration)));
    const cols = Array.from(new Set(heatmapData.map((d) => d.loanAmount)));

    const x = d3.scaleBand().range([0, width]).domain(rows).padding(0.05);
    const y = d3.scaleBand().range([height, 0]).domain(cols).padding(0.05);

    svg
    .append('g')
    .style('font-size', 15)
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select('.domain')
    .remove();

    svg
    .append('g')
    .style('font-size', 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select('.domain')
    .remove();

    const myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1, (selectedStatus === 'Application Count' ? 32000 : 100)]);

    const squares = svg
    .selectAll()
    .data(heatmapData)
    .enter()
    .append('g')

    squares
    .append('rect')
    .attr('x', (d) => x(d.duration))
    .attr('y', (d) => y(d.loanAmount))
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', (d) => myColor(+d.value))
    .style('stroke-width', 4)
    .style('stroke', 'none')
    .style('opacity', 0.8);

    squares
    .append('text')
    .attr('x', (d) => x(d.duration) + x.bandwidth() / 2)
    .attr('y', (d) => y(d.loanAmount) + y.bandwidth() / 2)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('fill', 'white')
    .style('font-size', 10)
    .text((d) => d.value);
    
    svg
    .selectAll()
    .data(heatmapData)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.duration))
    .attr('y', (d) => y(d.loanAmount))
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', (d) => myColor(+d.value))
    .style('stroke-width', 4)
    .style('stroke', 'none')
    .style('opacity', 0.8)

  }, [heatmapData]);

  return (
    <div>
      <div>
        <h2>Products Heatmap</h2>
        <p style={{ fontSize: '14px', color: 'grey', maxWidth: '400px' }}>
          A heatmap with just data
        </p>
      </div>
      
      <select
      name='Filter'
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          Filter
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
      {isLoading && <span className="loader"></span>}
      <div className='heatmap-container' ref={chartRef}></div>
    </div>
  );
};

export default Heatmap;
