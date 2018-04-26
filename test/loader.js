/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcm
 *
 */

let imaadpcm = require('../index.js');

if (process.argv[3] == '--dist') {
    require('browser-env')();let assert = require('assert');
    require('../dist/imaadpcm-min.js');
    imaadpcm = window.imaadpcm;
}

module.exports = imaadpcm;
