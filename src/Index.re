// Entry point
open Canvas.Context2d;
open Camera;

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

let canvas = Canvas.create();
document##body##appendChild(canvas);

let origin: Vec3f.t = {x: 0.0, y: 0.0, z: 0.5};

let camera: Camera.t = {
  origin: ref(origin),
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
  background: CheckerTexture(CheckerTexture.standard),
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
        x: (-0.0),
        y: 0.1,
        z: (-0.3),
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

let render = (): unit => {
  Renderer.render(
    {width: 200, height: 200, dpr: 3.0, samples: 3, blur: 1.0, depth: 20},
    camera,
    scene,
    canvas,
  );
};

let d = 0.1;
Dom.addKeyDownEventListener(keycode => {
  switch (keycode) {
  | 87 =>
    // w
    camera.origin := Vec3f.add(camera.origin^, {x: 0.0, y: d, z: 0.0})
  | 65 =>
    // a
    camera.origin :=
      Vec3f.add(camera.origin^, {x: (-1.0) *. d, y: 0.0, z: 0.0})
  | 83 =>
    // s
    camera.origin :=
      Vec3f.add(camera.origin^, {x: 0.0, y: (-1.0) *. d, z: 0.0})
  | 68 =>
    // d
    camera.origin := Vec3f.add(camera.origin^, {x: d, y: 0.0, z: 0.0})
  };

  render();
});

render();