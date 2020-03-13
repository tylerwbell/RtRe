'use strict';


var receive = (function(callback) {
      onmessage = callback;
});

exports.receive = receive;
/* No side effect */
