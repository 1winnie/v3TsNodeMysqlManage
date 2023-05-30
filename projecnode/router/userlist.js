const express = require('express')
const router = express.Router()
const userlisthandle = require('../router_handler/userlist')
// 获取用户列表信息
router.get('/userlist',userlisthandle.userlisthandle)
// 更新用户信息
router.post('/updateulist/:id',userlisthandle.updateulist)
// 将路由共享出去
module.exports = router