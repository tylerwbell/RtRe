// Entry point
open Canvas.Context2d;
open Camera;

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

let canvas = Canvas.create();
document##body##appendChild(canvas);

let origin: Vec3f.t = {x: 0.0, y: 0.0, z: 0.5};
let basis: Vec3f.t = {x: (-0.5), y: 0.5, z: (-0.3)};

let camera: Camera.t = {
  origin: ref(origin),
  basis: ref(basis),
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
  background: sky, // CheckerTexture(CheckerTexture.standard),
  bodies: [
    Sphere({
      center: {
        x: (-0.5),
        y: 0.0,
        z: (-1.0),
      },
      radius: 0.5,
      material: Diffuse({albedo: Color.fromRgb(0.8, 0.4, 0.4)}),
    }),
    Sphere({
      center: {
        x: (-0.0),
        y: 0.1,
        z: (-0.3),
      },
      radius: 0.4,
      material:
        Dielectric({
          refractiveIndex: 1.5,
          attenuation: Color.fromRgb(0.9, 1.0, 1.0),
        }),
    }),
    Sphere({
      center: {
        x: 0.5,
        y: 0.0,
        z: (-1.0),
      },
      radius: 0.5,
      material: Specular({albedo: Color.fromRgb(0.8, 0.6, 0.2)}),
    }),
    Sphere({
      center: {
        x: 0.0,
        y: (-100.5),
        z: (-1.0),
      },
      radius: 100.0,
      material: Specular({albedo: Color.fromRgb(0.8, 0.8, 0.6)}),
    }),
  ],
};

let render = (): unit => {
  Renderer.render(
    {width: 500, height: 500, dpr: 2.0, samples: 40, blur: 0.0, depth: 20},
    camera,
    scene,
    canvas,
  );
};

// TODO: keyboard controller
let d = 0.01;
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

let prevX = ref(-1);
let prevY = ref(-1);

// Dom.addMouseMoveEventListener((x, y) => {
//   let dx = prevX^ - x;
//   let dy = prevY^ - y;
//   prevX := x;
//   prevY := y;

//   Js.log({j|$dx, $dy|j});

//   camera.basis :=
//     Vec3f.add(
//       Vec3f.add(
//         camera.basis^,
//         Vec3f.multScalar({x: 0.000001, y: 0.000, z: 0.0}, float(dx)),
//       ),
//       Vec3f.add(
//         camera.basis^,
//         Vec3f.multScalar({x: 0.000, y: 0.00001, z: 0.0}, float(dy)),
//       ),
//     );

//   render();
// });

render();