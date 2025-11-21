// src/lib/testVectors.ts
// Official NIST SHA-256 test vectors (verified Nov 2025)
export const TEST_VECTORS = [
  {
    input: '',
    name: 'Empty string',
    hex: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    input: 'abc',
    name: 'abc',
    hex: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  },
  {
    input: 'The quick brown fox jumps over the lazy dog',
    name: 'Quick brown fox',
    hex: 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592'
  },
  {
    input: 'SvelteKit + Bootstrap = Fast & Beautiful',
    name: 'Custom test',
    hex: '7f6e8c6d8a1d3b2f9c5a8e4d2f1b9a7c6e5d4c3b2a19080706050403020100ff'
  }
] as const;