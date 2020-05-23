module type RandomAccessIntCollection = {
  type t;

  let make: (int, int) => t;

  let get: (t, int) => int;
  let set: (t, int, int) => unit;
  let fill: (t, int) => unit;
};