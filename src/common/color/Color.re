type t = {
  r: float,
  g: float,
  b: float,
  a: float,
};

let fromRgb = (r, g, b) => {r, g, b, a: 1.0};
let fromRgba = (r, g, b, a) => {r, g, b, a};
let toRgbaString = ({r, g, b, a}: t) => {
  let r' = int_of_float(max(0.0, min(255.0, 255.0 *. r)));
  let g' = int_of_float(max(0.0, min(255.0, 255.0 *. g)));
  let b' = int_of_float(max(0.0, min(255.0, 255.0 *. b)));

  {j|rgba($r', $g', $b', $a)|j};
};