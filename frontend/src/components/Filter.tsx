import { useState } from 'react';

const Filter = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedExisting, setSelectedExisting] = useState('');
  const [selectedRefinancing, setSelectedRefinancing] = useState('');
  const [selectedRefinanced, setSelectedRefinanced] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCreditAmount, setSelectedCreditAmound] = useState('');

  const options = [
    'Applicant', 
    'Rejected', 
    'Approved',
    'NTU',
    'Accepted'
  ];
  
  const options2 = [
    'Product 1', 
    'Product 2', 
    'Product 3',
    'Product 4',
    'Product 5',
    'Product 6'
  ];

  const options3 = [
    'Exisitng', 
    'Non Exisiting'
  ];

  const options4 = [
    'City 1', 
    'City 2'
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='filter-container'>
      <select
        name='Status'
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          Status
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
      <select
      name='Status'
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          Product
        </option>
        {options2.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
      <select
      name='Status'
        value={selectedExisting}
        onChange={(e) => setSelectedExisting(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          Type
        </option>
        {options3.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
      <select
      name='Status'
        value={selectedExisting}
        onChange={(e) => setSelectedExisting(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          City
        </option>
        {options4.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter
