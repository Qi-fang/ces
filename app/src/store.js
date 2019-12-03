import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// 记录滚动条的位置
	state: {
		top: 0
	},
	mutations: {
		setHomeListTop(state, top) {
			state.top = top;
		}
	},
	getters: {
		home_list_top(state) {
			return state.top;
		}
	},
	actions: {
		setHomeListTop({commit, state}, top) {
			commit('setHomeListTop', top);
		}
	}
})
