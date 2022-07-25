import React, { memo, useState, useEffect } from 'react'

function ColumnAndIndexInfo({ uniqueColumnsInfo, dateColumnInfo, repeatingColumnInfo }) {
    const [uniqueColumnsInfoArray, setUniqueColumnsInfoArray] = useState([]);
    const [dateColumnInfoArray, setDateColumnInfoArray] = useState([]);
    const [repeatingColumnInfoArray, setRepeatingColumnInfoArray] = useState([]);
    const [combinedArray, setCombinedArray] = useState([]);
    useEffect(() => {
        let arr = []
        if(Object.keys(uniqueColumnsInfo).length) {
            const columnValueType = 'Unique Column';
            for(let key in uniqueColumnsInfo) {
                arr.push({ 
                    valueType: columnValueType,
                    columnName: key,
                    columnIndexValue: uniqueColumnsInfo[key]
                })
            }
        }
        setUniqueColumnsInfoArray(arr)
    }, [uniqueColumnsInfo])

    useEffect(() => {
        let arr = []
        if(Object.keys(dateColumnInfo).length) {
            const columnValueType = 'Date Column';
            for(let key in dateColumnInfo) {
                arr.push({ 
                    valueType: columnValueType,
                    columnName: key,
                    columnIndexValue: dateColumnInfo[key]
                })
            }
        }
        setDateColumnInfoArray(arr);
    }, [dateColumnInfo])

    useEffect(() => {
        let arr = []
        if(Object.keys(repeatingColumnInfo).length) {
            const columnValueType = 'Repeating Column';
            for(let key in repeatingColumnInfo) {
                arr.push({ 
                    valueType: columnValueType,
                    columnName: key,
                    columnIndexValue: repeatingColumnInfo[key]
                })
            }            
        }
        setRepeatingColumnInfoArray(arr);
    }, [repeatingColumnInfo])

    useEffect(() => {
        setCombinedArray([...uniqueColumnsInfoArray, ...dateColumnInfoArray, ...repeatingColumnInfoArray])
    }, [uniqueColumnsInfoArray, dateColumnInfoArray, repeatingColumnInfoArray]);
    return (
        <div>
            <h3>Filtering Data Info</h3>
            <table className="table-data">
                <thead>
                    <tr>
                        <th>Filter Column Value type</th>
                        <th>Filter Column Heading</th>
                        <th>Filter Column Index</th>
                    </tr>
                </thead>
                {
                    !!combinedArray && !!combinedArray.length && 
                    <tbody>
                        {
                            combinedArray.map((label, idx) => {
                                // const valsObj = dataToBeFiltered[label];
                                // const valsObjArr = Object.values(valsObj);
                                // const stringifiedData = JSON.stringify(valsObjArr);
                                // const valData = !!valsObj && valsObjArr.length && stringifiedData.slice(1, stringifiedData.length - 1);                                
                                // console.log('--just data check-- -> ', label, dataToBeFiltered, dataToBeFiltered[label])
                                // console.log('--just data check-- -> ', valsObj, valsObjArr, valData);
                                return (
                                    <tr key={idx}>
                                        {!!label.valueType && <td>{label.valueType}</td>}
                                        {!!label.columnName && <td>{label.columnName}</td>}
                                        {!!label.columnIndexValue && <td>{label.columnIndexValue}</td>}
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

export default memo(ColumnAndIndexInfo);
