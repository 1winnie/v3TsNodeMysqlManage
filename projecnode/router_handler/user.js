// 导入数据库
const db = require('../db/index')
// 生成token加密的字符串
const jwt = require('jsonwebtoken')
// 导入生成token要用的加密字段
const config = require('../config')
// 导入bcryptjs对密码进行加密
const bcrypt = require('bcryptjs')
exports.register =(req,res)=>{
    const userinfo = req.body;
    const sql = 'select * from users where username=?'
    db.query(sql,userinfo.username,function(err,results){
        if(err) return res.cc(err)
        // 用户名已经存在
        if(results.length > 0){
            return res.cc('用户名已经被占用，请更换其他用户名哦')
        }
        // 用户名可以用
        // 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)

        // 插入新的用户
        const sql = 'insert into users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1){
                return res.cc("注册用户失败，请稍后再试")
            }
            // 注册成功
            res.send({
                status:0,
                code:200,
                msg:'注册成功！'
            })
        })
    })
}
exports.login = (req,res)=>{
    // 接收的表单数据
    const userinfo = req.body
    const sql = 'select * from my_db_02.users where username=?'
    db.query(sql,userinfo.username, function(err,results){
        if(err) return res.cc(err)
        if(results.length !== 1) {return res.cc('登录失败')}
       
        // 用存储在数据库加密的密码和新输入的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.username,results[0].username);
        if(compareResult){
            return res.cc("登录失败！密码不匹配哦")
        }

        const user = {...results[0],password:''}
        console.log(user)
        // 生成Token 字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10s'
        })
        console.log('登录成功')
        res.send({
            code:200,
            data:{
                status:0,
                message:'登录成功',
                token:'Bearer ' + tokenStr,
            }
        })
    })
}
