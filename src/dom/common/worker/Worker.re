type t = {
  onmessage: unit => {.},
  url: string,
};

// Create a worker from scriptUri
[@bs.new] external create: (~scriptUri: string) => t = "Worker";

// Send data to the worker.
[@bs.send] external send: (t, 'a) => unit = "postMessage";

// Attach a receive handler to a worker.
[@bs.set] external receive: (t, WorkerEvent.t => unit) => unit = "onmessage";