module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/imaadpcm.js'
  },
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: 'module.exports = imaadpcm',
              replace: "window['imaadpcm'] = imaadpcm",
            }
          ]
        }
      }
    ]
  }
};