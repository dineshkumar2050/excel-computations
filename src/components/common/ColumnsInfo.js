import React, { useState, useCallback, memo } from 'react';
import InputLabel from './InputLabel';
import Button from './Button';

function ColumnsInfo({ title, labelText, labelClassName, labelsData, labelSetter, labelObjValue, selectName, selectId, buttonText, multipleType=false }) {
  const [currentSelectedValue, setCurrentSelectedValue] = useState('');

  const addColumnNameAndIndex = useCallback(e => {
    e.preventDefault();
    const indexOfCurrentSelectedValue = labelsData.indexOf(currentSelectedValue);
    const currentData = { ...labelObjValue }
    if(!currentData[currentSelectedValue] || !currentData[currentSelectedValue] === -1) {
      currentData[currentSelectedValue] = indexOfCurrentSelectedValue
      labelSetter({
        ...currentData,
      })
    }
    setCurrentSelectedValue('Select'); 
  }, [currentSelectedValue]);

  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    if(value === 'Select') return;
    setCurrentSelectedValue(value);
  }

  const clearSelection = e => {
    e.preventDefault();
    labelSetter({});
    setCurrentSelectedValue('Select');
  }
  return (
    <div className="wrapper">
        <h2>{title}</h2>
        <InputLabel 
            labelText={labelText} 
            labelClassName={labelClassName} 
        />
        <select value={currentSelectedValue} name={selectName} id={selectId} onChange={handleChange}>
            <option value={'Select'}>Select</option> 
            {
                (labelsData && labelsData.length) && labelsData.map((val, idx) => {
                    return(
                        <option key={idx} value={val}>{val}</option>
                    )
                })                    
            }
        </select>
        <div className="selecting-buttons">
          <Button
            type={'button'}
            text={buttonText}
            handleClick={addColumnNameAndIndex}
            style={{ margin: '20px 15px 0 0' }}
            disable={(!currentSelectedValue || currentSelectedValue === 'Select') ? true : false}
          />
          <Button
            type={'button'}
            text={'Clear Selection'}
            handleClick={clearSelection}
            style={{ marginTop: '20px' }}
            buttonClassName="btn bg-success"
            disable={!Object.values(labelObjValue).length}
          />
        </div>

    </div>
  )
}

export default memo(ColumnsInfo);
