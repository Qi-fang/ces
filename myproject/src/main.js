import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import qs from 'qs';
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$http = "http://182.61.161.239:27070/restApi";
Vue.prototype.$qs = qs;
import Swiper from 'swiper';
import animate from 'animate.css'
import '@/tools/mock.js';
Vue.config.productionTip = false

// vue集成h5 plus
var onPlusReady = function(callback, context = this) {
	if (window.plus) {
		callback.call(context)
	} else {
		document.addEventListener('plusready', callback.bind(context))
	}
}

Vue.mixin({
	beforeCreate() {
		onPlusReady(() => {
			this.plusReady = true
		}, this)
	},
	methods: {
		onPlusReady: onPlusReady
	}
})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入全局样式
import '@/assets/common.scss'

router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
	} else {
		var token = localStorage.getItem("token");
		if (token) {
			next();
		} else {
			next({
				name: 'login'
			});
		}
	}
	next();
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
