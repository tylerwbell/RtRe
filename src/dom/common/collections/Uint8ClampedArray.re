module RandomAccessCollection = {
  type t;

  [@bs.get] external length: t => int = "length";

  // TODO: surely a way to do these without the function call?
  let get: (t, int) => int = [%bs.raw
    {|
    function (t, i) {
        return t.data[i];
    }
    |}
  ];

  // TODO: surely a way to do these without the function call?
  let set: (t, int, int) => unit = [%bs.raw
    {|
    function (t, i, value) {
        t.data[i] = value;
    }
    |}
  ];

  let fill = (t: t, value: int): unit => {
    for (i in 0 to length(t)) {
      set(t, i, value);
    };
  };

  let make = (size: int, defaultValue: int): t => {
    let create: int => t = [%bs.raw
      {|
    function(size) {
        return new UIntClampedArray(size);
    }
    |}
    ];

    let array = create(size);
    fill(array, defaultValue);
    array;
  };
};