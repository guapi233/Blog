```
比较查询运算符
名称  描述
$eq    匹配等于指定值的值。
$gt    匹配大于指定值的值。
$gte   匹配大于或等于指定值的值。
$in    匹配数组中指定的任何值。
$lt    匹配小于指定值的值。
$lte   匹配小于或等于指定值的值。
$ne    匹配所有不等于指定值的值。
$nin   匹配数组中指定的值。

逻辑查询运算符
名称  描述
$and   使用逻辑连接查询子句AND将返回与两个子句的条件匹配的所有文档。
$not   反转查询表达式的效果并返回与查询表达式不匹配的文档。
$nor   使用逻辑连接查询子句NOR将返回所有无法匹配两个子句的文档。
$or    使用逻辑连接查询子句OR将返回与任一子句的条件匹配的所有文档。

元素查询运算符
名称  描述
$exists    匹配具有指定字段的文档。
$type  如果字段是指定类型，则选择文档。

评估查询运算符
名称  描述
$expr  允许在查询语言中使用聚合表达式。
$jsonSchema    根据给定的JSON模式验证文档。
$mod   对字段的值执行模运算，并选择具有指定结果的文档。
$regex 选择值与指定正则表达式匹配的文档。
$text  执行文本搜索。
$where 匹配满足JavaScript表达式的文档。

地理空间查询运算符
名称  描述
$geoIntersects	选择与GeoJSON几何体相交的几何。该2dsphere索引支持 $geoIntersects。
$geoWithin	选择边界GeoJSON几何体中的几何。该2dsphere和2D索引支持 $geoWithin。
$near	返回点附近的地理空间对象。需要地理空间索引。该2dsphere和2D索引支持 $near。
$nearSphere	返回球体上某点附近的地理空间对象。需要地理空间索引。该2dsphere和2D索引支持$nearSphere。

数组查询运算符
名称  描述
$all   匹配包含查询中指定的所有元素的数组。
$elemMatch	如果数组字段中的元素与所有指定$elemMatch条件匹配，则选择文档。
$size  如果数组字段是指定大小，则选择文档。

按位查询运算符
名称  描述
$bitsAllClear  匹配数值或二进制值，其中一组位位置都具有值0。
$bitsAllSet    匹配数值或二进制值，其中一组位位置都具有值1。
$bitsAnyClear  匹配数值或二进制值，其中来自一组位位置的任何位的值都为0。
$bitsAnySet    匹配数值或二进制值，其中来自一组位位置的任何位的值都为1。


投影算子
名称  描述
$  投影数组中与查询条件匹配的第一个元素。
$elemMatch	投影数组中与指定$elemMatch条件匹配的第一个元素。
$meta	投影在$text操作期间分配的文档分数。
$slice 限制从数组投射的元素数量。支持跳过和限制切片。

字段更新运算符
名称  描述
$currentDate   将字段的值设置为当前日期，可以是Date或Timestamp。
$inc   按指定的数量增加字段的值。
$min   仅当指定的值小于现有字段值时才更新字段。
$max   仅当指定的值大于现有字段值时才更新字段。
$mul   将字段的值乘以指定的量。
$rename    重命名字段。
$set   设置文档中字段的值。
$setOnInsert   如果更新导致文档插入，则设置字段的值。对修改现有文档的更新操作没有影响。
$unset 从文档中删除指定的字段。

更新运算符
名称  描述
$  充当占位符以更新与查询条件匹配的第一个元素。
$[]    充当占位符以更新数组中与查询条件匹配的文档中的所有元素。
$[<identifier>]    充当占位符以更新与arrayFilters匹配查询条件的文档的条件匹配的所有元素。
$addToSet  仅当数组中尚不存在元素时才将元素添加到数组中。
$pop   删除数组的第一个或最后一个项目。
$pull  删除与指定查询匹配的所有数组元素。
$push  将项添加到数组。
$pullAll   从数组中删除所有匹配的值。

更新操作符修饰符
名称  描述
$each	修改$push和$addToSet运算符以附加多个项目以进行阵列更新。
$position	修改$push运算符以指定数组中添加元素的位置。
$slice	修改$push运算符以限制更新数组的大小。
$sort	修改$push运算符以重新排序存储在数组中的文档。

按位更新运算符
名称  描述
$bit   执行按位AND，OR和XOR更新整数值。
```



