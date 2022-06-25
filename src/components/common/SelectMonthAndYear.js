import React,{ memo } from 'react';
import InputLabel from './InputLabel';
import InputField from './InputField';

function SelectMonthAndYear({ month, setMonth, year, setYear, placeholder }) {
  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    const dateContent = String(value).split('-');    
    const monthValue = dateContent[1];
    const yearValue = dateContent[0];
    setMonth(monthValue);
    setYear(yearValue);
  }
  return (
    <div>
        <h2 style={{margin: '20px 0 10px 0'}}>Select Month And Year</h2>
        <InputLabel htmlFor={'month-and-year'} labelText={'Select Month and Year'} />
        <InputField 
          type="date" 
          name={'month-and-year'} 
          id={'month-and-year'} 
          placeholder={'DD-MM-YYYY'} 
          handleChange={handleChange}
          inputStyle={{ width: 'auto' }} 
        />
    </div>
  )
}

export default memo(SelectMonthAndYear)
