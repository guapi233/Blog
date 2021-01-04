/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const hash = {};

  strs.forEach((str) => {
    const sortedStr = str.split("").sort().join("");

    hash[sortedStr] ? hash[sortedStr].push(str) : (hash[sortedStr] = [str]);
  });

  return [...Object.values(hash)];
};
