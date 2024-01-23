import * as d3 from 'd3';

export const fetchHeatmapData = async () =>{
  const result = await d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv');
  return result;
}