## 聚合管道 aggregate()

### 语法

```js
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION);
1
```

### 数据

数据使用菜鸟教程的数据啦🤪🤪

```js
/* 1 */
{
    "_id" : ObjectId("5e86e29788e64443e448dfc0"),
    "title" : "MongoDB Overview",
    "description" : "MongoDB is no sql database",
    "by_user" : "runoob.com",
    "url" : "http://www.runoob.com",
    "tags" : [ 
        "mongodb", 
        "database", 
        "NoSQL"
    ],
    "likes" : 100
}

/* 2 */
{
    "_id" : ObjectId("5e86e2ad88e64443e448dfd2"),
    "title" : "NoSQL Overview",
    "description" : "No sql database is very fast",
    "by_user" : "runoob.com",
    "url" : "http://www.runoob.com",
    "tags" : [ 
        "mongodb", 
        "database", 
        "NoSQL"
    ],
    "likes" : 10
}

/* 3 */
{
    "_id" : ObjectId("5e86e2bc88e64443e448dfd7"),
    "title" : "Neo4j Overview",
    "description" : "Neo4j is no sql database",
    "by_user" : "Neo4j",
    "url" : "http://www.neo4j.com",
    "tags" : [ 
        "neo4j", 
        "database", 
        "NoSQL"
    ],
    "likes" : 750
}
1234567891011121314151617181920212223242526272829303132333435363738394041424344
```

### 管道操作符

| 操作符   | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| $group   | 将collection中的document分组，可用于统计结果                 |
| $match   | 过滤数据，只输出符合结果的文档                               |
| $project | 修改输入文档的结构(例如重命名，增加、删除字段，创建结算结果等) |
| $sort    | 将结果进行排序后输出                                         |
| $limit   | 限制管道输出的结果个数                                       |
| $skip    | 跳过制定数量的结果，并且返回剩下的结果                       |
| $unwind  | 将数组类型的字段进行拆分                                     |

### 表达式操作符

| 操作符    | 含义                                                         | 实例                                                         |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| $sum      | 计算总和，{`$sum`: 1}表示返回总和×1的值(即总和的数量),使用{`$sum`: `'$制定字段'`}也能直接获取制定字段的值的总和 | `db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$sum : "$likes"}}}])` |
| $avg      | 平均值                                                       | `db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$avg : "$likes"}}}])` |
| $min      | 获取集合中所有文档对应值得最小值                             | `db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$min : "$likes"}}}])` |
| $max      | 获取集合中所有文档对应值得最大值                             | `db.collection.aggregate([{$group : {_id : "$by_user", content_sum : {$max : "$likes"}}}])` |
| $push     | 在结果文档中插入值到一个数组中                               | `db.collection.aggregate([{$group : {_id : "$by_user", url : {$push : "$url"}}}])` |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本                 | `db.collection.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])` |
| $first    | 根据资源文档的排序获取第一个文档数据                         | `db.collection.aggregate([{$group : {_id : "$by_user", url : {$first : "$url"}}}])` |
| $last     | 根据资源文档的排序获取最后一个文档数据                       | `db.collection.aggregate([{$group : {_id : "$by_user", url : {$last : "$url"}}}])` |

### 具体例子

- $group

  - 简单阐述

    ```js
    //将document分组，用作统计结果
    db.collection.aggregate([       // aggregate方法接收的是一个数组
        {
            $group: {
            	// _id字段表示要基于哪个字段来进行分组(即制定字段值相同的为一组)
            	// $by_user表示要基于$by_user字段来进行分组
                _id: '$by_user', 
                // content_sum字段的值$sum: 1表示的是获取满足by_user字段相同的这一组的数量乘以后面给定的值(本例为1，那么就是同组的数量)。
                content_sum: {$sum: 1}
            }
        }
    ])
    123456789101112
    ```

  - 具体案例

    通过以上集合计算每个作者所写的文章数(通过字段`by_user` 字段对数据进行分组，并计算`by_user`字段相同值的总和)，使用`aggregate()`计算结果如下：

    ```js
    router.get('/getInfo',async(req, res)=>{
    let data=await Content.aggregate([
      {
        $group:{
          _id:'$by_user',
          content_sum:{$sum:1}
        }
      }
    ])
    res.json({data})
    })
    1234567891011
    ```

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403154329516.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

