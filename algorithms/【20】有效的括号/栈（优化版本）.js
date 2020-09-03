/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 !== 0) {
    return false;
  }

  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    /**
     * 1.如果不为")]}"其中一种直接push；
     * 2.如果为")]}"其中一种，但与栈顶元素不配对，直接push；
     * 3.配对的话pop栈顶元素
     * 4.放弃使用forEach是为了能在出现例如 “(]” 不配对情况时直接跳出函数给予false结果
     **/
    if (pairs.has(s[i])) {
      if (!stack.length || stack[stack.length - 1] !== pairs.get(s[i])) {
        return false;
      }

      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return !stack.length;
};

console.log(isValid("([}}])"));
