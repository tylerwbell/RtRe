type t = {
  x: float,
  y: float,
  z: float,
};

let mult = (v: t, scalar: float) => {
  x: scalar *. v.x,
  y: scalar *. v.y,
  z: scalar *. v.z,
};
let div = (v: t, scalar: float) => mult(v, 1.0 /. scalar);

let add = (a: t, b: t) => {x: a.x +. b.x, y: a.y +. b.y, z: a.z +. b.z};
let sub = (a: t, b: t) => {x: a.x -. b.x, y: a.y -. b.y, z: a.z -. b.z};

let dot = (a: t, b: t) => a.x *. a.y +. a.y *. b.y +. a.z *. b.z;
let cross = (a: t, b: t) => {
  x: a.y *. b.z -. a.z *. b.y,
  y: (-1.0) *. (a.x *. b.z -. a.z *. b.x),
  z: a.x *. b.y -. a.y *. b.x,
};

let length = (v: t) => sqrt(v.x *. v.x +. v.y *. v.y +. v.z *. v.z);
let normalized = (v: t) => div(v, length(v));