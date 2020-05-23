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
    width: 300,
    height: 300,
    samples: 40,
    blur: 0.0,
    depth: 10,
    chunkDivisions: 10,
    workers: 4,
  };
};