- $match

  获取`likes`的值在`50-200`之间的数据:

  ```js
  router.get('/getInfo', async (req, res) => {
    let data = await Content.aggregate([{
        $match: {
          likes: {
            $gt: 50,
            $lte: 200
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          content_sum: {
            $sum: 1
          }
        }
      }
    ])
    res.json({
      data
    })
  })
  12345678910111213141516171819202122
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403160155180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

  从图中可以看出`likes`的值在`50-200`之间的数据只有1条，现在我们只知道这条数据的_id，如果想知道这条数据的具体信息时应该如何操作呢❓上面的表格中提到`$project`修改输入文档的结构(例如重命名，增加、删除字段，创建结算结果等)，所以一起来看看吧👇👇👇

- $project

  ```js
  router.get('/getInfo', async (req, res) => {
    let data = await Content.aggregate([
      {
        $match: { likes: { $gt: 50, $lte: 200 } }
      },
      {
      //以下的值可以写$+字段，也可以使用0 和1来表示，若要显示字段则为1，否则为0
       
       //$project:{_id:'$_id',title:"$title",description:"$description",by_user:"$by_user",url:'$ulr',tags:'$tags',likes:'$likes'}
       $project:{_id:1,title:1,description:1,by_user:1,url:1,tags:1,likes:1}
      }
    ])
    res.json({
      data
    })
  })
  12345678910111213141516
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403161402659.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

- 以上3个操作符的综合使用

  如果想拿到所有`likes>=10`的document的`by_user`字段可以把管道搭配起来用：

  ```js
  router.get('/getInfo', async (req, res) => {
    let data = await Content.aggregate([{
        $match: {
          likes: {
            $gt: 10
          }
        }
      },
      // 注意$project与$group的顺序,换位置后数据为空
      {
        $project: {
          _id: 0, //_id不显示
          by_user: 1 //by_user显示
        }
      },
      {
        $group: {
          _id: null,
          gameName: {
            $push: '$by_user'
          }
        }
      }
    ])
    res.json({
      data
    })
  })
  12345678910111213141516171819202122232425262728
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403162252482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

- $sort

  - 根据`likes`进行降序排序

    ```js
    router.get('/getInfo', async (req, res) => {
      let data = await Content.aggregate([
        {
          $project: { _id: 1, by_user: 1, title: 1, title: 1, description: 1, url: 1, tags: 1, likes: 1 }
        },
        {
          $sort: { likes: -1 }
        },
      ])
      res.json({
        data
      })
    })
    12345678910111213
    ```

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403165015237.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

  - 根据`likes`进行升序排序

    ```js
    router.get('/getInfo', async (req, res) => {
      let data = await Content.aggregate([
        {
          $project: { _id: 1, by_user: 1, title: 1, title: 1, description: 1, url: 1, tags: 1, likes: 1 }
        },
        {
          $sort: { likes: 1 }
        },
      ])
      res.json({
        data
      })
    })
    12345678910111213
    ```

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403165205861.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

- \$limit and ​\$skip

  ```js
  router.get('/getInfo', async (req, res) => {
    let data = await Content.aggregate([
      {
        $project: { _id: 1, by_user: 1, title: 1, title: 1, description: 1, url: 1, tags: 1, likes: 1 }
      },
      {
        $sort: { likes: 1 }
      },
      {
        $skip:1
      },
      {
        $limit:1
      }
    ]);
    
    res.json({
      data
    })
  })
  1234567891011121314151617181920
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200403165601220.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)

