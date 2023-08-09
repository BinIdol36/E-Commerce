const router = require('express').Router()
const { insertProduct, insertCategory } = require('../controllers/insertData')

router.post('/', insertProduct)
router.post('/cate', insertCategory)

module.exports = router
