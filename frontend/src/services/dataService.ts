import * as d3 from 'd3';
import axios from '../api/axios';
import RegionFilter from '../interfaces/RegionFilter';
import Regions from '../data/regionFilter.json'
import Region from '../interfaces/Region';
import Heat from '../data/heatData.json'
import HeatmapData from '../interfaces/HeatmapData';
import fakeData from '../data/fakeData.json'
import rankData from '../data/barData.json'
import RankData from '../interfaces/RankData';

export const fetchHeatmapData = async ():Promise<HeatmapData[]>=>{
  return Heat as HeatmapData[];
}

export const fetchRegions = async (): Promise<RegionFilter[]> =>{
  //const result = await axios.get('/Regions');
  return Regions as RegionFilter[];
}

export const fetchGeoData = async (): Promise<Region[]> =>{
  return fakeData as Region[];
}

export const fetchRatings = async (): Promise<RankData[]> =>{
  //const result = await axios.get('/Regions');

  //console.log(result.data);

  //return regions;
  return rankData as RankData[];
}
