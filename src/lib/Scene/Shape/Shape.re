type t =
  | Sphere(Sphere.t);

let material = (shape: t): Material.t => {
  switch (shape) {
  | Sphere(sphere) => sphere.material
  };
};

let intersect =
    (shape: t, ~tMin: float=0.0, ~tMax: float=max_float, ray: Ray.t)
    : option(HitGeometry.t) =>
  switch (shape) {
  | Sphere(sphere) => Sphere.intersect(sphere, ~tMin, ~tMax, ray)
  };