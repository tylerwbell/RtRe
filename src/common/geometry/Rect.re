type t('a) = {
  origin: Point.t('a),
  size: Size.t('a),
};

let zero = {origin: Point.zero, size: Size.zero};

let width = (t: t(int)): int => {
  t.size.width;
};

let height = (t: t(int)): int => {
  t.size.width;
};

let minX = (t: t(int)): int => {
  t.origin.x;
};

let minY = (t: t(int)): int => {
  t.origin.y;
};

let maxX = (t: t(int)): int => {
  t.origin.x + t.size.width;
};

let maxY = (t: t(int)): int => {
  t.origin.x + t.size.height;
};

let toString = (t: t(int)): string => {
  "[origin: "
  ++ Point.toString(t.origin)
  ++ ", size: "
  ++ Size.toString(t.size)
  ++ "]";
};