type t =
  | GammaFilter;

let apply = (t: t, color: Color.t): Color.t => {
  switch (t) {
  | GammaFilter => GammaFilter.apply(color)
  };
};