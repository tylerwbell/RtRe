'use strict';

var Diffuse$Rt = require("./Diffuse.bs.js");
var Specular$Rt = require("./Specular.bs.js");
var Dielectric$Rt = require("./Dielectric.bs.js");

function scatter(t, ray, hit) {
  switch (t.tag | 0) {
    case /* Diffuse */0 :
        return Diffuse$Rt.scatter(t[0], ray, hit);
    case /* Specular */1 :
        return Specular$Rt.scatter(t[0], ray, hit);
    case /* Dielectric */2 :
        return Dielectric$Rt.scatter(t[0], ray, hit);
    
  }
}

exports.scatter = scatter;
/* No side effect */
