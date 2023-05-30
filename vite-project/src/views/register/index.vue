<template>
    <div class="login-containe" v-show="props.showLorR">
    <el-form ref="ruleFormRef" :model="RegisterForm" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">注册</h3>
        <span>已有账号?<a href="#" @click="emits('isshow')">点击登录</a></span>
      </div>
      <el-form-item prop="username">
        <span class="icon">
          <i class="ri-user-5-line"></i>
        </span>
        <el-input v-model="RegisterForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="icon">
          <i class="ri-lock-line"></i>
        </span>
        <el-input ref="password" v-model="RegisterForm.password" placeholder="Password" name="password"  tabindex="1" auto-complete="on"></el-input>
        
      </el-form-item>
      <el-button :loading="Register.loading" type="primary" class="btn-login" @click="register">注册</el-button>
    </el-form>
    <!-- 对话框 -->
    <el-dialog
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
    madal="true"
  >
    <span>{{ msg }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>
<script setup lang="ts">
    import {ref,reactive} from 'vue';
    import {reqregister} from '../../api/api'
    import { ElMessageBox } from 'element-plus'
    const props = defineProps(["showLorR"])
    const emits = defineEmits(["isshow"])
    const RegisterForm = reactive({
        username:'aaa',
        password:'123456'
    })
    const Register = reactive({
        loading:false
    })
    // 注册对话框
    const  dialogVisible = ref(false)
    const status = ref(0)
    const msg = ref('')
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
    // 效验
    const ruleFormRef = ref()
    // 点击注册
    const register = ()=>{
      ruleFormRef.value.validate().then(async()=>{
        const result = await reqregister({
          "password":RegisterForm.password,
          "username":RegisterForm.username
        })
      //  console.log(result)
        status.value = result.data.status
        if(result.data.status == 1){
          dialogVisible.value = true
          msg.value = '用户名已注册喔！需换一个~~'
        }
        if(result.data.code == 200){
          dialogVisible.value = true
          msg.value='注册成功'
          emits('isshow')
        }
        
      })
      }
    // 处理对话框
    const handleClose = (done: () => void) => {
          ElMessageBox.confirm(status.value == 1?'用户名已注册喔！需换一个~~':'注册成功！')
           .then(() => {
               done()
            }).catch((error) => {
              console.log(error)
            })
  }
        
</script>