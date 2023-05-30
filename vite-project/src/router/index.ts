import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue'
// import { useStore } from 'vuex';
import store from '../store'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue')
    },
    // 最好不要写在这里，需要登录后才能进入首页，也就是有token之后
    // {
    //     path:'/homepage',
    //     name:'homepage',
    //     component: () => import('../components/homepage.vue')
    //  }//,{
    //     // path:'/',
    //     // redirect:to=>{
    //     //     const token = localStorage.getItem('token')
    //     //     if(token){
    //     //         return '/homepage'
    //     //     }else{
    //     //         return '/login'
    //     //     }
    //     // }
    // }
]

const router = createRouter({
    history: createWebHistory(),
    // 路由配置
    routes
})
// 根据getters里面的菜单对象生成路由规则
const getRoutes = () => {
    const menus = store.getters.getNewMenus;
    // 循环菜单对象
    // const newRouters:RouteRecordRaw[] = []
    for (let key in menus) {
        const newRoute: RouteRecordRaw = {
            path: '/' + menus[key].name,
            name: menus[key].name,
            component: () => import('../components/homepage.vue'),
            redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
            children: []
        };
        for (let j = 0; j < menus[key].children.length; j++) {
            newRoute.children?.push({
                path: menus[key].children[j].name,
                name: menus[key].children[j].name,
                component: () => import(`../views/${menus[key].name}/${menus[key].children[j].name}.vue`)
            })
        }
        // 动态添加路由规则
        router.addRoute(newRoute)
        // 动态添加首页
        router.addRoute({
            path: '/',//这个只会到homepage，不会到index
            name: 'homepage',
            component: () => import('../components/homepage.vue'),
            redirect: '/index',//将其重定向到index
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('../views/index/index.vue')
                }
            ]
        })

        // console.log(newRoute)
    }
}
// 前置导航守卫
router.beforeEach((to, from, next) => {
    // next()
//     // 1.有token 但menu为空，一刷新就没有

    const token = localStorage.getItem('token')
//     // 刷新没有值
    if (token && store.state.menus.length === 0) {
//         console.log('hhhhhhhhh')
//         // 异步
        store.dispatch('getdateMenus').then(() => {
            getRoutes()
//             // 也需要next
//             // 但是不生效，刚开始动态添加进去路由规则，还没有生效
//             // 直接跳过去，是没有找到对应的路由规则的
//             // next() 这个会直接进入跳转的路由
            next(to) //这个会重新进入路由守卫
//             // 当第二次进入时，menus就有值了则直接进入next（）
//             // 解决刷新空白
//             // 在那一次动态生成的路由规则没有生效
//             // 那就在下一次再进来路由守卫，让其跳出去next（）
            
        })
        
//         //首次登录
    } else if (token && store.state.menus.length !== 0
        && from.path === '/login' && to.path === '/homepage') {
        getRoutes();
        next('/index')
//         // 没有登录
    }//登录了，但想去登录页面
    else if (!token && to.path !== '/login') {
        next('/login');
    }
    else if (token && to.path === '/login') {
        next(from);
    }
    else {
//         // 表示其他情况直接next（）
        next()
    }
//     // 因为上面的是异步函数，then不会执行那么快，先执行了next
//     // next()
})
// export default router;默认导出只能写一个
export const initRouter = (app: App<Element>) => {
    app.use(router)
}