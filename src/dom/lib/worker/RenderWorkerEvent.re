module RenderCommand = {
  type t = {
    camera: Camera.t,
    slice: Chunk.slice,
  };
};

module Command = {
  type t =
    | Init(int)
    | SetScene(Scene.t)
    | Render(RenderCommand.t)
    | Cancel;
};

// TODO: rename
module Result = {
  type t =
    | Result(Rendering.Chunk.t)
    | Pull;
};