# N叉树的后序遍历

[题目编号-590](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)



## 题目描述

给定一个 N 叉树，返回其节点值的*后序遍历*。

例如，给定一个 `3叉树` :

 

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/narytreeexample.png)

 

返回其后序遍历: `[5,6,3,2,4,1]`.

 

**说明:** 递归法很简单，你可以使用迭代法完成此题吗?



## 解题思路

### 递归

略



### 栈 + 迭代

大体思路和二叉树的遍历相同，不过由于N叉树的遍历相同简单只需，遍历加入完所有子节点，再将父节点加入即可，声明一个循环，每次将当前节点的`children`压入栈中，倒着遍历即可，注意最后压入结果时要从头压入。