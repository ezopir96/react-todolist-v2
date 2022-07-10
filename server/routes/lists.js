const router = require('express').Router()
const { getList, addList, toggleList, toggleAll, deleteList } = require('../controller/lists')
// add
router.get('/getlist/:userid', getList)

router.post('/addlist', addList)
router.get('/togglelist/:lid', toggleList)
router.put('/toggleall', toggleAll)
router.delete('/deletelist/:lid', deleteList)

module.exports = router
