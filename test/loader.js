/**
 * Copyright (c) 2017-2019 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcms
 *
 */

let imaadpcm;

// UMD
if (process.argv[3] == '--umd') {
	console.log('umd');
	imaadpcm = require('../dist/imaadpcm.js');

} else {
	console.log('source');
	require = require("esm")(module);
	global.module = module;
	imaadpcm = require('../index.js');
}

module.exports = imaadpcm;
