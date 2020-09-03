/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  while (s.includes("()") || s.includes("[]") || s.includes("{}")) {
    s = s.replace(/\(\)/g, "").replace(/\[\]/g, "").replace(/\{\}/g, "");
  }

  return !s.length;
};

console.log(isValid("([}}])"));
