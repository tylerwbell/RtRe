// Send data to
[@bs.val] external send: 'a => unit = "postMessage";

// Terminate the worker.
let exit: unit => unit = [%bs.raw {|
  function() {
    close();
  }
|}];

let isWorker: unit => bool = [%bs.raw
  {|
    function() {
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    }
|}
];

// Stop execution if running outside of a WebWorker.
// TODO: not tested, probably junk.
let trapOnWindow = () =>
  if (!isWorker()) {
    Js.log("!!! WORKER RUNNING IN WINDOW !!!");
    DomUtil.debugger();
  };

let receive: (WorkerEvent.t => unit) => unit = [%bs.raw
  {|function(callback) {
      onmessage = callback;
}|}
];