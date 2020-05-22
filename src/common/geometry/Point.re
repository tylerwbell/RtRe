type t('a) = {
  x: 'a,
  y: 'a,
};

let zero = {x: 0, y: 0};

let toString = (t: t(int)): string => {
  "{" ++ string_of_int(t.x) ++ ", " ++ string_of_int(t.y) ++ "}";
};