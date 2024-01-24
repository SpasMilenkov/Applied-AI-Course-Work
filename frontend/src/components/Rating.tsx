import { useEffect, useState } from "react";
import PieData from "../interfaces/PieData";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { useQuery } from "@tanstack/react-query";
import { fetchRatings } from "../services/dataService";

const Rating = () => {
  const [selectedStatus, setSelectedStatus] = useState('Application Count');
  const [rankData, setRankData] = useState<PieData[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['ratings'],
    queryFn: fetchRatings
  })

  useEffect(() =>{
    if(data === undefined) return;

    const ranksWithFilter = data.map((rank) =>{
      const pieRank = {
        name: `Rank: ${rank.rank}`,
        value: selectedStatus === 'Application Count' ? 
        rank.applicationCount : selectedStatus === 'Bad Rate' ?
        rank.badRate : rank.repaidRate 
      }
      return pieRank;
    })

    setRankData(ranksWithFilter);
  }, [data, selectedStatus])

  const options = [
    'Application Count', 
    'Bad Rate', 
    'Repaid Rate',
  ];

  return (
    <div>
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
      <div className='rating-container'>
        <PieChart data={rankData}/>
        <BarChart data={rankData}/>
      </div>
    </div>
  )
}

export default Rating
