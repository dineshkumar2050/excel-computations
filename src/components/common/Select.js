import React,{ useContext } from 'react';
import { LabelsInfo } from '../../App';

export default function Select({name, id }) {
    const contextData = useContext(LabelsInfo);
    const columnAttributeSetter = contextData.setColumnFilter;
    const labels = contextData.labelData;
    const handleChange = e => {
        e.preventDefault();
        const { value } = e.target.value;
        columnAttributeSetter(value);
    }
    return (
        <div>
            <select name={name} id={id} onChange={handleChange}>
                {
                    labels && labels.length ? labels.map(option => {
                        return(
                            <option value={option}>{option}</option>
                        )
                    }) :
                    <option value={'Select'}>Select</option> 
                }
            </select>
        </div>
    )
}
