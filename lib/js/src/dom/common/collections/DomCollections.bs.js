'use strict';

var Uint32Array$Rt = require("./Uint32Array.bs.js");
var Collection2dView$Rt = require("../../../common/collections/Collection2dView.bs.js");
var Uint8ClampedArray$Rt = require("./Uint8ClampedArray.bs.js");
var CollectionColorView$Rt = require("../../../common/color/CollectionColorView.bs.js");

var Uint8ClampedArray2d = Collection2dView$Rt.MakeInt({
      make: Uint8ClampedArray$Rt.RandomAccessCollection.make,
      length: (function (prim) {
          return prim.length;
        }),
      get: Uint8ClampedArray$Rt.RandomAccessCollection.get,
      set: Uint8ClampedArray$Rt.RandomAccessCollection.set,
      fill: Uint8ClampedArray$Rt.RandomAccessCollection.fill
    });

var Uint32Array2d = Collection2dView$Rt.MakeInt({
      make: Uint32Array$Rt.RandomAccessCollection.make,
      length: (function (prim) {
          return prim.length;
        }),
      get: Uint32Array$Rt.RandomAccessCollection.get,
      set: Uint32Array$Rt.RandomAccessCollection.set,
      fill: Uint32Array$Rt.RandomAccessCollection.fill
    });

var $$let = CollectionColorView$Rt.Make({
      make: Uint8ClampedArray$Rt.RandomAccessCollection.make,
      length: (function (prim) {
          return prim.length;
        }),
      get: Uint8ClampedArray$Rt.RandomAccessCollection.get,
      set: Uint8ClampedArray$Rt.RandomAccessCollection.set,
      fill: Uint8ClampedArray$Rt.RandomAccessCollection.fill
    });

var Uint8ColorArray2d = Collection2dView$Rt.MakeColor({
      make: $$let.make,
      length: $$let.length,
      get: $$let.get,
      set: $$let.set,
      fill: $$let.fill
    });

exports.Uint8ClampedArray2d = Uint8ClampedArray2d;
exports.Uint32Array2d = Uint32Array2d;
exports.Uint8ColorArray2d = Uint8ColorArray2d;
/* Uint8ClampedArray2d Not a pure module */
