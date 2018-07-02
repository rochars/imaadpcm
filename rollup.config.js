/*
 * https://github.com/rochars/imaadpcm
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import closure from 'rollup-plugin-closure-compiler-js';

// Read externs definitions
const fs = require('fs');
let externsSrc = fs.readFileSync('./externs.js', 'utf8');

// License notes
const license = '/*!\n'+
  ' * Derived directly from https://github.com/acida/pyima\n'+ 
  ' * Copyright (c) 2016 acida. MIT License.\n'+ 
  ' * Copyright (c) 2018 Rafael da Silva Rocha. MIT License.\n'+ 
  ' */\n';

export default [
  // cjs
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/imaadpcm.cjs.js',
        name: 'imaadpcm',
        format: 'cjs'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  },
  // umd, es
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/imaadpcm.umd.js',
        name: 'imaadpcm',
        format: 'umd'
      },
      {
        file: 'dist/imaadpcm.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  },
  // browser
  {
    input: 'index.js',
    output: [
      {
        name: 'imaadpcm',
        format: 'iife',
        file: 'dist/imaadpcm.min.js',
        banner: license,
        footer: 'window["imaadpcm"]=imaadpcm;'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        externs: [{src:externsSrc}]
      })
    ]
  }
];
