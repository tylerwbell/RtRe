'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function make(param) {
  return {
          items: {
            contents: /* [] */0
          },
          _currentId: {
            contents: 0
          }
        };
}

function enqueue(t, item) {
  var animationId = requestAnimationFrame((function (param) {
          return Curry._1(item, /* () */0);
        }));
  var itemId = t._currentId.contents;
  var item$1 = {
    id: itemId,
    _animationId: animationId
  };
  t._currentId.contents = itemId + 1 | 0;
  t.items.contents = /* :: */[
    item$1,
    t.items.contents
  ];
  return itemId;
}

function cancelBefore(items, itemId) {
  if (items) {
    var head = items[0];
    var tailFiltered = cancelBefore(items[1], itemId);
    if (head.id >= itemId) {
      return /* :: */[
              head,
              tailFiltered
            ];
    } else {
      cancelAnimationFrame(head._animationId);
      return tailFiltered;
    }
  } else {
    return /* [] */0;
  }
}

function cancelBefore$1(t, itemId) {
  t.items.contents = cancelBefore(t.items.contents, itemId);
  return /* () */0;
}

exports.make = make;
exports.enqueue = enqueue;
exports.cancelBefore = cancelBefore$1;
/* No side effect */
