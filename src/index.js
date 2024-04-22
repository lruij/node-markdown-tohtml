const ejs = require('ejs');
const marked = require('marked');
const fs = require('node:fs');
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


const render = () => {
  const readme = fs.readFileSync('README.md');

  ejs.renderFile('src/template/index.ejs', {
    content: marked.parse(readme.toString()),
    title: 'markdown to html'
  }, (err, data) => {
    if (err) {
      console.log(err)
    }

    let writeStream = fs.createWriteStream('./public/index.html')
    writeStream.write(data)
    writeStream.close()
    writeStream.on('finish', () => {
      openBrowser()
    })
  })
}

fs.watchFile('README.md', (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    render()
  }
})

render()


