# Redux Study ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

> 这个秋天🍂还是有些热，就像夏天还没有过去一样，不过，天空很蓝，白云☁很白......


## 简介

`redux-study`是一个最简单的学习`Redux`的栗子，使用`Webpack`从零构建，也许，在看文档学习感到枯燥无味的时候，尝试着动手写一个简单的demo，更有助于理解和学习，同时这会让我们的学习过程更加有趣。

项目目的：

- 尝试着从零构建一个项目
- 学习`Redux`
- 进行有趣的学习



## 开始

在开始动手写这个小demo之前，我们需要了解一些基本的概念，即<u>redux</u>的基础概念，这里我就不过多赘述了，相信官方文档讲得更加清楚。

→ [Redux基础概念](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts)

OK，在了解了<u>Redux</u>的基础概念之后，相信你已经知道了**state**、**reducer**、**action**等术语，这样在后面的讲述中相信你不会对这些术语感到奇怪。

### 建立项目

首先，我们需要创建一个名为📂`redux-study`（当然，你也可以起一个自己喜欢的名字，这并不妨碍）的文件夹用来存放我们的项目。

进入目录之后在终端运行运行：

`yarn init -y`

在这里，我使用的包管理工具是`yarn`，是的，你也可以使用`npm`或者`pnpm`，只要你喜欢。



此时你会发现在你项目的根目录下自动生成了一个`package.json`的文件，如下：

```json
{
  "name": "redux-study",
  "version": "1.0.0",
  "author": "renranSy",
  "license": "MIT"
}
```

是的，他看起来非常简单，包含了这个项目的一些信息。



接下来，由于我们使用`webpack`来构建我们的项目，所以我们需要手动来安装一些依赖：

`yarn add -D webpack webpack-cli webpack-dev-server`

同样的，我们也需要安装`redux`

`yarn add redux`

这时候，我们的`package.json`发生了一点变化：

```json
{
  "name": "redux-study",
  "version": "1.0.0",
  "main": "index.js",
  "author": "sunyang <2480901422@qq.com>",
  "license": "MIT",
  "scripts": {
    "dev": "webpack-dev-server --config ./webpack.config.js"
  },
  "devDependencies": {
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```

这时候，我们需要对`webpack`进行一些配置，于是我们需要在根目录下新建一个名为`webpack.config.js` 的文件，并写入一些进行配置的代码：

```javascript
const path = require('path')

module.exports = {
  // 指定入口文件
  entry: './src/index.js',
  // 指定输出文件，以及输出文件存放的位置
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    // 指定静态文件存放的文件夹
    static: {
      directory: path.join(__dirname, 'public')
    },
    // 是否压缩
    compress: true,
    // 项目运行端口
    port: 9000
  },
  // 模式为开发模式
  mode: 'development'
}
```

我在代码中表明了一些注释，相信你能够明白它的意思。



创建配置文件之后我们需要根据我们的配置文件来做一些事情。

在根目录下创建两个文件夹📂`public`和📂`src`。

在📂`public`文件夹中创建两个文件分别为`index.html`和`style.css`，并在里面写入一些代码：

<u>html文件</u>

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Redux Study</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app">
  <div id="addBook"></div>
  <div id="delBook"></div>
  <ul id="bookList"></ul>
</div>
<!-- 在 webpack配置文件中进行配置后，运行 yarn dev 会在 public 文件夹下面生成一个 app.js 文件-->
<script src="app.js"></script>
</body>
</html>
```

<u>css文件</u>

```css
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

button {
  width: 100px;
}
```

在📂`src`文件夹中新建一个名为`index.js`的文件。



这样，我们的项目就准备好了，接下来就是在`index.js`文件中来写一些代码，并尝试完成这个demo。

### 主要代码

我将代码放在了这里，并标明了注释：

```javascript
import { createStore } from 'redux'

// 用来记录 old state
let recordState
// 初始化 state
const initialState = []

// 创建 reducer
const reducer = function (state = initialState, action) {
    recordState = state
    switch (action.type) {
        case 'addBook':
            console.log(action)
            return [
                ...state,
                {
                    bookId: action.info.bookId,
                    bookName: `<<${action.info.bookName}>>`
                }
            ]
        case 'delBook':
            return state.filter((book) => book.bookId !== action.info.bookId)
        default:
            return [
                ...state
            ]
    }
}

// 创建 store
const store = createStore(reducer)

// 获取添加书籍的元素
const addBook = document.getElementById('addBook');
// 获取删除书籍的元素
const delBook = document.getElementById('delBook');
// 获取展示书籍列表的元素
const bookList = document.getElementById('bookList');

// 创建添加书籍的按钮
const addBookBtn = document.createElement('button');
// 创建添加书籍的input框，输入书名添加书籍
const bookNameInput = document.createElement('input');
// 创建删除书籍的按钮
const delBookBtn = document.createElement('button');
// 创建删除书籍的input框，输入书籍id删除书籍
const bookIdInput = document.createElement('input');

addBookBtn.innerText = "添加"
delBookBtn.innerText = "删除"

addBookBtn.addEventListener('click', addBookFn)
delBookBtn.addEventListener('click', delBookFn)

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)
delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)

// 定义一个生成器函数生成 id
function* generateID() {
    let id = 0;
    while (true) {
        yield id++
    }
}

const generateId = generateID()
const genBookId = () => generateId.next().value.toString()

// 添加书籍函数
function addBookFn() {
    const bookName = bookNameInput.value
    if (bookName) {
        const bookId = genBookId()
        bookNameInput.value = ''
        const action = {
            type: 'addBook',
            info: {
                bookId,
                bookName
            }
        }
        store.dispatch(action)
    }
}

// 删除书籍函数
function delBookFn() {
    const bookId = bookIdInput.value
    if (bookId) {
        bookIdInput.value = ''
        const action = {
            type: 'delBook',
            info: {
                bookId: bookId
            }
        }
        store.dispatch(action)
    }
}

// 如果 state 发生变化，打印旧的 state 和新的 state
const showState = store.subscribe(() => {
    console.log('Old State' + recordState)
    console.log('New State' + store.getState())
})

// state 发生变化，重新渲染 bookList
const showNewList = store.subscribe(() => {
    const currentState = store.getState()
    if (currentState.length !== recordState.level) {
        bookList.innerText = ''
        currentState.forEach((element) => {
            bookList.appendChild(createBookList(element))
        })
    }
})

function createBookList(info) {
    const element = document.createElement('li')
    element.innerText = `BookID: ${info.bookId} BookName: ${info.bookName}`
    return element
}
```

接下来，我们进入项目所在的目录，打开终端，运行 `yarn webpack-dev-server --config ./webpack.config.js`就能看到我们的效果啦。

输入书名添加书籍，输入书籍id删除书籍。

## 参考视频

[20分钟讲清楚Redux全流程架构（无框架版）](https://www.bilibili.com/video/BV12B4y1z7my/?spm_id_from=333.337.search-card.all.click&vd_source=0d822382cb114cb34b2655e3c79b7cbc)
