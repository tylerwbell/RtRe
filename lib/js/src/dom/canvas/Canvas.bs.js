'use strict';


var getElementById = (function(arg) {
  return document.getElementById(arg)
 });

var createElement = (function(width, height) {
  var node = document.createElement('canvas')
  node.width = width
  node.height = height
  return node
});

var Context2d = { };

exports.getElementById = getElementById;
exports.createElement = createElement;
exports.Context2d = Context2d;
/* No side effect */
