/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function (event) {
      console.log("::Start Prime Calculation from worker::");
      const t0 = performance.now();
      const getUniqueDates = (arr, dateObj) => {
        let uniqueObj = {};
        let dateTitle = null;
        let dateColumnIndex = null;
        for(const key in dateObj) {
          dateTitle = key;
          dateColumnIndex = dateObj[key];
        }
        uniqueObj[`${dateTitle}`] = {}
        arr.map(item => {
          if(!uniqueObj[`${dateTitle}`][`${item[dateColumnIndex]}`]) {
            uniqueObj[`${dateTitle}`][`${item[dateColumnIndex]}`] = item[dateColumnIndex];
          }
        })
      }
      const result = getUniqueDates(event.data.excelData, event.data.dateObj)
      const t1 = performance.now();
      const diff = Math.round(t1 - t0);
      console.log("::Stop Prime Calculation from worker::");
    
      postMessage(diff);
    };
  }