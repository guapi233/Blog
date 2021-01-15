/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  let satisfied = 0,
    gIndex = (sIndex = 0);
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  while (gIndex < g.length && sIndex < s.length) {
    if (g[gIndex] <= s[sIndex]) satisfied++;
    else {
      sIndex++;
      continue;
    }

    gIndex++, sIndex++;
  }

  return satisfied;
};
