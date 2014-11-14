# args2object

Node/JavaScript library to access an item in an object structure given function arguments as path.


## Install in Node

```bash
$ npm install args2object
```


## Manual installation for Browser apps

Take the browserified file at `dist/args2object.bundle.js` and include it in your HTML:

```html
<script src='js/args2object.bundle.js'></script>
```

The browserified file exports the `window.args2object` function.


## Usage

```js
var args2object = require('args2object');  // if Node

var myObject = {
  a: true,
  b: false,
  c: 'hello',
  d: {
    d1: 'foo',
    d2: [1,2,3,4]
  }
};


var getter = args2object(myObject);

getter('a');             // => true
getter('b');             // => false
getter('c');             // => 'hello'
getter('d','d1');        // => 'foo'
getter('d','d2');        // => [1,2,3,4]

getter('a','a1');        // => undefined
getter('a','a1','a11');  // => undefined
getter('e');             // => undefined
getter('e','e1');        // => undefined


var getter = args2object(myObject, {failOnNotFound: true});

getter('a','a1');        // => throws an Error exception
getter('a','a1','a11');  // => throws an Error exception
getter('e');             // => throws an Error exception
getter('e','e1');        // => throws an Error exception

```


## API

### `getter = args2object(object, options)`

* param `{Object|Function}` **object**: The object to handle.
* param `{Object}` **options** *(optional)*:
  * `{Boolean}` **failOnNotFound**: Whether to throw an `Error` if the searched path does not exist in the object structure (default: `false`).

Returns a `getter` function.

### `getter(a,b,c)`

Retrieve the value at `object[a][b][c]`.

If the path does not exist it returns `undefined` (or throws an `Error` if `options.failOnNotFound` is set).


## Release History

### 0.1.0 (2014-11-14)
* First release.

## License

Copyright (c) 2014 Iñaki Baz Castillo
Licensed under the MIT license.
