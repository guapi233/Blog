# 二叉树的中序遍历

[题目编号-94](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)



## 题目描述

给定一个二叉树的根节点 `root` ，返回它的 **中序** 遍历。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[1]
```

**示例 4：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

**示例 5：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)

 

**提示：**

- 树中节点数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

 

**进阶:** 递归算法很简单，你可以通过迭代算法完成吗？



## 解题思路

### 递归

创建一个辅助函数，按照**左，中，右**递归即可。

* 时间复杂度：O(n)
* 空间复杂度：O(n)



### 栈 + 迭代

创建一个栈，先将第一次能找到的左节点一口气全压入，然后按序抛出，每次抛出都查看该节点有没有右节点，如果有将右节点压入栈中，并根据这个节点向下检索左子节点，具体动画参考[官方题解](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/)：

* 时间复杂度：O(n)
* 空间复杂度：O(n)