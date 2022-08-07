/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function(event) {
        const t0 = performance.now();
        const getResultantData = (arr, uniqueDataObj) => {
          let resultantData = {};
          arr.map(item => {
            for(const key in uniqueDataObj) {
              // console.log("::Start Calculation for company names:: ", item, key, uniqueDataObj, uniqueObj);
              // if(!uniqueObj[`${key}`]) uniqueObj[`${key}`] = {}
              // if(!uniqueObj[`${key}`][`${uniqueDataObj[key]}`] && item[Number(uniqueDataObj[key])]) {
              //   uniqueObj[`${key}`][`${item[Number(uniqueDataObj[key])]}`] = item[Number(uniqueDataObj[key])];
              // }
            }
          })
          return resultantData
        }
        const result = getResultantData(event.data.excelData, event.data.uniqueDataObj);
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Start Calculation for company names:: ", t0, t1, result);
        postMessage({ result, timeTaken: diff });
    }
}
