/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcm
 *
 */

let imaadpcm;

if (process.argv[3] == '--dist') {
    require('browser-env')();
    require('../dist/imaadpcm.min.js');
    imaadpcm = window.imaadpcm;
} else {
	imaadpcm = require('../index.js');
}

module.exports = imaadpcm;
