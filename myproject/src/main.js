import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import qs from 'qs';
import axios from 'axios'
Vue.prototype.$axios = axios
// 正式
Vue.prototype.$http = "https://www.tuijianb.com/restApi";
// 测试
// Vue.prototype.$http = "http://182.61.161.239:27070/restApi";
Vue.prototype.$qs = qs;
import Swiper from 'swiper';
import animate from 'animate.css'
import '@/tools/mock.js';
Vue.config.productionTip = false

// 浏览图片
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
	defaultOptions: {
		zIndex: 9999,
		"navbar":false, // 是否显示缩略图导航
		"title": false, // 是否显示当前图片的标题
		"toolbar": false,  // 是否显示工具栏
		"tooltip": false, // 是否显示缩放百分比
		"movable": false, // 图片是否可移动
		"zoomable": false, // 图片是否可缩放
		"rotatable": false, // 图片是否可旋转
		"scalable": false, // 图片是翻转
	}
})

// Viewer.setDefaults({
// 	Options: { 
// 		"inline": true, // 是否启动inline模式
// 		"button": true, // 是否显示右上角关闭按钮
// 		"navbar":false, // 是否显示缩略图导航
// 		"title": false, // 是否显示当前图片的标题
// 		"toolbar": false,  // 是否显示工具栏
// 		"tooltip": false, // 是否显示缩放百分比
// 		"movable": false, // 图片是否可移动
// 		"zoomable": false, // 图片是否可缩放
// 		"rotatable": false, // 图片是否可旋转
// 		"scalable": false, // 图片是翻转
// 		"transition": true, // 是否使用css3过渡
// 		"fullscreen": true, // 播放时是否全屏
// 		"keyboard": false, // 是否支持键盘
// 		"url": "data-source" // 设置大图片的url
// 	}
// });

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
