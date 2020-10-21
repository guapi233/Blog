# CSS3中的sticky定位

position的含义是指定位类型，取值类型可以有：`static`、`relative`、`absolute`、`fixed`、`inherit`和`sticky`，这里sticky是CSS3新发布的一个属性，用于设置



## sticky规则

- 设置了position: sticky的元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
- 当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动（相当于此时fixed定位）。
- 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量。



## 兼容问题

截止到2020-10-21，`position: sticky;`的支持情况一般，主流浏览器除了Firafox以及Safari全面支持外，Chrome、Edge部分支持（IE6-11全部不支持)，移动端代理大多也是部分支持状态。



## 效果预览

![](https://raw.githubusercontent.com/guapi233/Blog/master/images/sticky%E5%AE%9A%E4%BD%8D%E6%95%88%E6%9E%9C%E9%A2%84%E8%A7%88.gif)