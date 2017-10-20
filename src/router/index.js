import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import header from '@/components/header/header'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'


Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [{
       path:'/',
       redirect:'/goods'
  	},{
      path: '/ratings',
      component: ratings
    },{
      path: '/goods',
      component: goods,
    },{
      path: '/seller',
      component: seller,
    },
   ],
   linkActiveClass:"active"
})
