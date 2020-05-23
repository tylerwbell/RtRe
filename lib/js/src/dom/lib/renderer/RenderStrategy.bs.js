'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function make(settings, camera) {
  var commands = /* [] */0;
  var passes = settings.samples;
  var divisions = settings.chunkDivisions;
  var width = Caml_int32.div(settings.width, divisions);
  var height = Caml_int32.div(settings.height, divisions);
  for(var _for = 0; _for <= passes; ++_for){
    for(var divY = divisions - 1 | 0; divY >= 0; --divY){
      for(var divX = divisions - 1 | 0; divX >= 0; --divX){
        var command = /* Render */Block.__(2, [{
              config: {
                depth: settings.depth,
                blur: settings.blur
              },
              camera: camera,
              viewport: {
                width: settings.width,
                height: settings.height
              },
              frame: {
                origin: {
                  x: Caml_int32.imul(divX, width),
                  y: Caml_int32.imul(divY, height)
                },
                size: {
                  width: width,
                  height: height
                }
              }
            }]);
        commands = /* :: */[
          command,
          commands
        ];
      }
    }
  }
  return commands;
}

exports.make = make;
/* No side effect */
