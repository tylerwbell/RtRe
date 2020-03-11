open Vec3f;

type t = {albedo: Vec3f.t};

let rec _randomInUnitSphere = (): Vec3f.t => {
  let p =
    Vec3f.multScalar(
      {x: Random.float(1.0), y: Random.float(1.0), z: Random.float(1.0)},
      2.0,
    )
    ->sub({x: 1.0, y: 1.0, z: 1.0});

  Vec3f.lengthSquared(p) >= 1.0 ? _randomInUnitSphere() : p;
};

// TODO: rename to diffuse
// TODO: scatter with probability
let scatter = (t: t, ray: Ray.t, hit: HitGeometry.t): ScatteredRay.t => {
  let target = hit.position->add(hit.normal)->add(_randomInUnitSphere());
  let scattered: Ray.t = {
    origin: hit.position,
    direction: Vec3f.sub(target, hit.position),
  };

  {ray: scattered, attenuation: t.albedo};
};