'use strict';


var getElementById = (function(arg) {
  return document.getElementById(arg)
 });

function $$setTimeout$1(timeout, item) {
  return setTimeout(item, timeout);
}

var addKeyDownEventListener = (function(callback) {
        document.addEventListener("keydown", event => {
            callback(event.keyCode);
        })
    });

var addMouseDownEventListener = (function(callback) {
        document.addEventListener("mousedown", e => {
          callback();
        })
    });

var addMouseUpEventListener = (function(callback) {
        document.addEventListener("mouseup", e => {
          callback();
        })
    });

var addMouseMoveEventListener = (function(callback) {
        document.addEventListener("mousemove", e => {
            callback(e.clientX, e.clientY);
        })
    });

exports.getElementById = getElementById;
exports.$$setTimeout = $$setTimeout$1;
exports.addKeyDownEventListener = addKeyDownEventListener;
exports.addMouseDownEventListener = addMouseDownEventListener;
exports.addMouseUpEventListener = addMouseUpEventListener;
exports.addMouseMoveEventListener = addMouseMoveEventListener;
/* No side effect */
