import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('../views/login/register.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: ()=>import('../views/components/layout.vue'),
    children: [
      {
        path: 'menucenter',
        name: 'menucenter',
        component: ()=>import('../views/menu/menucenter.vue')       
      },
      {
        path:'equipmentTotal',
        name:'equipmentTotal',
        component: ()=>import('@/views/menu/systemList/equipmentTotal/index.vue'),
        meta:{
            title: '设备统计'
        }
      },
      {
        path:'equipmentType',
        name:'equipmentType',
        component: ()=>import('@/views/menu/systemList/equipmentType/index.vue'),
        meta:{
            title: '资产类型'
        }
      },
      {
        path:'wareHouse',
        name:'wareHouse',
        component: ()=>import('@/views/menu/systemList/wareHouse/index.vue'),
        meta:{
            title: '耗材入库登记'
        }
      },
      {
        path:'planTable',
        name:'planTable',
        component: ()=>import('@/views/menu/systemList/dutySys/planTable.vue'),
        meta:{
            title: '值日排班设置'
        }
      },
      {
        path:'planMessage',
        name:'planMessage',
        component: ()=>import('@/views/menu/systemList/dutySys/planMessage.vue'),
        meta:{
            title: '值日消息设置'
        }
      },
    ]
  },
  {
    path: '/controlcenter',
    name: 'controlcenter',
    component: ()=>import('../views/control/controlcenter.vue'),
    children:[
      {
        path: 'user',
        name: 'user',
        component: ()=>import('../views/control/user/index.vue'),
        meta: {
          title: '用户管理'
        },
      },
      {
        path: 'role',
        name: 'role',
        component: ()=>import('../views/control/role/index.vue'),
        meta: {
          title: '角色管理'
        },
      },
      {
        path: 'ddSync',
        name: 'ddSync',
        component: ()=>import('../views/control/ddSync/index.vue'),
        meta: {
          title: '组织架构同步'
        },
      },
      {
        path: 'class',
        name: 'class',
        component: ()=>import('../views/control/class/index.vue'),
        meta: {
          title: '年级班级管理'
        },
      },
      {
        path: 'xnxq',
        name: 'xnxq',
        component: ()=>import('../views/control/xnxq/index.vue'),
        meta: {
          title: '学年学期'
        },
      },
      {
        path: 'dataPower',
        name: 'dataPower',
        component: ()=>import('../views/control/dataPower/index.vue'),
        meta: {
          title: '数据授权'
        },
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) => {
  // if(to.meta.needLogin){

  //   if(store.getters.token){
  //     next()
  //   }else{
  //     next('/login')
  //   }
  // }else{
  //   next()
  // }
  if(to.path == '/login' || to.path == '/'){
    next()
  }else{
    store.getters.token? next() : next('/login')
  }

})



export default router
