# 相同的树

[题目编号-100]



## 题目描述

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

**示例 1:**

```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```

**示例 2:**

```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```

**示例 3:**

```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```



## 解题思路

### 深度遍历

给定一定的出口条件，通过递归按照`左 -> 根 -> 右`的顺序遍历判断每个树节点。

* 时间复杂度：O(min(m, n))
* 空间复杂度：O(min(m, n))



### 广度遍历

给定一定的出口条件，通过循环按照`根 -> 左 -> 右`的顺序遍历判断每个树节点。

* 时间复杂度：O(min(m, n))
* 空间复杂度：O(min(m, n))