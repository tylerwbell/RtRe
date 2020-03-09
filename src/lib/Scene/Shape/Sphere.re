open Vec3f;
open Ray;

type t = {
  center: Vec3f.t,
  radius: float,
  color: Color.t,
};

let hit =
    (
      record: t,
      ~tMin: float=0.0,
      ~tMax: float=max_float,
      ray: Ray.t,
      t: float,
    )
    : option(Hit.t) =>
  if (t > tMin && t < tMax) {
    let position = ray->pointAtParameter(t);
    let normal = position->sub(record.center)->div(record.radius);
    Some({t, position, normal});
  } else {
    None;
  };

let intersect =
    (t: t, ~tMin: float=0.0, ~tMax: float=max_float, ray: Ray.t)
    : option(Hit.t) => {
  let oc = Vec3f.sub(ray.origin, t.center);
  let a = Vec3f.dot(ray.direction, ray.direction);
  let b = oc->dot(ray.direction);
  let c = oc->dot(oc) -. t.radius *. t.radius;
  let discriminant = b *. b -. a *. c;

  if (discriminant > 0.0) {
    let root = sqrt(discriminant);

    let t' = ((-1.0) *. b -. root) /. a;
    switch (hit(t, ray, t')) {
    | Some(hit) => Some(hit)
    | None =>
      let t' = ((-1.0) *. b +. root) /. a;
      hit(t, ray, t');
    };
  } else {
    None;
  };
};