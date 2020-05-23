open RandomAccessCollection;

module Make = (Source: RandomAccessCollection, a: type) => {
  type t('a) = {
    size: Size.t(int),
    source: Source.t('a),
  };

  let make = (width: int, height: int, defaultValue: 'a): t('a) => {
    let source = Source.make(width * height, defaultValue);

    {
      size: {
        width,
        height,
      },
      source,
    };
  };

  let fill = (t: t('a), value: 'a) => {
    Source.fill(t.source, value);
  };

  let get = (t: t('a), x: int, y: int): 'a => {
    Source.get(t.source, y + x * t.size.width);
  };

  let set = (t: t('a), x: int, y: int, value: 'a) => {
    Source.set(t.source, y + x * t.size.width, value);
  };
};