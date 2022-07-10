const router = require('express').Router()
const { login, regist } = require('../controller/user')

router.post('/login', login)
router.post('/regist', regist)

module.exports = router
