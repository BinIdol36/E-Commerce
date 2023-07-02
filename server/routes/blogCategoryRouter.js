const router = require('express').Router()
const {
	createCategory,
	getCategories,
	updateCategory,
	deleteCategory,
} = require('../controllers/blogCategoryController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], createCategory)
router.get('/', getCategories)
router.put('/:bcid', [verifyAccessToken, isAdmin], updateCategory)
router.delete('/:bcid', [verifyAccessToken, isAdmin], deleteCategory)

module.exports = router
