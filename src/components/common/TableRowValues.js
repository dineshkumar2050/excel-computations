import React, { memo } from 'react'

function TableRowValues({ data, tableBodyClass, tableRowClass, tableDataClass }) {
  return (
    <tbody className={tableBodyClass}>
    {
        !!data.length > 0 && data.map((value, index) => {
            return (
                <tr className={tableRowClass} key={index}>
                    {
                        !!value && !!value.length > 0 && value.map((val, idx) => {
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
  )
}

export default memo(TableRowValues)
