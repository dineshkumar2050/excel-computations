import React, { memo } from 'react'

function FilteredLabels({ tableHeadClass, tableRowClass, labelData, tableHeadingClass }) {
    return (
        <thead className={tableHeadClass}>
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
        </thead>   
    )
}

export default memo(FilteredLabels)
