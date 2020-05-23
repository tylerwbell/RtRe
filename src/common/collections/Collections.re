module RandomAccessArray = {
  type t('a) = array('a);

  let make = (size: int, defaultValue: 'a): t('a) => {
    Array.make(size, defaultValue);
  };

  let get = (t: t('a), index: int): 'a => {
    t[index];
  };

  let set = (t: t('a), index: int, value: 'a): unit => {
    t[index] = value;
  };

  let fill = (t: t('a), value: 'a): unit => {
    Array.fill(t, 0, Array.length(t), value);
  };
};

module Array2d = RandomAccessCollection2dView.MakeGeneric(RandomAccessArray);