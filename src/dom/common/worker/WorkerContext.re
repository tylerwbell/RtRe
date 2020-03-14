// Send data to
[@bs.val] external send: 'a => unit = "postMessage";

let isWorker: unit => bool = [%bs.raw
  {|
    function() {
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    }
|}
];

let trapOnWindow = () =>
  if (!WorkerContext.isWorker()) {
    Js.log("!!! WORKER RUNNING IN WINDOW !!!");
    DomUtil.debugger();
  };

let receive: (WorkerEvent.t => unit) => unit = [%bs.raw
  {|function(callback) {
      onmessage = callback;
}|}
];