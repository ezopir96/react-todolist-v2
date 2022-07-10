const fs = require('fs')
const getList = (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const userid = req.params.userid
  console.log('收到请求', userid)
  if (userid === 'undefined') res.send({ code: 202, message: '没收到用户id', data: [] })
  
  const allList = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'))

  const resList = allList.filter(item => {
    return item.userid === userid
  })
  res.send({
    code: 201,
    message: '收到列表请求',
    data: resList
  })
}

// 🔥 添加请求 🔥
const addList = (req, res) => {
  const data = req.body
  console.log('收到添加请求')

  const { lid, userid, content } = data
  const list = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'))
  const newTodo = { lid, userid, content, isFinished: false }
  list.push(newTodo)
  fs.writeFileSync('db/db.json', JSON.stringify(list))

  res.send({
    code: 201,
    message: '收到添加请求',
    data: newTodo
  })
}

// 💧 单选请求 💧
const toggleList = (req, res) => {
  const lid = req.params.lid
  console.log('收到切换状态请求', lid)
  const list = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'))
  // console.log(list)
  list.forEach(item => {
    if (item.lid == lid) item.isFinished = !item.isFinished
  })
  // console.log(list)

  fs.writeFileSync('db/db.json', JSON.stringify(list))

  res.send({
    code: 201,
    message: '收到切换状态请求',
  })
}

// 🚗 全选状态 🚗
const toggleAll = (req, res) => {
  const { isFinished } = req.body
  console.log('全选状态', isFinished)
  const list = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'))
  list.forEach(item => {
    item.isFinished = !isFinished
  })
  // console.log(list)
  fs.writeFileSync('db/db.json', JSON.stringify(list))

  res.send({
    code: 201,
    message: '收到全选请求',
    isFinished
  })
}

// 🔥 删除请求 🔥
const deleteList = (req, res) => {
  const { lid } = req.params
  console.log('收到删除请求', lid)
  const list = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'))
  fs.writeFileSync('db/db.json', JSON.stringify(list.filter(item => {
    return item.lid !== lid
  })))
  
  res.send({
    code: 201,
    message: '收到删除请求',
    data: lid
  })
}

module.exports = {
  getList,
  addList,
  toggleList,
  toggleAll,
  deleteList
}