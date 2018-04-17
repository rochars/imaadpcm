/*!
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');

describe('decode', function() {
    let imaadpcm = require("../index.js")
    it("samples.length should be > 0",
        function() {
            assert.ok(imaadpcm.decode([0]));
        });
});
