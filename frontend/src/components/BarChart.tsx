import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PieData from '../interfaces/PieData';

interface BarProps{
  data?: PieData[]
}

const BarChart = ({ data }: BarProps) => {
  const chartRef = useRef();
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  useEffect(() => {
    if(data === undefined) return;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
    .domain(d3.groupSort(data, ([d]) => d.value, (d) => d.name)) // descending frequency
    .range([marginLeft, width - marginRight])
    .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.select(chartRef.current)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll('*').remove();

    // Add a rect for each bar.
    svg.append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", x.bandwidth());

    // Add the x-axis and label.
    svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((y) => (y * 1).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
    .attr("x", -marginLeft)
    .attr("y", 10)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .text("Value"));

  }, [data]);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default BarChart;
