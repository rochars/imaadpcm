/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcms
 *
 */

let imaadpcm;

// Browser
if (process.argv[3] == '--min') {
	console.log('browser');
    require('browser-env')();
    require('../dist/imaadpcm.min.js');
    imaadpcm = window.imaadpcm;

// UMD
} else if (process.argv[3] == '--umd') {
	console.log('umd');
	imaadpcm = require('../dist/imaadpcm.umd.js');

// CommonJS
} else if (process.argv[3] == '--cjs') {
	console.log('cjs');
	imaadpcm = require('../dist/imaadpcm.cjs.js');

// esm
} else if (process.argv[3] == '--esm') {
	console.log('esm');
	require = require("esm")(module);
	global.module = module;
	imaadpcm = require('../dist/imaadpcm.js');

// ESM
} else {
	console.log('source');
	imaadpcm = require('../index.js');
}

module.exports = imaadpcm;
