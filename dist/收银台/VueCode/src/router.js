import Vue from 'vue'
import Router from 'vue-router'
import ebank from './views/ebank.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'ebank',//网银转账
      component: ebank
    },
    {
      path: '/alipay',//支付宝
      name: 'alipay',
      component: () => import('./views/alipay.vue')
    },
    {
      path: '/wechat',//微信扫码
      name: 'wechat',
      component: () => import('./views/wechat.vue')
    },
    {
      path: '/online',//在线支付
      name: 'online',
      component: () => import('./views/online.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
