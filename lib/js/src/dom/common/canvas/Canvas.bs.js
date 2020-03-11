'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");

var create = (function() {
  var node = document.createElement('canvas')
  return node
});

function drawPoint(context, color, x, y) {
  context.fillStyle = Color$Rt.toDomRgbaString(color);
  context.fillRect(x, y, 1, 1);
  return /* () */0;
}

var Context2d = {
  drawPoint: drawPoint
};

exports.create = create;
exports.Context2d = Context2d;
/* No side effect */
