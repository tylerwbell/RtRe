'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Vec3f$Rt = require("../../../../common/math/Vec3f.bs.js");
var Collections$Rt = require("../../../../common/collections/Collections.bs.js");
var DomCollections$Rt = require("../../../common/collections/DomCollections.bs.js");

function make(frame, clearColor) {
  var buffer = Curry._3(Collections$Rt.Array2d.make, frame.size.width, frame.size.height, clearColor);
  var samples = Curry._3(DomCollections$Rt.Uint8ClampedArray2d.make, frame.size.width, frame.size.height, 0);
  return {
          frame: frame,
          buffer: buffer,
          samples: samples
        };
}

function clear(t, clearColor) {
  Curry._2(Collections$Rt.Array2d.fill, t.buffer, clearColor);
  return Curry._2(DomCollections$Rt.Uint8ClampedArray2d.fill, t.samples, 0);
}

function blend(dest, source) {
  for(var sourceX = 0 ,sourceX_finish = source.frame.size.width; sourceX < sourceX_finish; ++sourceX){
    for(var sourceY = 0 ,sourceY_finish = source.frame.size.height; sourceY < sourceY_finish; ++sourceY){
      var destX = source.frame.origin.x + sourceX | 0;
      var destY = source.frame.origin.y + sourceY | 0;
      var destColor = Curry._3(Collections$Rt.Array2d.get, dest.buffer, destX, destY);
      var sourceColor = Curry._3(Collections$Rt.Array2d.get, source.buffer, sourceX, sourceY);
      var destSamples = Curry._3(DomCollections$Rt.Uint8ClampedArray2d.get, dest.samples, destX, destY);
      var sourceSamples = Curry._3(DomCollections$Rt.Uint8ClampedArray2d.get, source.samples, sourceX, sourceY);
      var color = Vec3f$Rt.divScalar(Vec3f$Rt.add(Vec3f$Rt.multScalar(sourceColor, sourceSamples), Vec3f$Rt.multScalar(destColor, destSamples)), destSamples + sourceSamples);
      Curry._4(Collections$Rt.Array2d.set, dest.buffer, destX, destY, color);
      Curry._4(DomCollections$Rt.Uint8ClampedArray2d.set, dest.samples, destX, destY, destSamples + sourceSamples | 0);
    }
  }
  
}

exports.make = make;
exports.clear = clear;
exports.blend = blend;
/* Collections-Rt Not a pure module */
