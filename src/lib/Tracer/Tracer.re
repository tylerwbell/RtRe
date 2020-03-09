open Vec3f;

let hitSphere =
    (center: Vec3f.t, radius: float, ray: Ray.t, color: Color.t)
    : option(Color.t) => {
  let oc = ray.origin->sub(center);
  let a = ray.direction->dot(ray.direction);
  let b = 2.0 *. oc->dot(ray.direction);
  let c = oc->dot(oc) -. radius *. radius;
  let discriminant = b *. b -. 4.0 *. a *. c;

  switch (discriminant) {
  | d when d > 0.0 => Some(color)
  | _ => None
  };
};

let trace = (scene: Scene.t, ray: Ray.t): option(Color.t) => {
  let a =
    hitSphere(
      {x: 0.0, y: 0.0, z: 1.0},
      0.5,
      ray,
      Color.fromRgb(1.0, 0.0, 0.0),
    );

  let b =
    hitSphere(
      {x: 0.0, y: (-55.0), z: 35.0},
      50.0,
      ray,
      Color.fromRgb(1.0, 1.0, 0.0),
    );

  switch (a) {
  | Some(c) => Some(c)
  | None => b
  };
};