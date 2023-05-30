<!--  -->
<template>
  <div>
    <div v-show="!showLorR" class="login-containe">
    <el-form ref="ruleFormRef" :model="loginForm" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">登录</h3>
        <span>没有注册?<a href="#" @click="showLorR = !showLorR">点击注册</a></span>
      </div>
      <el-form-item prop="username">
        <span class="icon">
          <i class="ri-user-5-line"></i>
        </span>
        <el-input v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="icon">
          <i class="ri-lock-line"></i>
        </span>
        <el-input ref="password" v-model="loginForm.password" placeholder="Password" name="password" :type="login.passwordType === 'password'?'password':'text'" tabindex="1" auto-complete="on"></el-input>
        <span class="show-pwd" @click="shoPwd">
          <i :class="login.passwordType === 'password' ? 'ri-eye-close-line':'ri-eye-line'"></i>
        </span>
      </el-form-item>
      <el-button :loading="login.loading" type="primary" class="btn-login"
      @click = "submitForm()">登录</el-button>
    </el-form>
  </div>
  <Register :show-LorR="showLorR" @isshow = 'showLorR=!showLorR'></Register>
  </div>
</template>

<script lang='ts' setup>
import {reactive , ref,nextTick} from 'vue';
import Register from '../register/index.vue';
import {reqLoginlist} from '../../api/api';
// import axios from 'axios';
// 路由跳转页面
import { useRouter } from 'vue-router';
// 使用vuex对用户信息进行操作
import { useStore } from 'vuex';

// import Cookie from 'js-cookie';
// import axios from 'axios';
const showLorR = ref(false)
const loginForm = reactive({
  username:'admin',
  password:'123456'
})
// 效验
const ruleFormRef = ref()
//获取项目路由对象
 let router = useRouter()
// 获取vuex对象
let store = useStore()
// 效验password
const validatePw = (rule:any,value:any,callback:any)=>{
  if(value === ''){
    callback(new Error('Please input the password'))
  }else{
    callback()
  }
}


const rules = reactive({
  username:[
  { required: true, message: 'Please input Activity name', trigger: 'change' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password:[{validator:validatePw,trigger:'blur'}]
})

// 点击登录
const submitForm  = ()=>{
  ruleFormRef.value.validate().then(async()=>{
  const result= await reqLoginlist({
    username:loginForm.username,
    password:loginForm.password
   })
  
  //  console.log(result)
   if(result.data.code == 200){
    localStorage.setItem("token",result.data.data.token)
  //   // 获取用户信息
    store.dispatch('getdateMenus').then(() => {
      router.push('/homepage')
    })
      // router.push('/homepage')
    // }
  }
  }).catch(()=>{
    console.log('效验不通过')
  })
  
}
const login = reactive({
  passwordType:'password',
  loading:false
})
const password = ref<HTMLElement>()
const shoPwd = ()=>{
  if(login.passwordType === 'password'){
    login.passwordType = ''
  }else{
    login.passwordType = 'password'
  }
  nextTick(()=>{
    password.value.focus()
  })
}
</script>

<style lang='less'>

  .login-containe{
    
    width: 100%;
    min-height: 100vh;
    background: url(../../assets/image/1.png) no-repeat;
    background-size: cover;
    overflow: hidden;
    .login-form {
      position: relative;
    width: 400px;
    height: 320px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .title-container{
      .title{
      color: #fff;
      font-size: 30px;
     }
     span{
      display: flex;
      align-items:baseline;
      position: absolute;
      right: 30px;
      bottom: 60px;
      font-size: 12px;
      color: #fff;
      a{
        font-size: 13px;
        color: #3a7f1d;
      }
     }
    }
   
    .el-form-item {
      position: relative;
   
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    width: 100%;
    height: 47px;
    color: #f2ebeb;
    
    .icon{
      position: absolute;
      top: 6px;
      left: 10px;
      z-index: 1;
    }
    i[class^="ri-eye"]{
      position: absolute;
      right: 16px;
      top: 10px;
    }
    .el-input {
      height: 47px;
      .el-input__wrapper{
        padding: 0;
        background-color: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter:blur(8px);
        box-shadow: 0 8px 32px 0 rgba(74, 7, 99, 0.89);
        box-shadow: none;
        outline: 0;
        border-radius: 15px;
        input {
      border: 0px;
      border-radius: 15px;
      padding: 12px 5px 12px 30px;
      color: #fff;
      height: 47px;
      caret-color: #fff;
    }
      }
  }
  
}
    }
    .btn-login{
      width: 100%;
      height: 40px;
      font-size: large;
      color: #fff;
      font-weight: 700;
      border: 0;
      border-radius: 10px;
      background-color: rgb(246, 237, 4);
      margin-top: 20px;
    }
    .btn-login:hover{
      box-shadow: 0 0 10px #d0e118;
    }
  }
</style>