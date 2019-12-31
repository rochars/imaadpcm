/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcm
 * 
 */

var imaadpcm = imaadpcm || require("../../test/loader.js");
var assert = assert || require('assert');

describe('decode', function() {
    
    var block = [];
    for (var i=0; i<2000; i++) {
    	block.push(Math.floor(Math.random()*255) + 1);
    }

    it("Should decode blocks of ADPCM samples",
        function() {
            assert.ok(imaadpcm.decode(block));
        });
});
