/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcm
 * 
 */

var imaadpcm = imaadpcm || require("../../test/loader.js");
var assert = assert || require('assert');

describe('encode', function() {
    let block = [];
    for (let i=0; i<2000; i++) {
    	let num = (Math.floor(Math.random()*32767) + 1) *
            (Math.floor(Math.random()*2) == 1 ? 1 : -1);
    	block.push(num);
    }

    it("Should encode blocks of 16-bit samples",
        function() {
            assert.ok(imaadpcm.encode(block));
        });
});
