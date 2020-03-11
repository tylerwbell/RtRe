type t =
  | Diffuse(Diffuse.t)
  | Specular(Specular.t)
  | Dielectric(Dielectric.t);

let scatter = (t: t, ray: Ray.t, hit: HitGeometry.t): option(ScatteredRay.t) =>
  switch (t) {
  | Diffuse(t) => Some(Diffuse.scatter(t, ray, hit))
  | Specular(t) => Specular.scatter(t, ray, hit)
  | Dielectric(t) => Dielectric.scatter(t, ray, hit)
  };