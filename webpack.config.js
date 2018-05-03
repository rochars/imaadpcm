/**
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/wavefile
 *
 */
const ClosureCompiler = require('google-closure-compiler-js').webpack;
module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/imaadpcm-min.js'
  },
  plugins: [
    new ClosureCompiler({
      options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: "VERBOSE"
      }
    })
  ],
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: 'module.exports.encode = encode',
              replace: "window['imaadpcm'] = window['imaadpcm'] ? window['imaadpcm'] : {};" +
              "window['imaadpcm']['encode'] = encode",
            },
            {
              search: 'module.exports.decode = decode',
              replace: "window['imaadpcm']['decode'] = decode",
            },
            {
              search: 'module.exports.encodeBlock = encodeBlock',
              replace: "window['imaadpcm']['encodeBlock'] = encodeBlock",
            },
            {
              search: 'module.exports.decodeBlock = decodeBlock',
              replace: "window['imaadpcm']['decodeBlock'] = decodeBlock",
            },
          ]
        }
      }
    ]
  }
};