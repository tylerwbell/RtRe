open Vec3f;

type t = {
  origin: ref(Vec3f.t),
  basis: ref(Vec3f.t),
  dx: Vec3f.t,
  dy: Vec3f.t,
};

let rayThrough = (t: t, point: Vec2f.t): Ray.t => {
  origin: t.origin^,
  direction:
    (t.basis^)
    ->add(t.dx->multScalar(point.x))
    ->add(t.dy->multScalar(point.y)),
};