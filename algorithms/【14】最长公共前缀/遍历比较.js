/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs[0]) return "";
  if (strs[0] === "") return "";

  let commonPrefix = "",
    standard = strs[0];

  for (let i = 0; i < standard.length; i++) {
    for (let j = 0; j < strs.length; j++) {
      if (standard[i] !== strs[j][i]) {
        return commonPrefix;
      }
    }

    commonPrefix += standard[i];
  }

  return commonPrefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
