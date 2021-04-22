# Canvas学习

公司需要做一个B端的组态平台，需要使用到大量的Canvas技术



## 笔记

### 基础API

* ` c = getContext("2d")`：获取2d绘制上下文
* `c.fillRect(x, y, w, h)`：绘制填充矩形
* `c.strokeRect(x, y, w, h)`：绘制描边矩形
* `c.clearRect(x, y, w, h)`：抹除一块矩形
* `c.fillStyle`：填充颜色（需在画之前设置）
* `c.strokeStyle`：描边颜色（需在画之前设置）
* `c.lineWidth`：线条宽度（不带单位）
* `c.beginPath()`：创建一条路径
* `c.moveTo(x, y)`：移动画笔到指定位置
* `c.lineTo(x, y)`：画虚线到指定位置
* `c.arc(x, y, r, ba, ea, d)`：画圆`（圆心x，圆心y，半径，开始角度，结束角度，true为逆）`
* `lingrad = c.createLinearGradient(x, y, w, h)`：创建一块线性渐变区域
* `lingrad.addColorStop(0 ~ 1, color)`：添加渐变色 
* `c.font`：设置字体属性`（style, verdiant, weight, size, family）`
* `c.fillText(content, x, y)`：需要注意，参数y指的是字体底部的位置
* `c.drawImage(img, px, py, cw, cy,x, y, w, h)`：前四个参数(可省略)为`（裁剪x, 裁剪y, 裁剪宽, 裁剪高）`





### 图像重合

`c.globalCompositeOperation`：两个图像重叠时的操作配置

https://www.runoob.com/tags/canvas-globalcompositeoperation.html











































