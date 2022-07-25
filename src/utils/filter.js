let uniqueValue = {
    'S. no': [],
    companyName: []
}

// export const findIndexOfDateAndRepeating = arr => {
//     let values = {
//         indexOfDateColumn: null,
//         indexOfRepeatingValueColumn: null
//     };
//     for(const value of arr[0]) {
//         if()
//     }
// }

let uniqueValues = [
    { labelName: 'companyName', indexValue: null }
]

// uniqueValue object like { labelName: 'labelName', indexValue: null } to be pushed in uniqueValues column down below whenever state sets
// const [uniqueValues, setUniqueValues] = useState([])

// const [dateColumnInfo, setDateColumnInfo] = useState({
//     labelName: '',
//     indexValue: null
// })

// const [repeatingColumnInfo, setRepeatingColumnInfo] = useState({
//     labelName: '',
//     indexValue: null
// })

export const filterAndRemoveDuplicates = (arr, uniqueValues = uniqueValue, dateColumnInfo, repeatingColumnInfo) => {
    let convertedData = [];
    let labelData = [];
    let fieldsData = {
        'S. no': 'S. no'
    }
    // let uniqueValuesData = {};
    for(const unique of uniqueValues) {
        labelData.push(unique.indexValue);
        // fieldsData[unique.labelName] = unique.labelName;
        fieldsData[unique.labelName] = {};
        // uniqueValuesData[unique.label]
    }
    labelData.push(dateColumnInfo.labelName);
    labelData.push(repeatingColumnInfo.labelName);  
    for(let value of arr) {
        if(fieldsData[uniqueValues[0].labelName][value[uniqueValues[0].indexValue]]) break;
        else {
            fieldsData[uniqueValues[0].labelName][value[uniqueValues[0].indexValue]] = value[uniqueValues[0].indexValue]
        }
        // for(const unique of uniqueValues) {
        //     if(fieldsData[unique.labelName])
        // }
        if(!fieldsData[value[dateColumnInfo.indexValue]]) {
            fieldsData[value[dateColumnInfo.indexValue]] = value[dateColumnInfo.indexValue];
        }
        continue;
    }
    for(const value of arr) {
        let newArr = [];
        for(let idx of labelData.slice(labelData.length - 2)) {
            if(!fieldsData[value[idx]]) {
                // fieldsData
            }
        }
    }
}
