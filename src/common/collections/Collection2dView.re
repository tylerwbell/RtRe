open RandomAccessGenericCollection;
open RandomAccessIntCollection;
open RandomAccessColorCollection;

//
// Allow accessing a 1-d array as if it were a 2-d array.
//

// TODO: seems like there should be some syntax to handle restricting the generic
// rather than needing to make another modules but idk.

module MakeGeneric = (Source: RandomAccessGenericCollection) => {
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

module MakeInt = (Source: RandomAccessIntCollection) => {
  type t = {
    size: Size.t(int),
    source: Source.t,
  };

  let make = (width: int, height: int, defaultValue: int): t => {
    let source = Source.make(width * height, defaultValue);

    {
      size: {
        width,
        height,
      },
      source,
    };
  };

  let fill = (t: t, value: int) => {
    Source.fill(t.source, value);
  };

  let get = (t: t, x: int, y: int): int => {
    Source.get(t.source, y + x * t.size.width);
  };

  let set = (t: t, x: int, y: int, value: int) => {
    Source.set(t.source, y + x * t.size.width, value);
  };
};

module MakeColor = (Source: RandomAccessColorCollection) => {
  type t = {
    size: Size.t(int),
    source: Source.t,
  };

  let make = (width: int, height: int, defaultValue: Color.t): t => {
    let source = Source.make(width * height, defaultValue);

    {
      size: {
        width,
        height,
      },
      source,
    };
  };

  let fill = (t: t, value: Color.t) => {
    Source.fill(t.source, value);
  };

  let get = (t: t, x: int, y: int): Color.t => {
    Source.get(t.source, y + x * t.size.width);
  };

  let set = (t: t, x: int, y: int, value: Color.t) => {
    Source.set(t.source, y + x * t.size.width, value);
  };
};