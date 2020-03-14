module Command = {
  type t =
    | Render(Scene.t, Camera.t, int, int);
};

module Result = {
  type t =
    | Result(Rendering.t);
};