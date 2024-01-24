import { useQuery } from '@tanstack/react-query';
import GeoReport from './GeoReport';
import Graph from './Graph';
import Heatmap from './Heatmap';
import { fetchRegions } from '../services/dataService';
import Rating from './Rating';

const Dashboard = () => {
  const { data: regionData } = useQuery({
    queryKey: ['regions'],
    queryFn: fetchRegions
  })
  
  const heatmap = <Heatmap/>;
  const georeport = <GeoReport regions={regionData}/>;
  const ratingElement = <Rating/>;

  return (
    <div className='dashboard'>
      <h2>CFO Dashboard</h2>
      <div className='dashboard-graphs'>
        <Graph element={heatmap} title={""}/>
        <div className="break"></div>
        <Graph element={ratingElement} title={"Scoring and Ratings"}/>
        <div className="break"></div>
        <Graph element={georeport} title={"Geo Report"}/>
      </div>
    </div>
  )
}

export default Dashboard
