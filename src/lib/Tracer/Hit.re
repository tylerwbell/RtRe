type t = {
  geometry: HitGeometry.t,
  body: Shape.t,
};

let nearest = (a: t, b: t) => a.geometry.t < b.geometry.t ? a : b;