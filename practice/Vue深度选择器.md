# Vue深度选择器

如果你希望 `scoped` 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `>>>` 操作符：

```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

上述代码将会编译成：

```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。



## 具体应用

在实战中，一般是用于解决添加`scoped`属性导致CSS样式无法穿透至**子组件**或者是**内部插槽**的问题。

```scss
/* 在scss中应用 */
.c-dialog {
  &__footer {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;

    ::v-deep .c-button:first-child {
      margin-right: 20px;
    }
  }
}

/* 上面的深度选择器代码会被编译为 */
.c-dialog__footer[随机标识] > c-button:first-child {
    /* ... */
}
```