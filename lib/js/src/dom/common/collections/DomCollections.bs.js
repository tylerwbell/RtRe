'use strict';

var Uint32Array$Rt = require("./Uint32Array.bs.js");
var Uint8ClampedArray$Rt = require("./Uint8ClampedArray.bs.js");
var RandomAccessCollection2dView$Rt = require("../../../common/collections/RandomAccessCollection2dView.bs.js");

var Uint8ClampedArray2d = RandomAccessCollection2dView$Rt.MakeInt({
      make: Uint8ClampedArray$Rt.RandomAccessCollection.make,
      get: Uint8ClampedArray$Rt.RandomAccessCollection.get,
      set: Uint8ClampedArray$Rt.RandomAccessCollection.set,
      fill: Uint8ClampedArray$Rt.RandomAccessCollection.fill
    });

var Uint32Array2d = RandomAccessCollection2dView$Rt.MakeInt({
      make: Uint32Array$Rt.RandomAccessCollection.make,
      get: Uint32Array$Rt.RandomAccessCollection.get,
      set: Uint32Array$Rt.RandomAccessCollection.set,
      fill: Uint32Array$Rt.RandomAccessCollection.fill
    });

exports.Uint8ClampedArray2d = Uint8ClampedArray2d;
exports.Uint32Array2d = Uint32Array2d;
/* Uint8ClampedArray2d Not a pure module */