- $unwind

  $unwind管道以document中的数组类型的字段进行拆分，每条包含数组中的一个值。

  比如拆分`likes:10`这条数据，先来看看整体数据信息吧：

  ```js
  {
      "_id" : ObjectId("5e86e2ad88e64443e448dfd2"),
      "title" : "NoSQL Overview",
      "description" : "No sql database is very fast",
      "by_user" : "runoob.com",
      "url" : "http://www.runoob.com",
      "tags" : [ 
          "mongodb", 
          "database", 
          "NoSQL"
      ],
      "likes" : 10
  }
  12345678910111213
  ```

  在`tags`数组中有3条数据，所以拆分后会显示3条数据，看看具体实现吧：

  ```js
  router.get('/getInfo', async (req, res) => {
    let data = await Content.aggregate([
      {
        $match: {
          likes: 10
        }
      },
      {
        $unwind:'$tags'
      },
      {
        $project: { _id: 1, by_user: 1, title: 1, title: 1, description: 1, url: 1, tags: 1, likes: 1 }
      },
    ])
    res.json({
      data
    })
  })
  123456789101112131415161718
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020040317025785.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzM2Mzg3MQ==,size_16,color_FFFFFF,t_70)



## populate 联查的神


Mongoose中的填充查询（`populate`）类似关系型数据库中的“连接查询”，通过`populate()`函数，使你可以在一个文档中引用另一个集合中的文档，并将其填充到指定文档路径中。

*备注：*也有人将`populate`译为“联表”，本系列文档中统一使用“填充”。

1. [概述](https://itbilu.com/nodejs/npm/HkAKMTECm.html#populate)
2. [保存引用](https://itbilu.com/nodejs/npm/HkAKMTECm.html#saving-refs)
3. [填充](https://itbilu.com/nodejs/npm/HkAKMTECm.html#population)
4. [设置填充字段](https://itbilu.com/nodejs/npm/HkAKMTECm.html#setting-populated-fields)
5. [字段选择](https://itbilu.com/nodejs/npm/HkAKMTECm.html#field-selection)
6. [填充多个路径](https://itbilu.com/nodejs/npm/HkAKMTECm.html#populating-multiple-paths)
7. [查询条件与其它选项](https://itbilu.com/nodejs/npm/HkAKMTECm.html#query-conditions)
8. [引用子文档](https://itbilu.com/nodejs/npm/HkAKMTECm.html#refs-to-children)
9. [填充己存在的文档](https://itbilu.com/nodejs/npm/HkAKMTECm.html#populate_an_existing_document)
10. [填充多个己存在的文档](https://itbilu.com/nodejs/npm/HkAKMTECm.html#populate_multiple_documents)
11. [多层级填充](https://itbilu.com/nodejs/npm/HkAKMTECm.html#deep-populate)
12. [跨数据库填充](https://itbilu.com/nodejs/npm/HkAKMTECm.html#cross-db-populate)
13. [`refPath`动态引用](https://itbilu.com/nodejs/npm/HkAKMTECm.html#dynamic-ref)
14. [虚拟（`virtual`）属性/路径填充](https://itbilu.com/nodejs/npm/HkAKMTECm.html#populate-virtuals)
15. [中间件中填充](https://itbilu.com/nodejs/npm/HkAKMTECm.html#populate-middleware)

## 1. 概述

MongoDB在`>=3.2`版本中提供了类似连接的[`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/)聚合运算符。而在Mongoose中，有一个更强大的替代方法叫做`populate()`，它允许你引用其它集合中的文档。

