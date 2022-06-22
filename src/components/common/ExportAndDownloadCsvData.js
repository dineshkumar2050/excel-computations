import React, { memo } from 'react';
import Button from './Button';
import Papa from 'papaparse';

function ExportAndDownloadCsvData({ dataToExport, fields }) {
  const downloadCsvData = e => {
    e.preventDefault();
    const csv = Papa.unparse({
      data: dataToExport,
      fields
    })
    const blob = new Blob([csv]);
    const a = document.createElement('a');
    // a.href = URL.createObjectURL(blob, { type: 'text/plain' });
    a.href='data:text/csv;charset=utf-8,'+escape(csv);
    a.download = 'CSVExportFile.csv';
    a.textContent='download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <div style={{margin: '20px 0'}}>
        <h2>Export And Download Csv Data</h2>
        <Button
          type={'button'}
          text={'Download CSV Data'}
          handleClick={downloadCsvData}
        />
    </div>
  )
}

export default memo(ExportAndDownloadCsvData)
