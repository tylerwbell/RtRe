'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../common/color/Color.bs.js");

var sky = /* LinearGradient */Block.__(1, [{
      a: {
        x: 0.0,
        y: 0.0
      },
      b: {
        x: 0.0,
        y: 1.0
      },
      aColor: Color$Rt.fromRgb(0.8, 0.7, 1.0),
      bColor: Color$Rt.fromRgb(0.8, 0.7, 1.0)
    }]);

function make(param) {
  var bodies = /* [] */0;
  for(var _for = 0; _for <= 1; ++_for){
    for(var a = -9; a <= 9; ++a){
      for(var b = -9; b <= 9; ++b){
        var m = Random.$$float(1.0);
        var center_x = a + 0.9 * Random.$$float(1.0);
        var center_z = b + 0.9 * Random.$$float(1.0);
        var center = {
          x: center_x,
          y: 0.2,
          z: center_z
        };
        var material = m < 0.5 ? /* Diffuse */Block.__(0, [{
                albedo: {
                  x: Random.$$float(1.0) * Random.$$float(1.0),
                  y: Random.$$float(1.0) * Random.$$float(1.0),
                  z: Random.$$float(1.0) * Random.$$float(1.0)
                }
              }]) : (
            m < 0.75 ? /* Specular */Block.__(1, [{
                    albedo: {
                      x: Random.$$float(1.0),
                      y: Random.$$float(1.0),
                      z: Random.$$float(1.0)
                    }
                  }]) : /* Dielectric */Block.__(2, [{
                    attenuation: Color$Rt.white,
                    refractiveIndex: 0.2
                  }])
          );
        bodies = /* :: */[
          /* Sphere */[{
              center: center,
              radius: 0.2,
              material: material
            }],
          bodies
        ];
      }
    }
  }
  bodies = /* :: */[
    /* Sphere */[{
        center: {
          x: 0.0,
          y: 1.0,
          z: 0.0
        },
        radius: 1.0,
        material: /* Dielectric */Block.__(2, [{
              attenuation: Color$Rt.white,
              refractiveIndex: 1.5
            }])
      }],
    /* :: */[
      /* Sphere */[{
          center: {
            x: -4.0,
            y: 1.0,
            z: 0.0
          },
          radius: 1.0,
          material: /* Diffuse */Block.__(0, [{
                albedo: Color$Rt.fromRgb(0.4, 0.2, 0.1)
              }])
        }],
      /* :: */[
        /* Sphere */[{
            center: {
              x: 4.0,
              y: 1.0,
              z: 0.0
            },
            radius: 1.0,
            material: /* Specular */Block.__(1, [{
                  albedo: Color$Rt.fromRgb(0.7, 0.6, 0.5)
                }])
          }],
        /* :: */[
          /* Sphere */[{
              center: {
                x: 0.0,
                y: -1000.0,
                z: 0.0
              },
              radius: 1000.0,
              material: /* Diffuse */Block.__(0, [{
                    albedo: Color$Rt.fromRgb(0.5, 0.5, 0.5)
                  }])
            }],
          bodies
        ]
      ]
    ]
  ];
  return {
          background: sky,
          bodies: bodies
        };
}

exports.sky = sky;
exports.make = make;
/* sky Not a pure module */
