open Vec3f;

type t = {
  origin: Vec3f.t,
  direction: Vec3f.t,
};

let pointAtParameter = (r: t, t: float) =>
  r.origin->add(r.direction->mult(t));