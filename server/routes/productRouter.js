const router = require('express').Router()
const {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
	ratings,
	uploadImagesProduct,
} = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], createProduct)
router.get('/', getProducts)
router.put('/ratings', verifyAccessToken, ratings)
router.put(
	'/uploadimage/:pid',
	[verifyAccessToken, isAdmin],
	uploader.single('images'),
	uploadImagesProduct,
)
router.put('/:pid', [verifyAccessToken, isAdmin], updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], deleteProduct)
router.get('/:pid', getProduct)

module.exports = router
