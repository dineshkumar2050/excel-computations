import { useEffect } from "react";
// import Worker from "../../../../public/filter.worker";
// import { LONG_TEXT } from "./Constants";
// const worker = new Worker("./filter.worker.js");
import WebWorker from "./createScriptUrlFromFunction";
import worker from './filter.worker.js';
let DemoWorker = new WebWorker(worker);

export default function WithWebWorker() {
  useEffect(() => {
    // const DemoWorker = new worker("worker.js");
    DemoWorker.postMessage("start");
    DemoWorker.onmessage = (e) => {
      console.log("Time Taken", e.data);
    };
  }, []);
  return (<>'ABC'</>);
}
