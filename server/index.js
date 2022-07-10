const express = require('express')
const path = require('path')
const { expressjwt } = require('express-jwt')
const router = require('./routes/index')
const body = require('body-parser')
const { port, secret, pass, expires } = require('./configs/config')
const { urlencoded } = require('body-parser')
const app = express()
const cors = require('cors')

// 配置跨域
app.use(cors())

app.use('/static', express.static(path.join(__dirname, '../server')))

app.use(body.urlencoded({ extended: false }))
app.use(body.json())

app.use(expressjwt({
  secret,
  algorithms: ['HS256']
}).unless({path: pass}))

app.use(router)


app.listen(port, () => {
  console.log(`
  服务器启动成功
  监听端口: ${port}
`)
})
