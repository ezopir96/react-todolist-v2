const fs = require('fs')
const jwt = require('jsonwebtoken')
const { secret, expires } = require('../configs/config')
const login = async (req, res) => {
  console.log('收到登录请求', req.body)

  const { username, password } = req.body
  const userInfo = JSON.parse(fs.readFileSync('db/userDB.json', 'utf-8'))
  const num = userInfo.findIndex(item => {
    return (item.username === username && item.password === password)
  })
  if (num === -1) {
    res.send({
      code: 102,
      message: '不存在该账户或密码输入错误'
    })
  } else {
    const userid = userInfo[num].userid
    const nickname = userInfo[num].nickname
    const token = 'Bearer ' + jwt.sign({ id: userid }, secret, { expiresIn: expires })
    res.send({
      code: 101,
      message: '请求收到',
      token,
      userid,
      nickname
    })
  }
}

const regist = (req, res) => {
  console.log('收到注册请求', req.body)
  const { userid, username, password, nickname } = req.body
  
  const userInfo = JSON.parse(fs.readFileSync('db/userDB.json', 'utf-8'))
  const num = userInfo.findIndex(item => {
    return item.username === username
  })
  
  if (num !== -1) res.send({ code: 103, message: '该用户已经存在' })

  userInfo.push({ userid, username, password, nickname })
  
  fs.writeFile('db/userDB.json', JSON.stringify(userInfo), () => {
    res.send({
      code: 101,
      message: '请求收到, 已写入信息'
    })
  })
}

module.exports = {
  login,
  regist
}
