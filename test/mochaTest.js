/**
 * Created by Nick on 12/3/2015.
 */
'use strict';
var assert = require('assert');

describe('Math', function () {
    describe('Test equalities', function () {
        it('should not be equal', function() {
            assert.notEqual(5, 7);
        });

        it('should be equal', function () {
            assert.equal(Math.pow(2, 8), 256);
        });
    });

    describe('Test string', function() {
        it('should find length', function() {
            assert.equal("String".length, 6);
        })
    })
});
