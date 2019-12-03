import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios
import Swiper from 'swiper';
import animate from 'animate.css'
import '@/tools/mock.js';
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入全局样式
import '@/assets/common.scss'

router.beforeEach((to, from, next) =>{
	if(to.path === '/login'){
		next();
	}else{
		var token = localStorage.getItem("token");
		if(token){
			next();
		}else{
			next({name: 'login'});
		}
	}
	next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
