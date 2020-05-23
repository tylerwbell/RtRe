type t;

// TODO: surely a way to do these without the function call?

let create: (int, int) => t = [%bs.raw
  {|
    function(width, height) {
        return new ImageData(width, height);
    }
    |}
];

let get: (t, int) => int = [%bs.raw
  {|
    function (imageData, i) {
        return imageData.data[i];
    }
    |}
];

let set: (t, int, int) => unit = [%bs.raw
  {|
    function(imageData, i, value) {
        imageData.data[i] = value;
    }
    |}
];