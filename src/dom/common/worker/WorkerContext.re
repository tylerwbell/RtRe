// Send data to
[@bs.val] external send: 'a => unit = "postMessage";

let receive: (WorkerEvent.t => unit) => unit = [%bs.raw
  {|function(callback) {
      onmessage = callback;
}|}
];