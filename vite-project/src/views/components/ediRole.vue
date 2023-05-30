<!-- 编辑角色 -->
<template>
 <el-dialog v-model="visible" title="分配角色" :before-close="close">
    <el-form :model="form">
      <el-form-item >
        <el-select multiple v-model="roles" placeholder="Please select a zone">
          <el-option v-for="role in form.roleLists" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="updaterole">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import axios from 'axios';
import {reactive , toRefs ,ref,watch} from 'vue'
const props = defineProps<{
    visible:boolean;
    form:AdminRoleFormData
}>();

const {visible} = toRefs(props)
// 获取用户角色的id，根据id选择
const roles = ref<number[]>([])
watch(() => props.form.userRoles, () => {
  roles.value = props.form.userRoles.map(item => item.id);
})
const emit = defineEmits<{
    (event:'close'):void
}>();
// 点击关闭
const close = ()=>{
    emit('close')
}
// 点击确定
const updaterole = ()=>{
    // 给用户更新角色
  axios({
    url:'/admin/role/update/',
    method:'post',
    params:{
      adminId:props.form.adminId,
      roleIds:roles.value.join(',')
    },
    headers:{
      "Authorization":'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODQ3NTMzNDgyNDMsImV4cCI6MTY4NTM1ODE0OH0.LgXU5lC0XO6ZjoVOwS4n1ry_RtrEfqcTAR-PWlFq_1RpSl7-X0-xkuKdqJYDxVXmNsiFCGSMxlGEtqgEDs00BA'
      }
  }).then(res =>{
      close()
  })
}

</script>
<style lang='less' scoped>
</style>