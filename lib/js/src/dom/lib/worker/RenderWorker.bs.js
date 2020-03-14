'use strict';

var DomUtil$Rt = require("../../common/util/DomUtil.bs.js");
var WorkerContext$Rt = require("../../common/worker/WorkerContext.bs.js");

if (!WorkerContext$Rt.isWorker(/* () */0)) {
  console.log("!!! WORKER RUNNING IN WINDOW !!!");
  DomUtil$Rt.$$debugger(/* () */0);
}

var oneshot = {
  contents: true
};

WorkerContext$Rt.receive((function ($$event) {
        var data = $$event.data;
        console.log("worker: received: " + (String(data) + ""));
        if (oneshot.contents) {
          oneshot.contents = false;
          postMessage("inner test");
          return /* () */0;
        } else {
          return 0;
        }
      }));

postMessage("outer test");

exports.oneshot = oneshot;
/*  Not a pure module */
