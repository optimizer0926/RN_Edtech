'use strict';
/* jshint unused:true */
/*
Input:  matrix      ; a 4x4 matrix
Output: translation ; a 3 component vector
        scale       ; a 3 component vector
        skew        ; skew factors XY,XZ,YZ represented as a 3 component vector
        perspective ; a 4 component vector
        quaternion  ; a 4 component vector
Returns false if the matrix cannot be decomposed, true if it can

References:
https://github.com/kamicane/matrix3d/blob/master/lib/Matrix3d.js
https://github.com/ChromiumWebApps/chromium/blob/master/ui/gfx/transform_util.cc
http://www.w3.org/TR/css3-transforms/#decomposing-a-3d-matrix
*/
Object.defineProperty(exports, '__esModule', {value: true});
let create_1 = require('../gl-mat4/create');
let cross_1 = require('../gl-vec3/cross');
let dot_1 = require('../gl-vec3/dot');
let length_1 = require('../gl-vec3/length');
let normalize_1 = require('../gl-vec3/normalize');
let normalize_2 = require('./normalize');
let vec3 = {
  length: length_1.default,
  normalize: normalize_1.default,
  dot: dot_1.default,
  cross: cross_1.default,
};
let tmp = create_1.default();
let row = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let pdum3 = [0, 0, 0];
exports.round = function (value, epsilon = 1e3) {
  return Math.round(value * epsilon) / epsilon;
};
function roundVector (vector, epsilon = 1e3) {
  return vector.map(function (value) {
    return exports.round(value, epsilon);
  });
}
exports.roundVector = roundVector;
function decomposeMat4 (matrix, epsilon = 1e3) {
    // Normalize. If not possible or we have a 0 scale factor, bail out early.
  if (!normalize_2.default(tmp, matrix) || !tmp[0] || !tmp[5] || !tmp[10]) {
    return {
      translation: [0, 0, 0],
      scale: [0, 0, 0],
      shear: [0, 0, 0],
      rotation: [0, 0, 0],
    };
  }
  const translation = roundVector([tmp[12], tmp[13], tmp[14]], epsilon);
    // Now get scale and shear. 'row' is a 3 element array of 3 component vectors
  mat3from4(row, tmp);
  const scale = [0, 0, 0];
  const shear = [0, 0, 0];
    // Compute X scale factor and normalize first row.
  scale[0] = vec3.length(row[0]);
  vec3.normalize(row[0], row[0]);
    // Compute XY shear factor and make 2nd row orthogonal to 1st.
  shear[0] = vec3.dot(row[0], row[1]);
  combine(row[1], row[1], row[0], 1.0, -shear[0]);
    // Now, compute Y scale and normalize 2nd row.
  scale[1] = vec3.length(row[1]);
  vec3.normalize(row[1], row[1]);
  shear[0] /= scale[1];
    // Compute XZ and YZ shears, orthogonalize 3rd row
  shear[1] = vec3.dot(row[0], row[2]);
  combine(row[2], row[2], row[0], 1.0, -shear[1]);
  shear[2] = vec3.dot(row[1], row[2]);
  combine(row[2], row[2], row[1], 1.0, -shear[2]);
    // Next, get Z scale and normalize 3rd row.
  scale[2] = vec3.length(row[2]);
  vec3.normalize(row[2], row[2]);
  shear[1] /= scale[2];
  shear[2] /= scale[2];
    // At this point, the matrix (in rows) is orthonormal.
    // Check for a coordinate system flip.  If the determinant
    // is -1, then negate the matrix and the scaling factors.
  vec3.cross(pdum3, row[1], row[2]);
  if (vec3.dot(row[0], pdum3) < 0) {
    for (let i = 0; i < 3; i++) {
      scale[i] *= -1;
      row[i][0] *= -1;
      row[i][1] *= -1;
      row[i][2] *= -1;
    }
  }
  const rotation = [
    0,
    Math.asin(-row[0][2]),
    0,
  ];
  if (Math.cos(rotation[1])) {
    rotation[0] = Math.atan2(row[1][2], row[2][2]);
    rotation[2] = Math.atan2(row[0][1], row[0][0]);
  } else {
    rotation[0] = Math.atan2(-row[2][1], row[1][1]);
  }
    // Force positive rotations.
  for (let i = 0; i < rotation.length; i++) {
    if (rotation[i] < 0) {
      rotation[i] += 2 * Math.PI;
    }
  }
  return {
    translation,
    rotation: roundVector(rotation, epsilon),
    scale: roundVector(scale, epsilon),
    shear: roundVector(shear, epsilon),
  };
}
exports.default = decomposeMat4;
// gets upper-left of a 4x4 matrix into a 3x3 of vectors
function mat3from4 (out, mat4x4) {
  out[0][0] = mat4x4[0];
  out[0][1] = mat4x4[1];
  out[0][2] = mat4x4[2];
  out[1][0] = mat4x4[4];
  out[1][1] = mat4x4[5];
  out[1][2] = mat4x4[6];
  out[2][0] = mat4x4[8];
  out[2][1] = mat4x4[9];
  out[2][2] = mat4x4[10];
}
function combine (out, a, b, scale1, scale2) {
  out[0] = a[0] * scale1 + b[0] * scale2;
  out[1] = a[1] * scale1 + b[1] * scale2;
  out[2] = a[2] * scale1 + b[2] * scale2;
}
// # sourceMappingURL=index.js.map
