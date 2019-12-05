import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// 记录滚动条的位置
	state: {
		top: 0,
		countt: 100,
	},
	//同步
	mutations: {
		setHomeListTop(state, top) {
			state.top = top;
		},
		add(state, n = 0){
			return (state.countt += n);
		},
		remove(state, n = 0){
			return (state.countt -= n);
		},
		// dianzan(state, e){
		// 	const dd = window.localStorage.getItem('dzpd');
		// 	if(dd === "false" || dd === "" || dd === "null"){
		// 		state.dzpd = true;
		// 		window.localStorage.setItem('dzpd', state.dzpd);
		// 		return (state.dznb -= 1);
		// 	}else{
		// 		state.dzpd = false;
		// 		window.localStorage.setItem('dzpd', state.dzpd);
		// 		return (state.dznb += 1);
		// 	}
		// },
	},
	getters: {
		home_list_top(state) {
			return state.top;
		},
	},
	//异步
	actions: {
		setHomeListTop({commit, state}, top) {
			commit('setHomeListTop', top);
		},
		actionsadd(context, n = 0){
			return context.commit('add', n);
		},
		actionsremove({commit}, n = 0){
			return commit('remove', n)
		}
	}
})
