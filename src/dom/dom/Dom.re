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