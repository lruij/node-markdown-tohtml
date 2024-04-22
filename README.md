#### markdown to html

##### 工具

- ejs
- marked
- browser-sync


##### 步骤

1. 定义 ejs 模版

```html

<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
      <%= title %>
    </title>
    <link rel="stylesheet" href="src/template/index.css">
  </head>

  <body>
    <%- content %>
  </body>

</html>


```

2. 转换 markdown 为 html

```js
const marked = require('marked')
const readme = fs.readFileSync('README.md');
const fs  = require('nodefs')
const ejs = require('ejs');

const render = () => {
  const readme = fs.readFileSync('README.md');

  ejs.renderFile('src/template/index.ejs', {
    content: marked.parse(readme.toString()),
    title: 'markdown to html'
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
  })
}
```

3. 输出到指定文件

```js

let writeStream = fs.createWriteStream('./public/index.html')
writeStream.write(data)
writeStream.close()
writeStream.on('finish', () => {
  // .......完成操作
})
```

4. 打开浏览器预览

```js
const browserSync = require('browser-sync');

let browser;

const openBrowser = () => {
  if (!browser) {
    browser = browserSync.create()
    browser.init({
      server: {
        baseDir: './',
        index: 'public/index.html',
      }
    })
  } else {
    browser.reload()
  }
}
```

5. 监听 markdown 文件实时编译

```js
const fs = require('node:fs')
fs.watchFile('README.md', (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    render()
  }
})
```

```sh
node src/index.js
```
