# Distribution
This library is a ES6 module also distributed as a CommonJS module, UMD module and a compiled script for browsers. It works out of the box in Node when installed with ```npm install imaadpcm```.

## If you are using this lib in a browser:

You may load both **imaadpcm.umd.js** and **imaadpcm.min.js** in the browser with ```<script>``` tags. Ideally you should use **imaadpcm.min.js**. You can load it via the https://unpkg.com and https://www.jsdelivr.com/ CDNs:

[unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/imaadpcm"></script>
```

[jsDelivr](https://www.jsdelivr.com):
```html
<script src="https://cdn.jsdelivr.net/npm/imaadpcm"></script>
```

## If you are using this lib as a dependency:

- The **CommonJS** is the dist file used by Node. It is served in the "main" field of package.json. It includes all the sources but no dependencies. Dependencies will be imported from the **node_modules** folder. This is the source you are running when you **npm install imaadpcm**.

- The **UMD** module is compatible with Node, AMD and browsers. It is served in the "browser" field of package.json. It includes all dependencies. This file is not compiled/minified as it may be used by module bundlers. Compilation/minification should be up to the bundler consuming this file.

- The **compiled dist** is browser-only and should be the one served by CDNs. It includes all the dependencies. It is used in the "unpkg" and "jsdelivr" fields of package.json.

- The **ES6 dist** is **imaadpcm.js**, served as "es2015" in package.json. It includes all the dependencies. It is not compiled/minified.

- **./index.js** is served as "module" in package.json. It should be used by systems that support ES modules and are aware of Node's module path resolution (a module bundler, for instance). This should be the entry point for bundlers in most cases - this will avoid code duplication in the case of shared dependencies (as opposed to using "browser" as the entry point).

If your module bundler is using "browser" as the entry point **your dist should work the same** but will be a larger file.

## LICENSE
Derived from https://github.com/acida/pyima  
Copyright (c) 2016 acida. MIT License.  
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
