const router = require('express').Router()
const {
	register,
	login,
	getCurrent,
	refreshAccessToken,
	logout,
	forgotPassword,
	resetPassword,
	getUsers,
	deleteUser,
	updateUser,
	updateUserByAdmin,
	updateUserAddress,
	updateCart,
	finalregister,
	createUsers,
	removeProductInCart,
} = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/register', register)
router.post('/mock', createUsers)
// router.get('/finalregister/:token', finalregister)
router.put('/finalregister/:token', finalregister)
router.post('/login', login)
router.get('/current', verifyAccessToken, getCurrent)
router.post('/refreshtoken', refreshAccessToken)
router.get('/logout', verifyAccessToken, logout)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword', resetPassword)
router.get('/', [verifyAccessToken, isAdmin], getUsers)
router.delete('/:uid', [verifyAccessToken, isAdmin], deleteUser)
router.put('/current', verifyAccessToken, uploader.single('avatar'), updateUser)
router.put('/address', verifyAccessToken, updateUserAddress)
router.put('/cart', verifyAccessToken, updateCart)
router.delete('/remove-cart/:pid', verifyAccessToken, removeProductInCart)
router.put('/:uid', [verifyAccessToken, isAdmin], updateUserByAdmin)

module.exports = router
