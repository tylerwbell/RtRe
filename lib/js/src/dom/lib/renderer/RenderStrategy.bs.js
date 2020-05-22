'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function make(settings, camera) {
  var commands = /* [] */0;
  var width = settings.width / 10 | 0;
  var height = settings.height / 10 | 0;
  for(var _for = 0; _for <= 0; ++_for){
    for(var divX = 0; divX <= 9; ++divX){
      for(var divY = 0; divY <= 9; ++divY){
        var command = /* Render */Block.__(2, [{
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
