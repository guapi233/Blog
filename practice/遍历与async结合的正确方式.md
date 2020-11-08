# 遍历与 async 结合的正确方式

1. 如果你想连续执行`await`调用，请使用`for`循环(或任何没有回调的循环)。
2. 永远不要和`forEach`一起使用`await`，而是使用`for`循环(或任何没有回调的循环)。
3. 不要在 `filter` 和 `reduce` 中使用 `await`，如果需要，先用 `map` 进一步骤处理，然后在使用 `filter` 和 `reduce` 进行处理。



## 示例代码

```js
    result = await Promise.all(
      result.map(async (article) => {
        article = article.toObject();

        let filterStr = "usernumber pic name summary";
        article.author = await UserModel.findOne(
          { usernumber: article.author },
          filterStr
        );

        return article;
      })
    );
```

`map`会将数组中的元素转换为一个个的`Promise`，通过Promise.all做到连续循环`await`。

或者直接使用`for`循环也是可以的。

