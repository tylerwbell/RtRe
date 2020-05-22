open Vec3f;

type t = {
  position: Vec3f.t,
  direction: Vec3f.t,
  fov: float,
  aspect: float,
};

let pi = 3.141592653589793;
let right = {x: 1.0, y: 0.0, z: 0.0};
let up = {x: 0.0, y: 1.0, z: 0.0};

let moveAlongDirection = (t: t, by: float): t => {
  {
    position: t.position->add(t.direction->multScalar(by)),
    direction: t.direction,
    fov: t.fov,
    aspect: t.aspect,
  };
};

let move = (t: t, by: Vec3f.t): t => {
  {
    position: t.position->add(by),
    direction: t.direction,
    fov: t.fov,
    aspect: t.aspect,
  };
};

let tilt = (t: t, by: Vec2f.t): t => {
  {
    position: t.position,
    direction:
      t.direction->add(right->multScalar(by.x))->add(up->multScalar(by.y)),
    fov: t.fov,
    aspect: t.aspect,
  };
};

// TODO: docs
let rayThrough = (t: t, point: Vec2f.t): Ray.t => {
  // TODO: very suspicious of this
  let theta = t.fov *. pi /. 180.0;
  let viewportOrigin =
    t.direction
    ->sub(right->multScalar(theta /. 2.0))
    ->add(up->multScalar(theta /. 2.0));

  {
    origin: t.position,
    direction:
      viewportOrigin
      ->add(right->multScalar(theta *. point.x))
      ->sub(up->multScalar(theta *. point.y)),
  };
};