'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Random = require("bs-platform/lib/js/random.js");

function log(message) {
  console.log("scheduler: " + (String(message) + ""));
  
}

function schedule(t) {
  while(true) {
    var match = t.workQueue.contents;
    var match$1 = t.free.contents;
    if (!match) {
      return ;
    }
    if (!match$1) {
      return ;
    }
    match$1[0].postMessage(match[0]);
    t.workQueue.contents = match[1];
    t.free.contents = match$1[1];
    continue ;
  };
}

function _processWorkerResult(t, worker, sink, message) {
  var $$event = message.data;
  if ($$event) {
    return Curry._1(sink, $$event[0]);
  } else {
    t.free.contents = /* :: */[
      worker,
      t.free.contents
    ];
    return schedule(t);
  }
}

function make(sink) {
  var workQueue = {
    contents: /* [] */0
  };
  var workers = {
    contents: /* [] */0
  };
  var free = {
    contents: /* [] */0
  };
  var t = {
    workQueue: workQueue,
    free: free,
    workers: workers
  };
  for(var i = 0; i <= 9; ++i){
    var worker = new Worker("worker.js?id=" + String(Random.$$int(10000)));
    worker.postMessage(/* Init */Block.__(0, [i]));
    worker.onmessage = (function(worker){
    return function (param) {
      return _processWorkerResult(t, worker, sink, param);
    }
    }(worker));
    workers.contents = /* :: */[
      worker,
      workers.contents
    ];
  }
  return t;
}

function _dispatch(_workers, command) {
  while(true) {
    var workers = _workers;
    if (!workers) {
      return ;
    }
    workers[0].postMessage(command);
    _workers = workers[1];
    continue ;
  };
}

function clearAndDispatchAll(t, command) {
  t.workQueue.contents = /* [] */0;
  return _dispatch(t.workers.contents, command);
}

function map(t, commands) {
  clearAndDispatchAll(t, /* Cancel */0);
  t.workQueue.contents = commands;
  return schedule(t);
}

exports.log = log;
exports.schedule = schedule;
exports._processWorkerResult = _processWorkerResult;
exports.make = make;
exports._dispatch = _dispatch;
exports.clearAndDispatchAll = clearAndDispatchAll;
exports.map = map;
/* No side effect */
