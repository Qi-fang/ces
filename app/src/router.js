import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	  {path: "/", redirect: "/recommend"},
    {path: "/register", name: "register", component:() => import(/* webpackChunkName: 'register' */ '@/components/register/register')},
    {path: "/login", name: "login", component:() => import(/* webpackChunkName: 'login' */ '@/components/login/login')},
    {path: "/recommend", name: "recommend", component:() => import(/* webpackChunkName: 'recommend' */ '@/components/recommend/recommend')},
    {path: "/new", name: "new", component:() => import(/* webpackChunkName: 'new' */ '@/components/new/new')},
    {path: "/convert", name: "convert", component:() => import(/* webpackChunkName: 'convert' */ '@/components/convert/convert')},
    {path: "/friends", name: "friends", meta: {keepAlive: true}, component:() => import(/* webpackChunkName: 'friends' */ '@/components/friends/friends')},
    {path: "/personal", name: "personal", component:() => import(/* webpackChunkName: 'personal' */ '@/components/personal/personal'),
		children: [
			{path: "myboke", name: "myboke", meta: {keepAlive: true}, component:() => import(/* webpackChunkName: 'myboke' */ '@/components/personal/myboke')},
			{path: "modify", name: "modify", meta: {keepAlive: true}, component:() => import(/* webpackChunkName: 'modify' */ '@/components/personal/modify')},
		]
	}
  ]
})
