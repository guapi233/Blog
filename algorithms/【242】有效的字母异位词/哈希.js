/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const sHash = {},
    tHash = {};

  for (let i = 0; i < s.length; i++) {
    sHash[s[i]] !== undefined ? (sHash[s[i]] += 1) : (sHash[s[i]] = 1);
  }

  for (let i = 0; i < t.length; i++) {
    tHash[t[i]] !== undefined ? (tHash[t[i]] += 1) : (tHash[t[i]] = 1);
  }

  if (Object.keys(sHash).length !== Object.keys(tHash).length) return false;
  for (let i in sHash) {
    if (sHash[i] !== tHash[i]) return false;
  }

  return true;
};

console.log(isAnagram("aacc", "ccac"));
