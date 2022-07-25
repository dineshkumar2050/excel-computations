import React, { useState, memo, useEffect, useCallback } from 'react';
import './App.css';
import InputField from './components/common/InputField';
import InputLabel from './components/common/InputLabel';
import Papa from 'papaparse';
import Button from './components/common/Button';
import TableData from './components/common/TableData';
// import SelectMonthAndYear from './components/common/SelectMonthAndYear';
import ExportAndDownloadCsvData from './components/common/ExportAndDownloadCsvData';
// import { filterData } from './FilterData';
import Filter from './components/common/Filter/Filter';
import FilterByAttributes from './components/common/FilterByAttributes';
import FilterColumnAndData from './components/common/FilterColumnAndData';
import Loading from './components/common/Loading';
// import FilterWorker './components/common/web-workers/filter.worker';
// const FilterWorker = require('./components/common/web-workers/filter.worker');
import WithWebWorker from "./components/common/web-workers/WorkerComponent";
import DemoWoker from "./demo.worker";
import UniqueCompanyNamesWorker from './getUniqueCompanyNames.worker';
import UniqueDatesWorker from './getUniqueDates.worker';
import WebWorker from './components/common/web-workers/createScriptUrlFromFunction';
import ColumnsInfo from './components/common/ColumnsInfo';
import ColumnsAndIndexInfo from './components/common/ColumnAndIndexInfo'
let CompanyNamesWorker = new WebWorker(UniqueCompanyNamesWorker);
let DatesWorker = new WebWorker(UniqueDatesWorker);

