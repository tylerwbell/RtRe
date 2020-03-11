open Vec3f;

// TODO: is there a better name for this? specular?

type t = {albedo: Vec3f.t};

let reflect = (v: Vec3f.t, n: Vec3f.t): Vec3f.t =>
  v->sub(n->multScalar(2.0 *. Vec3f.dot(v, n)));

let scatter = (t: t, ray: Ray.t, hit: HitGeometry.t): option(ScatteredRay.t) => {
  let reflected = reflect(Vec3f.normalized(ray.direction), hit.normal);
  let scattered: Ray.t = {origin: hit.position, direction: reflected};

  if (Vec3f.dot(reflected, hit.normal) > 0.0) {
    Some({ray: scattered, attenuation: t.albedo});
  } else {
    None;
  };
};