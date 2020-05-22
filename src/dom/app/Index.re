// Entry point
open Camera;

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

let canvas = Canvas.create();
document##body##appendChild(canvas);

let camera: ref(Camera.t) =
  ref({
    position: {
      x: 1.0,
      y: 3.0,
      z: 5.0,
    },
    direction: {
      x: 0.0,
      y: (-1.0),
      z: (-1.0),
    },
    fov: 120.,
    aspect: 1.0,
  });

let scene = DefaultScene.make();
let renderer = ref(Renderer.make(canvas));
renderer := Renderer.setScene(renderer^, scene);

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
  | _ => ()
  };

  renderer := Renderer.setCamera(renderer^, camera^);
  ();
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
    renderer := Renderer.setCamera(renderer^, camera^);
  };
});

renderer := Renderer.setCamera(renderer^, camera^);