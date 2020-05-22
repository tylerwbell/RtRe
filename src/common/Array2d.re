type t('a) = {
  size: Size.t(int),
  buffer: array('a),
};

let make = (width: int, height: int, defaultValue: 'a): t('a) => {
  let buffer = Array.make(width * height, defaultValue);

  {
    size: {
      width,
      height,
    },
    buffer,
  };
};

let fill = (array: t('a), value: 'a) => {
  Array.fill(array.buffer, 0, array.size.width * array.size.height, value);
};

let get = (array: t('a), x: int, y: int): 'a => {
  let i = x + y * array.size.width;
  array.buffer[i];
};

let set = (array: t('a), x: int, y: int, value: 'a) => {
  let i = x + y * array.size.width;
  array.buffer[i] = value;
};