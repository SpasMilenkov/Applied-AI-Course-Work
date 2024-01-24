import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import us from '../data/counties-albers-10m.json'
import Table from './Table';
import RegionFilter from '../interfaces/RegionFilter';
import { useQuery } from '@tanstack/react-query';
import { fetchGeoData } from '../services/dataService';

interface GeoProps{
  regions?: RegionFilter[]
}

const GeoReport = ({regions}: GeoProps) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const svgRef = useRef(null);
  const namemap = new Map(us.objects.states.geometries.map(d => [d.id, d.properties.name]))

  const { data: geoData, isLoading } = useQuery({
    queryKey: ['geo'],
    queryFn: fetchGeoData,
  })

  useEffect(() => {
    const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
    const path = d3.geoPath();
    //const format = d => `${d}%`;
    const valuemap = new Map(geoData?.map(d => [namemap.get(d.regionName),  d.statistics.goodPercentage]));

    //const counties = topojson.feature(us, us.objects.counties);
    //const states = topojson.feature(us, us.objects.states);
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
    .attr("fill", d => color(valuemap.get(d.properties.name)))
    .attr("d", path)
    .append("title")
    .text(d => `${d.properties.name}\n${valuemap.get(d.properties.name)}%`)

    svg.append("path")
    .datum(statemesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path)

  }, [us, geoData, namemap]);

  return (
    <div className='geo-container'>
      <svg ref={svgRef}></svg>
      <select
        name='Region'
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className='geo-filter filter'
      >
        <option value="" disabled>
          Region
        </option>
        {regions?.map((option:RegionFilter, index: number) => (
          <option key={index} value={option.addressRegionId} className='filter-option'>
            {option.addressRegionId}: {option.addressRegionName}
          </option>
        ))}
      </select>
      {isLoading && <span className="loader"></span>}
      <Table regions={regions}/>
    </div>
  );
}

export default GeoReport;
