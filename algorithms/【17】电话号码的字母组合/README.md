# 电话号码的字母组合

[题目编号-17](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)



## 题目描述

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

**示例:**

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**说明:**
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。



## 解题思路

### DFS（分治回溯）

在每次递归中循环当前数字对应的字符，将添加后的结果继续向下递归



### BFS



