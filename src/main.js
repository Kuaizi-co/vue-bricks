import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/home.vue'
import imageLazyLoad from './components/img-lazy-load.vue'
import ssr from './components/ssr'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/image-lazy-load',
      component: imageLazyLoad
    },
    {
      path: '/ssr',
      component: ssr
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
