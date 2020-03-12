type t;
type context2d;

let create: unit => t = [%bs.raw
  {|function() {
  var node = document.createElement('canvas')
  node.style.width = '100%';
  node.style.height = '100%';
  return node
}|}
];

[@bs.get] external width: t => float = "width";
[@bs.set] external setWidth: (t, float) => unit = "width";
[@bs.get] external height: t => float = "height";
[@bs.set] external setHeight: (t, float) => unit = "height";

[@bs.send]
external getContext2d: (t, [@bs.as "2d"] _) => context2d = "getContext";

module Context2d = {
  [@bs.get] external canvas: context2d => t = "canvas";

  [@bs.set] external setFillStyle: (context2d, string) => unit = "fillStyle";

  [@bs.send] external setScale: (context2d, float, float) => unit = "scale";

  [@bs.send]
  external fillRect: (context2d, int, int, int, int) => unit = "fillRect";

  let drawPoint = (context: context2d, color: Color.t, x: int, y: int) => {
    context->setFillStyle(Color.toDomRgbaString(color));
    context->fillRect(x, y, 1, 1);
  };
};