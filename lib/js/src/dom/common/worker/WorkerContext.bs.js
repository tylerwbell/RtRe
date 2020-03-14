'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DomUtil$Rt = require("../util/DomUtil.bs.js");

var exit = (function() {
    close();
  });

var isWorker = (function() {
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    });

function trapOnWindow(param) {
  if (Curry._1(isWorker, /* () */0)) {
    return 0;
  } else {
    console.log("!!! WORKER RUNNING IN WINDOW !!!");
    return DomUtil$Rt.$$debugger(/* () */0);
  }
}

var receive = (function(callback) {
      onmessage = callback;
});

exports.exit = exit;
exports.isWorker = isWorker;
exports.trapOnWindow = trapOnWindow;
exports.receive = receive;
/* No side effect */
