const router = require('express').Router()
const {
	createNewBrand,
	getBrands,
	updateBrand,
	deleteBrand,
} = require('../controllers/brandController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], createNewBrand)
router.get('/', getBrands)
router.put('/:bid', [verifyAccessToken, isAdmin], updateBrand)
router.delete('/:bid', [verifyAccessToken, isAdmin], deleteBrand)

module.exports = router
