/* eslint-disable import/no-anonymous-default-export */
import { nthPrime } from "./components/common/web-workers/prime";

export default () => {
  onmessage = function (oEvent) {
    console.log("::Start Prime Calculation from worker::");
    const t0 = performance.now();
    nthPrime(40000);
    const t1 = performance.now();
    const diff = Math.round(t1 - t0);
    console.log("::Stop Prime Calculation from worker::");
  
    postMessage(diff);
  };
}