填充(Population)是使用来自其它集合中的文档自动替换文档中的指定路径的过程。填充可以是单个文档、多个文档、普通对象、多个普通对象或从查询返回的所有对象。来看一些例子：

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
```

以上我们创建了两个[Model](https://mongoosejs.com/docs/models.html)。其中，`Person`模型有一个`stories`字段，其被设置为`ObjectId`数组。`ref`选项会告诉Mongoose哪个Model会在填充的时候使用，在我们示例中为`Story`模型，所存储的`_id`必须是`Story`模型中的文档的`_id`。

*注意：*ObjectId``, `Number`, `String`和`Buffer`都可以用于引用(`ref`)。但是，除非必要情况下，更推荐使用`ObjectId`。



## 2. 保存引用

将`ref`保存到其他文档的与通常保存属性的方式相同，只需指定`_id`值：

```
var author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  var story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});
```



## 3. 填充

目前为止，我们所做的并没什么不同，只是创建了一个`Preson`和`Story`。接下来看一下，怎样在查询绑定时填充`story`的`author`：

```
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
```

被填充的路径不再是原始的`_id`，其值将被替换为从数据库返回的mongoose文档，此操作会在返回结果之前执行单独的查询。

`ref`值是一个数组时同样可用，只需要在查询时调用[populate](https://itbilu.com/nodejs/npm/B1FfBss6X.html#query_Query-populate)方法，文档数组就会替换原有的`_id`。



## 4. 设置填充字段

在Mongoose`>= 4.0`后，我们可以像下面这样手工设置填充字段：

```
Story.findOne({ title: 'Casino Royale' }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  story.author = author;
  console.log(story.author.name); // prints "Ian Fleming"
});
```



## 5. 字段选择

如果我们只想返回填充的文档某些字段，该怎么操作呢？这时可以将[所需的字段名称](https://itbilu.com/nodejs/npm/B1FfBss6X.html#query_Query-select)作为第二个参数传递给`populate`方法来实现：

```
Story.
  findOne({ title: /casino royale/i }).
  populate('author', 'name'). // 仅返回 Person 的'name'字段
  exec(function (err, story) {
    if (err) return handleError(err);

    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"

    console.log('The authors age is %s', story.author.age);
    // prints "The authors age is null'
  });
```



## 6. 填充多个路径

需要填充多个路径时，只需要多次调用`populate()`方法即可：

```
Story.
  find(...).
  populate('fans').
  populate('author').
  exec();
```

但是，如果在同一个路径上多次调用`populate()`方法，仅最后一次调用会生效：

```
// The 2nd `populate()` call below overwrites the first because they
// both populate 'fans'.
Story.
  find().
  populate({ path: 'fans', select: 'name' }).
  populate({ path: 'fans', select: 'email' });
// The above is equivalent to:
Story.find().populate({ path: 'fans', select: 'email' });
```



## 7. 查询条件与其它选项

接下来，我们想按年龄(`age`)来对的`fans`进行筛选，并且只返回他们的名字，并且最多返回其中的5个。这时，可以像下面这样操作：

```
Story.
  find(...).
  populate({
    path: 'fans',
    match: { age: { $gte: 21 }},
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id',
    options: { limit: 5 }
  }).
  exec();
```



## 8. 引用子文档

在前面我们通过`story`引用到了`author`，但我们可能会发现，如果是通过`author`对象则无法获取`story`。因为没有任何`story`对象被“推送”到`author.stories`。

首先，你可能希望`author`知道哪些`story`是他们的。通常，你的模式应该在“many”侧具有父指针来处理一对多(one-to-many)关系。或者，你可以有一个指向子对象的数组，并可以将文档`push()`到数组，如下所示。

```
author.stories.push(story1);
author.save(callback);
```

这样我们就可以组合执行`find`和`populate`：

```
Person.
  findOne({ name: 'Ian Fleming' }).
  populate('stories'). // only works if we pushed refs to children
  exec(function (err, person) {
    if (err) return handleError(err);
    console.log(person);
  });
```

值得考虑的是，我们是否确定需要两组指针，因为它们可能会失去同步。相反，我们也可以跳过填充而直接找到所需要的`stroy`：

```
Story.
  find({ author: author._id }).
  exec(function (err, stories) {
    if (err) return handleError(err);
    console.log('The stories are an array: ', stories);
  });
