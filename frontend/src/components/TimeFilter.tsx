import { useState } from "react";

const TimeFilter = () => {
  const [selectedDayFrom, setSelectedDayFrom] = useState('');
  const [selectedMonthFrom, setSelectedMonthFrom] = useState('');
  const [selectedYearFrom, setSelectedYearFrom] = useState('');
  const [selectedDayTo, setSelectedDayTo] = useState('');
  const [selectedMonthTo, setSelectedMonthTo] = useState('');
  const [selectedYearTo, setSelectedYearTo] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => 2020 + i);

  const resetFilter = () => {
    setSelectedDayFrom('');
    setSelectedMonthFrom('');
    setSelectedYearFrom('');
    setSelectedDayTo('');
    setSelectedMonthTo('');
    setSelectedYearTo('');
  };

  return (
    <div className="time-filter-outer-container">
      <div className="time-filter-container">
        <span className="time-filter-span">From</span> 
        <select
          name='DayFrom'
          value={selectedDayFrom}
          onChange={(e) => setSelectedDayFrom(e.target.value)}
          className='filter'
        >
          <option value="" disabled>
            Day
          </option>
          {days.map((day, index) => (
            <option key={index} value={day} className='filter-option'>
              {day}
            </option>
          ))}
        </select>
        <select
          name='MonthFrom'
          value={selectedMonthFrom}
          onChange={(e) => setSelectedMonthFrom(e.target.value)}
          className='filter'
        >
          <option value="" disabled>
            Month
          </option>
          {months.map((month, index) => (
            <option key={index} value={month} className='filter-option'>
              {month}
            </option>
          ))}
        </select>
        <select
          name='YearFrom'
          value={selectedYearFrom}
          onChange={(e) => setSelectedYearFrom(e.target.value)}
          className='filter'
        >
          <option value="" disabled>
            Year
          </option>
          {years.map((year, index) => (
            <option key={index} value={year} className='filter-option'>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="time-filter-container">
        <span className="time-filter-span">To</span>
        <select
          name='DayTo'
          value={selectedDayTo}
          onChange={(e) => setSelectedDayTo(e.target.value)}
          className='filter'
        >
          <option value="" disabled>
            Day
          </option>
          {days.map((day, index) => (
            <option key={index} value={day} className='filter-option'>
              {day}
            </option>
          ))}
        </select>
        <select
          name='MonthTo'
          value={selectedMonthTo}
          onChange={(e) => setSelectedMonthTo(e.target.value)}
          className='filter'
        >
          <option value="" disabled>
            Month
          </option>
          {months.map((month, index) => (
            <option key={index} value={month} className='filter-option'>
              {month}
            </option>
          ))}
        </select>
        <select
          name='YearTo'
          value={selectedYearTo}
          onChange={(e) => setSelectedYearTo(e.target.value)}
          className='filter'
        >
          <option value="" disabled>
            Year
          </option>
          {years.map((year, index) => (
            <option key={index} value={year} className='filter-option'>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button className="reset-button" onClick={resetFilter}>Reset Filter</button>
    </div>
  )
}

export default TimeFilter
