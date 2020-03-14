WorkerContext.trapOnWindow();

let oneshot = ref(true);
WorkerContext.receive(event => {
  let data = WorkerEvent.decode(event);
  Js.log({j|worker: received: $data|j});
  if (oneshot^) {
    oneshot := false;
    WorkerContext.send("inner test");
  };
});

WorkerContext.send("outer test");