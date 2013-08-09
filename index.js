module.exports = frisk;

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

    library.first = function(_) {
        return _[0];
    };

    library.rest = function(_) {
        return _.slice(1);
    };

    function Context(scope, parent) {
        return function(identifier) {
            if (identifier in scope) return scope[identifier];
            else if (parent !== undefined) return parent(identifier);
        };
    }

    function interpretList(_, context) {
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
