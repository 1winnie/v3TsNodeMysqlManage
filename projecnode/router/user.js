// 导入express模块
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要验证的规则
const {reg_login_user} = require('../schema/user')

// 注册
router.post('/register',expressJoi(reg_login_user),userHandler.register)
// 登录
router.post('/login',expressJoi(reg_login_user),userHandler.login)

// 将路由共享出去
module.exports = router