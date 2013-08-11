[![Build Status](https://travis-ci.org/tmcw/subscript.png?branch=master)](https://travis-ci.org/tmcw/subscript)

## subscript

a lisp, kind of. all expressions are valid JSON-serializable javascript objects.

### [examples](http://macwright.org/subscript/)

```js
// atoms
subscript('@string');
subscript(1);
subscript([]);

// constants
subscript('e');
subscript('pi');

// maths
subscript(['+', 1, 1]);
subscript(['*', 2, 2]);
subscript(['/', 2, 4]);
subscript(['floor', 0.2]);

// trig
subscript(['cos', 0]);
subscript(['sin', 0]);

// position
subscript(['first', 2, 3, 4, 5]);
subscript(['rest', 2, 3, 4, 5]);

// let
subscript(['let', [['x', 42]], 'x']);

// lambda
subscript([['lambda', ['x'], ['*', 'x', 'x']], [2]]);

// if
subscript(['if', true, '@foo', '@bar']);
subscript(['if', false, '@foo', '@bar']);

// comparison operators
subscript(['=', 2, 2]);
subscript(['>', 2, 2]);
subscript(['>=', 2, 2]);
subscript(['<=', 2, 2]);
subscript(['<', 2, 2]);

// functions to javascriptspace
fn = subscript(['lambda', ['x'], ['/', 'x', 2]]);
fn([8]);
```

### usage

    npm install --save subscript

```js
var subscript = require('subscript');
subscript(['+', 2, 2]);
```

### see also

* heavily inspired by [little lisp](https://github.com/maryrosecook/littlelisp)
* [JSOL](http://www.jsol.org/) is also a JavaScript-data language, in more of a C-family vein
