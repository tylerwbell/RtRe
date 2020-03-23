open Vec3f;

module Chunk = {
  type point = {
    color: Color.t,
    samples: int,
  };

  type slice = {
    x: int,
    y: int,
    width: int,
    height: int,
  };

  type t = {
    slice,
    buffer: array(point),
  };
};

let blend = (a: array(Color.t), b: array(Color.t), weight: float) => {
  let weight' = weight -. 1.0;
  for (i in 0 to Array.length(a) - 1) {
    a[i] = a[i]->multScalar(weight')->add(b[i])->divScalar(weight);
  };
};