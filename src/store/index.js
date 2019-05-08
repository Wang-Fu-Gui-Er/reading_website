import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    // allCategory: [] // 为优化用户体验
    userInfo: {}, // 用户信息
    userEmail: '', // 锚点 判断用户是否登陆
    search: {
        searchType: 'book',
        searchKey: '',
        pageSize: 10
    },
    chapter: [], // 章节
    curBookId: 0,
    editBookId: 0, // edit书本id
    editAuthorId: 0,
    editBookStatus: 'add', // 编辑图书的状态
    editAuthorStatus: 'add',
    isOnShelf: null
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})