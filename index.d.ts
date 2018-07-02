// Type definitions for imaadpcm 4.0
// Project: https://github.com/rochars/imaadpcm
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/imaadpcm

export function encode(samples: Int16Array): Uint8Array;

export function decode(samples: Uint8Array, blockAlign?: number): Int16Array;

export function encodeBlock(block: Array<number>): Array<number>;

export function decodeBlock(block: Array<number>): Array<number>;
