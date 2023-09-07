const router = require('express').Router()
const {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
	ratings,
	uploadImagesProduct,
	addVarriant,
} = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post(
	'/',
	[verifyAccessToken, isAdmin],
	uploader.fields([
		{ name: 'images', maxCount: 10 },
		{ name: 'thumb', maxCount: 1 },
	]),
	createProduct,
)
router.get('/', getProducts)
router.put('/ratings', verifyAccessToken, ratings)
router.put(
	'/uploadimage/:pid',
	[verifyAccessToken, isAdmin],
	uploader.fields('images', 10),
	uploadImagesProduct,
)
router.put(
	'/:pid',
	[verifyAccessToken, isAdmin],
	uploader.fields([
		{ name: 'images', maxCount: 10 },
		{ name: 'thumb', maxCount: 1 },
	]),
	updateProduct,
)
router.put(
	'/varriant/:pid',
	[verifyAccessToken, isAdmin],
	uploader.fields([
		{ name: 'images', maxCount: 10 },
		{ name: 'thumb', maxCount: 1 },
	]),
	addVarriant,
)
router.delete('/:pid', [verifyAccessToken, isAdmin], deleteProduct)
router.get('/:pid', getProduct)

module.exports = router
