[![Build Status](https://travis-ci.org/tmcw/frisk.png?branch=master)](https://travis-ci.org/tmcw/frisk)

## frisk

a lisp, kind of. all expressions are valid JSON-serializable javascript objects.

```js
['/', 2, 1] // => 2
['*', 2, 2] // => 4
['-', 2, 2] // => 0
['+', ['+', 1, 1], 1] // => 3
[1, 2, 3] // => [1, 2, 3]
['@foo'] // => ['foo']
```

### see also

* heavily inspired by [little lisp](https://github.com/maryrosecook/littlelisp)
