type t =
  | Lambertian(Lambertian.t)
  | Metal(Metal.t)
  | Dielectric(Dielectric.t);

let scatter = (t: t, ray: Ray.t, hit: HitGeometry.t): option(ScatteredRay.t) =>
  switch (t) {
  | Lambertian(t) => Some(Lambertian.scatter(t, ray, hit))
  | Metal(t) => Metal.scatter(t, ray, hit)
  | Dielectric(t) => Dielectric.scatter(t, ray, hit)
  };