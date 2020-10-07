# 最小栈

[题目编号-155](https://leetcode-cn.com/problems/min-stack/)



## 题目描述

设计一个支持 `push` ，`pop` ，`top` 操作，并能在常数时间内检索到最小元素的栈。

- `push(x)` —— 将元素 x 推入栈中。
- `pop()` —— 删除栈顶的元素。
- `top()` —— 获取栈顶元素。
- `getMin()` —— 检索栈中的最小元素。

 

**示例:**

```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

 

**提示：**

- `pop`、`top` 和 `getMin` 操作总是在 **非空栈** 上调用。



## 解题思路

栈` = `FILO`，先进后出。放入一个数，直到这个数被取出前，最小值不变。

二维数组`q` = [[放入数，放入数时最小值]...]，将所有操作转换为对`q`的操作。

* 时间复杂度：O(1)
* 空间复杂度：O(n)