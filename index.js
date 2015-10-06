'use strict';
module.exports = function (Promise) {
	Promise = Promise || global.Promise;

	return function (fn) {
		var args = Array.prototype.slice.call(arguments);
		return new Promise(function (resolve, reject) {
			args[0] = cb;
			fn.apply(null, args);
			function cb(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		});
	};
};
