// Send data back to the parent of this worker. Uses `bs.val` rather than `bs.send` as
// this is a global function in the worker context, and does not pass the caller as
// the first parameter. I don't know what I'm doing.
[@bs.val] external send: ('a, array('b)) => unit = "postMessage";

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