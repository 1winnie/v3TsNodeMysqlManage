<!--  -->
<template>
 <div class="home_box" >
    <div class="home_menu">
        <el-menu
        class="el-menu-vertical-demo"
        background-color="transparent"
        default-active="2"
        text-color="skyblue"
        :unique-opened="true"
        router="true"
      >
      <el-menu-item index="/index" disable="true" class="home" @click="hometo()">
            <i class="ri-home-heart-fill"></i>
            <span>首页</span>
        </el-menu-item>
        <el-sub-menu :index="menu.id + ''" v-for="menu in newMenus" :key="menu.id">
          <template #title>
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
         
            <template v-for="submenu in menu.children" :key="submenu.id">
              
              <el-menu-item :index="'/' + menu.name + '/' + submenu.name" v-if="submenu.hidden==0">
                <i  class="subicon" :class="submenu.icon"></i>
                {{ submenu.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
       
      </el-menu>
    </div>
    <div class="right">
        <div class="home_header">
          <template @mouseenter="isshow = true" @mouseleave="isshow = false">
            <div class="head"></div>
            <div class="outlogin" v-if="isshow" >
              <a class="index" @click="goindex">首页</a>
              <a class="out" @click="getout">退出</a>
            </div>
          </template>
        </div>
        <div class="home_contend">
          <router-view></router-view>
        </div>
    </div>
 </div>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref,computed,onMounted,onUnmounted} from 'vue'
import { useRouter} from 'vue-router';
import {useStore} from 'vuex';
interface MenuObj{
    parentId:number,
    id:number,
    title:string,
    icon:string,
    hidden:number,
    children?:MenuObj[],
    name:string
}
interface NewMenus{
    [key: number]: MenuObj
}
const store = useStore();
// 等请求有了之后，需重新计算，获取newMenu值
const newMenus = computed<NewMenus>(()=>store.getters.getNewMenus)
// console.log(newMenus)
const router = useRouter();
const isshow  = ref<boolean>(false)
const goindex =() =>{
  router.push('/index')
}
const getout =() =>{
  localStorage.clear('token')
  router.push('/login')
}

</script>
<style lang='less' scoped>
template{
  display: block;
}
    .home_box{
        width: 100vw;
        height: 100vh;
        display: flex;
        .home_menu{
            width: 200px;
            height: 100vh;
            background-color: rgb(50, 167, 169);
            // background: url(../assets/image/side.png) no-repeat;
            // background-size: cover;
            // background-position: l;
            border-right: 1px solid rgb(224, 221, 221);
          }
        .right{
            width: 100%;
            .home_header{
              position: relative;
                height: 100px;
                background: url('../assets/image/4.png') no-repeat;
                background-size: cover;
                background-position: 0px -140px;
                .head{
                  position: absolute;
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  background:url('../assets/image/head.gif') no-repeat;
                  background-size: cover;
                  background-position-x: -10px;
                  right: 40px;
                  top:15px;
                  cursor: pointer;
                }
                
                .outlogin{
                  position: absolute;
                  width: 70px;
                  height: 80px;
                  border-radius: 10%;
                  background-color: #fff;
                  right: 115px;
                  top: 15px;
                  text-align: center;
                  transition: height .3;
                  box-shadow: 0 0 5px rgb(135, 235, 213);
                  a{
                    display: block;
                    margin-top: 10px;
                    cursor: pointer;
                  }
                }
                .outlogin::before{
                  position: absolute;
                  content: '';
                  z-index: 99;
                  width: 0;
                  height: 0;
                  border: 10px solid transparent;
                  top: 20px;
                  right: -18px;
                  border-bottom-color: #fff;
                  transform: rotateZ(90deg);
                }
              }
        }
    }
    el-menu-item{
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .subicon{
      position: absolute;
      left: 15px;
      top: 0px;
    }
    i{
      margin-right: 5px;
    }
   .home_contend{
    // overflow:hidden
   }
</style>