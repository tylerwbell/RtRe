type t = {
  rows: int,
  columns: int,
  onColor: Color.t,
  offColor: Color.t,
};

let standard = {
  rows: 10,
  columns: 15,
  onColor: Color.fromRgb(0.2, 0.3, 0.1),
  offColor: Color.fromRgb(0.9, 0.9, 0.9),
};

let colorAt = (t, p: Vec2f.t): Color.t =>
  floor(mod_float(p.y *. float(t.rows), 2.0))
  == floor(mod_float(p.x *. float(t.columns), 2.0))
    ? t.onColor : t.offColor;