open Vec3f;
open Ray;

let rec trace = (bodies: list(Sphere.t), ray: Ray.t): option(Hit.t) => {
  switch (bodies) {
  | [body, ...rest] =>
    switch (Sphere.intersect(body, ray), trace(rest, ray)) {
    | (Some(hitA), Some(hitB)) => Some(Hit.nearest(hitA, hitB))
    | (Some(hit), None) => Some(hit)
    | (None, Some(hit)) => Some(hit)
    | _ => None
    }
  | [] => None
  };
};

let trace = (scene: Scene.t, ray: Ray.t): option(Color.t) => {
  switch (trace(scene.bodies, ray)) {
  | Some(hit) => Some(hit.normal)
  | None => None
  };
};