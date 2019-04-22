import {
    CHANGE_CURRENT_BOOKID,
    UPDATE_USERINFO,
    CHANGE_USEREMAIL,
    CHANGE_SEARCH,
    CHANGE_EDIT_BOOK_STATUS
} from './mutation-types';

export default {
    [CHANGE_CURRENT_BOOKID](state, curBookId) {
        state.curBookId = curBookId;
    },
    [UPDATE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo;
    },
    [CHANGE_USEREMAIL] (state, userEmail) {
        state.userEmail = userEmail;
    },
    [CHANGE_SEARCH] (state, search) {
        search['pageSize'] = 10;
        state.search = search;
    },
    [CHANGE_EDIT_BOOK_STATUS](state, status) {
        state.editBookStatus = status;
    }
}