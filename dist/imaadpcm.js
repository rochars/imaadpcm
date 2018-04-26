/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*!
 * imaadpcm
 * JavaScript IMA ADPCM codec.
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/imaadpcm
 *
 * References:
 * http://www.cs.columbia.edu/~hgs/audio/dvi/
 * https://github.com/acida/pyima
 * https://wiki.multimedia.cx/index.php/IMA_ADPCM
 * 
 */

/** @private */
const INDEX_TABLE = [
    -1, -1, -1, -1, 2, 4, 6, 8,
    -1, -1, -1, -1, 2, 4, 6, 8];
/** @private */
const STEP_TABLE = [
    7, 8, 9, 10, 11, 12, 13, 14,
    16, 17, 19, 21, 23, 25, 28, 31,
    34, 37, 41, 45, 50, 55, 60, 66,
    73, 80, 88, 97, 107, 118, 130, 143,
    157, 173, 190, 209, 230, 253, 279, 307,
    337, 371, 408, 449, 494, 544, 598, 658,
    724, 796, 876, 963, 1060, 1166, 1282, 1411,
    1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024,
    3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484,
    7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899,
    15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794,
    32767];
/** @private */
var encoderPredicted_ = 0;
/** @private */
var encoderIndex_ = 0;
/** @private */
var encoderStep_ = 7;
/** @private */
var decoderPredicted_ = 0;
/** @private */
var decoderIndex_ = 0;
/** @private */
var decoderStep_ = 7;

/**
 * Sign a 16-bit integer.
 * @param {number} num A 16-bit integer.
 * @return {number}
 * @private
 */
function sign_(num) {
    return num > 32768 ? num - 65536 : num;
}

/**
 * Set the value for encoderPredicted_ and encoderIndex_
 * after each sample is compressed.
 * @param {number} value The compressed ADPCM sample
 * @param {number} diff The calculated difference
 * @private
 */
function setEncoderInfo_(value, diff) {
    if (value & 8) {
        encoderPredicted_ -= diff;
    } else {
        encoderPredicted_ += diff;
    }
    if (encoderPredicted_ < -0x8000) {
        encoderPredicted_ = -0x8000;
    } else if (encoderPredicted_ > 0x7fff) {
        encoderPredicted_ = 0x7fff;
    }
    encoderIndex_ += INDEX_TABLE[value & 7];
    if (encoderIndex_ < 0) {
        encoderIndex_ = 0;
    } else if (encoderIndex_ > 88) {
        encoderIndex_ = 88;
    }
}

/**
 * Compress a 16-bit PCM sample into a 4-bit ADPCM sample.
 * @param {number} sample The sample.
 * @return {number}
 * @private
 */
function encodeSample_(sample) {
    let delta = sample - encoderPredicted_;
    let value = 0;
    if (delta >= 0) {
        value = 0;
    } else {
        value = 8;
        delta = -delta;
    }
    let step = STEP_TABLE[encoderIndex_];
    let diff = step >> 3;
    if (delta > step) {
        value |= 4;
        delta -= step;
        diff += step;
    }
    step >>= 1;
    if (delta > step) {
        value |= 2;
        delta -= step;
        diff += step;
    }
    step >>= 1;
    if (delta > step) {
        value |= 1;
        diff += step;
    }
    setEncoderInfo_(value, diff);
    return value;
}

/**
 * Decode a 4-bit ADPCM sample into a 16-bit PCM sample.
 * @param {number} nibble A 4-bit adpcm sample.
 * @return {number}
 * @private
 */
