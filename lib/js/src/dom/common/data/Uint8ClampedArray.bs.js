'use strict';


var create = (function(size) {
        return new UIntClampedArray(size);
    });

var get = (function (t, i) {
        return t.data[i];
    });

var set = (function(t, i, value) {
        t.data[i] = value;
    });

exports.create = create;
exports.get = get;
exports.set = set;
/* No side effect */
