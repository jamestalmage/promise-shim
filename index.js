'use strict';
var resolver = require('promise-resolver');

module.exports = function (Promise) {
	Promise = Promise || global.Promise;

	return function (fn) {
		var args = Array.prototype.slice.call(arguments);
		return new Promise(function (resolve, reject) {
			args[0] = resolver(resolve, reject);
			fn.apply(null, args);
		});
	};
};
