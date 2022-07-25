/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function (event) {
        console.log("::Start Prime Calculation from worker::");
        const t0 = performance.now();
        const getUniqueCompanyNames = (arr, uniqueDataObj) => {
          let uniqueObj = {};
          arr.map(item => {
            for(const key in uniqueDataObj) {
              if(!uniqueObj[`${key}`]) uniqueObj[`${key}`] = {}
              if(!uniqueObj[`${key}`][`${uniqueDataObj[key]}`]) {
                uniqueObj[`${key}`][`${item[uniqueDataObj[key]]}`] = item[uniqueDataObj[key]];
              }
            }
          })
        }
        const result = getUniqueCompanyNames(event.data.excelData, event.data.uniqueDataObj)
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Stop Prime Calculation from worker::");
      
        postMessage(diff);
    };
}
