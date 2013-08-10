var expect = require('expect.js'),
    frisk = require('../');

describe('basic things', function() {
    describe('atoms', function() {
        it('numbers', function() {
            expect(frisk([1])).to.eql([1]);
        });
        it('lists', function() {
            expect(frisk([1, 2])).to.eql([1, 2]);
        });
        it('nested lists', function() {
            expect(frisk([1, 2, [3, 4]])).to.eql([1, 2, [3, 4]]);
        });
        it('strings', function() {
            expect(frisk(['@foo'])).to.eql(['foo']);
        });
    });

    describe('math', function() {
        it('+', function() {
            expect(frisk(['+', 1, 1])).to.eql(2);
        });
        it('-', function() {
            expect(frisk(['-', 1, 1])).to.eql(0);
            expect(frisk(['-', 3, 1])).to.eql(2);
            expect(frisk(['-', 3, 6])).to.eql(-3);
        });
        it('*', function() {
            expect(frisk(['*', 2, 1])).to.eql(2);
            expect(frisk(['*', 2, 2])).to.eql(4);
        });
        it('/', function() {
            expect(frisk(['/', 2, 1])).to.eql(2);
            expect(frisk(['/', 2, 2])).to.eql(1);
            expect(frisk(['/', 1, 2])).to.eql(0.5);
        });
    });

    describe('comparison operators', function() {
        it('>', function() {
            expect(frisk(['>', 2, 1])).to.eql(true);
            expect(frisk(['>', 2, 2])).to.eql(false);
            expect(frisk(['>', 1, 2])).to.eql(false);
        });
        it('<', function() {
            expect(frisk(['<', 2, 1])).to.eql(false);
            expect(frisk(['<', 2, 2])).to.eql(false);
            expect(frisk(['<', 1, 2])).to.eql(true);
        });
        it('>=', function() {
            expect(frisk(['>=', 2, 1])).to.eql(true);
            expect(frisk(['>=', 2, 2])).to.eql(true);
            expect(frisk(['>=', 1, 2])).to.eql(false);
        });
        it('<=', function() {
            expect(frisk(['<=', 2, 1])).to.eql(false);
            expect(frisk(['<=', 2, 2])).to.eql(true);
            expect(frisk(['<=', 1, 2])).to.eql(true);
        });
        it('=', function() {
            expect(frisk(['=', 2, 1])).to.eql(false);
            expect(frisk(['=', 2, 2])).to.eql(true);
            expect(frisk(['=', 1, 2])).to.eql(false);
        });
        it('!=', function() {
            expect(frisk(['!=', 2, 1])).to.eql(true);
            expect(frisk(['!=', 2, 2])).to.eql(false);
            expect(frisk(['!=', 1, 2])).to.eql(true);
        });
    });

    describe('trigonometry', function() {
        it('pi', function() {
            expect(frisk('pi')).to.eql(Math.PI);
        });
        it('e', function() {
            expect(frisk('e')).to.eql(Math.E);
        });
        it('sin', function() {
            expect(frisk(['sin', 0])).to.eql(0);
            expect(frisk(['sin', ['/', 'pi', 2]])).to.eql(1);
        });
        it('cos', function() {
            expect(frisk(['cos', 0])).to.eql(1);
            expect(frisk(['cos', 'pi'])).to.eql(-1);
        });
    });

    describe('nested expressions', function() {
        it('can add', function() {
            expect(frisk(['+', ['+', 1, 1], 1])).to.eql(3);
        });
        it('can subtract', function() {
            expect(frisk(['+', ['-', 1, 1], 1])).to.eql(1);
        });
    });

    describe('identity', function() {
        it('first', function() {
            expect(frisk(['first', 2, 1])).to.eql(2);
        });
        it('rest', function() {
            expect(frisk(['rest', 2, 1, 2, 3])).to.eql([1, 2, 3]);
        });
    });

    describe('let', function() {
        it('basic assign', function() {
            expect(frisk(['let', [['foo', 1]], ['foo']])).to.eql([1]);
            expect(frisk(['let', [['foo', 1], ['bar', 2]], 'bar'])).to.eql(2);
        });
        it('operations on let', function() {
            expect(frisk(['let', [['foo', 1], ['bar', 2]], ['+', 'foo', 'bar']])).to.eql(3);
        });
    });

    describe('if', function() {
        it('basic if', function() {
            expect(frisk(['if', true, ['@foo'], ['@bar']])).to.eql(['foo']);
            expect(frisk(['if', false, ['@foo'], ['@bar']])).to.eql(['bar']);
        });
    });

    describe('lambda', function() {
        it('identity lambda', function() {
            expect(frisk([['lambda', ['x'], ['x']], 1])).to.eql([1]);
        });

        it('list lambda', function() {
            expect(frisk([['lambda', ['x'], ['x', 'x']], 1])).to.eql([1, 1]);
        });

        it('math lambda', function() {
            expect(frisk([['lambda', ['x'], ['+', 'x', 'x']], 1])).to.eql(2);
            expect(frisk([['lambda', ['x'], ['*', 'x', 'x']], [2]])).to.eql(4);
        });
    });
});
