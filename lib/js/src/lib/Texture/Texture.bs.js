'use strict';

var CheckerTexture$Rt = require("./CheckerTexture.bs.js");
var LinearGradient$Rt = require("./LinearGradient.bs.js");

function colorAt(t, point) {
  if (t.tag) {
    return CheckerTexture$Rt.colorAt(t[0], point);
  } else {
    return LinearGradient$Rt.colorAt(t[0], point);
  }
}

exports.colorAt = colorAt;
/* CheckerTexture-Rt Not a pure module */
