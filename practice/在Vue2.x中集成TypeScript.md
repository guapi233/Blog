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



### @Model(event?: string, options: [string, array, object])

`@Model`装饰器允许我们在一个组件上自定义`v-model`，接收两个参数：

- `event: string`： 事件名。
- `options`： 与`@Prop`的第一个参数一致。

简单得说，`model`就是用于重置组件`v-model`属性占用的 `prop` 和 `event监听`，默认占用了 `value` 和 `change事件`，如果你想要使用这两个控件，就可以使用使用 `model` 将默认配置修改为其它的变量或事件。

因为不怎么常用，具体的详情可以参考[官方文档](https://cn.vuejs.org/v2/api/#model)。

```html
// ✨：示例
// 父组件
<template>
  <div class="Model">
    // 因为 value 被“解放”出来了，所以可以直接使用
    <ModelComponent v-model="fooTs" value="some value"></ModelComponent>
    <div>父组件 app : {{fooTs}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModelComponent from '@/components/ModelComponent.vue';
 
@Component({ components: {ModelComponent} })
export default class ModelPage extends Vue {
  private fooTs = 'App Foo!';
}
</script>
 
// 子组件
<template>
  <div class="hello">
    子组件:<input type="text" :value="checked" @input="inputHandle($event)"/>
  </div>
</template>
 
<script lang="ts">
import {Component, Vue, Model,} from 'vue-property-decorator';
 
@Component
export default class ModelComponent extends Vue {
   // 使用 checked 来替换 value，change事件不变
   @Model('change', { type: String }) readonly checked!: string
 
   public inputHandle(that: any): void {
     this.$emit('change', that.target.value); // 后面会讲到@Emit,此处就先使用this.$emit代替
   }
}
</script>
```



### @Watch(path: string, options: object) 

`@Watch` 装饰器接收两个参数：

- `path: string` 被侦听的属性名；
- `options?: object`可以包含两个属性 ：
  * `immediate?: boolean` ：侦听开始之后是否立即调用该回调函数；
  * `deep?: boolean` ：被侦听的对象的属性被改变时，是否调用该回调函数，如果设置了该属性，`wather`的第一次执行会发生在组件的 `beforeCreate()` 与 `created()` 之间

```html
// ✨：示例
<template>
  <div class="PropSync">
    <h1>child:{{child}}</h1>
    <input type="text" v-model="child"/>
  </div>
</template>
 
<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator';
 
@Component
export default class WatchPage extends Vue {
  private child = '';
 
  @Watch('child')
  onChildChanged(newValue: string, oldValue: string) {
    console.log(newValue);
    console.log(oldValue);
  }
}
</script>
```



### @Emit(event?: string)

- `@Emit` 装饰器接收一个可选参数，该参数是`$Emit`的第一个参数，充当事件名。如果没有提供这个参数，`$Emit`会将回调函数名的`camelCase`转为`kebab-case`，并将其作为事件名；
- `@Emit`会将回调函数的返回值作为第二个参数，如果返回值是一个`Promise`对象，`$emit`会在`Promise`对象被标记为`resolved`之后触发；
- `@Emit`的回调函数的参数，会放在其返回值**之后**，一起被`$emit`当做参数使用。

```html
// ✨：示例
// 父组件
<template>
  <div class="">
    点击emit获取子组件的名字<br/>
    姓名:{{emitData.name}}
    <hr/>
    <EmitComponent sex='女' @add-to-count="returnPersons" @delemit="delemit"></EmitComponent>
  </div>
</template>
 
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EmitComponent from '@/components/EmitComponent.vue';
 
@Component({
  components: { EmitComponent },
})
export default class EmitPage extends Vue {
  private emitData = { name: '我还没有名字' };
 
  returnPersons(data: any) {
    this.emitData = data;
  }
 
  delemit(event: MouseEvent) {
    console.log(this.emitData);
    console.log(event);
  }
}
</script>
 
// 子组件
<template>
  <div class="hello">
    子组件:
    <div v-if="person">
      姓名:{{person.name}}<br/>
      年龄:{{person.age}}<br/>
      性别:{{person.sex}}<br/>
    </div>
    <button @click="addToCount(person)">点击emit</button>
    <button @click="delToCount($event)">点击del emit</button>
  </div>
</template>
 
<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
 
type Person = {name: string; age: number; sex: string };
 
@Component
export default class PropComponent extends Vue {
  private name: string | undefined;
 
  private age: number | undefined;
 
  private person: Person = { name: '我是子组件的张三', age: 1, sex: '男' };
 
  @Prop(String) readonly sex: string | undefined;
 
  @Emit('delemit') private delEmitClick(event: MouseEvent) {}
 
  @Emit() // 如果此处不设置别名字,则默认使用下面的函数命名
  addToCount(p: Person) { // 此处命名如果有大写字母则需要用横线隔开  @add-to-count
    return this.person; // 此处不return,则会默认使用括号里的参数p;
  }
 
  delToCount(event: MouseEvent) {
    this.delEmitClick(event);
  }
}
</script>
```



### @Ref(refKey?: string)

`@Ref` 装饰器接收一个可选参数，用来指向元素或子组件的引用信息。如果没有提供这个参数，会使用装饰器后面的属性名充当参数

```html
// ✨：示例
<template>
  <div class="PropSync">
    <button @click="getRef()" ref="aButton">获取ref</button>
    <RefComponent name="names" ref="RefComponent"></RefComponent>
  </div>
</template>
 
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import RefComponent from '@/components/RefComponent.vue';
 
@Component({
  components: { RefComponent },
})
export default class RefPage extends Vue {
  @Ref('RefComponent') readonly RefC!: RefComponent;
  @Ref('aButton') readonly ref!: HTMLButtonElement;
  getRef() {
    console.log(this.RefC);
    console.log(this.ref);
  }
}
</script>
```



### @Provide/Inject  &  @ProvideReactive/InjectReactive

* `@Provide(key?: string | symbol)` / `@Inject(options?: { from?: InjectKey, default?: any } | InjectKey)` 

* `@ProvideReactive(key?: string | symbol)` / `@InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey)`

区别：如果 `@ProvideReactive` 的值被父组件修改，则子组件可以使用 `InjectReactive` 捕获次修改。

```html
// ✨：示例
// 最外层组件
<template>
  <div class="">
    <H3>ProvideInjectPage页面</H3>
    <div>
      在ProvideInjectPage页面使用Provide,ProvideReactive定义数据,不需要props传递数据
      然后爷爷套父母,父母套儿子,儿子套孙子,最后在孙子组件里面获取ProvideInjectPage
      里面的信息
    </div>
    <hr/>
    <provideGrandpa></provideGrandpa> <!--爷爷组件-->
  </div>
</template>
 
<script lang="ts">
import {
  Vue, Component, Provide, ProvideReactive,
} from 'vue-property-decorator';
import provideGrandpa from '@/components/ProvideGParentComponent.vue';
 
@Component({
  components: { provideGrandpa },
})
export default class ProvideInjectPage extends Vue {
  @Provide() foo = Symbol('fooaaa');
 
  @ProvideReactive() fooReactive = 'fooReactive';
 
  @ProvideReactive('1') fooReactiveKey1 = 'fooReactiveKey1';
 
  @ProvideReactive('2') fooReactiveKey2 = 'fooReactiveKey2';
 
  created() {
    this.foo = Symbol('fooaaa111');
    this.fooReactive = 'fooReactive111';
    this.fooReactiveKey1 = 'fooReactiveKey111';
    this.fooReactiveKey2 = 'fooReactiveKey222';
  }
}
</script>
 
// ...provideGrandpa调用父母组件
<template>
  <div class="hello">
    <ProvideParentComponent></ProvideParentComponent>
  </div>
</template>
 
// ...ProvideParentComponent调用儿子组件
<template>
  <div class="hello">
    <ProvideSonComponent></ProvideSonComponent>
  </div>
</template>
 
// ...ProvideSonComponent调用孙子组件
<template>
  <div class="hello">
    <ProvideGSonComponent></ProvideGSonComponent>
  </div>
</template>
 
 
// 孙子组件<ProvideGSonComponent>,经过多层引用后,在孙子组件使用Inject可以得到最外层组件provide的数据哦
<template>
  <div class="hello">
    <h3>孙子的组件</h3>
    爷爷组件里面的foo:{{foo.description}}<br/>
    爷爷组件里面的fooReactive:{{fooReactive}}<br/>
    爷爷组件里面的fooReactiveKey1:{{fooReactiveKey1}}<br/>
    爷爷组件里面的fooReactiveKey2:{{fooReactiveKey2}}
    <span style="padding-left:30px;">=> fooReactiveKey2没有些key所以取不到哦</span>
  </div>
</template>
 
<script lang="ts">
import {
  Component, Vue, Inject, InjectReactive,
} from 'vue-property-decorator';
 
@Component
export default class ProvideGSonComponent extends Vue {
  @Inject() readonly foo!: string;
 
  @InjectReactive() fooReactive!: string;
 
  @InjectReactive('1') fooReactiveKey1!: string;
 
  @InjectReactive() fooReactiveKey2!: string;
}
</script>
```



