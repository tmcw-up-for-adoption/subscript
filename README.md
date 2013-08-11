[![Build Status](https://travis-ci.org/tmcw/frisk.png?branch=master)](https://travis-ci.org/tmcw/frisk)

## frisk

a lisp, kind of. all expressions are valid JSON-serializable javascript objects.

### [examples](http://macwright.org/frisk/)

```js
// atoms
frisk('@string');
frisk(1);
frisk([]);

// constants
frisk('e');
frisk('pi');

// maths
frisk(['+', 1, 1]);
frisk(['*', 2, 2]);
frisk(['/', 2, 4]);
frisk(['floor', 0.2]);

// trig
frisk(['cos', 0]);
frisk(['sin', 0]);

// position
frisk(['first', 2, 3, 4, 5]);
frisk(['rest', 2, 3, 4, 5]);

// let
frisk(['let', [['x', 42]], 'x']);

// lambda
frisk([['lambda', ['x'], ['*', 'x', 'x']], [2]]);

// if
frisk(['if', true, '@foo', '@bar']);
frisk(['if', false, '@foo', '@bar']);

// comparison operators
frisk(['=', 2, 2]);
frisk(['>', 2, 2]);
frisk(['>=', 2, 2]);
frisk(['<=', 2, 2]);
frisk(['<', 2, 2]);

// functions to javascriptspace
fn = frisk(['lambda', ['x'], ['/', 'x', 2]]);
fn([8]);
```

### usage

    npm install --save frisk

```js
var frisk = require('frisk');
frisk(['+', 2, 2]);
```

### see also

* heavily inspired by [little lisp](https://github.com/maryrosecook/littlelisp)
* [JSOL](http://www.jsol.org/) is also a JavaScript-data language, in more of a C-family vein
