if (typeof module !== 'undefined') module.exports = frisk;

function frisk(input) {
    var library = {};

    library['+'] = function(_) {
        return _.reduce(function(a, b) { return a + b; }, 0);
    };

    library['-'] = function(_) {
        return _.slice(1).reduce(function(a, b) { return a - b; }, _[0]);
    };

    library['*'] = function(_) {
        return _.slice(1).reduce(function(a, b) { return a * b; }, _[0]);
    };

    library['/'] = function(_) {
        return _.slice(1).reduce(function(a, b) { return a / b; }, _[0]);
    };

    library['>'] = function(_) {
        return _[0] > _[1];
    };

    library['<'] = function(_) {
        return _[0] < _[1];
    };

    library['<='] = function(_) {
        return _[0] <= _[1];
    };

    library['>='] = function(_) {
        return _[0] >= _[1];
    };

    library['='] = function(_) {
        return _[0] == _[1];
    };

    library['!='] = function(_) {
        return _[0] != _[1];
    };

    library.first = function(_) {
        return _[0];
    };

    library.rest = function(_) {
        return _.slice(1);
    };

    library.pi = Math.PI;

    library.e = Math.E;

    ['sin', 'cos', 'floor', 'min', 'max', 'abs', 'round', 'ceil', 'log'].forEach(function(fn) {
        library[fn] = function(_) {
            return Math[fn](_[0]);
        };
    });

    var special = {};

    special.let = function(_, context) {
        var ctx = _[1].reduce(function(acc, x) {
            acc.scope[x[0]] = interpret(x[1], context);
            return acc;
        }, Context({}, context));
        return interpret(_[2], ctx);
    };

    special.lambda = function(_, context) {
        return function() {
            var args = arguments[0];
            var scope = _[1].reduce(function(acc, x, i) {
                acc[x] = args[i];
                return acc;
            }, {});
            return interpret(_[2], Context(scope, context));
        };
    };

    special['if'] = function(_, context) {
        return interpret(_[1], context) ?
            interpret(_[2], context) :
            interpret(_[3], context);
    };

    function Context(scope, parent) {
        function ctx(identifier) {
            if (identifier in scope) return scope[identifier];
            else if (parent !== undefined) return parent(identifier);
        }
        ctx.scope = scope;
        return ctx;
    }

    function interpretList(_, context) {
        if (_[0] in special) return special[_[0]](_, context);
        _ = _.map(function(x) { return interpret(x, context); });
        if (_[0] instanceof Function) return _[0].call(undefined, _.slice(1));
        else return _;
    }

    function interpret(_, context) {
        if (context === undefined) {
            return interpret(_, Context(library));
        } else if (_ instanceof Array) {
            return interpretList(_, context);
        } else if (typeof _ === 'string' && _[0] === '@') {
            return _.substring(1);
        } else if (typeof _ === 'string') {
            return context(_);
        } else {
            return _;
        }
    }

    return interpret(input);
}
