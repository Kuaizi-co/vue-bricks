import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/example.vue'
import '../lib/vueBricks.css'
import VueBricks from '../lib/vueBricks.common'

Vue.use(VueRouter)
// console.log(VueBricks)
Vue.use(VueBricks)

const router = new VueRouter()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
