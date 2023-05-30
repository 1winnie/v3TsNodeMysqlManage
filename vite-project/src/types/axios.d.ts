// 传递的params参数
interface AdminLoginData{
    password:string,
    username:string
}
type PromiseRes<T = {}> = Promise<ManageResult<T>>
// 请求返回的数据
interface ManageResult<T> {
        code?: number;
        errno?:number;
        data:T;
}

// 登录返回接口
interface AdminLogRes{
    token:string,
    tokenHead: string
}
// 注册返回的code
// interface AdminRegister{
//     code:number,
//     msg:string
// }
// 当前用户信息
interface AdimInfoRes{
    code:number
   data:{
    menus:[]
   }
}
// 获取用户列表需传递的params
interface userlist{
    keyword:string,
    pageSize:number,
    pageNum:number
}
