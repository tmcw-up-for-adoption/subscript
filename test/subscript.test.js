var expect = require('expect.js'),
    subscript = require('../');

describe('basic things', function() {
    describe('atoms', function() {
        it('numbers', function() {
            expect(subscript([1])).to.eql([1]);
        });
        it('lists', function() {
            expect(subscript([1, 2])).to.eql([1, 2]);
        });
        it('nested lists', function() {
            expect(subscript([1, 2, [3, 4]])).to.eql([1, 2, [3, 4]]);
        });
        it('strings', function() {
            expect(subscript(['@foo'])).to.eql(['foo']);
        });
    });

    describe('math', function() {
        it('+', function() {
            expect(subscript(['+', 1, 1])).to.eql(2);
        });
        it('-', function() {
            expect(subscript(['-', 1, 1])).to.eql(0);
            expect(subscript(['-', 3, 1])).to.eql(2);
            expect(subscript(['-', 3, 6])).to.eql(-3);
        });
        it('*', function() {
            expect(subscript(['*', 2, 1])).to.eql(2);
            expect(subscript(['*', 2, 2])).to.eql(4);
        });
        it('/', function() {
            expect(subscript(['/', 2, 1])).to.eql(2);
            expect(subscript(['/', 2, 2])).to.eql(1);
            expect(subscript(['/', 1, 2])).to.eql(0.5);
        });
    });

    describe('comparison operators', function() {
        it('>', function() {
            expect(subscript(['>', 2, 1])).to.eql(true);
            expect(subscript(['>', 2, 2])).to.eql(false);
            expect(subscript(['>', 1, 2])).to.eql(false);
        });
        it('<', function() {
            expect(subscript(['<', 2, 1])).to.eql(false);
            expect(subscript(['<', 2, 2])).to.eql(false);
            expect(subscript(['<', 1, 2])).to.eql(true);
        });
        it('>=', function() {
            expect(subscript(['>=', 2, 1])).to.eql(true);
            expect(subscript(['>=', 2, 2])).to.eql(true);
            expect(subscript(['>=', 1, 2])).to.eql(false);
        });
        it('<=', function() {
            expect(subscript(['<=', 2, 1])).to.eql(false);
            expect(subscript(['<=', 2, 2])).to.eql(true);
            expect(subscript(['<=', 1, 2])).to.eql(true);
        });
        it('=', function() {
            expect(subscript(['=', 2, 1])).to.eql(false);
            expect(subscript(['=', 2, 2])).to.eql(true);
            expect(subscript(['=', 1, 2])).to.eql(false);
        });
        it('!=', function() {
            expect(subscript(['!=', 2, 1])).to.eql(true);
            expect(subscript(['!=', 2, 2])).to.eql(false);
            expect(subscript(['!=', 1, 2])).to.eql(true);
        });
    });

    describe('trigonometry', function() {
        it('pi', function() {
            expect(subscript('pi')).to.eql(Math.PI);
        });
        it('e', function() {
            expect(subscript('e')).to.eql(Math.E);
        });
        it('sin', function() {
            expect(subscript(['sin', 0])).to.eql(0);
            expect(subscript(['sin', ['/', 'pi', 2]])).to.eql(1);
        });
        it('cos', function() {
            expect(subscript(['cos', 0])).to.eql(1);
            expect(subscript(['cos', 'pi'])).to.eql(-1);
        });
    });

    describe('nested expressions', function() {
        it('can add', function() {
            expect(subscript(['+', ['+', 1, 1], 1])).to.eql(3);
        });
        it('can subtract', function() {
            expect(subscript(['+', ['-', 1, 1], 1])).to.eql(1);
        });
    });

    describe('identity', function() {
        it('first', function() {
            expect(subscript(['first', 2, 1])).to.eql(2);
        });
        it('rest', function() {
            expect(subscript(['rest', 2, 1, 2, 3])).to.eql([1, 2, 3]);
        });
    });

    describe('let', function() {
        it('basic assign', function() {
            expect(subscript(['let', [['foo', 1]], ['foo']])).to.eql([1]);
            expect(subscript(['let', [['foo', 1], ['bar', 2]], 'bar'])).to.eql(2);
        });
        it('operations on let', function() {
            expect(subscript(['let', [['foo', 1], ['bar', 2]], ['+', 'foo', 'bar']])).to.eql(3);
        });
    });

    describe('if', function() {
        it('basic if', function() {
            expect(subscript(['if', true, ['@foo'], ['@bar']])).to.eql(['foo']);
            expect(subscript(['if', false, ['@foo'], ['@bar']])).to.eql(['bar']);
        });
    });

    describe('lambda', function() {
        it('identity lambda', function() {
            expect(subscript([['lambda', ['x'], ['x']], 1])).to.eql([1]);
        });

        it('list lambda', function() {
            expect(subscript([['lambda', ['x'], ['x', 'x']], 1])).to.eql([1, 1]);
        });

        it('math lambda', function() {
            expect(subscript([['lambda', ['x'], ['+', 'x', 'x']], 1])).to.eql(2);
            expect(subscript([['lambda', ['x'], ['*', 'x', 'x']], [2]])).to.eql(4);
        });
    });
});
