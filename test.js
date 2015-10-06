'use strict';
var assert = require('assert');
var semver = require('semver');
var hasSystemPromises = semver.gte(process.version, '4.0.0');
var Promise = hasSystemPromises ? global.Promise : require('bluebird');
var promiseShim = require('./')(Promise);
var first = promiseShim;
var last = promiseShim.last;

it('first resolves promises', function (done) {
	first(function (cb, arg) {
		assert.strictEqual(arg, 'a');
		setImmediate(cb.bind(null, null, 'b'));
	}, 'a').then(function (result) {
		assert.strictEqual(result, 'b');
		done();
	});
});

it('first rejects promises', function (done) {
	first(function (cb, c, d) {
		assert.strictEqual(c, 'c');
		assert.strictEqual(d, 'd');
		setImmediate(cb.bind(null, new Error('first')));
	}, 'c', 'd').catch(function (err) {
		assert.strictEqual(err.message, 'first');
		done();
	});
});

it('last resolves promises', function (done) {
	last(function (a, b, cb) {
		assert.strictEqual(a, 'a');
		assert.strictEqual(b, 'b');
		setImmediate(cb.bind(null, null, 'c'));
	}, 'a', 'b').then(function (result) {
		assert.strictEqual(result, 'c');
		done();
	});
});

it('last rejects promises', function (done) {
	last(function (a, cb) {
		assert.strictEqual(a, 'e');
		setImmediate(cb.bind(null, new Error('last')));
	}, 'e').catch(function (err) {
		assert.strictEqual(err.message, 'last');
		done();
	});
});
