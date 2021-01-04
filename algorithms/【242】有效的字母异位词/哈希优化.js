/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const hash = {};
  let flag = 0;

  for (let i = 0; i < s.length; i++) {
    hash[s[i]] !== undefined ? (hash[s[i]] += 1) : (hash[s[i]] = 1);
    flag++;
  }

  for (let i = 0; i < t.length; i++) {
    if (hash[t[i]]) {
      hash[t[i]] -= 1;
      flag--;
    }
  }

  return !flag;
};

console.log(isAnagram("anagram", "nagaram"));
