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
        return scope;
    }

    function interpretList(_, context) {
        if (context[_[0]]) return context[_[0]](_.slice(1));
    }

    function interpret(_, context) {
        if (context === undefined) {
            return interpret(_, Context(library));
        } else if (_ instanceof Array) {
            return interpretList(_, context);
        } else {
            return _;
        }
    }

    return interpret(input);
}
