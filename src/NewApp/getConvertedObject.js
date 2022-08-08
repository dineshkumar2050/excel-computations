/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function(event) {
        const t0 = performance.now();
        const getResultantData = (arr, uniqueDataObj, dateColumnObj) => {
          let resultantObj = {};
          let dateUniqueObj = {};
          let companyLabelIndex = Number(uniqueDataObj[(Object.keys(uniqueDataObj)[0])]);
          let dateLabelIndex = Number(dateColumnObj[(Object.keys(dateColumnObj)[0])]);
          arr.map((item) => {
            if(!resultantObj[item[companyLabelIndex]] && item[companyLabelIndex]) {
                resultantObj[item[companyLabelIndex]] = {}
            }
            if(item && item[dateLabelIndex] && item[companyLabelIndex] && resultantObj[item[companyLabelIndex]] && !resultantObj[item[companyLabelIndex]][item[dateLabelIndex]]) {
                resultantObj[item[companyLabelIndex]][item[dateLabelIndex]] = item;
            }
            if(item && dateUniqueObj && !dateUniqueObj[`${item[dateLabelIndex]}`] && item[dateLabelIndex]) {
                dateUniqueObj[`${item[dateLabelIndex]}`] = item[dateLabelIndex];
            }
          })
          return { resultantObj, dateUniqueObj }
        }
        const result = getResultantData(event.data.excelData, event.data.uniqueDataObj, event.data.dateColumnObj);
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Start Calculation for unique date obj:: ", t0, t1, diff/1000);
        postMessage({ result, timeTaken: diff });
    }
}
