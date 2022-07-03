import React,{ useState, memo } from 'react';
import Select from './Select';
import InputField from './InputField';
import Button from './Button';
// import { LabelsInfo } from '../../App';
import { dateValidator, dateConverter } from '../../DateValidatorAndConverter';
import Loading from './Loading';

function FilterByAttributes({ dataToBeFiltered, setDataToBeFiltered }) {
    const [currentSelectedValue, setCurrentSelectedValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // console.log('--currentSelectedValue-- -> ', currentSelectedValue, dataToBeFiltered);
    const vals = currentSelectedValue && Object.keys(dataToBeFiltered)?.length && dataToBeFiltered[currentSelectedValue] && Object.values(dataToBeFiltered[currentSelectedValue])?.length && Object.values(dataToBeFiltered[currentSelectedValue]);
    const [inputValue, setInputValue] = useState('');
    // const contextData = useContext(LabelsInfo);
    // const setIsLoading = contextData.setIsLoading;
    const addValue = e => {
        e.preventDefault();
        setIsLoading(true)
        let allData = { ...dataToBeFiltered };       
        const isDateFilter = dateValidator(currentSelectedValue, inputValue);
        let dataToBeValidated = isDateFilter ? dateConverter(inputValue) : inputValue;
        const labelExist = allData[currentSelectedValue];
        if(!labelExist) {
            allData[currentSelectedValue] = {}
        }
        let dataExists = allData[currentSelectedValue] && allData[currentSelectedValue][dataToBeValidated];
        if(!dataExists) {
            allData[currentSelectedValue][dataToBeValidated] = dataToBeValidated;
            setDataToBeFiltered(allData);
        }
        // let currentLabelData = {
        //     [currentSelectedValue]: { ...dataToBeFiltered[currentSelectedValue] }
        // }
        // delete allData[currentSelectedValue];
        // if(!currentLabelData[currentSelectedValue][inputValue]) {
        //     currentLabelData = {
        //         [currentSelectedValue]: { ...dataToBeFiltered[currentSelectedValue], [inputValue]: inputValue }
        //     }
        // }
        // setDataToBeFiltered({
        //     [currentSelectedValue]: currentLabelData[currentSelectedValue],
        //     ...allData
        // })
        setInputValue('');
        // setTimeout(() => setIsLoading(false),5000)
        setIsLoading(false)
    }
    const handleChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setInputValue(value);
    }
    const removeValue = (e, val) => {
        e.preventDefault();
        let allData = { ...dataToBeFiltered };
        let valExists = allData[currentSelectedValue] && allData[currentSelectedValue][val];
        if(valExists) {
            if(Object.keys(allData[currentSelectedValue]).length === 1) delete allData[currentSelectedValue];
            else delete allData[currentSelectedValue][val];
            return setDataToBeFiltered(JSON.parse(JSON.stringify(allData)));
        }
        // let currentLabelData = null;
        // for(let key in allData) {
        //     if(allData[key] && Object.keys(allData[key])) {
        //         for(let valKey in allData[key]) {
        //             console.log('--1-- -> ', allData, allData[key], allData[key][valKey], currentSelectedValue)
        //             console.log('--2-- -> ', Object.values(allData[key][valKey]))
        //             console.log('--3-- -> ', val === allData[key][valKey])
        //             if(allData[key][valKey] && (val === allData[key][valKey])) {
        //                 currentLabelData = allData[key];
        //                 delete currentLabelData[val];
        //                 delete allData[key]
        //                 setDataToBeFiltered({
        //                     [key]: currentLabelData,
        //                     ...allData
        //                 })
        //                 return;
        //             }
        //         }
        //     }
        // }
    }
    // console.log('--inputValue-- -> ', inputValue, currentSelectedValue, dataToBeFiltered);
    // console.log('--dataToBeFiltered-- -> ', dataToBeFiltered, inputValue, currentSelectedValue, currentSelectedValue.toLowerCase(),currentSelectedValue.toLowerCase().includes(['month', 'year', 'date']));
    if(isLoading) {
        return <Loading isLoading={isLoading} />
    }
    return (
        <div>
            <h3>Filter By Attributes</h3>
            <Select
                name={'columnAttribute'}
                id={'columnAttribute'}
                showSelectedValues={true}
                setCurrentSelectedValue={setCurrentSelectedValue}
                setInputValue={setInputValue}
            />
            <InputField 
                type={(currentSelectedValue.toLowerCase().includes('month') || 
                    currentSelectedValue.toLowerCase().includes('year') ||
                    currentSelectedValue.toLowerCase().includes('date')) ? 
                    'date' : 'text'
                }
                placeholder={'Add any value'}
                inputWrapperStyle={{ marginTop: '15px' }}
                inputStyle={{ width: 'auto' }}
                handleChange={handleChange}
                id={'any-data-value'}
                value={inputValue}
            />
            <Button 
                text="Add value"
                handleClick={addValue}
                type="button"
                disable={!inputValue}           
            />
            {
                !!vals && !!vals.length && 
                    <div className="multipleValues">
                        <div className="selectedValue">
                        {
                            vals.map((val,idx) => {
                                return(                                    
                                    <div key={idx} className="selected">
                                        <div className="val">{val}</div>
                                        <div className="remove-value" onClick={e => removeValue(e, val)}>x</div>
                                    </div>                                   
                                )
                            })
                        }
                        </div>
                    </div>
            }
        </div>
    )
}

export default memo(FilterByAttributes)
