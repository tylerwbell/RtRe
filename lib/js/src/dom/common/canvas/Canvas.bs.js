'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");

var create = (function() {
  var node = document.createElement('canvas')
  node.style.width = '100%';
  node.style.height = '100%';
  return node
});

var drawImageData = (function(context, buffer, width, height, x, y) {
      let imageData = new ImageData(buffer, width, height);
      context.putImageData(imageData, x, y);
    });

function drawPoint(context, color, x, y) {
  context.fillStyle = Color$Rt.toDomRgbaString(color);
  context.fillRect(x, y, 1, 1);
  
}

var Context2d = {
  drawImageData: drawImageData,
  drawPoint: drawPoint
};

exports.create = create;
exports.Context2d = Context2d;
/* No side effect */
