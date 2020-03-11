// Entry point
open Canvas.Context2d;
open Camera;

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

let canvas = Canvas.create();
document##body##appendChild(canvas);

let camera: Camera.t = {
  origin: {
    x: 0.0,
    y: 0.0,
    z: 0.5,
  },
  basis: {
    x: (-0.5),
    y: 0.5,
    z: (-0.3),
  },
  dx: {
    x: 1.0,
    y: 0.0,
    z: 0.0,
  },
  dy: {
    x: 0.0,
    y: (-1.0),
    z: 0.0,
  },
};

let sky: Texture.t =
  LinearGradient({
    a: {
      x: 0.0,
      y: 0.0,
    },
    b: {
      x: 0.0,
      y: 1.0,
    },
    aColor: Color.fromRgb(0.5, 0.5, 0.1),
    bColor: Color.fromRgb(1.0, 0.8, 0.8),
  });

let scene: Scene.t = {
  background: sky,
  bodies: [
    Sphere({
      center: {
        x: (-0.5),
        y: 0.0,
        z: (-1.0),
      },
      radius: 0.5,
      material: Lambertian({albedo: Color.fromRgb(0.8, 0.4, 0.4)}),
    }),
    Sphere({
      center: {
        x: (-0.5),
        y: 0.0,
        z: (-0.4),
      },
      radius: 0.4,
      material: Dielectric({refractiveIndex: 1.5}),
    }),
    Sphere({
      center: {
        x: 0.5,
        y: 0.0,
        z: (-1.0),
      },
      radius: 0.5,
      material: Metal({albedo: Color.fromRgb(0.8, 0.6, 0.2)}),
    }),
    Sphere({
      center: {
        x: 0.0,
        y: (-100.5),
        z: (-1.0),
      },
      radius: 100.0,
      material: Metal({albedo: Color.fromRgb(0.8, 0.8, 0.6)}),
    }),
  ],
};

Renderer.render(
  {width: 600, height: 600, dpr: 1.0, samples: 40, blur: 1.0, depth: 10},
  camera,
  scene,
  canvas,
);