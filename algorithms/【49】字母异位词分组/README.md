# 字母异位词分组

[题目编号-49](https://leetcode-cn.com/problems/group-anagrams/)

[低配版参考题目242](https://github.com/guapi233/Blog/tree/master/algorithms/%E3%80%90242%E3%80%91%E6%9C%89%E6%95%88%E7%9A%84%E5%AD%97%E6%AF%8D%E5%BC%82%E4%BD%8D%E8%AF%8D)



## 题目描述

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

**示例:**

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

**说明：**

- 所有输入均为小写字母。
- 不考虑答案输出的顺序。



## 解题思路

### 暴力

哈希 + 排序

* 时间复杂度：O(knlogn)
* 空间复杂度：O(n)