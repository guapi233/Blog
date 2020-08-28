# 回文数

[题目编号-9](https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode-solution/)



## 题目描述

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

```
输入: 121
输出: true
```



示例 2:

```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```



示例 3:

```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```



## 答案

### 类型转换

通过js中的类型转换，将数字转换为数组反转后再转移回来，最后做一下比较

* 时间复杂度：O(log2n)
* 空间复杂度：O(1)



### 对半转移

![](https://assets.leetcode-cn.com/solution-static/9/9_fig1.png)

* 每次遍历对x模10，取得x的最后一位
* 每次遍历将`revertedNumber`乘10，将取得的数值加上
* 直到`revertedNumber`不再小于x为止

最后判断时，如果x为偶数，直接比较二者即可，如果为奇数，将`revertedNumber`除以10后再做比较。

* 时间复杂度：O(log2n)
* 空间复杂度：O(1)



