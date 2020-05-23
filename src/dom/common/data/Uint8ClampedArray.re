type t;

// TODO: surely a way to do these without the function call?

let create: int => t = [%bs.raw
  {|
    function(size) {
        return new UIntClampedArray(size);
    }
    |}
];

let get: (t, int) => int = [%bs.raw
  {|
    function (t, i) {
        return t.data[i];
    }
    |}
];

let set: (t, int, int) => unit = [%bs.raw
  {|
    function(t, i, value) {
        t.data[i] = value;
    }
    |}
];