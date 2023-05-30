
import request from './request';

// 注册
export const reqregister = (data:AdminLoginData)=> request.post('/api/register',data)
// 登录返回token
export const reqLoginlist=(data:AdminLoginData):any=> request.post('/api/login',data)
// 登录获取info
export const reqgetuserinfo = ():PromiseRes<AdimInfoRes>=>request.get('/my/admin/info')
// 获取用户列表list
export const requserlist = (data:userlist)=>request.get('/my/userlist',{params:data})
// 跟新用户列表
export const requpdateulist = (id:number,data:AdminObjItf)=> request.post("/my/updateulist/"+id,data)
// 获取首页数据
export const reqgetindexlist = ():PromiseRes<indexDateItf>=> request({
    url:'http://kumanxuan1.f3322.net:8360/admin/stat',
    method:'get',
    headers:{
        "Authorization":'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODQ3NTMzNDgyNDMsImV4cCI6MTY4NTM1ODE0OH0.LgXU5lC0XO6ZjoVOwS4n1ry_RtrEfqcTAR-PWlFq_1RpSl7-X0-xkuKdqJYDxVXmNsiFCGSMxlGEtqgEDs00BA'
        }
})