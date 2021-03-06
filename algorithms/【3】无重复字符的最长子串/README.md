# 无重复字符的最长子串

[题目编号-3](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)



## 题目描述

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```



示例 2:

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```



示例 3:

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```



## 答案

### 滑动窗口 + 哈希表

我们不妨以示例一中的字符串 \texttt{abcabcbb}abcabcbb 为例，找出 从每一个字符开始的，不包含重复字符的最长子串，那么其中最长的那个字符串即为答案。对于示例一中的字符串，我们列举出这些结果，其中括号中表示选中的字符以及最长的字符串：

* 以 **(a)**bcabcbb 开始的最长字符串为 **(abc)**abcbb；
* 以 a**(b)**cabcbb 开始的最长字符串为 a**(bca)**bcbb；
* 以 ab**(c)**abcbb 开始的最长字符串为 ab**(cab)**cbb；
* 以 abc**(a)**bcbb 开始的最长字符串为 abc**(abc)**bb；
* 以 abca**(b)**cbb 开始的最长字符串为 abca**(bc)**bb；
* 以 abcab**(c)**bb 开始的最长字符串为 abcab**(cb)**b；
* 以 abcabc**(b)**b 开始的最长字符串为 abcabc**(b)**b；
* 以 abcabcb**(b)** 开始的最长字符串为 abcabcb**(b)**。

在本题中，子串的结束位置是一直在不断向后滑动的，而子串的开始位置也在一定条件情况在向后滑动，面对这样的问题，我们就大概率可以使用**滑动窗口**来解决：

* 声明两个变量来作为起始指针和结束指针；
* 在每一步的操作中，我们会将左指针向右移动一格，表示 我们开始枚举下一个字符作为起始位置，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。在移动结束后，这个子串就对应着 以左指针开始的，不包含重复字符的最长子串。我们记录下这个子串的长度；
* 在枚举结束后，我们找到的最长的子串的长度即为答案。




另外，本题中子串开始位置向后滑动的条件是**起始位置与结束位置之间**存在**重复**，既然要检重，那我们就可以使用哈希表（在js中为构造函数Map）来为我们简化掉一层遍历。

* 时间复杂度：O(N)
* 空间复杂度：O(N)

