# promise-shim [![Build Status](https://travis-ci.org/jamestalmage/promise-shim.svg?branch=master)](https://travis-ci.org/jamestalmage/promise-shim)

> For when your promise libraries `promisify` method just won't cut it! 

Promises are awesome, but sometimes you need to use API's that just do not support them.
Most promise libraries provide a `promisify` method to convert API's that take node style callback, 
but they do not work in every situation. `promise-shim` helps fill the gap.

## Install

```
$ npm install --save promise-shim
```

## Usage

```js
// You need to provide a Promise implementation:
var promiseShim = require('promise-shim')(PromiseConstructor);

// or if global.Promise is already a valid promise constructor:
var promiseShim = require('promise-shim')();

var promise = promiseShim(function (cb) {
  cb(someError); // rejects the promise
  cb(null, someValue); // resolves the promise
});
```

You can pass arguments to your function. Really helpful when using bind:
```js

var myService = promiseShim.bind(null, function(cb, a, b) {
  console.log(a); // => 'foo-a';
  console.log(b); // => 'foo-b';
  cb(null, a + b);
});

// myService is now a reusable function that returns a promise:

myService('foo-a', 'foo-b').then(...);
```

**Note:** Always check your Promise libraries options for "promisification", you will only need `promise-shim` in specific instances.

## License

MIT © [James Talmage](http://github.com/jamestalmage)
