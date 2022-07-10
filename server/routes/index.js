const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/lists', require('./lists'))

module.exports = router