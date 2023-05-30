<!--  -->
<template>
 <div id="mymap" style="width:60%;height: 500px;"></div>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref,watch} from 'vue'
import * as echarts from 'echarts'
import china from '../../../data/china.json'
// 注册
echarts.registerMap('china',china as any)
const props = defineProps<{
    data:{}[]
}>()

let myMap: echarts.ECharts
watch(() => props.data, ()=> {
    if(!myMap){
        const data = props.data.map((item: {areaName:string,saleNum:number}) => ({name:item.areaName,value:item.saleNum}))
        console.log(data)
        myMap = echarts.init(document.getElementById('mymap') as HTMLElement);
        const options = {
            series:{
            type:'map',
            map:'china',
            emphasis:{
                label:
                {
                    show:false
                },
                itemStyle:{
                    areaColor:'pink',
                }
            },
            itemStyle:{
                borderColor: '#fff'
            },
            data,
            left:'20%',
            
        },
        tooltip:{
                show:true,
                formatter: '{b0}<br />销量： {c0}',
                backgroundColor:'rgba(50,50,50,0.3)',
                borderColor:'transparent',
                textStyle:{
                    color:'#fff'
                }
            },
        visualMap:{
            type:'continuous',
            min:0,
            max:1000000,
            calculable:true,
            inRange: {
            color: ['rgb(202, 206, 214)', 'rgba(209, 165, 196,0.7)', 'pink'],
            symbolSize: [30, 100]
        }
        }
        };
        
        myMap.setOption(options)
    }
})
</script>
<style lang='less' scoped>

</style>