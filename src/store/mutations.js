import {
    CHANGE_CURRENT_BOOKID,
    UPDATE_USERINFO,
    CHANGE_USEREMAIL,
    CHANGE_SEARCH,
    CHANGE_EDIT_BOOK_STATUS,
    CHANGE_EDIT_BOOK_ID,
    CHANGE_EDIT_AUTHOR_STATUS,
    CHANGE_EDIT_AUTHOR_ID,
    SET_CHAPTER
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
    },
    [CHANGE_EDIT_BOOK_ID] (state, id) {
        state.editBookId = id;
    },
    [CHANGE_EDIT_AUTHOR_STATUS] (state, status) {
        state.editAuthorStatus = status;
    },
    [CHANGE_EDIT_AUTHOR_ID] (state, id) {
        state.editAuthorId = id;
    },
    [SET_CHAPTER] (state, chapter) {
        state.chapter = chapter;
    }
}