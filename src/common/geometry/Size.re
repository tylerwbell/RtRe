type t('a) = {
  width: 'a,
  height: 'a,
};

let zero = {width: 0, height: 0};

let toString = (t: t(int)): string => {
  "{" ++ string_of_int(t.width) ++ ", " ++ string_of_int(t.height) ++ "}";
};