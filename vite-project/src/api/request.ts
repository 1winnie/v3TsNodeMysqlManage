import axios from 'axios';

const instance = axios.create({
    baseURL:'http://127.0.0.1',
    timeout:15000
});

// 拦截器
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    // 设置服务器接收参数形式
    config.headers['Content-Type']="application/x-www-form-urlencoded";
    // 设置请求头
    if(token){
        config.headers['Authorization'] = token
    }
    return config;
},err =>{
    return Promise.reject(err)
})

instance.interceptors.response.use(result => {
    return result;
},err =>{
    return Promise.reject(err)
})

export default instance;