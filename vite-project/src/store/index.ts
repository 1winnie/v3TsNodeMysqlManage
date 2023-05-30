import { App } from 'vue';
import { createStore } from "vuex";
import {reqgetuserinfo} from '../api/api';
interface MenuObj{
    parentId:number,
    id:number,
    children?:MenuObj[]
}
interface State{
    menus:MenuObj[]
}
interface NewMenus{
    [key: number]: MenuObj 
}
const store = createStore<State>({
    state(){
        return {
            menus:[]
        }
    },
    getters:{
        getNewMenus(state){
            // console.log('-------------')
            const newMenus:NewMenus = {};
            const menus = state.menus;
            // console.log(state.menus)
            menus.forEach(item =>{
                if(item.parentId ===0){
                    // 一级菜单
                    newMenus[item.id] = {...item}
                }else{
                    // 二级菜单
                    let parentId = item.parentId;//对应的一级菜单的id
                    // 如果开始不是一级菜单，那newMenus[parentId]为undefined
                    //  newMenus[parentId].children则会报错
                    // 所以先判断有没有，没有返回空对象，当空对象.children则也会返回undefined，不会报错，继续执行
                    // newMenus[parentId] = newMenus[parentId] || {};
                    newMenus[parentId].children = newMenus[parentId].children || [];
                    newMenus[parentId].children?.push(item)

                }
            })
            return newMenus
        }
    },
    mutations:{
        GETDATAMENUS(state,menus){
            state.menus = menus
        }
    },
    actions:{
        async getdateMenus({commit}){
            const results = await reqgetuserinfo()
            if(results.data.code == 200){
                commit('GETDATAMENUS',results.data.data.menus)
            }
        }
    },
    modules:{}
})
export const initStore = (app: App<Element>) => {
    app.use(store)
}
export default store;