<!--  -->
<template>
  <!-- 对话框 -->
  <el-dialog v-model="isshow" title="Shipping address" :before-close="close">
    <el-form :model="newForm">
      <el-form-item label="账号" >
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="newForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" >
        <el-input type="textarea" v-model="newForm.note" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用" >
        <el-radio v-model="newForm.status" :label="1">是</el-radio>
        <el-radio v-model="newForm.status" :label="0">否</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="modifyAdmin()" >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="closeus"
  >
    <span>用户名已被占用，请换一个哦</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeus">
          好的
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref,watch} from 'vue'
import {requpdateulist} from '../../api/api.ts'
const props = defineProps<{
    isshow:boolean,
    form:AdminObjItf,
    alldate:{username:string}[]
}>();
const {isshow} = toRefs(props)
const emit = defineEmits<{
    (event: 'close',r?:'reload'):void
}>()
const state = reactive<{newForm:AdminObjItf,dialogVisible:boolean}>({
    newForm:{},
    dialogVisible:false
})
const {newForm,dialogVisible} = toRefs(state)

// 当rowData的值和父传过来的row地址相关联，修改则会修改到父类的属性
// 所以需要新定义一个变量进行接收值，
// 需要用到watch来监听，因为setup在beforecreate就触发了，所以当form的值改变时，再触发
// watch(props.form,()=>{
//     state.newForm = {...form}
// })
watch(()=>props.form,()=>{
    newForm.value = {...props.form}
})
// 点击关闭
const close = (r?: 'reload') => {
    emit('close',r)
}
// 点关闭提示用户名相同的提示框
const closeus = ()=>{
  dialogVisible.value = false
}
// 点击确认
const modifyAdmin=async()=>{
  props.alldate.forEach(element => {
      if(element.username == newForm.value.username){
        dialogVisible.value = true
        return;
      }
    });
   // console.log(JSON.parse(JSON.stringify(newForm.value)))
   console.log(dialogVisible)
   if(!dialogVisible.value){
    const result = await requpdateulist(newForm.value.id,JSON.parse(JSON.stringify(newForm.value)))
    // console.log(result)
    // if(result.code == 200){
      close('reload')
   }
    // }
}



</script>
<style lang='less' scoped>
</style>