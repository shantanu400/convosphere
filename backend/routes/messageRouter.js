const express=require('express')
const router=express.Router()
const isAuthenticated = require('../middleware/isAuthenticated')
const {sendMessage, getMessages} = require('../controllers/messageController')


router.route('/send/:id').post(isAuthenticated, sendMessage)
router.route('/:id').get(isAuthenticated,getMessages)


module.exports=router
