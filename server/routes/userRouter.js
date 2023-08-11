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
} = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', register)
router.get('/finalregister/:token', finalregister)
router.post('/login', login)
router.get('/current', verifyAccessToken, getCurrent)
router.post('/refreshtoken', refreshAccessToken)
router.get('/logout', verifyAccessToken, logout)
router.get('/forgotpassword', forgotPassword)
router.put('/resetpassword', resetPassword)
router.get('/', [verifyAccessToken, isAdmin], getUsers)
router.delete('/', [verifyAccessToken, isAdmin], deleteUser)
router.put('/current', verifyAccessToken, updateUser)
router.put('/address', verifyAccessToken, updateUserAddress)
router.put('/cart', verifyAccessToken, updateCart)
router.put('/:uid', [verifyAccessToken, isAdmin], updateUserByAdmin)

module.exports = router
