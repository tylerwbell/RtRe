type element;

let getElementById: string => element = [%bs.raw
  {|function(arg) {
  return document.getElementById(arg)
 }|}
];

let addKeyDownEventListener: (int => unit) => unit = [%bs.raw
  {|
    function(callback) {
        document.addEventListener("keydown", event => {
            callback(event.keyCode);
        })
    }
|}
];

let addMouseDownEventListener: (unit => unit) => unit = [%bs.raw
  {|
    function(callback) {
        document.addEventListener("mousedown", e => {
          callback();
        })
    }
|}
];

let addMouseUpEventListener: (unit => unit) => unit = [%bs.raw
  {|
    function(callback) {
        document.addEventListener("mouseup", e => {
          callback();
        })
    }
|}
];

let addMouseMoveEventListener: ((int, int) => unit) => unit = [%bs.raw
  {|
    function(callback) {
        document.addEventListener("mousemove", e => {
            callback(e.clientX, e.clientY);
        })
    }
|}
];