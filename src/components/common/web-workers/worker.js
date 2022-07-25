/* eslint-disable import/no-anonymous-default-export */
// import { sum } from './utils';
// const sum = require('./utils')

// postMessage("worker running successfully");

// export default () => {
//     onmessage = function (event) {
//         const result = sum(event.data);
//         console.log('--event data-- -> ', event.data, result);
//         postMessage("worker received data " + event.data.data + ' and the result obtained is '+ result);
//     };
// }

export default () => {
    // window.addEventListener("message", e => {
    //     if(!e) return
    //     let { data } = e;
    //     const result = sum(data);
    //     console.log('--event data-- -> ', data, result);
    //     postMessage("worker received data " + data.data + ' and the result obtained is '+ result);
    // })
    onmessage = function (event) {
        const sum = (num) => {
            let sum = 0;
            for(let i = 0;i < num;i++) {
                sum += i
            }
            return sum
        };
        const t0 = performance.now();
        const result = sum(event.data.data);
        const t1 = performance.now();
        const timeReamining = (t1-t0)/1000;
        const timeTakenInSeconds = String((timeReamining)).length > 4 ?  Number(String(timeReamining).slice(0, 4)) : timeReamining;
        postMessage("worker received data " + event.data.data + ' and the result obtained is '+ result + ' and the time taken is '+timeTakenInSeconds + ' seconds');
    };
}
