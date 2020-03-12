'use strict';


var getElementById = (function(arg) {
  return document.getElementById(arg)
 });

var addKeyDownEventListener = (function(callback) {
        document.addEventListener("keydown", event => {
            callback(event.keyCode);
        })
    });

var addMouseMoveEventListener = (function(callback) {
        document.addEventListener("mousemove", e => {
            callback(e.clientY, e.clientX);
        })
    });

exports.getElementById = getElementById;
exports.addKeyDownEventListener = addKeyDownEventListener;
exports.addMouseMoveEventListener = addMouseMoveEventListener;
/* No side effect */
