const router = require('express').Router()
const {
	register,
	login,
	getCurrent,
	refreshAccessToken,
	logout,
} = require('../controllers/useController')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', register)
router.get('/login', login)
router.get('/current', verifyAccessToken, getCurrent)
router.post('/refreshtoken', refreshAccessToken)
router.get('/logout', verifyAccessToken, logout)

module.exports = router
