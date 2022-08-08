import React, { useState, memo, useEffect } from 'react';
import './App.css';
import InputField from './components/common/InputField';
import InputLabel from './components/common/InputLabel';
import Papa from 'papaparse';
import Button from './components/common/Button';
import TableData from './components/common/TableData';
import ExportAndDownloadCsvData from './components/common/ExportAndDownloadCsvData';
import Filter from './components/common/Filter/Filter';
import Loading from './components/common/Loading';
import ConvertedDataIntoObj  from './NewApp/getConvertedObject';
import ResultantData from './NewApp/getResultantData.worker';
import WebWorker from './components/common/web-workers/createScriptUrlFromFunction';
import ColumnsInfo from './components/common/ColumnsInfo';
import ColumnsAndIndexInfo from './components/common/ColumnAndIndexInfo'
let ConvertedDataIntoObjWorker = new WebWorker(ConvertedDataIntoObj);

export const LabelsInfo = React.createContext(null);

function NewApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState([])
  const [csvFile, setCsvFile] = useState('');
  const [selectedTags, setSelectedTags] = useState({});
  const [dataToBeExported, setDataToBeExported] = useState([]);
  const [fieldstoBeExported, setFieldsToBeExported] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [showFilterData, setShowFilterData] = useState(false);
  const [dataToBeFiltered, setDataToBeFiltered] = useState({});
  const [uniqueColumnsInfo, setUniqueColumnsInfo] = useState({});
  const [repeatingColumnInfo, setRepeatingColumnInfo] = useState({});
  const [dateColumnInfo, setDateColumnInfo] = useState({});
  const [uniqueDateValues, setUniqueDateValues] = useState({});
  const [resultantLabel, setResultantLabel] = useState([]);
  const [convertedDataObj, setConvertedDataObj] = useState({});
  const [resultantData, setResultantData] = useState([]);
  const [resultantLabelWithIndexes, setResultantLabelWithIndexes] = useState({});

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
    const endTime = Date.now();
  }

  useEffect(() => {
    if(convertedData && convertedData.length > 0 && Object.keys(uniqueColumnsInfo).length && 
        Object.keys(dateColumnInfo).length) {
      ConvertedDataIntoObjWorker.postMessage({ excelData: convertedData, uniqueDataObj: uniqueColumnsInfo, dateColumnObj: dateColumnInfo});
      ConvertedDataIntoObjWorker.onmessage = function (event) {
          if(event.data && event.data.result && Object.keys(event.data.result).length) {
            if(Object.keys(event.data.result?.dateUniqueObj).length) setUniqueDateValues(event.data.result?.dateUniqueObj);
            if(Object.keys(event.data.result?.resultantObj).length) setConvertedDataObj(event.data.result?.resultantObj);
            ConvertedDataIntoObjWorker.terminate();
          }
      }
    }
  },[convertedData, uniqueColumnsInfo, dateColumnInfo])

  useEffect(() => {
      if(uniqueDateValues && Object.keys(uniqueDateValues).length) {
        const datesArr = Object.values(uniqueDateValues).sort((a, b) => a > b ? 1 : -1);
        const firstElem = ["S.no", ...Object.keys(uniqueColumnsInfo), ...datesArr];
        setResultantLabel(firstElem);
        setFieldsToBeExported(firstElem);
        const resultantLabelIndices = {}
        for(let i = 0;i < firstElem.length;i++) {
          resultantLabelIndices[firstElem[i]] = i;
        }
        setResultantLabelWithIndexes(resultantLabelIndices);
    }
  },[uniqueDateValues])

  useEffect(()=> {
    if(repeatingColumnInfo && Object.keys(repeatingColumnInfo).length &&
      uniqueDateValues && Object.keys(uniqueDateValues).length &&
      convertedDataObj && Object.keys(convertedDataObj).length > 0 && resultantLabel && resultantLabel.length &&
      resultantLabelWithIndexes && Object.keys(resultantLabelWithIndexes).length
    ) {
        const repeatingDataLabel = Object.keys(repeatingColumnInfo)[0];
        const repeatingDataIndex = repeatingColumnInfo[repeatingDataLabel];
        const companyNameLabel = Object.keys(uniqueColumnsInfo)[0]
        const companyNameIndexToInsertInDataAt = resultantLabelWithIndexes[companyNameLabel];
        let convertedDataObjCopy = { ...convertedDataObj }
        let workerList = [];
        let workersCount = Math.min(window.navigator.hardwareConcurrency, Object.keys(convertedDataObj).length)
        let dividedDataArr = [];
        const dataDivision = (obj, endIndex) => {
            let newObj = {};
            let index = 0;
            for(const key in obj) {
                if(index < endIndex) {
                    newObj[key] = obj[key];
                    index++;
                    delete obj[key];
                }                
            }
            return newObj;
        }
        for (let i = 0; i < workersCount; i++) {
            const lastIdx = Math.floor(Object.keys(convertedDataObjCopy).length/(workersCount-(i)))
            const res = dataDivision(convertedDataObjCopy, lastIdx);
            dividedDataArr.push(res);
        }
        let startingIndex = 1;
        for (let i = 0; i < workersCount; i++) {
            let newWorker = {
                worker: new WebWorker(ResultantData),
                inUse: false
            };
            if(i !== 0) {
                startingIndex += Object.keys(dividedDataArr[i-1]).length;
            }
            workerList.push(newWorker);
            const dataToBeSent = dividedDataArr[i];
            newWorker.worker.postMessage({  dataToBeSent, repeatingDataIndex, companyNameIndexToInsertInDataAt, resultantLabel, resultantLabelWithIndexes, startIndex: startingIndex });
            newWorker.worker.onmessage = function (event) {
                if(event.data && event.data.result && event.data.result.length) {
                    if(!window.resultData) window.resultData = [...event.data.result];
                    else window.resultData = [...window.resultData, ...event.data.result]
                    setResultantData([...resultantData, ...event.data.result])
                    newWorker.worker.terminate();
                }
            }
        }
    }
  },[repeatingColumnInfo, resultantLabel, uniqueDateValues, convertedDataObj, uniqueColumnsInfo, resultantLabelWithIndexes])

    useEffect(() => {
        if(window.resultData && window.resultData.length) {
            setResultantData([ [...resultantLabel],...window.resultData.sort((a, b) => a[0] > b[0] ? 1 : -1)]);
            setShowFilterData(true);
        }
    },[window.resultData])
    useEffect(() => {
        if(resultantData && resultantData.length) {
            setDataToBeExported(resultantData);
        }
    }, [resultantData])
  if(isLoading) {
    return <Loading isLoading={isLoading} />
  }
  return (
    <LabelsInfo.Provider value={{setDataToBeFiltered, labelData, dataToBeFiltered, setIsLoading, selectedTags, setSelectedTags}}>
      <div className="App">
        <div className="outer-wrapper" id="outer-wrapper">
          <div className="container">
            <div className="wrapper py-5">
              <div className="grid-system">
                <div className="left-section">
                  <InputLabel labelText={'Select a file'} htmlFor={'json-file'}/>
                  <InputField
                    type="file"
                    name="json-file"
                    accept=".csv,.xlsx"
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
                </div>
                <div className="right-section">
                  <ColumnsAndIndexInfo
                    uniqueColumnsInfo={uniqueColumnsInfo}
                    dateColumnInfo={dateColumnInfo}
                    repeatingColumnInfo={repeatingColumnInfo}
                  />
                </div>
              </div>
              {
                (!!dataToBeExported.length && !!fieldstoBeExported.length) && !!showFilterData &&
                <ExportAndDownloadCsvData
                  dataToExport={dataToBeExported.slice(1)}
                  fields={fieldstoBeExported}
                />
              }
              {
                !!showFilterData &&
                <Filter 
                  labelData={fieldstoBeExported}
                  jsonData={dataToBeExported.slice(1).length > 10 ? dataToBeExported.slice(1).slice(0, 10) : dataToBeExported.slice(1)}
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
                jsonData={jsonData.slice(0, 10)}
              />
            </div>
          </div>
        </div>
      </div>
    </LabelsInfo.Provider>
  );
}

export default memo(NewApp);
