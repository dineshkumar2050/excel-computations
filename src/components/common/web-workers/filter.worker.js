/* eslint-disable import/no-anonymous-default-export */
// import { filterData } from "../src/components/common/web-workers/filter";

// onmessage = function (oEvent) {
//     console.log("::Start Prime Calculation from worker::");
//     const t0 = performance.now();
//     filterData(20);
//     const t1 = performance.now();
//     const diff = Math.round(t1 - t0);
//     console.log("::Stop Prime Calculation from worker::");
  
//     postMessage(diff);
// };

export default () => {
    onmessage = function (oEvent) {
        console.log("::Start Prime Calculation from worker::");
        const startTime = performance.now();
        // const result = filterData(44);
        const endTime = performance.now();
        console.log("::Stop Prime Calculation from worker::");
    
        postMessage({ result: 'result', performanceDiff: `Performance diff is ${(endTime - startTime)/1000} seconds`, data: oEvent.data });
    };
}
