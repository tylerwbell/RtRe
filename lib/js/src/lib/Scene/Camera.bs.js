'use strict';

var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");

var right = {
  x: 1.0,
  y: 0.0,
  z: 0.0
};

var up = {
  x: 0.0,
  y: 1.0,
  z: 0.0
};

function moveAlongDirection(t, by) {
  return {
          position: Vec3f$Rt.add(t.position, Vec3f$Rt.multScalar(t.direction, by)),
          direction: t.direction,
          fov: t.fov,
          aspect: t.aspect
        };
}

function move(t, by) {
  return {
          position: Vec3f$Rt.add(t.position, by),
          direction: t.direction,
          fov: t.fov,
          aspect: t.aspect
        };
}

function tilt(t, by) {
  return {
          position: t.position,
          direction: Vec3f$Rt.add(Vec3f$Rt.add(t.direction, Vec3f$Rt.multScalar(right, by.x)), Vec3f$Rt.multScalar(up, by.y)),
          fov: t.fov,
          aspect: t.aspect
        };
}

function rayThrough(t, point) {
  var theta = t.fov * 3.141592653589793 / 180.0;
  var viewportOrigin = Vec3f$Rt.add(Vec3f$Rt.sub(t.direction, Vec3f$Rt.multScalar(right, theta / 2.0)), Vec3f$Rt.multScalar(up, theta / 2.0));
  return {
          origin: t.position,
          direction: Vec3f$Rt.sub(Vec3f$Rt.add(viewportOrigin, Vec3f$Rt.multScalar(right, theta * point.x)), Vec3f$Rt.multScalar(up, theta * point.y))
        };
}

var pi = 3.141592653589793;

exports.pi = pi;
exports.right = right;
exports.up = up;
exports.moveAlongDirection = moveAlongDirection;
exports.move = move;
exports.tilt = tilt;
exports.rayThrough = rayThrough;
/* No side effect */
