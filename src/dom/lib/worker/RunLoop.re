type t = {
  running: ref(bool),
  queue: Queue.t(t => unit),
  onExhausted: t => unit,
};

let _postAsync = (t: t, item: t => unit): unit => {
  //   let _ = Dom.setTimeout(0, () => {item(t)});
  //   ();
  item(t);
};

let rec _loop = (t: t): unit =>
  if (Queue.is_empty(t.queue)) {
    t.running := false;
    t.onExhausted(t);
  } else {
    let unit = Queue.take(t.queue);
    unit(t);
    _postAsync(t, _loop);
  };

let make = (onExhausted: t => unit): t => {
  {running: ref(false), queue: Queue.create(), onExhausted};
};

let dispatch = (t: t, item: t => unit) => {
  Queue.push(item, t.queue);

  if (! t.running^) {
    t.running := true;
    _postAsync(t, _loop);
  };
};

let clear = (t: t) => {
  Queue.clear(t.queue);
};