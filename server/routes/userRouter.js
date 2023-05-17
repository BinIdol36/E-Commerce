const router = require('express').Router()
const { register, login, getCurrent } = require('../controllers/useController')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', register)
router.get('/login', login)
router.get('/current', verifyAccessToken, getCurrent)

module.exports = router
