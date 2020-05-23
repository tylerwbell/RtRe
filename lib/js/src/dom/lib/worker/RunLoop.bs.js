'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Queue = require("bs-platform/lib/js/queue.js");

function _postAsync(t, item) {
  return Curry._1(item, t);
}

function _loop(t) {
  while(true) {
    if (Queue.is_empty(t.queue)) {
      t.running.contents = false;
      return Curry._1(t.onExhausted, t);
    }
    var unit = Queue.take(t.queue);
    Curry._1(unit, t);
    continue ;
  };
}

function make(onExhausted) {
  return {
          running: {
            contents: false
          },
          queue: Queue.create(undefined),
          onExhausted: onExhausted
        };
}

function dispatch(t, item) {
  Queue.push(item, t.queue);
  if (!t.running.contents) {
    t.running.contents = true;
    return _loop(t);
  }
  
}

function clear(t) {
  return Queue.clear(t.queue);
}

exports._postAsync = _postAsync;
exports._loop = _loop;
exports.make = make;
exports.dispatch = dispatch;
exports.clear = clear;
/* No side effect */
