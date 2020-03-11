type t;
type context2d;

let create: unit => t = [%bs.raw
  {|function() {
  var node = document.createElement('canvas')
  return node
}|}
];

[@bs.get] external width: t => int = "width";
[@bs.set] external setWidth: (t, int) => unit = "width";
[@bs.get] external height: t => int = "height";
[@bs.set] external setHeight: (t, int) => unit = "height";

[@bs.send]
external getContext2d: (t, [@bs.as "2d"] _) => context2d = "getContext";

module Context2d = {
  [@bs.get] external canvas: context2d => t = "canvas";

  [@bs.set] external setFillStyle: (context2d, string) => unit = "fillStyle";

  [@bs.send]
  external fillRect: (context2d, int, int, int, int) => unit = "fillRect";

  let drawPoint = (context: context2d, color: Color.t, x: int, y: int) => {
    context->setFillStyle(Color.toDomRgbaString(color));
    context->fillRect(x, y, 1, 1);
  };
};