<!--  -->
<template>
      
      <el-radio-group v-model="selectLabel" @change="dayChange">
      <el-radio-button label="sale_">销量</el-radio-button>
      <el-radio-button label="_money">销售额</el-radio-button>
    </el-radio-group>
    <el-select v-model="selectDay" placeholder="Select" @change="dayChange">
      <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
    </el-select>
    <div id="pie" style="width: 50%; height: 550px;"></div>
  </template>
  
  <script lang='ts' setup>
  import { reactive, toRefs, ref, watch } from 'vue'
  import * as echarts from 'echarts'
  // 关闭自动透传 --失败
    // inheritAttrs:false
  const props = defineProps<{
    data: {}[]
  }>();
  
  const state = reactive({
    selectLabel: '_money',
    selectDay: 'today',
    options: [
      { name: '今天', value: 'today' },
      { name: '昨天', value: 'yesterday' },
      { name: '前3天', value: 'three_days' },
      { name: '前7天', value: 'seven_days' },
    ]
  });
  const { selectDay, selectLabel, options } = toRefs(state);
  
  const dayChange = () => {
    initPie();
  }
  let myChart: echarts.ECharts;
  const initPie = () => {
    let key = ''
    if (selectLabel.value === '_money') {
      key = selectDay.value + selectLabel.value
    } else {
      key = selectLabel.value + selectDay.value
    }
    const arr = props.data.map((item: { [key: string]: string; }) => ({ value: item[key], name: item.name }))
    console.log(props.data, arr) // []
    // 初始化实例
    if (!myChart) {
      myChart = echarts.init(document.getElementById('pie') as HTMLElement);
    }
  
    const option = {
      // legend: {
      //   right:10,
      //   top: 20,
      //   width: 300,
      //   height: 100,
      //   orient: 'vertical'
      // },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '55%'],
          data: arr
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  
  watch(() => props.data, () => {
    initPie();
  });
  
  
  
  
  </script>
  <style lang='less' scoped>
    #pie{
        div{
            width: 100%;
        }
    }
    el-radio-group{
      position: absolute;
      left: 0;
    }
   .select{
      position: absolute;
      left: 10px;
      top: 120px;
   }
  </style>