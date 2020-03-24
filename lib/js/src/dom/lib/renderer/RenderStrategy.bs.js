'use strict';

var Block = require("bs-platform/lib/js/block.js");

function make(settings, camera) {
  var commands = /* [] */0;
  for(var _for = 0; _for <= 100; ++_for){
    var command = /* Render */Block.__(2, [{
          camera: camera,
          slice: {
            x: 0,
            y: 0,
            width: settings.width,
            height: settings.height
          }
        }]);
    commands = /* :: */[
      command,
      commands
    ];
  }
  return commands;
}

exports.make = make;
/* No side effect */
