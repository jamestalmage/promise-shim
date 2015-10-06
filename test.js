'use strict';
var assert = require('assert');
var semver = require('semver');
var hasSystemPromises = semver.gte(process.version, '4.0.0');
var Promise = hasSystemPromises ? global.Promise : require('bluebird');
var promiseShim = require('./')(Promise);

it('resolves promises', function (done) {
	promiseShim(function (cb, arg) {
		assert.strictEqual(arg, 'a');
		setImmediate(cb.bind(null, null, 'b'));
	}, 'a').then(function (result) {
		assert.strictEqual(result, 'b');
		done();
	});
});

it('rejects promises', function (done) {
	promiseShim(function (cb, c, d) {
		assert.strictEqual(c, 'c');
		assert.strictEqual(d, 'd');
		setImmediate(cb.bind(null, new Error('first')));
	}, 'c', 'd').catch(function (err) {
		assert.strictEqual(err.message, 'first');
		done();
	});
});
