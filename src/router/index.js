import Vue from 'vue'
import VueRouter from 'vue-router'
// import RenderRouterView from '../components/RenderRouterView.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from '../views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    // 标志位
    hideInMenu: true,
    // component: RenderRouterView,
    // component: { render: h => h('router-view') }, // render函数
    component: () => import('../layouts/UserLayout'),
    children: [
      {
        path: '/path',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import('../views/User/Login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import('../views/User/Register.vue')
      }

    ]
  },
  {
    path: '/',
    component: () => import('../layouts/BasicLayout'),
    children: [
      {
        path: '/',
        redirect: '/dashboard/analysis'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'dashboard', tittle: '仪表盘' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { tittle: '分析页' },
            component: () => import('../views/Dashboard/Analysis')
          }
        ]
      },
      // form
      {
        path: '/form',
        name: 'form',
        meta: { icon: 'form', tittle: '表单' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form/basic-form',
            name: 'basic-form',
            meta: { tittle: '基础表单' },
            component: () => import('../views/Forms/basicForm')
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            meta: { tittle: '分布表单' },
            // 标志位，拒绝渲染孩子路由
            hideChildrenMenu: true,
            component: () => import('../views/Forms/StepForm'),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info'
              },
              {
                path: '/form/step-form/info',
                name: 'info,',
                component: () => import('../views/Forms/StepForm/Step1')
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () => import('../views/Forms/StepForm/Step2')
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () => import('../views/Forms/StepForm/Step3')
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach(() => {
  Nprogress.done()
})

export default router
