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
    let r = normalized->dot(p) /. length;
    let r' = 1.0 -. r;

    {
      r: r' *. t.aColor.r +. r *. t.bColor.r,
      g: r' *. t.aColor.g +. r *. t.bColor.g,
      b: r' *. t.aColor.b +. r *. t.bColor.b,
      a: 1.0,
    };
  };
};