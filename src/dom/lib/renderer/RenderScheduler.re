// TODO: work id
type t = {
  workQueue: Queue.t(RenderWorkerEvent.Command.t),
  workers: ref(list(Worker.t)),
  freeWorkers: Queue.t(Worker.t),
};

type config = {workerCount: int};

let log = (message: string) => {
  Js.log({j|scheduler: $message|j});
};

let rec schedule = (t: t): unit =>
  if (!Queue.is_empty(t.workQueue) && !Queue.is_empty(t.freeWorkers)) {
    let item = Queue.take(t.workQueue);
    let worker = Queue.take(t.freeWorkers);

    Worker.send(worker, item);
    schedule(t);
  };

let _processWorkerResult =
    (
      t: t,
      worker: Worker.t,
      sink: RenderSlice.t => unit,
      message: WorkerEvent.t,
    ) => {
  let event: RenderWorkerEvent.Output.t = WorkerEvent.decode(message);
  switch (event) {
  | Rendering(slice) => sink(slice)
  | Pull =>
    Queue.push(worker, t.freeWorkers);
    schedule(t);
  };
};

// TODO: become ref(t) or object type?
let make = (sink: RenderSlice.t => unit): t => {
  let workQueue: Queue.t(RenderWorkerEvent.Command.t) = Queue.create();
  let workers: ref(list(Worker.t)) = ref([]);
  let freeWorkers: Queue.t(Worker.t) = Queue.create();
  let t = {workQueue, workers, freeWorkers};

  let workerCount = 2;

  for (i in 0 to workerCount - 1) {
    let worker =
      Worker.create(
        ~scriptUri="worker.js?id=" ++ string_of_int(Random.int(10000)),
      );
    Worker.receive(worker, _processWorkerResult(t, worker, sink));
    Worker.send(worker, RenderWorkerEvent.Command.Init(i));
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

let rec _addAllCommands = (t: t, commands: list(RenderWorkerEvent.Command.t)) => {
  switch (commands) {
  | [head, ...tail] =>
    Queue.push(head, t.workQueue);
    _addAllCommands(t, tail);
  | [] => ()
  };
};

let clearAndDispatchAll = (t: t, command: RenderWorkerEvent.Command.t) => {
  Queue.clear(t.workQueue);
  _dispatch(t.workers^, command);
};

let map = (t: t, commands: list(RenderWorkerEvent.Command.t)) => {
  clearAndDispatchAll(t, RenderWorkerEvent.Command.Cancel);
  _addAllCommands(t, commands);
  schedule(t);
};