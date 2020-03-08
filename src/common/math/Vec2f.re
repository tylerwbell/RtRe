type t = {
  x: float,
  y: float,
};

let mult = (v: t, scalar: float) => {x: scalar *. v.x, y: scalar *. v.y};
let div = (v: t, scalar: float) => mult(v, 1.0 /. scalar);

let add = (a: t, b: t) => {x: a.x +. b.x, y: a.y +. b.y};
let sub = (a: t, b: t) => {x: a.x -. b.x, y: a.y -. b.y};

let dot = (a: t, b: t) => a.x *. a.x +. a.y *. b.y;

let length = (v: t) => sqrt(v.x *. v.x +. v.y *. v.y);
let normalized = (v: t) => div(v, length(v));