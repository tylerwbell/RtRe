type record = {
  rows: int,
  columns: int,
  onColor: Color.t,
  offColor: Color.t,
};

let standard = {
  rows: 10,
  columns: 10,
  onColor: Color.fromRgb(0.2, 0.3, 0.1),
  offColor: Color.fromRgb(0.9, 0.9, 0.9),
};

module Texture: Texture.Texture with type t = record = {
  type t = record;

  let colorAt = (t, p: Vec2f.t): Color.t =>
    floor(mod_float(p.x *. float(t.rows), 2.0))
    == floor(mod_float(p.y *. float(t.columns), 2.0))
      ? t.onColor : t.offColor;
};