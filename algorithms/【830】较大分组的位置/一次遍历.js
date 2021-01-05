/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function (s) {
  const result = [];
  let begin = (last = 0);

  for (let i = 1; i <= s.length; i++) {
    if (s[i] !== s[last]) {
      if (i - begin >= 3) result.push([begin, i - 1]);
      begin = i;
    }

    last = i;
  }

  return result;
};

console.log(largeGroupPositions("abbxxxxzzy"));
