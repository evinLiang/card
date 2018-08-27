// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import axios from "axios"
import api from '@/modules/api'	//接口信息
import store from './store'

Vue.use(YDUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.api = api;	//定义api全局变量

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
