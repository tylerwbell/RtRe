type t = {
  t: float,
  position: Vec3f.t,
  normal: Vec3f.t,
};

let nearest = (a: t, b: t) => a.t < b.t ? a : b;