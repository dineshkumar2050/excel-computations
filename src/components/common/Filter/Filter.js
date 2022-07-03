import React, { memo } from 'react';
import FilteredLabels from './FilteredLabels';
import TableRowValues from '../TableRowValues';

function Filter({ labelData, jsonData, style,  tableClass, tableHeadClass, tableBodyClass, tableRowClass, tableDataClass, tableHeadingClass }) {
  return (
    <div className="wrapperClass">
        <h2 style={{margin: '30px 0'}}>Preview of the Filtered Table Data to be exported and downloaded</h2>
        <table className={tableClass} style={{style}}>
            {/* <thead className={tableHeadClass}>
                <tr className={tableRowClass}>
                    {
                        !!labelData && !!labelData.length > 0 && labelData.map((labelInfo, ind) => {
                            return (
                                <th
                                    className={tableHeadingClass} 
                                    key={ind}
                                    style={{ }}
                                >
                                    <b>{labelInfo ? labelInfo : null}</b>
                                </th>
                            )
                        })
                    }
                </tr>
            </thead> */}
            <FilteredLabels 
                tableHeadClass={tableHeadClass}
                tableRowClass={tableRowClass}
                labelData={labelData}
                tableHeadingClass={tableHeadingClass}
            />
            <TableRowValues 
                data={jsonData}
                tableBodyClass={tableBodyClass}
                tableRowClass={tableRowClass}
                tableDataClass={tableDataClass} 
            />
            {/* <tbody className={tableBodyClass}>
                {
                    !!jsonData.length > 0 && jsonData.map((value, index) => {
                        return (
                            <tr className={tableRowClass} key={index}>
                                {
                                    !!value && !!value.length > 0 && value.map((val, idx) => {
                                        return(
                                            <td className={tableDataClass} key={idx}>{val ? val : null}</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody> */}
        </table>
    </div>
  )
}

export default memo(Filter);
