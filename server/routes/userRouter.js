const router = require('express').Router()
const { register, login } = require('../controllers/useController')

router.post('/register', register)
router.get('/login', login)

module.exports = router
