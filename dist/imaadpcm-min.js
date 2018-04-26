/*
 imaadpcm
 JavaScript IMA ADPCM codec.
 Copyright (c) 2018 Rafael da Silva Rocha.
 https://github.com/rochars/imaadpcm

 References:
 http://www.cs.columbia.edu/~hgs/audio/dvi/
 https://github.com/acida/pyima
 https://wiki.multimedia.cx/index.php/IMA_ADPCM

*/
(function(q){function f(c){if(h[c])return h[c].exports;var e=h[c]={i:c,l:!1,exports:{}};q[c].call(e.exports,e,e.exports,f);e.l=!0;return e.exports}var h={};f.m=q;f.c=h;f.d=function(c,e,h){f.o(c,e)||Object.defineProperty(c,e,{configurable:!1,enumerable:!0,get:h})};f.n=function(c){var e=c&&c.__esModule?function(){return c["default"]}:function(){return c};f.d(e,"a",e);return e};f.o=function(c,e){return Object.prototype.hasOwnProperty.call(c,e)};f.p="";return f(f.s=0)})([function(q,f){function h(b){return 32768<
b?b-65536:b}function c(b){var a=b-k;0<=a?b=0:(b=8,a=-a);var d=r[n],g=d>>3;a>d&&(b|=4,a-=d,g+=d);d>>=1;a>d&&(b|=2,a-=d,g+=d);d>>=1;a>d&&(b|=1,g+=d);a=b;k=a&8?k-g:k+g;-32768>k?k=-32768:32767<k&&(k=32767);n+=u[a&7];0>n?n=0:88<n&&(n=88);return b}function e(b){var a=0;b&4&&(a+=p);b&2&&(a+=p>>1);b&1&&(a+=p>>2);a+=p>>3;b&8&&(a=-a);l+=a;32767<l?l=32767:-32767>l&&(l=-32767);m+=u[b];0>m?m=0:88<m&&(m=88);p=r[m];return l}function t(b){var a=b[0];c(a);var d=[];d.push(a&255);d.push(a>>8&255);d.push(n);d.push(0);
for(a=3;a<b.length;a+=2){var g=c(b[a]),e=c(b[a+1]);d.push(e<<4|g)}for(;256>d.length;)d.push(0);return d}function v(b){l=h(b[1]<<8|b[0]);m=b[2];p=r[m];for(var a=[l,h(b[3]<<8|b[2])],d=4;d<b.length;d++){var g=b[d],c=g>>4;a.push(e(c<<4^g));a.push(e(c))}return a}var u=[-1,-1,-1,-1,2,4,6,8,-1,-1,-1,-1,2,4,6,8],r=[7,8,9,10,11,12,13,14,16,17,19,21,23,25,28,31,34,37,41,45,50,55,60,66,73,80,88,97,107,118,130,143,157,173,190,209,230,253,279,307,337,371,408,449,494,544,598,658,724,796,876,963,1060,1166,1282,
1411,1552,1707,1878,2066,2272,2499,2749,3024,3327,3660,4026,4428,4871,5358,5894,6484,7132,7845,8630,9493,10442,11487,12635,13899,15289,16818,18500,20350,22385,24623,27086,29794,32767],k=0,n=0,l=0,m=0,p=7;window.imaadpcm=window.imaadpcm?window.imaadpcm:{};window.imaadpcm.encode=function(b){for(var a=[],d=[],c=0;c<b.length;c++)if(d.push(b[c]),0==c%505&&0!=c||c==b.length-1)a=a.concat(t(d)),d=[];return a};window.imaadpcm.decode=function(b,a){a=void 0===a?256:a;for(var d=[],c=[],e=0;e<b.length;e++)0==
e%a&&0!=e&&(d=d.concat(v(c)),c=[]),c.push(b[e]);return d};window.imaadpcm.encodeBlock=t;window.imaadpcm.decodeBlock=v}]);
