import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
	// allCategory: [] // 为优化用户体验
	curBookId: 0
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