```

通过[查询填充](https://itbilu.com/nodejs/npm/B1FfBss6X.html#query_Query-populate)所返回的文档是全功能的（是一个Mongoose文档），可`remove`、可`save`，除非指定了[lean](https://itbilu.com/nodejs/npm/B1FfBss6X.html#query_Query-lean)选项。不要将它们与[子文档](https://mongoosejs.com/docs/subdocs.html)混淆。调用`remove`方法时要小心，因为这些文档会从数据库中删除，而不仅仅是数组。



## 9. 填充己存在的文档

如果我们已经有一个mongoose文档并想要填充它的一些路径，*mongoose >= 3.6*的[document#populate()](https://itbilu.com/nodejs/npm/B1FfBss6X.html#document_Document-populate)方法支持这一功能。



## 10. 填充多个己存在的文档

如果我们有一个或多个mongoose文档甚至普通对象(像[mapReduce](https://itbilu.com/nodejs/npm/B1FfBss6X.html#model_Model.mapReduce)的输出)，可以使用*mongoose >= 3.6*所提供的[Model.populate()](https://itbilu.com/nodejs/npm/B1FfBss6X.html#model_Model.populate)方法来填充。这也是`document#populate()`和`query#populate`填充文档的方式。



## 11. 多层级填充

假设有如下一个Schema，用于跟踪用户（`user`）的朋友（`friend`）：

```
var userSchema = new Schema({
  name: String,
  friends: [{ type: ObjectId, ref: 'User' }]
});
```

`populate`使你有了一个用户的朋友列表，这时如果还想得到用户的朋友的朋友呢？可以指定`populate`选项来告诉mongoose填充所有用户朋友的`friends`数组：

```
User.
  findOne({ name: 'Val' }).
  populate({
    path: 'friends',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'friends' }
  });
```



## 12. 跨数据库填充

假设有一个表示事件的模式（eventSchema），以及一个表示会话的模式（conversationSchema）。 每个事件都有一个对应的会话线程：

```
var eventSchema = new Schema({
  name: String,
  // The id of the corresponding conversation
  // Notice there's no ref here!
  conversation: ObjectId
});
var conversationSchema = new Schema({
  numMessages: Number
});
```

此外，假设事件和会话存储在不同的MongoDB实例中。

```
var db1 = mongoose.createConnection('localhost:27000/db1');
var db2 = mongoose.createConnection('localhost:27001/db2');

var Event = db1.model('Event', eventSchema);
var Conversation = db2.model('Conversation', conversationSchema);
```

在这种情况下，将无法正常使用`populate()`。`conversation`字段将始终为`null`，因为`populate()`不知道要使用哪个模型。但是，可以显式指定模型：

```
Event.
  find().
  populate({ path: 'conversation', model: Conversation }).
  exec(function(error, docs) { /* ... */ });
```

这可以称为“跨数据库填充”，因为它使你能够跨MongoDB数据库，甚至跨MongoDB实例填充。



## 13. `refPath`动态引用

Mongoose还可以根据文档中属性的值从多个集合中填充。例如，构建一个用于存储评论（`comment`）的模式,用户可以评论博客文章或产品：

```
const commentSchema = new Schema({
  body: { type: String, required: true },
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['BlogPost', 'Product']
  }
});

const Product = mongoose.model('Product', new Schema({ name: String }));
const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
const Comment = mongoose.model('Comment', commentSchema);
```

`refPath`选项是`ref`的更复杂的替代选择。`ref`是一个字符串，Mongoose将始终查询相同的模型以查找填充的子文件。而使用`refPath`时，你可以配置Mongoose每个文档所应使用的模型。

```
const book = await Product.create({ name: 'The Count of Monte Cristo' });
const post = await BlogPost.create({ title: 'Top 10 French Novels' });

const commentOnBook = await Comment.create({
  body: 'Great read',
  on: book._id,
  onModel: 'Product'
});

const commentOnPost = await Comment.create({
  body: 'Very informative',
  on: post._id,
  onModel: 'BlogPost'
});

// The below `populate()` works even though one comment references the
// 'Product' collection and the other references the 'BlogPost' collection.
const comments = await Comment.find().populate('on').sort({ body: 1 });
comments[0].on.name; // "The Count of Monte Cristo"
comments[1].on.title; // "Top 10 French Novels"
```

