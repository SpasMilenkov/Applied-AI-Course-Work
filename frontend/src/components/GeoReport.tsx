import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import us from '../data/counties-albers-10m.json'
import Table from './Table';

const GeoReport = ({unemployment}) => {
  const svgRef = useRef();
  const namemap = new Map(us.objects.states.geometries.map(d => [d.properties.name, d.id]))

  useEffect(() => {
    const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
    const path = d3.geoPath();
    //const format = d => `${d}%`;
    const valuemap = new Map(unemployment.map(d => [namemap.get(d.name), d.rate]));

    //const counties = topojson.feature(us, us.objects.counties);
    const states = topojson.feature(us, us.objects.states);
    //const statemap = new Map(states.features.map(d => [d.id, d]));
    const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

    const svg = d3.select(svgRef.current)
    .attr("width", 975)
    .attr("height", 610)
    .attr("viewBox", [0, 0, 975, 610])
    .attr("style", "max-width: 100%; height: auto;");

    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      .attr("fill", d => color(valuemap.get(d.id)))
      .attr("d", path)
      .append("title")
      .text(d => `${d.properties.name}\n${valuemap.get(d.id)}%`);

    svg.append("path")
      .datum(statemesh)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  }, [us, unemployment, namemap]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <Table/>
    </div>
  );
}

export default GeoReport;
