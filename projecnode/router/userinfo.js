// 导入express模块
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/userinfo')
// 获取用户信息
router.get('/admin/info',userHandler.userinfo)

// 将路由共享出去
module.exports = router