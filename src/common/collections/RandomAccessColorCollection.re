module type RandomAccessColorCollection = {
  type t;

  let make: (int, Color.t) => t;

  let length: t => int;

  let get: (t, int) => Color.t;
  let set: (t, int, Color.t) => unit;
  let fill: (t, Color.t) => unit;
};