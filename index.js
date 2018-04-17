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
    }
    else if (encoderPredicted > 0x7fff) {
        encoderPredicted = 0x7fff;
    }
    encoderIndex += indexTable[value & 7];
    if (encoderIndex < 0) {
        encoderIndex = 0;
    }
    else if (encoderIndex > 88) {
        encoderIndex = 88;
    }
    return value;
}

function blockHead(sample) {
    encodeSample(sample);
    let adpcmSamples = [];
    adpcmSamples.push(byteData.pack(sample, int16)[0]);
    adpcmSamples.push(byteData.pack(sample, int16)[1]);
    adpcmSamples.push(encoderIndex);
    adpcmSamples.push(0);
    return adpcmSamples;
}

function encodeBlock(block) {
    let adpcmSamples = blockHead(block[0]);
    let x = 0;
    for (let i=1; i<block.length; i++) {
        x++;
        if (x == 1) {
            let sample2 = encodeSample(block[i]);
            let sample = encodeSample(block[i + 1]);
            adpcmSamples.push((sample << 4) | sample2);
        } else {
            x = 0;
        }
    }
    while (adpcmSamples.length < 256) {
        adpcmSamples.push(0);
    }
    return adpcmSamples;
}

function decodeSample(neeble) {
    let difference = 0;
    if (neeble & 4) {
        difference += decoderStep;
    }
    if (neeble & 2) {
        difference += decoderStep >> 1;
    }
    if (neeble & 1) {
        difference += decoderStep >> 2;
    }
    difference += decoderStep >> 3;
    if (neeble & 8) {
        difference = -difference;
    }
    decoderPredicted += difference;
    if (decoderPredicted > 32767) {
        decoderPredicted = 32767;
    } else if (decoderPredicted < -32767) {
        decoderPredicted = -32767;
    }
    decoderIndex += indexTable[neeble];
    if (decoderIndex < 0) {
        decoderIndex = 0;
    } else if (decoderIndex > 88) {
        decoderIndex = 88;
    }
    decoderStep = stepTable[decoderIndex];
    return decoderPredicted;
}

function decodeBlock(block) {
    decoderPredicted = byteData.unpack([block[0], block[1]], int16);
    decoderIndex = block[2];
    decoderStep = stepTable[decoderIndex];
    let result = [decoderPredicted];
    for (let i=4; i<block.length; i++) {
        let original_sample = block[i];
        let second_sample = original_sample >> 4;
        let first_sample = (second_sample << 4) ^ original_sample;
        result.push(decodeSample(first_sample));
        result.push(decodeSample(second_sample));
    }
    return result;
}

function encode(samples) {
    let adpcmSamples = [];
    let block = [];
    let x = 0;
    for (let i=0;i<samples.length;i++) {
        if (x < 505) {
            block.push(samples[i]);
            x++;
        } else {
            adpcmSamples = adpcmSamples.concat(encodeBlock(block));
            block = [];
            x = 0;
        }
    }
    return adpcmSamples;
}

function decode(adpcmSamples, blockAlign=256) {
    let samples = [];
    let block = [];
    let x = 0;
    for (let i=0; i<adpcmSamples.length; i++) {
        if (x < blockAlign - 1) {
            block.push(adpcmSamples[i]);
            x++;
        } else {
            samples = samples.concat(decodeBlock(block));
            block = [];
            x = 0;
        }
    }
    return samples;
}

module.exports.encode = encode;
module.exports.decode = decode;
module.exports.encodeBlock = encodeBlock;
module.exports.decodeBlock = decodeBlock;
