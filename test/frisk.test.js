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
        it('can add', function() {
            expect(frisk(['+', 1, 1])).to.eql(2);
        });
        it('can subtract', function() {
            expect(frisk(['-', 1, 1])).to.eql(0);
            expect(frisk(['-', 3, 1])).to.eql(2);
            expect(frisk(['-', 3, 6])).to.eql(-3);
        });
        it('can multiply', function() {
            expect(frisk(['*', 2, 1])).to.eql(2);
            expect(frisk(['*', 2, 2])).to.eql(4);
        });
        it('can divide', function() {
            expect(frisk(['/', 2, 1])).to.eql(2);
            expect(frisk(['/', 2, 2])).to.eql(1);
            expect(frisk(['/', 1, 2])).to.eql(0.5);
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
});
