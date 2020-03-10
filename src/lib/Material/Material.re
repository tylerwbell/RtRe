type t =
  | Lambertian(Lambertian.t)
  | Metal(Metal.t);

let scatter = (t: t, ray: Ray.t, hit: HitGeometry.t): option(ScatteredRay.t) =>
  switch (t) {
  | Lambertian(t) => Some(Lambertian.scatter(t, ray, hit))
  | Metal(t) => Metal.scatter(t, ray, hit)
  };