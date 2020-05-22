type t = {
  width: int,
  height: int,
  samples: int,
  blur: float,
  depth: int,
};

let default = (): t => {
  {width: 100, height: 100, samples: 40, blur: 0.0, depth: 10};
};