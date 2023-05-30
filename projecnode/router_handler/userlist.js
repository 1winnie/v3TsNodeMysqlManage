const db = require('../db/index')
exports.userlisthandle = (req, res) => {
    const data = req.query
    const keywords = Object.values(data)[0]
    console.log(keywords)
    const sql2 = 'select username from my_db_02.users'
    const sql3 = 'select password from my_db_02.users'
    db.query(sql2, function (err, results) {
        if (err) return res.cc(err)
        if (results.length === 0) {
            return res.cc('返回失败，没有数据')
        }
        const username = results;
        db.query(sql3, function (err, results) {
            const password = results;
            const sql1 = 'select * from my_db_02.userlist'
            db.query(sql1, function (err, results) {
                if (err) return res.cc(err)
                if (results.length === 0) {
                    return res.cc('返回失败，没有数据')
                }
                for (let i = 0; i < username.length; i++) {
                    results[i].username = username[i].username
                    results[i].password = password[i].password
                }
                // console.log(keywords)
                if(data.keyword != ''){
                    console.log(results[0].username)
                    const newresult = results.filter((item)=>{
                        return item.username === keywords
                    })
                    // console.log(newresult)
                    res.send({
                        code: 200,
                        list:newresult
                    })
                }else{
                    res.send({
                        code: 200,
                        list:results
                    })
                }
                
               
            })
        })


    })
}
exports.updateulist = (req, res) => {
    const id = Object.values(req.params)[0]
    console.log(id)
    const { username, nickName, email, password, note, status } = req.body
    const sql = 'update my_db_02.userlist set nickName=?,email=?,note=?,status=? where id=?'
    db.query(sql, [nickName, email, note, status, id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // console.log(results)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        // if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！**')
        const sql4 = 'select username from my_db_02.users'
        db.query(sql4,(err,results) => {
            // console.log(results)
            const oldusername = results[id-1].username
            // console.log(oldusername)
            const sql = 'update my_db_02.users set username=?,password=? where username=?'
            // console.log(username)
            db.query(sql, [username, password, oldusername], (err, results) => {
            if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是影响行数不等于 1
            // if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
            // 成功
            console.log('更新信息成功')
            res.cc('更新用户信息成功！', 0)
        })
        })

    })

}