module type RandomAccessGenericCollection = {
  type t('a);

  let make: (int, 'a) => t('a);

  let length: t('a) => int;

  let get: (t('a), int) => 'a;
  let set: (t('a), int, 'a) => unit;
  let fill: (t('a), 'a) => unit;
};