'use strict';

var Vec3f$Rt = require("../../../../common/math/Vec3f.bs.js");
var Array2d$Rt = require("../../../../common/Array2d.bs.js");

function make(frame, clearColor) {
  var defaultSample = {
    color: clearColor,
    samples: 0
  };
  var buffer = Array2d$Rt.make(frame.size.width, frame.size.height, defaultSample);
  return {
          frame: frame,
          buffer: buffer
        };
}

function clear(t, clearColor) {
  var clearSample = {
    color: clearColor,
    samples: 0
  };
  return Array2d$Rt.fill(t.buffer, clearSample);
}

function blend(dest, source) {
  for(var sourceX = 0 ,sourceX_finish = source.frame.size.width; sourceX < sourceX_finish; ++sourceX){
    for(var sourceY = 0 ,sourceY_finish = source.frame.size.height; sourceY < sourceY_finish; ++sourceY){
      var destX = source.frame.origin.x + sourceX | 0;
      var destY = source.frame.origin.y + sourceY | 0;
      var destSample = Array2d$Rt.get(dest.buffer, destX, destY);
      var sourceSample = Array2d$Rt.get(source.buffer, sourceX, sourceY);
      var destSamples = destSample.samples;
      var sourceSamples = sourceSample.samples;
      var color = Vec3f$Rt.divScalar(Vec3f$Rt.add(Vec3f$Rt.multScalar(sourceSample.color, sourceSamples), Vec3f$Rt.multScalar(destSample.color, destSamples)), destSamples + sourceSamples);
      Array2d$Rt.set(dest.buffer, destX, destY, {
            color: color,
            samples: destSamples + sourceSamples | 0
          });
    }
  }
  
}

exports.make = make;
exports.clear = clear;
exports.blend = blend;
/* No side effect */
