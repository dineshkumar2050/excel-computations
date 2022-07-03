import React, { memo } from 'react';

function TableLabelValues({ selectedTags, setSelectedTags, labelData, tableHeadClass, tableRowClass, tableHeadingClass }) {
    const handleClick = React.useCallback((e, idx) => {
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
    },[selectedTags])
    return (
        <thead className={tableHeadClass}>
            <tr className={tableRowClass}>
                {
                    !!labelData[0] && !!labelData[0].length > 0 && labelData[0].map((labelInfo, ind) => {
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
    )
}

export default memo(TableLabelValues)
