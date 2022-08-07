/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function(event) {
        const t0 = performance.now();
        const getResultantData = (arr, uniqueDataObj, dateColumnObj) => {
          let resultantObj = {};
          let dateUniqueObj = {};
          let companyLabelIndex = Number(uniqueDataObj[(Object.keys(uniqueDataObj)[0])]);
          let dateLabelIndex = Number(dateColumnObj[(Object.keys(dateColumnObj)[0])]);
          arr.map((item, index) => {
            if(!resultantObj[item[companyLabelIndex]] && item[companyLabelIndex]) {
                resultantObj[item[companyLabelIndex]] = {}
            }
            // console.log('--item[companyLabelIndex]-- -> ', resultantObj[item[companyLabelIndex]][item[dateLabelIndex]])
            if(item && item[dateLabelIndex] && item[companyLabelIndex] && resultantObj[item[companyLabelIndex]] && !resultantObj[item[companyLabelIndex]][item[dateLabelIndex]]) {
                resultantObj[item[companyLabelIndex]][item[dateLabelIndex]] = item;
            }
            if(dateUniqueObj && !dateUniqueObj[`${item[dateLabelIndex]}`] && item[dateLabelIndex]) {
                // console.log('--dateObj dateUniqueObj dateLabelIndex-- -> ', dateObj, dateUniqueObj, dateLabelIndex, dateTitle, dateUniqueObj, dateUniqueObj[`${item[dateLabelIndex]}`],item[dateLabelIndex]);
                dateUniqueObj[`${item[dateLabelIndex]}`] = item[dateLabelIndex];
            }
          })
          return { resultantObj, dateUniqueObj }
        }
        const result = getResultantData(event.data.excelData, event.data.uniqueDataObj, event.data.dateColumnObj);
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Start Calculation for company names:: ", t0, t1, result);
        postMessage({ result, timeTaken: diff });
    }
}
