// 导入数据库
const db = require('../db/index')
exports.userinfo = (req,res)=>{
    const sql = 'select * from userinfo_menus'
    db.query(sql,(err,results)=>{
        if(err) return res.cc(err)
        // console.log(results)
        if(results.length === 0) return res.cc('获取用户信息失败')
        // console.log('获取信息成功')
        res.send({
            code:200,
            data:{
                icon:null,
                menus:results,
                roles:['超级管理员'],
                username:'admin',
                message:'操作成功'
            }
        })
    })
}