'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Queue = require("bs-platform/lib/js/queue.js");
var Random = require("bs-platform/lib/js/random.js");

function log(message) {
  console.log("scheduler: " + (String(message) + ""));
  
}

function schedule(t) {
  while(true) {
    if (!(!Queue.is_empty(t.workQueue) && !Queue.is_empty(t.freeWorkers))) {
      return ;
    }
    var item = Queue.take(t.workQueue);
    var worker = Queue.take(t.freeWorkers);
    worker.postMessage(item);
    continue ;
  };
}

function _processWorkerResult(t, worker, sink, message) {
  var $$event = message.data;
  if ($$event) {
    return Curry._1(sink, $$event[0]);
  } else {
    Queue.push(worker, t.freeWorkers);
    return schedule(t);
  }
}

function make(sink) {
  var workQueue = Queue.create(undefined);
  var workers = {
    contents: /* [] */0
  };
  var freeWorkers = Queue.create(undefined);
  var t = {
    workQueue: workQueue,
    workers: workers,
    freeWorkers: freeWorkers
  };
  for(var i = 0; i <= 1; ++i){
    var worker = new Worker("worker.js?id=" + String(Random.$$int(10000)));
    worker.onmessage = (function(worker){
    return function (param) {
      return _processWorkerResult(t, worker, sink, param);
    }
    }(worker));
    worker.postMessage(/* Init */Block.__(0, [i]));
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

function _addAllCommands(t, _commands) {
  while(true) {
    var commands = _commands;
    if (!commands) {
      return ;
    }
    Queue.push(commands[0], t.workQueue);
    _commands = commands[1];
    continue ;
  };
}

function clearAndDispatchAll(t, command) {
  Queue.clear(t.workQueue);
  return _dispatch(t.workers.contents, command);
}

function map(t, commands) {
  clearAndDispatchAll(t, /* Cancel */0);
  _addAllCommands(t, commands);
  return schedule(t);
}

exports.log = log;
exports.schedule = schedule;
exports._processWorkerResult = _processWorkerResult;
exports.make = make;
exports._dispatch = _dispatch;
exports._addAllCommands = _addAllCommands;
exports.clearAndDispatchAll = clearAndDispatchAll;
exports.map = map;
/* No side effect */
