import React, { useState, memo, useEffect } from 'react';
import './App.css';
import InputField from './components/common/InputField';
import InputLabel from './components/common/InputLabel';
import Papa from 'papaparse';
import Button from './components/common/Button';
import TableData from './components/common/TableData';
import SelectMonthAndYear from './components/common/SelectMonthAndYear';
import ExportAndDownloadCsvData from './components/common/ExportAndDownloadCsvData';
import { filterData } from './FilterData';
import Filter from './components/common/Filter';
import FilterByAttributes from './components/common/FilterByAttributes';

export const LabelsInfo = React.createContext(null);

function App() {
  const [convertedData, setConvertedData] = useState([])
  const [csvFile, setCsvFile] = useState('');
  const [selectedTags, setSelectedTags] = useState({});
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [dataToBeExported, setDataToBeExported] = useState([]);
  const [fieldstoBeExported, setFieldsToBeExported] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [showFilterData, setShowFilterData] = useState(false);
  const [columnFilter, setColumnFilter] = useState('');
  const filterByIndex = 7;
  const handleChange = e => {
    e.preventDefault();
    const { files } = e.target;
    if(files && files[0]) setCsvFile(files[0]);
  }
  const convertAndShowData = e => {
    e.preventDefault();
    if(csvFile) {
      Papa.parse(csvFile, {
        complete: function(results) {
          const resultData = results.data;
          setConvertedData(resultData);
        }
      })
    }
  }
  useEffect(() => {
    const fieldsData = [...labelData];
    const valuesData = [...jsonData];
    const resultantFieldsData= [];
    const resultantValuesData = [];
    const selectedTagsLength = Object.values(selectedTags).length;
    fieldsData && fieldsData[0] && fieldsData[0].map((field, index) => {
      if(Number(index+1) === Number(selectedTags[index+1])) {
        resultantFieldsData.push(field ? field : '')
      }
    })
    valuesData.length > 0 && valuesData.map(value => {
      if(((month || year) && filterData(value, month, year, filterByIndex)) || (!month && !year)) {
        value.map((val, index) => {
          if(index === 0) resultantValuesData.push([]);
          if(Number(index+1) === Number(selectedTags[index+1])) {
            resultantValuesData[resultantValuesData.length - 1].push(val ? val : '');
          }
        })
      } else {
        const lastElem = new Array(selectedTagsLength).fill(null);
        resultantValuesData.push(lastElem);
      }
    })
    setFieldsToBeExported(resultantFieldsData);
    setDataToBeExported(resultantValuesData);
  },[selectedTags, month, year])
  return (
    <LabelsInfo.Provider value={{setLabel: setColumnFilter, labelData}}>
      <div className="App">
        <header className="App-header bg-dark">
          <div className="container py-3">
            Main Header
          </div>        
        </header>
        <div className="container">
          <div className="wrapper py-5">
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
            <SelectMonthAndYear
              setMonth={setMonth}
              setYear={setYear}
              placeholder={'DD-MM-YYYY'}
              value={`${month}-${year}`}
            />
            {/* <FilterByAttributes
              // labelAttributes={labelData}
            /> */}
            {
              ((month || year) && Object.values(selectedTags).length && dataToBeExported.length && fieldstoBeExported.length) &&
              <div className="filtered-data-button">
                <h3>Click the button below to show and hide filtered data</h3>
                <Button 
                  text={showFilterData ? "Hide filtered data" : "Show Filtered data"}
                  handleClick={() => setShowFilterData(!showFilterData)}
                  type="button"            
                />
              </div>
            }
            {
              ((month || year) && Object.values(selectedTags).length && dataToBeExported.length && fieldstoBeExported.length) &&
              <ExportAndDownloadCsvData
                dataToExport={dataToBeExported}
                fields={fieldstoBeExported}
              />
            }
            {
              showFilterData &&
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
    </LabelsInfo.Provider>
  );
}

export default memo(App);
