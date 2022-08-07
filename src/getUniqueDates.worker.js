/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function (event) {
      console.log("::Start Prime Calculation from unique dates worker::");
      const t0 = performance.now();
      const getUniqueDates = (arr, dateObj) => {
        let dateUniqueObj = {};
        let dateTitle = null;
        let dateColumnIndex = null;
        let dateStartEndIndices = {};
        for(const key in dateObj) {
          dateTitle = key;
          dateColumnIndex = Number(dateObj[key]);
        }
        dateUniqueObj[`${dateTitle}`] = {}
        arr.map((item, index) => {
          if(dateUniqueObj[`${dateTitle}`] && !dateUniqueObj[`${dateTitle}`][`${item[dateColumnIndex]}`] && item[dateColumnIndex]) {
            // console.log('--dateObj dateUniqueObj dateColumnIndex-- -> ', dateObj, dateUniqueObj, dateColumnIndex, dateTitle, dateUniqueObj[`${dateTitle}`], dateUniqueObj[`${dateTitle}`][`${item[dateColumnIndex]}`],item[dateColumnIndex]);
            dateUniqueObj[`${dateTitle}`][`${item[dateColumnIndex]}`] = item[dateColumnIndex];
          }
          if(item[dateColumnIndex] && !dateStartEndIndices[`${item[dateColumnIndex]}`]) {
            dateStartEndIndices[`${item[dateColumnIndex]}`] = [String(index)];
          } else {
            if(arr[index] && item[dateColumnIndex]) {
              if(arr[index + 1] && arr[index+1][dateColumnIndex]) {
                if(arr[index+1][dateColumnIndex] !== item[dateColumnIndex]) {
                  dateStartEndIndices[`${item[dateColumnIndex]}`].push(String(index))
                }
              } else {
                dateStartEndIndices[`${item[dateColumnIndex]}`].push(index);
              }
            }
          }
        })
        return { dateUniqueObj, dateStartEndIndices }  
      }
      const result = getUniqueDates(event.data.excelData, event.data.dateObj)
      const t1 = performance.now();
      const diff = Math.round(t1 - t0);
      // console.log('--dateStartEndIndices-- -> ', result?.dateStartEndIndices, result?.dateUniqueObj);
      console.log("::Stop Prime Calculation from worker::");
    
      postMessage({ result, timeTaken: diff });
    };
}
