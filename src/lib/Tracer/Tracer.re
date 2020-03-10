open Vec3f;
open Ray;

let rec _trace = (bodies: list(Sphere.t), ray: Ray.t): option(Hit.t) => {
  switch (bodies) {
  | [body, ...rest] =>
    switch (Sphere.intersect(body, ray), _trace(rest, ray)) {
    | (Some(hitA), Some(hitB)) => Some(Hit.nearest(hitA, hitB))
    | (Some(hit), None) => Some(hit)
    | (None, Some(hit)) => Some(hit)
    | _ => None
    }
  | [] => None
  };
};

let rec _randomInUnitSphere = (): Vec3f.t => {
  let p =
    Vec3f.mult(
      {x: Random.float(1.0), y: Random.float(1.0), z: Random.float(1.0)},
      2.0,
    )
    ->sub({x: 1.0, y: 1.0, z: 1.0});

  Vec3f.lengthSquared(p) >= 1.0 ? _randomInUnitSphere() : p;
};

let rec trace = (scene: Scene.t, ray: Ray.t): Color.t => {
  switch (_trace(scene.bodies, ray)) {
  | Some(hit) =>
    let bounce =
      hit.position
      ->add(hit.normal)
      ->add(_randomInUnitSphere())
      ->sub(hit.position);
    trace(scene, {origin: hit.position, direction: bounce})->mult(0.5);
  | None =>
    let unit = Vec3f.normalized(ray.direction);
    Texture.colorAt(scene.background, {x: unit.x, y: unit.y});
  };
};