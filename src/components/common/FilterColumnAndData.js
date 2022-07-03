import React, { memo } from 'react'

function FilterColumnAndData({dataToBeFiltered}) {
    const labelKeys = Object.keys(dataToBeFiltered);
    // const labelKeys = {
    //     'Accord Code': {
    //         'a': 'a',
    //         'b': 'b'
    //     },
    //     'Abc': {
    //         '1': '1',
    //         '2': '2',
    //     }
    // }
    return (
        <div>
            <h3>Filtering Data</h3>
            <table className="table-data">
                <thead>
                    <tr>
                        <th>Filter Column Heading</th>
                        <th>Filter Column Values</th>
                    </tr>
                </thead>
                {
                    !!labelKeys && !!labelKeys.length && 
                    <tbody>
                        {
                            labelKeys.map((label, idx) => {
                                const valsObj = dataToBeFiltered[label];
                                const valsObjArr = Object.values(valsObj);
                                const stringifiedData = JSON.stringify(valsObjArr);
                                const valData = !!valsObj && valsObjArr.length && stringifiedData.slice(1, stringifiedData.length - 1);                                
                                // console.log('--just data check-- -> ', label, dataToBeFiltered, dataToBeFiltered[label])
                                // console.log('--just data check-- -> ', valsObj, valsObjArr, valData);
                                return (
                                    <tr key={idx}>
                                        {!!label && <td>{label}</td>}
                                        {!!valData && <td>{valData}</td>}
                                        {/* {
                                            !!dataToBeFiltered[label] && Object.values(dataToBeFiltered[label]).length && Object.values(dataToBeFiltered[label])?.map((val, indx) => {
                                                return(
                                                    <>
                                                        {val && <td key={indx}>{JSON.stringify(val).slice(0, val.length - 1)}</td>}
                                                    </>
                                                )
                                            })
                                        } */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                }
            </table>
        </div>
    )
}

export default memo(FilterColumnAndData);
