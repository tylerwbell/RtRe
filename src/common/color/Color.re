type t = Vec3f.t;

let fromRgb = (r, g, b): t => {x: r, y: g, z: b};

let toDomRgbaString = (t: t) => {
  let r' = 255.0 *. t.x;
  let g' = 255.0 *. t.y;
  let b' = 255.0 *. t.z;

  {j|rgba($r', $g', $b')|j};
};

let red = fromRgb(1.0, 0.0, 0.0);
let green = fromRgb(0.0, 1.0, 0.0);
let blue = fromRgb(0.0, 0.0, 1.0);

let white = fromRgb(1.0, 1.0, 1.0);
let black = fromRgb(0.0, 0.0, 0.0);