/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function(event) {
        console.log('--starting to run from here-- -> ')
        const t0 = performance.now();
        const getResultantData = (sumUpto = 10000000) => {
            let sum = 0
            for(let i = 1;i <= sumUpto;i++) {
                sum += i
            }
            return sum
        }
        const result = getResultantData(event.data.sumUpto);
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Start Calculation for sumUpto:: ", event.data.sumUpto , t0, t1, diff, result);
        postMessage({ result, timeTaken: diff });
    }
}
