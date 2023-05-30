// 导入数据库
const mysql = require('mysql')
// 创建数据库连接对象
const db = mysql.createPool({
    host:'127.0.0.1',
    port:'3307',
    password:'admin123',
    user:'root',
    database:'my_db_02'
})

// 向外共享db
module.exports = db