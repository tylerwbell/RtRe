'use strict';

var Metal$Rt = require("./Metal.bs.js");
var Lambertian$Rt = require("./Lambertian.bs.js");

function scatter(t, ray, hit) {
  if (t.tag) {
    return Metal$Rt.scatter(t[0], ray, hit);
  } else {
    return Lambertian$Rt.scatter(t[0], ray, hit);
  }
}

exports.scatter = scatter;
/* No side effect */
