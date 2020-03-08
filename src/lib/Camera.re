type t = {origin: Vec3f.t};

let rayThrough = (camera: t, x: float, y: float): Ray.t => {
  {
    origin: camera.origin,
    direction: {
      x,
      y,
      z: 0.0,
    },
  };
};