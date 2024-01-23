import { useQuery } from '@tanstack/react-query';
import BarChart from './BarChart';
import Filter from './Filter';
import GeoReport from './GeoReport';
import Graph from './Graph';
import Heatmap from './Heatmap';
import LineChart from './LineChart';
import TimeFilter from './TimeFilter';
import PieChart from './PieChart';

const Dashboard = () => {
  const sample = [
    {
      duration: 23,
      loanAmount: 1175.82,
      value: 50
    },
    {
      duration: 23,
      loanAmount: 1388.41,
      value: 63
    },
    {
      duration: 23,
      loanAmount: 1088.4,
      value: 363
    },
    {
      duration: 39,
      loanAmount: 1088.4,
      value: 31
    },
    {
      duration: 39,
      loanAmount: 1175.82,
      value: 15
    },
    {
      duration: 39,
      loanAmount: 1388.41,
      value: 21
    },
    {
      duration: 50,
      loanAmount: 1388.41,
      value: 32
    },
    {
      duration: 50,
      loanAmount: 1088.4,
      value: 34
    },
  ]

  const { data: heatmapData } = useQuery({
    queryKey: ['heatmap'],
    queryFn: () => sample,
  })

  const data2 = [
    { letter: 'Rating 1', frequency: 0.08167 },
    { letter: 'Rating 2', frequency: 0.01492 },
    { letter: 'Rating 3', frequency: 0.02782 },
  ];

  const exampleData = [
    { date: new Date('2024-01-01'), close: 100 },
    { date: new Date('2024-01-02'), close: 120 },
    { date: new Date('2024-01-03'), close: 90 },
    { date: new Date('2024-01-04'), close: 110 },
    { date: new Date('2024-01-05'), close: 80 },
  ];

  const unemployment = [
    { name: "Vermont", rate: 2.1, rank: 1 },
    { name: "North Dakota", rate: 2.4, rank: 2 },
    { name: "Iowa", rate: 2.5, rank: 3 },
    { name: "New Hampshire", rate: 2.5, rank: 3 },
    { name: "Hawaii", rate: 2.8, rank: 5 },
    { name: "Utah", rate: 2.8, rank: 5 },
    { name: "Colorado", rate: 2.9, rank: 7 },
    { name: "Idaho", rate: 2.9, rank: 7 },
    { name: "Massachusetts", rate: 2.9, rank: 7 },
    { name: "South Dakota", rate: 2.9, rank: 7 },
    { name: "Virginia", rate: 2.9, rank: 7 },
    { name: "Maine", rate: 1, rank: 12 },
    { name: "Wisconsin", rate: 3, rank: 12 },
    { name: "Nebraska", rate: 3.1, rank: 14 },
    { name: "Oklahoma", rate: 3.2, rank: 15 },
    { name: "Alabama", rate: 3.3, rank: 16 },
    { name: "Delaware", rate: 3.3, rank: 16 },
    { name: "Florida", rate: 3.3, rank: 16 },
    { name: "Kansas", rate: 3.3, rank: 16 },
    { name: "Missouri", rate: 3.3, rank: 16 },
  ];

  const exampleData6 = [
    { name: 'Category A', value: 30 },
    { name: 'Category B', value: 20 },
    { name: 'Category C', value: 50 },
  ];
  
  const idk = [
    { state: "California", age: "18-24", population: 5000000 },
    { state: "California", age: "25-34", population: 7000000 },
    { state: "California", age: "35-44", population: 4000000 },
    { state: "New York", age: "18-24", population: 3000000 },
    { state: "New York", age: "25-34", population: 4500000 },
    { state: "New York", age: "35-44", population: 2500000 },
  ];

  const line = <LineChart data={exampleData}/>;
  const bar = <BarChart data={idk}/>;
  const georeport = <GeoReport unemployment={unemployment}/>
  const heatmap = <Heatmap data={heatmapData}/>;
  const pie = <PieChart data={exampleData6}/>;
  const scoringElement = <div>{pie}{line}</div>

  return (
    <div className='dashboard'>
      <h2>CFO Dashboard</h2>
      <TimeFilter/>
      <Filter/>
      <div className='dashboard-graphs'>
        <Graph element={bar} title={"Bar"}/>
        <Graph element={heatmap} title={""}/>
        <div className="break"></div>
        <Graph element={georeport} title={"Geo Report"}/>
        <Graph element={scoringElement} title={"Scoring and Ratings"}/>
      </div>
    </div>
  )
}

export default Dashboard