export const LabelsInfo = React.createContext(null);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState([])
  const [csvFile, setCsvFile] = useState('');
  const [selectedTags, setSelectedTags] = useState({});
  // const [month, setMonth] = useState(null);
  // const [year, setYear] = useState(null);
  const [dataToBeExported, setDataToBeExported] = useState([]);
  const [fieldstoBeExported, setFieldsToBeExported] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [showFilterData, setShowFilterData] = useState(false);
  const [dataToBeFiltered, setDataToBeFiltered] = useState({});
  const [uniqueColumnsInfo, setUniqueColumnsInfo] = useState({});
  const [repeatingColumnInfo, setRepeatingColumnInfo] = useState({});
  const [dateColumnInfo, setDateColumnInfo] = useState({});
  // const [columnFilter, setColumnFilter] = useState('');
  // const filterByIndex = 7;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   },1500)
  // },[])

  // useEffect(() => {
    // filterWorker.onmessage = function(event) {
    //   console.log('--event Data value through web-worker-- ->', event.data);
    // }
    // const worker = new Worker('./components/common/web-workers/filter.worker');
    // worker.postMessage("start to worker");
    // worker.onmessage = e => {
    //   console.log("--web worker on message data-- -> ", e.data)
    // }
  // },[])

  const handleChange = e => {
    e.preventDefault();
    const { files } = e.target;
    if(files && files[0]) setCsvFile(files[0]);
  }
  const convertAndShowData = e => {
    e.preventDefault();
    const startTime = Date.now()
    setIsLoading(true);
    if(csvFile) {
      Papa.parse(csvFile, {
        complete: function(results) {
          const resultData = results.data;
          setConvertedData(resultData);
        }
      })
    }
    setIsLoading(false);
    const endTime = Date.now()
    console.log('--time taken to convert ended in : ', (endTime - startTime)/1000, ' seconds');
  }
  useEffect(() => {
    if(convertedData && convertedData.length > 0 && Object.keys(uniqueColumnsInfo).length && Object.keys(dateColumnInfo).length) {
      console.log('CompanyNamesWorker going to render');
      CompanyNamesWorker.postMessage({ excelData: convertedData.slice(1), uniqueDataObj: uniqueColumnsInfo});
      CompanyNamesWorker.onmessage = function (event) {
          console.log('Message received from worker CompanyNamesWorker -> '+ event.data);
      }
      console.log('DatesWorker going to render');
      DatesWorker.postMessage({ excelData: convertedData.slice(1), dateObj: dateColumnInfo });
      DatesWorker.onmessage = function (event) {
          console.log('Message received from worker -> '+ event.data);
      }
    }
  },[convertedData, uniqueColumnsInfo, dateColumnInfo])
  useEffect(() => {
    const fieldsData = [...labelData];
    // const valuesData = [...jsonData];
    const resultantFieldsData= [];
    // const resultantValuesData = [];
    // const selectedTagsLength = Object.values(selectedTags).length;
    fieldsData && fieldsData[0] && fieldsData[0].map((field, index) => {
      if(Number(index+1) === Number(selectedTags[index+1])) {
        resultantFieldsData.push(field ? field : '')
      }
      return {}
    })
    // valuesData.length > 0 && valuesData.map(value => {
    //   console.log('--values-- -> ', value);
    //   if(((month || year) && filterData(value, month, year, filterByIndex)) || (!month && !year)) {
    //     value.map((val, index) => {
    //       if(index === 0) resultantValuesData.push([]);
    //       if(Number(index+1) === Number(selectedTags[index+1])) {
    //         resultantValuesData[resultantValuesData.length - 1].push(val ? val : '');
    //       }
    //     })
    //   } else {
    //     const lastElem = new Array(selectedTagsLength).fill(null);
    //     resultantValuesData.push(lastElem);
    //   }
    // })
    setFieldsToBeExported(resultantFieldsData);
    // setDataToBeExported(resultantValuesData);
  },[labelData, selectedTags])

  const filterDataImplementation = useCallback((e) => {
    e.preventDefault();
    // setIsLoading(true);
    const startTime = Date.now()
    const valuesData = [...jsonData];
    let resultantValuesData = [];
    const selectedTagsLength = Object.values(selectedTags).length;
    // console.log('--selectedTags-- -> ', selectedTags, selectedTagsLength)
    const stringifieddataToBeFiltered = JSON.stringify(dataToBeFiltered);
    if(selectedTagsLength) {
      // }
      valuesData.length > 0 && valuesData.map((value, index) => {
        // console.log('--values-- -> ', value);
        // for(const key in dataToBeFiltered) {
          // const idxToCheck = labelData[0].indexOf(dataToBeFiltered[key]);
          // const valueExists = (idxToCheck > -1) && value[idxToCheck] && dataToBeFiltered[key] && dataToBeFiltered[key][value[idxToCheck]];
          // if(valueExists) {
          //   for(const tag in selectedTags) {
          //     resultantValuesData[resultantValuesData.length - 1].push((Number(tag) > -1) ? value[Number(tag) - 1] : '');
          //   }
          // } else { }
          resultantValuesData[index] = [];
          let exist = false;
          const selectedTagsValues = Object.values(selectedTags);
          for(const val of selectedTagsValues) {
            // console.log('--value-- -> ', value, stringifieddataToBeFiltered, value[val - 1], stringifieddataToBeFiltered.includes(`"${value[val - 1]}":"${value[val - 1]}"`))
            exist = stringifieddataToBeFiltered.includes(`"${value[val - 1]}":"${value[val - 1]}"`) && (dataToBeFiltered[labelData[0][val - 1]] && dataToBeFiltered[labelData[0][val - 1]][value[val - 1]]);
            if(exist) break;
          }
          if(exist) {
            for(const tag in selectedTags) {
              // console.log('--value-- -> ', value, tag, selectedTags[tag], stringifieddataToBeFiltered, value[selectedTags[tag] - 1])  
              resultantValuesData[index].push(exist ? value[selectedTags[tag] - 1] : '');
            }
          } else {
            const newArray = new Array(selectedTagsValues.length).fill('');
            resultantValuesData[index] = [...newArray];
          }
          // console.log('--resultantValuesData-- -> ', resultantValuesData);
          // resultantValuesData[resultantValuesData.length - 1].push((Number(tag) > -1) ? value[Number(tag) - 1] : '');
        // }
        // if(((month || year) && filterData(value, month, year, filterByIndex)) || (!month && !year)) {
        //   value.map((val, index) => {
        //     if(index === 0) resultantValuesData.push([]);
        //     if(Number(index+1) === Number(selectedTags[index+1])) {
        //       resultantValuesData[resultantValuesData.length - 1].push(val ? val : '');
        //     }
        //   })
        // } else {
        //   const lastElem = new Array(selectedTagsLength).fill(null);
        //   resultantValuesData.push(lastElem);
        // }
        return {}
      })
    } else {
      resultantValuesData = valuesData
    }
    setDataToBeExported(resultantValuesData);
    const endTime = Date.now();
    console.log('--time taken to process ended in : ', (endTime - startTime)/1000, ' seconds');
    // setIsLoading(false);
  },[jsonData, selectedTags, dataToBeFiltered, labelData])

  // useEffect(() => {
  //   if(fieldstoBeExported && fieldstoBeExported.length && dataToBeExported && dataToBeExported.length && Object.values(selectedTags).length) {
  //     setShowFilterData(true);
  //   } else setShowFilterData(false);
  // },[dataToBeExported, fieldstoBeExported, selectedTags])

  if(isLoading) {
    return <Loading isLoading={isLoading} />
  }
  // console.log('--dataToBeExported-- -> ', dataToBeExported, selectedTags, dataToBeFiltered, fieldstoBeExported);
  // console.log('--dataToBeFiltered-- -> ', dataToBeFiltered, selectedTags, labelData, fieldstoBeExported, dataToBeExported);
  // console.log('--convertedData-- -> ', convertedData, uniqueColumnsInfo, dateColumnInfo, repeatingColumnInfo);
  return (
    <LabelsInfo.Provider value={{setDataToBeFiltered, labelData, dataToBeFiltered, setIsLoading, selectedTags, setSelectedTags}}>
      <div className="App">
        <div className="outer-wrapper" id="outer-wrapper">
          {/* <Loading isLoading={isLoading} /> */}
          {/* <header className="App-header bg-dark">
            <div className="container py-3">
              Main Header
            </div>        
          </header> */}
          <div className="container">
            <div className="wrapper py-5">
              <div className="grid-system">
                <div className="left-section">
                  {/* <WithWebWorker /> */}
                  {/* <DemoWoker /> */}
                  <InputLabel labelText={'Select a file'} htmlFor={'json-file'}/>
                  <InputField
                    type="file"
                    name="json-file"
                    accept=".csv"
                    id="json-file"
                    handleChange={handleChange}
                    inputStyle={{ border: 'none', paddingLeft: 0, paddingRight: 0, width: 'auto' }}
                  />
                  <Button 
                    text="Convert and show Data"
                    handleClick={convertAndShowData}
                    type="button"            
                  />
                  {
                    convertedData && convertedData.length > 0 &&
                    <>
                      <ColumnsInfo 
                        title={'Unique Columns Select'}
                        labelText={'Select unique columns'}
                        labelClassName={'uniqueColumnClass'}
                        labelsData={labelData[0]}
                        labelSetter={setUniqueColumnsInfo}
                        labelObjValue={uniqueColumnsInfo}
                        selectName={'uniqueColumn'}
                        selectId={'uniqueColumn'}
                        buttonText={'Add unique column'}
                        multipleType={true}
                      />
                      <ColumnsInfo 
                        title={'Date Column Select'}
                        labelText={'Select date column'}
                        labelClassName={'dateColumnClass'}
                        labelsData={labelData[0]}
                        labelSetter={setDateColumnInfo}
                        labelObjValue={dateColumnInfo}
                        selectName={'dateColumn'}
                        selectId={'dateColumn'}
                        buttonText={'Add date column'}
                      />
                      <ColumnsInfo 
                        title={'Repeating Column Select'}
                        labelText={'Select Repeating rendering column'}
                        labelClassName={'repeatingColumnClass'}
                        labelsData={labelData[0]}
                        labelSetter={setRepeatingColumnInfo}
                        labelObjValue={repeatingColumnInfo}
                        selectName={'repeatingColumn'}
                        selectId={'repeatingColumn'}
                        buttonText={'Add repeating column'}
                      />
                    </>
                  }
                  {/* <SelectMonthAndYear
                    setMonth={setMonth}
                    setYear={setYear}
                    placeholder={'DD-MM-YYYY'}
                    value={`${month}-${year}`}
                  /> */}
                  {/* <FilterByAttributes
                    dataToBeFiltered={dataToBeFiltered}
                    setDataToBeFiltered={setDataToBeFiltered}
                    // labelAttributes={labelData}
                  /> */}
                  {/* {
                    ((month || year) && Object.values(selectedTags).length && dataToBeExported.length && fieldstoBeExported.length) &&
                    <div className="filtered-data-button">
                      <h3>Click the button below to show and hide filtered data</h3>
                      <Button 
                        text={showFilterData ? "Hide filtered data" : "Show Filtered data"}
                        handleClick={() => setShowFilterData(!showFilterData)}
                        type="button"            
                      />
                    </div>
                  } */}
                </div>
                <div className="right-section">
                  {/* <FilterColumnAndData dataToBeFiltered={dataToBeFiltered} /> */}
                  <ColumnsAndIndexInfo
                    uniqueColumnsInfo={uniqueColumnsInfo}
                    dateColumnInfo={dateColumnInfo}
                    repeatingColumnInfo={repeatingColumnInfo}
                  />
                </div>
              </div>
              {
                // showFilterData &&
                // !!(Object.values(selectedTags).length) && !!(Object.values(dataToBeFiltered).length) && !!fieldstoBeExported.length &&
                // <Button 
                //   text={"FIlter data"}
                //   handleClick={e => {
                //     setIsLoading(true)
                //     filterDataImplementation(e)
                //     setIsLoading(false)
                //   }}
                //   type="button"
                //   style={{ margin: '20px 0' }}            
                // />
              }
              {
                // !!(Object.values(selectedTags).length && !!dataToBeExported.length && !!fieldstoBeExported.length) &&
                // <div className="filtered-data-button">
                //   <h3>Click the button below to show and hide filtered data</h3>
                //   <Button 
                //     text={showFilterData ? "Hide filtered data" : "Show Filtered data"}
                //     handleClick={() => setShowFilterData(!showFilterData)}
                //     type="button"            
                //   />
                // </div>
              }
              {
                !!(Object.values(selectedTags).length && !!dataToBeExported.length && !!fieldstoBeExported.length) && !!showFilterData &&
                <ExportAndDownloadCsvData
                  dataToExport={dataToBeExported}
                  fields={fieldstoBeExported}
                />
              }
              {
                !!showFilterData &&
                <Filter 
                  labelData={fieldstoBeExported}
                  jsonData={dataToBeExported}
                  tableClass={'table-data'}            
                />
              }
              <TableData
                data={convertedData}
                tableClass={'table-data'}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                setJsonData={setJsonData}
                setLabelData={setLabelData}
                labelData={labelData}
                jsonData={jsonData}
              />
            </div>
          </div>
        </div>
      </div>
    </LabelsInfo.Provider>
  );
}

export default memo(App);
