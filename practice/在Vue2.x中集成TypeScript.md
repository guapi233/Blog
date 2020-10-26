# 在 Vue2.x 中集成 TypeScript

话不多说，直接上流程。



## 通过 Vue-cli 集成 TS

在初始化工程化结构目录时，勾选`TypeScript`，并在接下来询问是否使用`class components`时填选`Y`即可。



## 与 TS 结合后 Vue 的编写规范

目前笔者了解到的与 TS 的结合方案有两种，分别为：官方的`vue-class-component`以及社区的`vue-property-decorator`，其中：

* 前者提供了`Vue类、Component装饰器`，与组件本身相关的`data、computed、methods`等可通过类语法进行书写，并可通过 TS 添加类型修饰，而向`props、components`则通过对象参数的方式书写在 `Component装饰器` 中
* 后者深度依赖前者，并在其的基础上拓展出了更多的装饰器：
  - @Component
  - @Prop
  - @PropSync
  - @Model
  - @Watch
  - @Provide
  - @Inject
  - @ProvideReactive
  - @InjectReactive
  - @Emit
  - @Ref

下面主要围绕`vue-property-decorator`来讲解其中提供的装饰器的使用方法，目前通过CLI工具构建后的项目默认集成此方案。



### @Component(options: object)

被该修饰器修饰的class将成为一个Vue组件。`@Component` 装饰器可以接收一个对象作为参数，可以在对象中声明 `components，filters，directives`等未提供装饰器的选项，也可以声明`computed，watch`等，但不可以在其中声明`props`。



除了上面介绍的将`beforeRouteLeave`放在**@Component配置对象**中之外,还可以组件内注册,就是`registerHooks`：

```html
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// ✨
Component.registerHooks([
  'beforeRouteLeave',
  'beforeRouteEnter',
]);
 
@Component
export default class App extends Vue {
  beforeRouteLeave(to: any, from: any, next: any) {
    console.log('beforeRouteLeave');
    next();
  }
 
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log('beforeRouteLeave');
    next();
  }
}
</script>
```



### @Prop(options: [string, array, object])

`@Prop`装饰器接收一个参数（也可以不传），这个参数可以有三种写法：

- 单个类型值（大写），例如`String，Number，Boolean`等，指定 `prop` 的类型；
- 存放多个类型值（大写）的数组，指定 `prop` 的可选类型；
- `PropOptions`，可以使用以下选项：`type，default，required，validator`。

**注意:属性的ts类型后面需要加上undefined类型；或者在属性名后面加上!，表示非null 和 非undefined的断言，否则编译器会给出错误提示；**

```js
// 示例
@Prop(String) readonly name: string | undefined;
@Prop(String) readonly name!: string;
@Prop([String, Boolean]) private sex!: string | boolean;
@Prop({ default: 30, type: Number }) private age!: number;
```



### PropSync(propName: string, options: [string, array, object])

`@PropSync`装饰器与`@prop`用法类似，二者的区别在于：

- `@PropSync` 装饰器接收两个参数：
  * `propName`： 表示父组件传递过来的属性名；
  * `options`： 与`@Prop`的第一个参数一致；
- `@PropSync` 会生成一个新的计算属性。
- `@PropSync`用于生成双向数据流的Prop，而 `@Prop` 生成的数据流是单向的（父 -> 子），关于双向数据流以及`.sync`，可以参考[这里](https://github.com/guapi233/Blog/issues/25)

**注意,使用PropSync的时候是要在父组件配合 .sync 使用的**

```html
// ✨：实例
// 父组件
<template>
  <div class="PropSync">
    <h1>父组件</h1>
    like:{{like}}
    <hr/>
    // ✨：必须使用 .sync
    <PropSyncComponent :like.sync="like"></PropSyncComponent>
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import PropSyncComponent from '@/components/PropSyncComponent.vue';
 
@Component({components: { PropSyncComponent },})
export default class PropSyncPage extends Vue {
  private like = '父组件的like';
}
</script>
 

// 子组件
<template>
  <div class="hello">
    <h1>子组件:</h1>
    <h2>syncedlike:{{ syncedlike }}</h2>
    <button @click="editLike()">修改like</button>
  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue, PropSync,} from 'vue-property-decorator';
 
@Component
export default class PropSyncComponent extends Vue {
  // 用来实现组件的双向绑定, 子组件可以更改父组件穿过来的值
  // 原理：用 syncedlike（计算属性） 代理 like 值
  @PropSync('like', { type: String }) syncedlike!: string;
 
  editLike(): void {
    // 双向绑定, 更改 syncedlike 会更改父组件的like
    this.syncedlike = '子组件修改过后的syncedlike!'; 
  }
}
</script>
```

