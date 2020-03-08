type canvas;
type context2d;

let getElementById: string => canvas = [%bs.raw
  {|function(arg) {
  return document.getElementById(arg)
 }|}
];

let createElement: (int, int) => canvas = [%bs.raw
  {|function(width, height) {
  var node = document.createElement('canvas')
  node.width = width
  node.height = height
  return node
}|}
];

[@bs.send]
external getContext2d: (canvas, [@bs.as "2d"] _) => context2d = "getContext";

module Ctx = {
  [@bs.get] external canvas: context2d => canvas = "canvas";

  [@bs.set] external setFillStyle: (context2d, string) => unit = "fillStyle";

  [@bs.send]
  external fillRect: (context2d, float, float, float, float) => unit =
    "fillRect";
};