另一种方法是在`commentSchema`上定义单独的`blogPost`和`product`属性，然后在两个属性上`populate()`：

```
const commentSchema = new Schema({
  body: { type: String, required: true },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  blogPost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BlogPost'
  }
});

// ...

// The below `populate()` is equivalent to the `refPath` approach, you
// just need to make sure you `populate()` both `product` and `blogPost`.
const comments = await Comment.find().
  populate('product').
  populate('blogPost').
  sort({ body: 1 });
comments[0].product.name; // "The Count of Monte Cristo"
comments[1].blogPost.title; // "Top 10 French Novels"
```

定义单独的`blogPost`和`product`属性适用于这个简单示例。但是，如果也允许用户对文章或其他评论发表评论，则需要向模式添加更多属性。除非你使用[mongoose-autopopulate](https://www.npmjs.com/package/mongoose-autopopulate)，否则你还需要对每个属性进行额外的`populate()`调用。使用`refPath`意味着你只需要2个模式路径和一个`populate()`调用，而无论`commentSchema`可以指向多少个模型。



## 14. 虚拟（[`virtual`](https://itbilu.com/nodejs/npm/B1FfBss6X.html#schema_Schema-virtual)）属性/路径填充

目前为止，我们都是基于`_id`字段进行的填充，但在某些情况下，这并不适用。特别是，[无限制增长的数组是MongoDB反模式(One-to-Many)](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)。使用mongoose虚拟属性，可以在文档之间定义更复杂的关系。

```
var PersonSchema = new Schema({
  name: String,
  band: String
});

var BandSchema = new Schema({
  name: String
});
BandSchema.virtual('members', {
  ref: 'Person', // The model to use
  localField: 'name', // Find people where `localField`
  foreignField: 'band', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

var Person = mongoose.model('Person', PersonSchema);
var Band = mongoose.model('Band', BandSchema);

/**
 * Suppose you have 2 bands: "Guns N' Roses" and "Motley Crue"
 * And 4 people: "Axl Rose" and "Slash" with "Guns N' Roses", and
 * "Vince Neil" and "Nikki Sixx" with "Motley Crue"
 */
Band.find({}).populate('members').exec(function(error, bands) {
  /* `bands.members` is now an array of instances of `Person` */
});
```

需要注意，虚拟属性默认并不包含在`toJSON()`的输出中。如果要在使用依赖于`JSON.stringify()`的函数（如：Express的[res.json()](https://itbilu.com/nodejs/npm/Vkp32gJpg.html#res-method-json)函数）中显示虚拟属性填充，则需要在模式的的`toJSON`选项上设置`virtuals:true`选项：

```
// Set `virtuals: true` so `res.json()` works
var BandSchema = new Schema({
  name: String
}, { toJSON: { virtuals: true } });
```

如果您正在使用填充投影（`projection`），应确保在投影中包含`foreignField`：

```
Band.
  find({}).
  populate({ path: 'members', select: 'name' }).
  exec(function(error, bands) {
    // Won't work, foreign field `band` is not selected in the projection
  });

Band.
  find({}).
  populate({ path: 'members', select: 'name band' }).
  exec(function(error, bands) {
    // Works, foreign field `band` is selected
  });
```



## 15. 中间件中填充

还可以`pre`或`post`[勾子](http://mongoosejs.com/docs/middleware.html)中使用填充。如果始终要填充某个字段，请查看[mongoose-autopopulate](http://npmjs.com/package/mongoose-autopopulate)插件。

```
// Always attach `populate()` to `find()` calls
MySchema.pre('find', function() {
  this.populate('user');
});
// Always `populate()` after `find()` calls. Useful if you want to selectively populate
// based on the docs found.
MySchema.post('find', async function(docs) {
  for (let doc of docs) {
    if (doc.isPublic) {
      await doc.populate('user').execPopulate();
    }
  }
});
// `populate()` after saving. Useful for sending populated data back to the client in an
// update API endpoint
MySchema.post('save', function(doc, next) {
  doc.populate('user').execPopulate().then(function() {
    next();
  });
});
```