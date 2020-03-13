'use strict';

var WorkerContext$Rt = require("../../common/worker/WorkerContext.bs.js");

console.log("hello, world!");

WorkerContext$Rt.receive((function ($$event) {
        var data = $$event.data;
        console.log("worker: received: " + (String(data) + ""));
        postMessage("test");
        return /* () */0;
      }));

/*  Not a pure module */
