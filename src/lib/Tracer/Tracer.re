open Vec3f;
open Ray;

let trace = (scene: Scene.t, ray: Ray.t): option(Color.t) => {
  let sphere: Sphere.t = {
    center: {
      x: 0.0,
      y: 0.0,
      z: (-1.0),
    },
    radius: 0.5,
    color: Color.fromRgb(1.0, 0.0, 0.0),
  };

  switch (Sphere.intersect(sphere, ray)) {
  | Some(hit) =>
    let vec = hit.normal->addScalar(1.0)->mult(0.5);
    Some(Color.fromRgb(vec.x, vec.y, vec.z));
  | None => None
  };
};