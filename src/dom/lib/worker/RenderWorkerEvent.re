module RenderCommand = {
  type t = {
    camera: Camera.t,
    frame: Rect.t(int),
  };
};

module Command = {
  type t =
    | Init(int)
    | SetScene(Scene.t)
    | Render(RenderCommand.t)
    | Cancel;
};

module Output = {
  type t =
    | Rendering(RenderSlice.t)
    | Pull;
};