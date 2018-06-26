# imaadpcm
Copyright (c) 2018 Rafael da Silva Rocha.  
https://github.com/rochars/imaadpcm

[![NPM version](https://img.shields.io/npm/v/imaadpcm.svg?style=for-the-badge)](https://www.npmjs.com/package/imaadpcm) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/imaadpcm/index.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/imaadpcm.svg?style=flat-square)](https://codecov.io/gh/rochars/imaadpcm) [![Unix Build](https://img.shields.io/travis/rochars/imaadpcm.svg?style=flat-square)](https://travis-ci.org/rochars/imaadpcm) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/imaadpcm.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/imaadpcm) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/imaadpcm.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/imaadpcm/)

IMA ADPCM codec in JavaScript.

## Install
```
npm install imaadpcm
```

## Use

### ES6
import imaadpcm from **imaadpcm.js**:
```javascript
import * as imaadpcm from 'imaadpcm.js';
let adpcmSamples = imaadpcm.encode(pcmSamples);
```

### Node
```javascript
const imaadpcm = require("imaadpcm");
let adpcmSamples = imaadpcm.encode(pcmSamples);
```

### Browser
Use the compiled file in the */dist* folder:
```html
<script src="imaadpcm.min.js"></script>
<script>
    var adpcmSamples = imaadpcm.encode(pcmSamples);
    pcmSamples = imaadpcm.decode(adpcmSamples);
    var adpcmBlock = imaadpcm.encodeBlock(pcmBlock);
    pcmBlock = imaadpcm.decodeBlock(adpcmBlock);
</script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/imaadpcm@3"></script>
```

Or get it from [unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/imaadpcm@3"></script>
```

Or as a ES6 module in modern browsers from [jspm](https://jspm.io):
```html
<script type="module">
  import imaadpcm from 'https://dev.jspm.io/imaadpcm';
  // ...
</script>
```

## Examples

### Files:
```javascript
const imaadpcm = require("imaadpcm");

// Compressing all the samples in a file
// Only 16-bit samples are supported
adpcm_samples = imaadpcm.encode(samples);

// Decompressing all the samples in a file
// 256 block align is assumed by default
samples = imaadpcm.decode(adpcm_samples);

// Decompressig all the samples in a file
// Using a different block align (1024)
samples = imaadpcm.decode(adpcm_samples, 1024);
```

### Streaming:
```javascript
const imaadpcm = require("imaadpcm");

// Decompressing a ADPCM block
// 256 block align is assumed by default
samples = imaadpcm.decodeBlock(adpcm_block);

// Decompressing using a different block align (1024)
samples = imaadpcm.decodeBlock(adpcm_block, 1024);

// Compressing PCM samples into a block of ADPCM samples
// Only blocks of 505 samples are supported as input
// Only 16-bit samples are supported as input
adpcm_samples = imaadpcm.encodeBlock(sample_block);

```

## API
```javascript
/**
 * Encode 16-bit PCM samples into 4-bit IMA ADPCM samples.
 * @param {!Array<number>} samples A array of samples.
 * @return {!Array<number>}
 */
function encode(samples) {}

/**
 * Decode IMA ADPCM samples into 16-bit PCM samples.
 * @param {!Array<number>} adpcmSamples A array of ADPCM samples.
 * @param {number} blockAlign The block size.
 * @return {!Array<number>}
 */
function decode(adpcmSamples, blockAlign=256) {}

/**
 * Encode a block of 505 16-bit samples as 4-bit ADPCM samples.
 * @param {!Array<number>} block A sample block of 505 samples.
 * @return {!Array<number>}
 */
function encodeBlock(block) {}

/**
 * Decode a block of ADPCM samples into 16-bit PCM samples.
 * @param {!Array<number>} block A adpcm sample block.
 * @return {!Array<number>}
 */
function decodeBlock(block) {}
```

## Distribution
This library is a ES6 module also distributed as a CommonJS module, UMD and a compiled script for browsers.

- The **CommonJS** is the one used by Node. It is served in the "main" field of package.json
- The **UMD** module is compatible with Node, AMD and browsers. It is served in the "browser" field.
- The **compiled dist** is browser-only and should be the one served by CDNs.
- The **ES6** dist is **imaadpcm.js**, served as "module" in package.json

You may load both **imaadpcm.umd.js** and **imaadpcm.min.js** in the browser with ```<script>``` tags.

## References
http://www.cs.columbia.edu/~hgs/audio/dvi/  
https://github.com/acida/pyima

### LICENSE
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
