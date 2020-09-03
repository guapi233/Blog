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

  s.split("").forEach((item) => {
    /**
     * 1.如果不为")]}"其中一种直接push；
     * 2.如果为")]}"其中一种，但与栈顶元素不配对，直接push；
     * 3.配对的话pop栈顶元素
     **/
    if (pairs.has(item)) {
      if (!stack.length || stack[stack.length - 1] !== pairs.get(item)) {
        stack.push(item);
      } else {
        stack.pop();
      }
    } else {
      stack.push(item);
    }
  });

  return !stack.length;
};

console.log(isValid("([}}])"));
