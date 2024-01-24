import { useState } from 'react';

const Filter = () => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedExisting, setSelectedExisting] = useState('');
  const [selectedRefinanceStatus, setSelectedRefinanceStatus] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
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
    'Refinancing', 
    'Refinanced'
  ];

  const options5 = [
    '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
    '16','17','18','19','20','21','22','23','24','25','26','27','28'
  ];

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
        value={selectedRefinanceStatus}
        onChange={(e) => setSelectedRefinanceStatus(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          Refinance Status
        </option>
        {options4.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
      <select
      name='Status'
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className='filter'
      >
        <option value="" disabled>
          Region
        </option>
        {options5.map((option, index) => (
          <option key={index} value={option} className='filter-option'>
            {option}
          </option>
        ))}
      </select>
      <input 
        type="text" 
        name="creditAmount" 
        className='input-filter' 
        placeholder='Credit Amount' 
        value={selectedCreditAmount}
        onChange={(e) => setSelectedCreditAmound(e.target.value)}/>
    </div>
  );
};

export default Filter
