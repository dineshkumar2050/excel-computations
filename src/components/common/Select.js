import React,{ useContext, memo } from 'react';
import { LabelsInfo } from '../../App';

function Select({name, id, showSelectedValues = false, setCurrentSelectedValue, setInputValue }) {
    const contextData = useContext(LabelsInfo);
    // const columnAttributeSetter = contextData.setDataToBeFiltered;
    const labels = contextData.labelData;
    // const filteringData = contextData.dataToBeFiltered;

    const handleChange = e => {
        e.preventDefault();
        setInputValue('');
        const { value } = e.target;
        // console.log('--value-- -> ', value, e.target);
        setCurrentSelectedValue(value);
        if(value === 'Select') return;
        // if(filteringData[value] || value === 'Select') return;
        // const data = {
        //     ...filteringData,
        //     [value]: {}
        // }
        // columnAttributeSetter(data);
    }
    
    // console.log('--labels-- -> ', labels, columnAttributeSetter, filteringData);
    return (
        <div>
            <select name={name} id={id} onChange={handleChange}>
                <option value={'Select'}>Select</option> 
                {
                    (labels && labels[0] && labels[0].length) && labels[0].map((val, idx) => {
                        return(
                            <option key={idx} value={val}>{val}</option>
                        )
                    })                    
                }
            </select>
            {/* {
                showSelectedValues
            } */}
        </div>
    )
}

export default memo(Select)
