'use strict';

var Metal$Rt = require("./Metal.bs.js");
var Dielectric$Rt = require("./Dielectric.bs.js");
var Lambertian$Rt = require("./Lambertian.bs.js");

function scatter(t, ray, hit) {
  switch (t.tag | 0) {
    case /* Lambertian */0 :
        return Lambertian$Rt.scatter(t[0], ray, hit);
    case /* Metal */1 :
        return Metal$Rt.scatter(t[0], ray, hit);
    case /* Dielectric */2 :
        return Dielectric$Rt.scatter(t[0], ray, hit);
    
  }
}

exports.scatter = scatter;
/* No side effect */
