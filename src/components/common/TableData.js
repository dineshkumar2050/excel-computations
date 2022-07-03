import React, { useEffect, memo } from 'react';
import TableRowValues from './TableRowValues';
import TableLabelValues from './TableLabelValues';

function TableData({ data, setJsonData, labelData, jsonData, setLabelData, setSelectedTags, selectedTags, style, tableClass, tableHeadClass, tableBodyClass, tableRowClass, tableDataClass, tableHeadingClass }) {    
    useEffect(() => {
        if(!jsonData.length && !labelData.length) {
            const labelData = data.splice(0,1);
            if(data.length) setLabelData(labelData);
            setJsonData(data);
        }
    },[data])
    return (
        <div className="wrapperClass">
            <h2 style={{margin: '30px 0'}}>TableData</h2>
            <table className={tableClass} style={{style}}>
                <TableLabelValues
                    tableHeadClass={tableHeadClass}
                    tableRowClass={tableRowClass}
                    tableHeadingClass={tableHeadingClass}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    labelData={labelData}
                />
                <TableRowValues 
                    data={jsonData}
                    tableBodyClass={tableBodyClass}
                    tableRowClass={tableRowClass}
                    tableDataClass={tableDataClass} 
                />
            </table>
        </div>
    )
}

export default memo(TableData)
