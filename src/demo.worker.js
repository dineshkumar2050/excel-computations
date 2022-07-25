// import { useEffect } from "react";
import Button from "./components/common/Button";
// const worker = new Worker("./components/common/web-workers/worker.js", { type: 'module' });
import worker from './components/common/web-workers/worker.js';
import WebWorker from './components/common/web-workers/createScriptUrlFromFunction';
let MyWorker = new WebWorker(worker);

export default function DemoWoker() {
    // useEffect(() => {
    //     MyWorker.onmessage = function (event) {
    //     console.log("Message posted from webworker: " + event.data);
    //     };
    //     MyWorker.postMessage({ data: "123456789" });
        // MyWorker.addEventListener("message", event => {
        //     const { data }  = event;
        //     console.log('--data-- -> ', data);
        // })
    // }, []);

    const handleClick = e => {
        e.preventDefault();
        console.log('button clicked');
        MyWorker.postMessage({ data: "123456789" });
        MyWorker.onmessage = function (event) {
            console.log('Message received from worker -> '+ event.data);
        }
    }
     return (
        <>
            <Button 
                text="Check web worker"
                handleClick={handleClick}
                type="button"            
            />
        </>
    );
}
