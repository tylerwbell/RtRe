type t = {
  width: int,
  height: int,
  samples: int,
  blur: float,
  depth: int,
  chunkDivisions: int,
  workers: int,
};

let default = (): t => {
  {
    width: 1000,
    height: 1000,
    samples: 40,
    blur: 0.0,
    depth: 20,
    chunkDivisions: 20,
    workers: 6,
  };
};