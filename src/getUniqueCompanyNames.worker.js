/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function (event) {
        console.log("::Start Prime Calculation from worker::");
        const t0 = performance.now();
        const getUniqueCompanyNames = (arr, uniqueDataObj) => {
          let uniqueObj = {};
          let uniqueObjArr = {};
          let uniqueObjSet = new Set();
          arr.map(item => {
            for(const key in uniqueDataObj) {
              // console.log("::Start Calculation for company names:: ", item, key, uniqueDataObj, uniqueObj);
              if(!uniqueObj[`${key}`]) uniqueObj[`${key}`] = {};
              if(!uniqueObjArr[`${key}`]) uniqueObjArr[`${key}`] = {}
              if(!uniqueObj[`${key}`][`${uniqueDataObj[key]}`] && item[Number(uniqueDataObj[key])]) {
                uniqueObj[`${key}`][`${item[Number(uniqueDataObj[key])]}`] = item[Number(uniqueDataObj[key])];
                uniqueObjSet.add(item[Number(uniqueDataObj[key])]);
              }
              // uniqueObjSet.add(item[Number(uniqueDataObj[key])]);
              // console.log('--uniqueObjArr-- -> ', uniqueObjArr, uniqueObjSet, uniqueDataObj);
            }
            uniqueObjArr = Array.from(uniqueObjSet);
            return {}
          })
          return { uniqueObj , uniqueObjArr }
        }
        const result = getUniqueCompanyNames(event.data.excelData, event.data.uniqueDataObj);
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Start Calculation for company names:: ", t0, t1, result);
        postMessage({ result, timeTaken: diff });
    };
}
