# TS高级用法

## 动态确定函数返回的类型

```typescript
interface person {
  name: string;
  age: 18;
}

function getProp<T extends person, K extends keyof person>(
  obj: T,
  prop: K
): T[K] {
  return obj[prop];
}

getProp({ name: "aa", age: 18 }, "name");
```

上面的代码中`getProp`函数会根据传入的属性动态确定返回值的类型。