'use strict';


var getElementById = (function(arg) {
  return document.getElementById(arg)
 });

var addKeyDownEventListener = (function(callback) {
        document.addEventListener("keydown", event => {
            callback(event.keyCode);
        })
    });

exports.getElementById = getElementById;
exports.addKeyDownEventListener = addKeyDownEventListener;
/* No side effect */
