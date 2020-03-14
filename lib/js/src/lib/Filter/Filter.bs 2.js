'use strict';

var GammaFilter$Rt = require("./GammaFilter.bs.js");

function apply(t, color) {
  return GammaFilter$Rt.apply(color);
}

exports.apply = apply;
/* No side effect */
