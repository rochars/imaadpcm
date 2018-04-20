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

const byteData = require("byte-data");
const int16 = byteData.int16;

var indexTable = [
    -1, -1, -1, -1, 2, 4, 6, 8,
    -1, -1, -1, -1, 2, 4, 6, 8];

var stepTable = [
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

var encoderPredicted = 0;
var encoderIndex = 0;
var encoderStep = 7;
var decoderPredicted = 0;
var decoderIndex = 0;
var decoderStep = 7;

/**
 * Compress a 16-bit PCM sample into a 4-bit ADPCM sample.
 * @param {number} sample The sample.
 * @return {number}
 */
function encodeSample(sample) {
    let delta = sample - encoderPredicted;
    let value = 0;
    if (delta >= 0) {
        value = 0;
    }
    else {
        value = 8;
        delta = -delta;
    }
    let step = stepTable[encoderIndex];
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
    if (value & 8) {
        encoderPredicted -= diff;
    }
    else {
        encoderPredicted += diff;
    }
    if (encoderPredicted < -0x8000) {
        encoderPredicted = -0x8000;
    } else if (encoderPredicted > 0x7fff) {
        encoderPredicted = 0x7fff;
    }
    encoderIndex += indexTable[value & 7];
    if (encoderIndex < 0) {
        encoderIndex = 0;
    } else if (encoderIndex > 88) {
        encoderIndex = 88;
    }
    return value;
}

/**
 * Decode a 4-bit ADPCM sample into a 16-bit PCM sample.
 * @param {number} nibble A 4-bit adpcm sample.
 * @return {number}
 */
function decodeSample(nibble) {
    let difference = 0;
    if (nibble & 4) {
        difference += decoderStep;
    }
    if (nibble & 2) {
        difference += decoderStep >> 1;
    }
    if (nibble & 1) {
        difference += decoderStep >> 2;
    }
    difference += decoderStep >> 3;
    if (nibble & 8) {
        difference = -difference;
    }
    decoderPredicted += difference;
    if (decoderPredicted > 32767) {
        decoderPredicted = 32767;
    } else if (decoderPredicted < -32767) {
        decoderPredicted = -32767;
    }
    decoderIndex += indexTable[nibble];
    if (decoderIndex < 0) {
        decoderIndex = 0;
    } else if (decoderIndex > 88) {
        decoderIndex = 88;
    }
    decoderStep = stepTable[decoderIndex];
    return decoderPredicted;
}

/**
 * Return the head of a ADPCM sample block.
 * @param {number} sample The first sample of the block.
 * @return {!Array<number>}
 */
function blockHead(sample) {
    encodeSample(sample);
    let adpcmSamples = [];
    adpcmSamples.push(byteData.pack(sample, int16)[0]);
    adpcmSamples.push(byteData.pack(sample, int16)[1]);
    adpcmSamples.push(encoderIndex);
    adpcmSamples.push(0);
    return adpcmSamples;
}

/**
 * Encode a block of 505 16-bit samples as 4-bit ADPCM samples.
 * @param {!Array<number>} block A sample block of 505 samples.
 * @return {!Array<number>}
 */
function encodeBlock(block) {
    let adpcmSamples = blockHead(block[0]);
    for (let i=3; i<block.length; i+=2) {
        let sample2 = encodeSample(block[i]);
        let sample = encodeSample(block[i + 1]);
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
    decoderPredicted = byteData.unpack([block[0], block[1]], int16);
    decoderIndex = block[2];
    decoderStep = stepTable[decoderIndex];
    let result = [
            decoderPredicted,
            byteData.unpack([block[2], block[3]], int16)
        ];
    for (let i=4; i<block.length; i++) {
        let original_sample = block[i];
        let second_sample = original_sample >> 4;
        let first_sample = (second_sample << 4) ^ original_sample;
        result.push(decodeSample(first_sample));
        result.push(decodeSample(second_sample));
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

module.exports.encode = encode;
module.exports.decode = decode;
module.exports.encodeBlock = encodeBlock;
module.exports.decodeBlock = decodeBlock;
