// 1.导入模块
const express = require('express');

// 2.创建express 的服务器实例
const app = express()

// 导入跨域中间件
const cors = require('cors')
// 将跨域注册为全局zujian 
app.use(cors())
const joi = require("joi")
//解析请求体数据为application/x-www-form-urlencoded格式 
app.use(express.urlencoded({extended: false}))

// 在路由之前封装res.cc提示错误信息
// 响应数据的中间件
app.use(function (req,res,next){
    res.cc = function( err, status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message :err
        })
    }
    next()
})
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 3.导入user 
const user = require('./router/user');
const userinfo = require('./router/userinfo')
const userlist = require('./router/userlist')
// 4.注册
app.use('/api',user)
app.use('/my',userinfo)
app.use('/my',userlist)
// 表单验证错误中间件
app.use(function (err, req, res, next) {
    
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})



app.listen(80,function(){
    console.log('api server running at http://127.0.0.1:8080')
})

