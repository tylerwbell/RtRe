type t = Vec3f.t;

let fromRgb = (r, g, b): t => {x: r, y: g, z: b};
let toDomRgbaString = (t: t) => {
  let r' = int_of_float(max(0.0, min(255.0, 255.0 *. t.x)));
  let g' = int_of_float(max(0.0, min(255.0, 255.0 *. t.y)));
  let b' = int_of_float(max(0.0, min(255.0, 255.0 *. t.z)));

  {j|rgba($r', $g', $b')|j};
};

let red = fromRgb(1.0, 0.0, 0.0);
let green = fromRgb(0.0, 1.0, 0.0);
let blue = fromRgb(0.0, 0.0, 1.0);

let white = fromRgb(1.0, 1.0, 1.0);
let black = fromRgb(0.0, 0.0, 0.0);