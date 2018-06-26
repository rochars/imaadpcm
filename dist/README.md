# Distribution

This library is a ES6 module also distributed as a CommonJS module, UMD and a compiled script for browsers.

- The **CommonJS** is the one used by Node. It is served in the "main" field of package.json
- The **UMD** module is compatible with Node, AMD and browsers. It is served in the "browser" field.
- The **compiled dist** is browser-only and should be the one served by CDNs.
- The **ES6** dist is **imaadpcm.js**, served as "module" in package.json

You may load both **imaadpcm.umd.js** and **imaadpcm.min.js** in the browser with ```<script>``` tags.
