// window.self.onmessage = async ($event) => {
//     if($event && $event.data && $event.data.msg === 'filter') {
//         const newFilter = filterData($event.data.num);
//         window.self.postMessage(newFilter);
//     }
// }

export function filterData(num) {
    const result =  num < 2 ? num : filterData(num - 1) + filterData(num - 2);
    return result;
    // endTime = performance.now();
    // postMessage({ result, performanceDiff: `Performance diff is ${(endTime - startTime)/1000} seconds` });
}

// filterData(44);
