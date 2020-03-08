module type Texture = {
  type t;
  let colorAt: (t, Vec2f.t) => Color.t;
};