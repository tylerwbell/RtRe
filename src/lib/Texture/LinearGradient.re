type t = {
  a: Vec2f.t,
  b: Vec2f.t,
  aColor: Color.t,
  bColor: Color.t,
};

let colorAt = (t, p: Vec2f.t): Color.t => {
  let direction = Vec2f.sub(t.b, t.a);
  let length = Vec2f.length(direction);
  let normalized = Vec2f.div(direction, length);
  let r = Vec2f.dot(normalized, p);

  Vec3f.add(
    Vec3f.multScalar(t.aColor, 1.0 -. r),
    Vec3f.multScalar(t.bColor, r),
  );
};