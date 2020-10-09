// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './http'
import store from './store/store'
import router from './router'
import App from './App'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../src/assets/css/normalize.css'
import '../src/assets/css/base.css'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import echarts from 'echarts'

Vue.use(VueMaterial);
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
//echarts
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})