type itemId = int;
type item = {
  id: itemId,
  _animationId: Raf.animationId,
};

type t = {
  items: ref(list(item)),
  _currentId: ref(itemId),
};

let make = (): t => {items: ref([]), _currentId: ref(0)};

let enqueue = (t: t, item: unit => unit): itemId => {
  let animationId = Raf.requestAnimationFrame(_ => {item()});
  let itemId = t._currentId^;
  let item = {id: itemId, _animationId: animationId};

  t._currentId := itemId + 1;
  t.items := [item, ...t.items^];

  itemId;
};

let rec cancelBefore = (items: list(item), itemId: itemId): list(item) => {
  switch (items) {
  | [] => []
  | [head, ...tail] =>
    let tailFiltered = cancelBefore(tail, itemId);
    if (head.id >= itemId) {
      [head, ...tailFiltered];
    } else {
      Raf.cancelAnimationFrame(head._animationId);
      tailFiltered;
    };
  };
};

let cancelBefore = (t: t, itemId: itemId) => {
  t.items := cancelBefore(t.items^, itemId);
};