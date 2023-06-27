const router = require('express').Router()
const {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], createProduct)
router.get('/', getProducts)
router.put('/:pid', [verifyAccessToken, isAdmin], updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], deleteProduct)
router.get('/:pid', getProduct)

module.exports = router
