const express = require('express')
const app = express()
const path = require('path')
const moviesDB = require('./../src/model/moviesModel')
const port = 9000

//设置模板引擎 views 模板文件所在目录
app.set('views', path.join(__dirname, 'views'))
// view engine 使用的模板引擎
app.set('view engine', 'html')
//将模板引擎映射到.html文件
app.engine('html', require('ejs').__express)

app.get('/', async (req, res) => {
  let movies = await moviesDB.find({})
  if (movies) {
    res.render('index', { movies })
  }
})

app.listen(port, () => {
  console.log(`success: this server is running at localhost:${ port }`)
})