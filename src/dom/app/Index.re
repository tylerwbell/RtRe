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
      y: 1.0,
      z: 10.0,
    },
    direction: {
      x: 0.0,
      y: (-0.1),
      z: (-1.0),
    },
    fov: 80.0,
    aspect: 2.0,
  });

let scene = DefaultScene.make();
let render = (): unit => {
  Renderer.render(
    {width: 750, height: 750, dpr: 1.0, samples: 40, blur: 0.0, depth: 20},
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

Dom.addMouseDownEventListener(() => {mousedown := true});
Dom.addMouseUpEventListener(() => {mousedown := false});
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