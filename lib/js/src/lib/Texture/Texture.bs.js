'use strict';

var SolidTexture$Rt = require("./SolidTexture.bs.js");
var CheckerTexture$Rt = require("./CheckerTexture.bs.js");
var LinearGradient$Rt = require("./LinearGradient.bs.js");

function colorAt(t, point) {
  switch (t.tag | 0) {
    case /* SolidTexture */0 :
        return SolidTexture$Rt.colorAt(t[0], point);
    case /* LinearGradient */1 :
        return LinearGradient$Rt.colorAt(t[0], point);
    case /* CheckerTexture */2 :
        return CheckerTexture$Rt.colorAt(t[0], point);
    
  }
}

exports.colorAt = colorAt;
/* CheckerTexture-Rt Not a pure module */
