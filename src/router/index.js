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
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: () => import('../views/Dashboard/Analysis')
          }
        ]
      },
      // form
      {
        path: '/form',
        name: 'form',
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form/basic-form',
            name: 'basic-form',
            component: () => import('../views/Forms/basicForm')
          },
          {
            path: '/form/step-form',
            name: 'stepform',
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
