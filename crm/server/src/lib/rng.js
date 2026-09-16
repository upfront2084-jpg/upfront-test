// Small seeded PRNG (mulberry32) so demo data is reproducible across
// `npm run seed` runs, and helpers built on top of it.

export function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRandom(seed = 42) {
  const rnd = mulberry32(seed);

  function float() {
    return rnd();
  }
  function int(min, max) {
    return Math.floor(rnd() * (max - min + 1)) + min;
  }
  function bool(p = 0.5) {
    return rnd() < p;
  }
  function pick(arr) {
    return arr[int(0, arr.length - 1)];
  }
  function pickN(arr, n) {
    const copy = [...arr];
    const out = [];
    for (let i = 0; i < n && copy.length; i++) {
      out.push(copy.splice(int(0, copy.length - 1), 1)[0]);
    }
    return out;
  }
  function weighted(pairs) {
    // pairs: [[value, weight], ...]
    const total = pairs.reduce((s, p) => s + p[1], 0);
    let r = rnd() * total;
    for (const [value, weight] of pairs) {
      if (r < weight) return value;
      r -= weight;
    }
    return pairs[pairs.length - 1][0];
  }

  return { float, int, bool, pick, pickN, weighted };
}
