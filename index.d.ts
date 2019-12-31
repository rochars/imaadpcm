// Type definitions for imaadpcm 5.0
// Project: https://github.com/rochars/imaadpcm
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/imaadpcm

/**
 * Encode 16-bit PCM samples into 4-bit IMA ADPCM samples.
 * @param {!Int16Array} samples A array of samples.
 * @return {!Uint8Array}
 */
export function encode(samples: Int16Array): Uint8Array;

/**
 * Decode IMA ADPCM samples into 16-bit PCM samples.
 * @param {!Uint8Array} adpcmSamples A array of ADPCM samples.
 * @param {number} blockAlign The block size.
 * @return {!Int16Array}
 */
export function decode(samples: Uint8Array, blockAlign?: number): Int16Array;

/**
 * Encode a block of 505 16-bit samples as 4-bit ADPCM samples.
 * @param {!Array<number>} block A sample block of 505 samples.
 * @return {!Array<number>}
 */
export function encodeBlock(block: Array<number>): Array<number>;

/**
 * Decode a block of ADPCM samples into 16-bit PCM samples.
 * @param {!Array<number>} block A adpcm sample block.
 * @return {!Array<number>}
 */
export function decodeBlock(block: Array<number>): Array<number>;
