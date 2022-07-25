// export default function createScriptURLFromFunction(fn) {
//   let code = fn.toString();
//   code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

//   const blob = new Blob([code], { type: "application/javascript" });
//   const workerScript = URL.createObjectURL(blob);

//   return workerScript;
// }

export default class WebWorker {
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    return new Worker(URL.createObjectURL(blob));
  }
}

