'use strict';


var isWorker = (function() {
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    });

var receive = (function(callback) {
      onmessage = callback;
});

exports.isWorker = isWorker;
exports.receive = receive;
/* No side effect */
