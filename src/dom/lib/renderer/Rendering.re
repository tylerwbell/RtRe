open Vec3f;

type t = {
  buffer: array(Color.t),
  width: int,
  height: int,
};

let blend = (a: array(Color.t), b: array(Color.t), weight: float) => {
  let weight' = weight -. 1.0;
  for (i in 0 to Array.length(a) - 1) {
    a[i] = a[i]->multScalar(weight')->add(b[i])->divScalar(weight);
  };
};