<!--  -->
<template>
 <el-row style="height:100px;align-items: center;" class="elrow">
    <el-col >
      <span class="sub-title my-2 text-sm text-gray-600">
        按账号搜索：
      </span>
      <el-input v-model="searchdate" placeholder="Please input" style="width:300px;" />
      <el-button type="primary" class="btn" @click="seachuser">搜索</el-button>
    </el-col>
 </el-row>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref,watch} from 'vue';
import {requserlist} from '../../api/api.ts'
const emit = defineEmits<{
    (event:'newdate',newlist?:{}[]):void;
    (event:'oldlist'):void
}>()
const searchdate = ref("")
const state = reactive<{
    newlist:{}[],
}>({
    newlist:[]
})
const getdate=async()=>{
    const result = await requserlist({
      keyword:searchdate.value,
      pageSize:1,
      pageNum:1})
    if(result.data.code === 200){
        state.newlist = result.data.list
        emit('newdate',state.newlist)
    }
}
watch(searchdate,()=>{
    if(searchdate.value === ''){
        emit('oldlist')
    }
})
const seachuser= ()=>{
    getdate()
}

</script>
<style lang='less' scoped>
    .elrow{
        border: 1px solid #ccc;
        border-top: 0px;
        span{
            font-size: 20px;
            font-weight: 700;
            margin-right: 20px;
        }
        .btn{
            margin-left: 20px;
        }
    }
</style>