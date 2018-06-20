const router=require('express').Router()
const controller=require('./user.controller')

router.route('/check/:code').get(controller.check)
router.route('/signup').post(controller.signup)

module.exports=router