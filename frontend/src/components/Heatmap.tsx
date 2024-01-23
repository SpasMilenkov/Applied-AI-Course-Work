import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({data}) => {
  const chartRef = useRef(null);
  
  const margin = { top: 80, right: 25, bottom: 30, left: 40 };
  const width = 450 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;
  
  useEffect(() => {
    if (data === undefined) return;

    const svg = d3
    .select(chartRef.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    const rows = Array.from(new Set(data.map((d) => d.duration)));
    const cols = Array.from(new Set(data.map((d) => d.loanAmount)));

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

    const myColor = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([1, 100]);

    const squares = svg
    .selectAll()
    .data(data)
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
    .data(data)
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

  }, [data]);

  return (
    <div>
      <div>
        <h2>Products Heatmap</h2>
        <p style={{ fontSize: '14px', color: 'grey', maxWidth: '400px' }}>
          A heatmap with just data
        </p>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default Heatmap;
