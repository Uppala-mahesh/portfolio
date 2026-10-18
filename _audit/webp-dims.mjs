// Reads WebP canvas dimensions straight from the RIFF chunk headers.
// Supports VP8X (extended), VP8 (lossy) and VP8L (lossless) payloads.
// Usage: node _audit/webp-dims.mjs
import { readFileSync, statSync } from 'node:fs';

function dims(file) {
  const b = readFileSync(file);
  if (b.toString('latin1', 0, 4) !== 'RIFF' || b.toString('latin1', 8, 12) !== 'WEBP') return null;
  const fourcc = b.toString('latin1', 12, 16);
  if (fourcc === 'VP8X') {
    const w = 1 + (b[24] | b[25] << 8 | b[26] << 16);
    const h = 1 + (b[27] | b[28] << 8 | b[29] << 16);
    return { chunk: 'VP8X', w, h };
  }
  if (fourcc === 'VP8 ') {
    const p = 20; // chunk header at 12..20, frame tag at 20..23, start code 9d 01 2a at 23..26
    if (b[p + 3] !== 0x9d || b[p + 4] !== 0x01 || b[p + 5] !== 0x2a) return { chunk: 'VP8 ', error: 'no start code' };
    const w = (b[p + 6] | b[p + 7] << 8) & 0x3fff;
    const h = (b[p + 8] | b[p + 9] << 8) & 0x3fff;
    return { chunk: 'VP8 ', w, h };
  }
  if (fourcc === 'VP8L') {
    const p = 20; // payload: 0x2f, then 14-bit width-1, 14-bit height-1 (LSB first)
    if (b[p] !== 0x2f) return { chunk: 'VP8L', error: 'bad signature' };
    const w = 1 + ((b[p + 1] | (b[p + 2] & 0x3f) << 8) & 0x3fff);
    const h = 1 + (((b[p + 2] >> 6) | b[p + 3] << 2 | (b[p + 4] & 0x03) << 10) & 0x3fff);
    return { chunk: 'VP8L', w, h };
  }
  return { error: 'unknown chunk ' + fourcc };
}

for (const f of ['nataraja-dark-1600.webp', 'nataraja-gold-1600.webp']) {
  const d = dims(f);
  const kb = (statSync(f).size / 1024).toFixed(1);
  console.log(f, JSON.stringify(d), kb + ' KB');
}
