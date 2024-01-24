import axios from '../api/axios';
import RegionFilter from '../interfaces/RegionFilter';
import Region from '../interfaces/Region';
import HeatmapData from '../interfaces/HeatmapData';
import RankData from '../interfaces/RankData';
import RegionTableData from '../interfaces/RegionTableData';

export const fetchHeatmapData = async ():Promise<HeatmapData[]>=>{
  const result = await axios.get('Loan/heatmap')
  return result.data as HeatmapData[];
}

export const fetchRegions = async (): Promise<RegionFilter[]> =>{
  const result = await axios.get('Region');
  return result.data as RegionFilter[];
}

export const fetchRegionData = async (regionId: string): Promise<RegionTableData> =>{
  const result = await axios.get(`Statistics/${regionId}`);
  return result.data as RegionTableData;
}

export const fetchGeoData = async (): Promise<Region[]> =>{
    const result = await axios.get(`Statistics`);
  return result.data as Region[];
}

export const fetchRatings = async (): Promise<RankData[]> =>{
  const result = await axios.get('Loan/barchart');

  return result.data as RankData[];
}
