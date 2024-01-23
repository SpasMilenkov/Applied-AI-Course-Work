import { useState } from "react";

const TimeFilter = () => {
  const [selectedDayFrom, setSelectedDayFrom] = useState('');
  const [selectedMonthFrom, setSelectedMonthFrom] = useState('');
  const [selectedYearFrom, setSelectedYearFrom] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    'Applicant', 
    'Rejected', 
    'Approved',
    'NTU',
    'Accepted'
  ];

  return (
    <div>
      <div>
        <span className="time-filter-span">From</span> 
        <select
          name='Status'
            value={selectedDayFrom}
            onChange={(e) => setSelectedDayFrom(e.target.value)}
            className='filter'
          >
          <option value="" disabled>
            Day
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className='filter-option'>
              {option}
            </option>
          ))}
        </select>
        <select
          name='Status'
            value={selectedMonthFrom}
            onChange={(e) => setSelectedMonthFrom(e.target.value)}
            className='filter'
          >
          <option value="" disabled>
            Month
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className='filter-option'>
              {option}
            </option>
          ))}
        </select>
        <select
          name='Status'
            value={selectedYearFrom}
            onChange={(e) => setSelectedYearFrom(e.target.value)}
            className='filter'
          >
          <option value="" disabled>
            Year
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className='filter-option'>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span className="time-filter-span">To</span>
        <select
          name='Status'
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className='filter'
          >
          <option value="" disabled>
            Day
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className='filter-option'>
              {option}
            </option>
          ))}
        </select>
        <select
          name='Status'
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className='filter'
          >
          <option value="" disabled>
            Month
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className='filter-option'>
              {option}
            </option>
          ))}
        </select>
        <select
          name='Status'
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className='filter'
          >
          <option value="" disabled>
            Year
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className='filter-option'>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TimeFilter
