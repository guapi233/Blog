# 最小路径和

[题目编号-64](https://leetcode-cn.com/problems/minimum-path-sum/)



## 题目描述


给定一个包含非负整数的 `*m* x *n*` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

**示例 2：**

```
输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

 

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 100`



## 解题思路

### DP

DP方程：`grid[i][j] += Math.min(grid[i + 1][j], grid[i][j + 1])`

