open Vec2f;

type record = {
  a: Vec2f.t,
  b: Vec2f.t,
  aColor: Color.t,
  bColor: Color.t,
};

module Texture: Texture.Texture with type t = record = {
  type t = record;

  let colorAt = (t, p: Vec2f.t): Color.t => {
    let direction = t.b->sub(t.a);
    let length = Vec2f.length(direction);
    let normalized = direction->div(length);
    let r = normalized->dot(p);
    let r' = 1.0 -. r;

    Color.fromRgb(
      r' *. t.aColor.r +. r *. t.bColor.r,
      r' *. t.aColor.g +. r *. t.bColor.g,
      r' *. t.aColor.b +. r *. t.bColor.b,
    );
  };
};