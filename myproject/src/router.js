import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
	  {path: "/", redirect: "/recommend"},
    {path: "/register", name: "register", component:() => import(/* webpackChunkName: 'register' */ '@/components/register/register')},
    {path: "/login", name: "login", component:() => import(/* webpackChunkName: 'login' */ '@/components/login/login')},
    {path: "/recommend", name: "recommend", component:() => import(/* webpackChunkName: 'recommend' */ '@/components/recommend/recommend')},
    {path: "/new", name: "new", component:() => import(/* webpackChunkName: 'new' */ '@/components/new/new')},
    {path: "/convert", name: "convert", component:() => import(/* webpackChunkName: 'convert' */ '@/components/convert/convert')},
    {path: "/friends", name: "friends", meta: {keepAlive: true}, component:() => import(/* webpackChunkName: 'friends' */ '@/components/friends/friends'),
		children: [
			// {path: "pl", name: "pl", component:() => import(/* webpackChunkName: 'pl' */ '@/components/friends/pl')},
		]
	},
    {path: "/personal", name: "personal", component:() => import(/* webpackChunkName: 'personal' */ '@/components/personal/personal'),
		children: [
			{path: "myboke", name: "myboke", meta: {keepAlive: true}, component:() => import(/* webpackChunkName: 'myboke' */ '@/components/personal/myboke')},
			{path: "category", name: "category", meta: {keepAlive: true}, component:() => import(/* webpackChunkName: 'category' */ '@/components/personal/category')},
			{path: "mybankcards", name: "mybankcards", component: () => import(/* webpackChunkName: 'mybankcards' */ '@/components/personal/mybankcards')},
			{path: "tixian", name: "tixian", component: () => import(/* webpackChunkName: 'tixian' */ '@/components/personal/tixian')},
			{path: "renz", name: "renz", component: () => import(/* webpackChunkName: 'renz' */ '@/components/personal/renz')},
			{path: "duihuan", name: "duihuan", component: () => import(/* webpackChunkName: 'duihuan' */ '@/components/personal/duihuan')}
		]
	}
  ]
})
