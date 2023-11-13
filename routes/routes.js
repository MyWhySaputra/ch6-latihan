const router = require('express').Router()
const userroute = require('./user.route')

router.use('/user', userroute)

module.exports = router