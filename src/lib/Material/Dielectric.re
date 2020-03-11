open Vec3f;

// TODO: schlick reflectivity

type t = {
  attenuation: Vec3f.t,
  refractiveIndex: float,
};

let refract = (v: Vec3f.t, n: Vec3f.t, niOverNt: float): option(Vec3f.t) => {
  let uv = Vec3f.normalized(v);
  let dt = Vec3f.dot(uv, n);
  let discriminant = 1.0 -. niOverNt *. niOverNt *. (1.0 -. dt *. dt);
  discriminant > 0.0
    ? {
      let refracted =
        uv
        ->sub(n->multScalar(dt))
        ->multScalar(niOverNt)
        ->sub(n->multScalar(sqrt(discriminant)));
      Some(refracted);
    }
    : None;
};

type _properties = {
  outwardNormal: Vec3f.t,
  niOverNt: float,
};

let scatter = (t: t, ray: Ray.t, hit: HitGeometry.t): option(ScatteredRay.t) => {
  let properties: _properties =
    if (Vec3f.dot(ray.direction, hit.normal) > 0.0) {
      {
        outwardNormal: hit.normal->multScalar(-1.0),
        niOverNt: t.refractiveIndex,
      };
    } else {
      {outwardNormal: hit.normal, niOverNt: 1.0 /. t.refractiveIndex};
    };

  let refracted =
    refract(ray.direction, properties.outwardNormal, properties.niOverNt);

  switch (refracted) {
  | Some(v) =>
    let ray: Ray.t = {origin: hit.position, direction: v};
    let scattered: ScatteredRay.t = {ray, attenuation: t.attenuation};
    Some(scattered);
  | None =>
    // TODO: util class, vector?
    let reflected =
      Specular.reflect(Vec3f.normalized(ray.direction), hit.normal);
    let ray: Ray.t = {origin: hit.position, direction: reflected};
    let scattered: ScatteredRay.t = {ray, attenuation: t.attenuation};
    Some(scattered);
  };
};