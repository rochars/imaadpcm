# imaadpcm
JavaScript IMA ADPCM codec.  
Copyright (c) 2018 Rafael da Silva Rocha.  
https://github.com/rochars/imaadpcm

References:  
http://www.cs.columbia.edu/~hgs/audio/dvi/  
https://github.com/acida/pyima  
https://wiki.multimedia.cx/index.php/IMA_ADPCM

[![NPM version](https://img.shields.io/npm/v/imaadpcm.svg?style=for-the-badge)](https://www.npmjs.com/package/imaadpcm) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/imaadpcm/index.html)

## Install
```
npm install imaadpcm
```

## Example
```javascript
const imaadpcm = require("imaadpcm");
```

## Use
```javascript
// Encoding a full file
adpcm_samples = imaadpcm.encode(samples);

// Decoding a full file (256 block align is assumed by default)
samples = imaadpcm.decode(adpcm_samples);

// Decoding a full file with a different block align (1024)
samples = imaadpcm.decode(adpcm_samples, 1024);
```

## LICENSE
Copyright (c) 2018 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
