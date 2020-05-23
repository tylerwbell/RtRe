open RandomAccessIntCollection;

//
// Stores an array of colors as seperate r, g, b, a int components.
//
module Make = (Source: RandomAccessIntCollection) => {
  type t = {source: Source.t};

  let length = (t: t): int => {
    Source.length(t.source) / 4;
  };

  let get = (t: t, index: int): Color.t => {
    let offset = 4 * index;

    let r = float(Source.get(t.source, offset + 0)) /. 255.0;
    let g = float(Source.get(t.source, offset + 1)) /. 255.0;
    let b = float(Source.get(t.source, offset + 2)) /. 255.0;

    Color.fromRgb(r, g, b);
  };

  let set = (t: t, index: int, color: Color.t) => {
    let offset = 4 * index;

    Source.set(t.source, offset + 0, int_of_float(color.x));
    Source.set(t.source, offset + 1, int_of_float(color.y));
    Source.set(t.source, offset + 2, int_of_float(color.z));
  };

  let fill = (t: t, color: Color.t) => {
    let length = Source.length(t.source) / 4;
    for (i in 0 to length) {
      set(t, i, color);
    };
  };

  let make = (size: int, defaultColor: Color.t): t => {
    let t = {source: Source.make(4 * size, 0)};
    fill(t, defaultColor);

    t;
  };
};