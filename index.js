'use strict';
var slice = Array.prototype.slice;

module.exports = function (Promise) {
	Promise = Promise || global.Promise;

	callbackFirst.first = callbackLast.first = callbackFirst;
	callbackFirst.last = callbackLast.last = callbackLast;

	return callbackFirst;

	function callbackFirst(fn) {
		var args = slice.call(arguments);
		return exec(fn, args, 0);
	}

	function callbackLast(fn) {
		var args = slice.call(arguments, 1);
		return exec(fn, args, args.length);
	}

	function exec(fn, args, index) {
		return new Promise(function (resolve, reject) {
			args[index] = cb;
			fn.apply(null, args);
			function cb(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		});
	}
};
