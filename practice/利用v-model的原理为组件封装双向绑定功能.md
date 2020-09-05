# 利用v-model的原理为组件封装双向绑定功能

Vue中的表单元素默认都支持`v-model`指令，用于帮助我们完成数据的双向绑定，实际上它内部的原理实现非常的简单。

```vue
<input v-model="val" /> {{ val }}
```

上面的代码中如果输入框中的`val`值发生变化，那么旁边的展示`val`同样会发生变化，那么我们可以用下方的代码来替代上面的代码实现相同的功能。

```vue
<input :value="val" @input="val=$event.target.value" /> {{ val }}
```

实际上，上面的代码只是下面代码的一种语法糖，二者的内部实现并无差异，`v-model`在编译后就会变成下面的代码。



## 实际用途

我们可以利用上面的特性，来对自定义组件进行双向绑定功能的添加。

```vue
<c-input v-model="val" /> // 最终会编译为下面的代码
<c-input :value="val" @input="val=$event.target.value" />
```

那么自定义组件`c-input`内部只需要接收`value`传值和对`input`事件做监听即可。

```js
{
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    methods: {
        // 将该方法和上面的value绑到对应元素上即可
        input(event) {
            this.$emit("input", event.target.value);
        }
    }
}
```

