# 不同路径 II

[题目编号-63](https://leetcode-cn.com/problems/unique-paths-ii/)



## 题目描述

一个机器人位于一个 *m x n* 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png)

网格中的障碍物和空位置分别用 `1` 和 `0` 来表示。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg)

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg)

 

**提示：**

- `m == obstacleGrid.length`
- `n == obstacleGrid[i].length`
- `1 <= m, n <= 100`
- `obstacleGrid[i][j]` 为 `0` 或 `1`



## 解题思路

### DP

思路类似于**题目62**，不过在状态推进的过程中要过滤掉放置石头的位置（设为0），还要注意特殊的边界情况（比如出口就放了个石头）