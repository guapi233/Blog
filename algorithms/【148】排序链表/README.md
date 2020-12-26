# 排序链表

[题目编号-148](https://leetcode-cn.com/problems/sort-list/)



## 题目描述

给你链表的头结点 `head` ，请将其按 **升序** 排列并返回 **排序后的链表** 。

**进阶：**

- 你可以在 `O(n log n)` 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg)

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg)

**示例 3：**

```
输入：head = []
输出：[]
```

 

**提示：**

- 链表中节点的数目在范围 `[0, 5 * 104]` 内
- `-105 <= Node.val <= 105`



## 解题思路

### 数组排序

通过额外的数组排序后再转换为链表

* 时间复杂度：O(n)

* 空间复杂度：O(n)

  