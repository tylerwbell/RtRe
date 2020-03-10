open Vec3f;

type t = {
  origin: Vec3f.t,
  basis: Vec3f.t,
  dx: Vec3f.t,
  dy: Vec3f.t,
};

let rayThrough = (t: t, point: Vec2f.t): Ray.t => {
  origin: t.origin,
  direction: t.basis->add(t.dx->mult(point.x))->add(t.dy->mult(point.y)),
};