function decodeSample_(nibble) {
    let difference = 0;
    if (nibble & 4) {
        difference += decoderStep_;
    }
    if (nibble & 2) {
        difference += decoderStep_ >> 1;
    }
    if (nibble & 1) {
        difference += decoderStep_ >> 2;
    }
    difference += decoderStep_ >> 3;
    if (nibble & 8) {
        difference = -difference;
    }
    decoderPredicted_ += difference;
    if (decoderPredicted_ > 32767) {
        decoderPredicted_ = 32767;
    } else if (decoderPredicted_ < -32767) {
        decoderPredicted_ = -32767;
    }
    decoderIndex_ += INDEX_TABLE[nibble];
    if (decoderIndex_ < 0) {
        decoderIndex_ = 0;
    } else if (decoderIndex_ > 88) {
        decoderIndex_ = 88;
    }
    decoderStep_ = STEP_TABLE[decoderIndex_];
    return decoderPredicted_;
}

/**
 * Return the head of a ADPCM sample block.
 * @param {number} sample The first sample of the block.
 * @return {!Array<number>}
 * @private
 */
function blockHead_(sample) {
    encodeSample_(sample);
    let adpcmSamples = [];
    adpcmSamples.push(sample & 0xFF);
    adpcmSamples.push((sample >> 8) & 0xFF);
    adpcmSamples.push(encoderIndex_);
    adpcmSamples.push(0);
    return adpcmSamples;
}

/**
 * Encode a block of 505 16-bit samples as 4-bit ADPCM samples.
 * @param {!Array<number>} block A sample block of 505 samples.
 * @return {!Array<number>}
 */
function encodeBlock(block) {
    let adpcmSamples = blockHead_(block[0]);
    for (let i=3; i<block.length; i+=2) {
        let sample2 = encodeSample_(block[i]);
        let sample = encodeSample_(block[i + 1]);
        adpcmSamples.push((sample << 4) | sample2);
    }
    while (adpcmSamples.length < 256) {
        adpcmSamples.push(0);
    }
    return adpcmSamples;
}

/**
 * Decode a block of 256 ADPCM samples into 16-bit PCM samples.
 * @param {!Array<number>} block A adpcm sample block of 256 samples.
 * @return {!Array<number>}
 */
function decodeBlock(block) {
    decoderPredicted_ = sign_((block[1] << 8) | block[0]);
    decoderIndex_ = block[2];
    decoderStep_ = STEP_TABLE[decoderIndex_];
    let result = [
            decoderPredicted_,
            sign_((block[3] << 8) | block[2])
        ];
    for (let i=4; i<block.length; i++) {
        let original_sample = block[i];
        let second_sample = original_sample >> 4;
        let first_sample = (second_sample << 4) ^ original_sample;
        result.push(decodeSample_(first_sample));
        result.push(decodeSample_(second_sample));
    }
    return result;
}

/**
 * Encode 16-bit PCM samples into 4-bit IMA ADPCM samples.
 * @param {!Array<number>} samples A array of samples.
 * @return {!Array<number>}
 */
function encode(samples) {
    let adpcmSamples = [];
    let block = [];
    for (let i=0; i<samples.length; i++) {
        block.push(samples[i]);
        if ((i % 505 == 0 && i != 0) || i == samples.length - 1) {
            adpcmSamples = adpcmSamples.concat(encodeBlock(block));
            block = [];
        }
    }
    return adpcmSamples;
}

/**
 * Decode IMA ADPCM samples into 16-bit PCM samples.
 * @param {!Array<number>} adpcmSamples A array of ADPCM samples.
 * @param {number} blockAlign The block size.
 * @return {!Array<number>}
 */
function decode(adpcmSamples, blockAlign=256) {
    let samples = [];
    let block = [];
    for (let i=0; i<adpcmSamples.length; i++) {
        if (i % blockAlign == 0 && i != 0) {            
            samples = samples.concat(decodeBlock(block));
            block = [];
        }
        block.push(adpcmSamples[i]);
    }
    return samples;
}

window['imaadpcm'] = window['imaadpcm'] ? window['imaadpcm'] : {};window['imaadpcm']['encode'] = encode;
window['imaadpcm']['decode'] = decode;
window['imaadpcm']['encodeBlock'] = encodeBlock;
window['imaadpcm']['decodeBlock'] = decodeBlock;


/***/ })
/******/ ]);