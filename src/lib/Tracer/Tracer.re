open Vec3f;
open Ray;

let rec _trace = (bodies: list(Shape.t), ray: Ray.t): option(Hit.t) => {
  switch (bodies) {
  | [body, ...rest] =>
    switch (Shape.intersect(body, ray), _trace(rest, ray)) {
    | (Some(hitA), Some(hitB)) =>
      Some(Hit.nearest({geometry: hitA, body}, hitB))
    | (Some(hit), None) => Some({geometry: hit, body})
    | (None, Some(hit)) => Some(hit)
    | _ => None
    }
  | [] => None
  };
};

let rec trace = (scene: Scene.t, ray: Ray.t, traceDepth: int): Color.t =>
  if (traceDepth == 0) {
    Color.black;
  } else {
    switch (_trace(scene.bodies, ray)) {
    | Some(hit) =>
      let scattered =
        Material.scatter(Shape.material(hit.body), ray, hit.geometry);

      switch (scattered) {
      | Some(scattered) =>
        trace(scene, scattered.ray, traceDepth - 1)
        ->mult(scattered.attenuation)
      | None => Color.black // TODO: background?
      };
    | None =>
      let unit = Vec3f.normalized(ray.direction);
      Texture.colorAt(scene.background, {x: unit.x, y: unit.y});
    };
  };