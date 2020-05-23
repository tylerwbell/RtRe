'use strict';


var create = (function(width, height) {
        return new ImageData(width, height);
    });

var get = (function (imageData, i) {
        return imageData.data[i];
    });

var set = (function(imageData, i, value) {
        imageData.data[i] = value;
    });

exports.create = create;
exports.get = get;
exports.set = set;
/* No side effect */
