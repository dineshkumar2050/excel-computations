import React, { useState, useEffect, memo } from 'react';

function TableData({ data, setJsonData, labelData, jsonData, setLabelData, setSelectedTags, selectedTags, style, tableClass, tableHeadClass, tableBodyClass, tableRowClass, tableDataClass, tableHeadingClass }) {    
    useEffect(() => {
        if(!jsonData.length && !labelData.length) {
            const labelData = data.splice(0,1);
            if(data.length) setLabelData(labelData);
            setJsonData(data);
        }
    },[data])

    const handleClick = (e, idx) => {
        e.preventDefault();
        let newSelectedTags = {...selectedTags}
        if(selectedTags[idx]) {
            delete newSelectedTags[idx];
        } else {
            newSelectedTags = {
                ...newSelectedTags,
                [idx]: idx
            }
        }        
        setSelectedTags({...newSelectedTags})
    }
    return (
        <div className="wrapperClass">
            <h2 style={{margin: '30px 0'}}>TableData</h2>
            <table className={tableClass} style={{style}}>
                <thead className={tableHeadClass}>
                    <tr className={tableRowClass}>
                        {
                            labelData[0] && labelData[0].length > 0 && labelData[0].map((labelInfo, ind) => {
                                const isSelected = Number(selectedTags[ind + 1]) === Number(ind+1);
                                return (
                                    <th
                                        onClick={(e) => handleClick(e, ind+1)} 
                                        className={tableHeadingClass} 
                                        key={ind}
                                        style={{ 
                                            backgroundColor: isSelected ? 'green' : '',
                                            color: isSelected ? '#fff' : '#000'
                                        }}
                                    >
                                        <b>{labelInfo ? labelInfo : ''}</b>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody className={tableBodyClass}>
                    {
                        jsonData.length > 0 && jsonData.map((value, index) => {
                            return (
                                <tr className={tableRowClass} key={index}>
                                    {
                                        value && value.length > 0 && value.map((val, idx) => {
                                            return(
                                                <td className={tableDataClass} key={idx}>{val ? val : ''}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default memo(TableData)
