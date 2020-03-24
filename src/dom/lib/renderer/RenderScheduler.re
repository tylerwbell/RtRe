// TODO: work id
type t = {
  workQueue: ref(list(RenderWorkerEvent.Command.t)),
  free: ref(list(Worker.t)),
  workers: ref(list(Worker.t)),
};

let log = (message: string) => {
  Js.log({j|scheduler: $message|j});
};

let rec schedule = (t: t): unit => {
  switch (t.workQueue^, t.free^) {
  | ([command, ...remainingCommands], [worker, ...remainingWorkers]) =>
    Worker.send(worker, command);
    t.workQueue := remainingCommands;
    t.free := remainingWorkers;
    schedule(t);
  | (_, _) => ()
  };
};

let _processWorkerResult =
    (
      t: t,
      worker: Worker.t,
      sink: Rendering.Chunk.t => unit,
      message: WorkerEvent.t,
    ) => {
  let event: RenderWorkerEvent.Result.t = WorkerEvent.decode(message);
  switch (event) {
  | Result(rendering) => sink(rendering)
  | Pull =>
    t.free := [worker, ...t.free^];
    schedule(t);
  };
};

// TODO: become ref(t) or object type?
let make = (sink: Rendering.Chunk.t => unit): t => {
  let workQueue: ref(list(RenderWorkerEvent.Command.t)) = ref([]);
  let workers: ref(list(Worker.t)) = ref([]);
  let free: ref(list(Worker.t)) = ref([]);
  let t = {workQueue, workers, free};

  for (i in 0 to 9) {
    let worker =
      Worker.create(
        ~scriptUri="worker.js?id=" ++ string_of_int(Random.int(10000)),
      );
    Worker.send(worker, RenderWorkerEvent.Command.Init(i));
    Worker.receive(worker, _processWorkerResult(t, worker, sink));
    workers := [worker, ...workers^];
  };

  t;
};

let rec _dispatch =
        (workers: list(Worker.t), command: RenderWorkerEvent.Command.t) => {
  switch (workers) {
  | [head, ...tail] =>
    Worker.send(head, command);
    _dispatch(tail, command);
  | [] => ()
  };
};

let clearAndDispatchAll = (t: t, command: RenderWorkerEvent.Command.t) => {
  t.workQueue := [];
  _dispatch(t.workers^, command);
};

let map = (t: t, commands: list(RenderWorkerEvent.Command.t)) => {
  clearAndDispatchAll(t, RenderWorkerEvent.Command.Cancel);
  t.workQueue := commands;

  schedule(t);
};