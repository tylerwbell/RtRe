// TODO: is there a better way to do this?

type t =
  | LinearGradient(LinearGradient.t)
  | CheckerTexture(CheckerTexture.t);

let colorAt = (t: t, point: Vec2f.t) => {
  switch (t) {
  | LinearGradient(t) => LinearGradient.colorAt(t, point)
  | CheckerTexture(t) => CheckerTexture.colorAt(t, point)
  };
};