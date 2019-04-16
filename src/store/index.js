import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
	// allCategory: [] // 为优化用户体验
	curBookId: 0,
	userInfo: {}, // 用户信息
	userEmail: '' // 锚点 判断用户是否登陆
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
