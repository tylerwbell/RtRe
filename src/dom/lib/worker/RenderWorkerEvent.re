module Command = {
  type t =
    | LoadScene(Scene.t)
    | Render
    | Cancel;
};

module Result = {
  type t =
    | Result
    | Cancelled;
};