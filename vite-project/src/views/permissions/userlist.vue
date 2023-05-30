<!--  -->
<template>
   <userlistsearch @oldlist="oldlist" :alldate="tableData" @newdate="seachdate"/>
 <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号"  />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template #default="scope">{{ formateDate(scope.row.createTime) }}</template>
    </el-table-column>
    <el-table-column label="最后时间">
      <template #default="scope">{{ formateDate(undefined) }}</template>
    </el-table-column>
    <el-table-column  label="是否启用">
      <template #default="scope">
         <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"/>
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template v-slot:default="{row}">
         <el-button type="text" @click="editRole(row.id)">分配角色</el-button>
         <el-button type="text" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
 <userlistdialog :isshow="dialogFormVisible" :alldate="tableData" :form="rowData" @close="close"></userlistdialog>
  <EditRole :visible="visible"  @close="closeeditrole" :form="roleData"/>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref} from 'vue'
import {requserlist} from '../../api/api'
import userlistdialog from '../components/userlistdialog.vue'
import userlistsearch from '../components/userlistsearch.vue' 
import EditRole from '../components/ediRole.vue'
import axios from 'axios'
const state = reactive<{
   tableData:{}[],
   dialogFormVisible:boolean,
   rowData:AdminObjItf,
   visible:boolean,
   roleData: AdminRoleFormData;
 }>({
    tableData:[],
    dialogFormVisible:false,
    rowData:{},
    visible:false,
    roleData: {
    userRoles: [],
    roleLists: [],
    adminId: 0
  }
 })
//  搜索返回的数据
const seachdate = (newlist?:{}[])=>{
   tableData.value = newlist;
   
}
// 查找返回空则再次获取旧值
const oldlist = ()=>{
   getuserlist()
}
 const {tableData,dialogFormVisible,rowData,visible,roleData} = toRefs(state)
//  隐藏弹框
 const close=(r?:'reload')=>{
   dialogFormVisible.value = false;
   rowData.value = {} //清空用户编辑弹框的内容
   console.log(r)
   if(r === 'reload'){
      console.log('hhhhh')
      // 更新表格数据
      getuserlist()
   }
 }
//  点击编辑
const editAdmin=(row:AdminObjItf)=>{

   dialogFormVisible.value=true
   rowData.value = row
}

// 当弹框点击取消或者确定
const closeeditrole = ()=>{
   visible.value = false
}
const getuserlist = async()=>{
   const result = await requserlist({
      keyword:'',
      pageSize:10,
      pageNum:1
   })
   if(result.data.code === 200){
      tableData.value = result.data.list
   }
   // console.log(result)
}

getuserlist()
// console.log(tableData.value)
// 格式化时间
const formateDate = (time: string|undefined)=>{
   const date = typeof time=='string'?new Date(time):new Date();
   const year = date.getFullYear();
   const month = addZero(date.getMonth() + 1);
   const day = addZero(date.getDate());
   const hour = addZero(date.getHours());
   const min = addZero(date.getMinutes());
   const sec = addZero(date.getSeconds());
   return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
const addZero =(num:number)=>{
   return num>9 ? num : '0' + num
}
axios.defaults.baseURL = 'http://120.24.64.5:8088/mall-admin'
// 获取所有角色
axios({
   url:'/role/listAll',
   method:'get',
   headers:{
      "Authorization":'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODQ3NTMzNDgyNDMsImV4cCI6MTY4NTM1ODE0OH0.LgXU5lC0XO6ZjoVOwS4n1ry_RtrEfqcTAR-PWlFq_1RpSl7-X0-xkuKdqJYDxVXmNsiFCGSMxlGEtqgEDs00BA'
   }
}).then(res=>{
   console.log(res.data)
   roleData.value.roleLists = res.data.data
})
// 分配角色
const editRole = (id:number)=>{
   // 获取id对应角色
   axios({
      url:'/admin/role/' + id,
      method:'get',
      headers:{
      "Authorization":'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODQ3NTMzNDgyNDMsImV4cCI6MTY4NTM1ODE0OH0.LgXU5lC0XO6ZjoVOwS4n1ry_RtrEfqcTAR-PWlFq_1RpSl7-X0-xkuKdqJYDxVXmNsiFCGSMxlGEtqgEDs00BA'
      }
   }).then(res => {
      console.log(res.data)
      visible.value = true;
      roleData.value.adminId = id;
      roleData.value.userRoles = res.data.data
   })
}

</script>
<style lang='less' scoped>

</style>