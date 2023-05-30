<!--  -->
<template>
 <div class="box">
    <MyPie :data="state.salePie" style="position: absolute;left:140px;"/>
    <MyMap :data="state.saleMap"  style="position: absolute;right:10px;top:10px;width: 50%;"></MyMap>
 </div>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref} from 'vue'
import {reqgetindexlist} from '../../api/api'
import MyPie from './components/MyPie.vue'
import MyMap from './components/MyMap.vue'
const state = reactive<{
    salePie:{}[],
    saleMap:{}[]
}>({
    salePie:[],
    saleMap:[]
})
reqgetindexlist().then(res => {
    console.log(res)
    if(res.data.errno === 0){
        state.salePie = res.data.data.salePie
        state.saleMap = res.data.data.saleMap
    }
})
</script>
<style lang='less' scoped>
    .box{
        position: relative;
    }
</style>