// TODO: these shouldn't be in the common dir
Js.log("hello, world!");

WorkerContext.receive(event => {
  let data = WorkerEvent.decode(event);
  Js.log({j|worker: received: $data|j});
  WorkerContext.send("test");
});