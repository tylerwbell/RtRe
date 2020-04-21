open Vec3f;

type t = {
  viewportSize: Size.t,
  frame: Rect.t,
  buffer: array(Color.t),
};