const router=require('express').Router()
const controller=require('./user.controller')

router.route('/check/:code').get(controller.check)
router.route('/signup').post(controller.signup)
router.route('/signin').post(controller.signin)

module.exports=router