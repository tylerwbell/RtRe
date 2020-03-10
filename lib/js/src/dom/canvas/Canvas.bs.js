'use strict';


var create = (function() {
  var node = document.createElement('canvas')
  return node
});

var Context2d = { };

exports.create = create;
exports.Context2d = Context2d;
/* No side effect */
