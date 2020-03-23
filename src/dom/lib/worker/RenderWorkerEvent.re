module RenderCommand = {
  type t = {
    camera: Camera.t,
    slice: Rendering.Chunk.slice,
  };
};

module Command = {
  type t =
    | SetScene(Scene.t)
    | Render(RenderCommand.t)
    | Cancel;
};

module Result = {
  type t =
    | Result(Rendering.Chunk.t);
};