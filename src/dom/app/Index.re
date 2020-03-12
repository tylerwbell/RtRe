// Entry point
open Canvas.Context2d;
open Camera;

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

let canvas = Canvas.create();
document##body##appendChild(canvas);

let camera: ref(Camera.t) =
  ref({
    position: {
      x: 0.0,
      y: 0.0,
      z: 5.0,
    },
    direction: {
      x: 0.0,
      y: 0.0,
      z: (-1.0),
    },
    fov: 40.0,
    aspect: 2.0,
  });

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
      radius: 0.2,
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
      material: Diffuse({albedo: Color.fromRgb(0.5, 0.9, 0.2)}),
    }),
  ],
};

let render = (): unit => {
  Renderer.render(
    {width: 500, height: 500, dpr: 2.0, samples: 40, blur: 0.0, depth: 20},
    camera^,
    scene,
    canvas,
  );
};

// TODO: keyboard controller
let d = 5.0;
Dom.addKeyDownEventListener(keycode => {
  switch (keycode) {
  | 87 =>
    // w
    camera := Camera.moveAlongDirection(camera^, d)
  | 65 =>
    // a
    camera := Camera.move(camera^, {x: (-1.0) *. d, y: 0.0, z: 0.0})
  | 83 =>
    // s
    camera := Camera.moveAlongDirection(camera^, (-1.0) *. d)
  | 68 =>
    // d
    camera := Camera.move(camera^, {x: d, y: 0.0, z: 0.0})
  };

  render();
});

let prevX = ref(-1);
let prevY = ref(-1);
let mousedown = ref(false);

Dom.addMouseDownEventListener(() => {
  Js.log("down");
  mousedown := true;
});

Dom.addMouseUpEventListener(() => {
  Js.log("up");
  mousedown := false;
});

Dom.addMouseMoveEventListener((x, y) => {
  let dx = prevX^ - x;
  let dy = prevY^ - y;
  prevX := x;
  prevY := y;

  if (mousedown^) {
    camera :=
      Camera.tilt(
        camera^,
        {x: 0.001 *. float(dx), y: (-0.001) *. float(dy)},
      );
    render();
  };
});

render();