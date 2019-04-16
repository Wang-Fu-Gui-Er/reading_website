import {
    CHANGE_CURRENT_BOOKID,
    UPDATE_USERINFO,
    CHANGE_USEREMAIL
} from './mutation-types';

export default {
    // [CHANGE_ALL_CATEGORY](state, allCategory) {
    //     state.allCategory = allCategory;
    // }
    [CHANGE_CURRENT_BOOKID](state, curBookId) {
        state.curBookId = curBookId;
    },
    [UPDATE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo;
    },
    [CHANGE_USEREMAIL] (state, userEmail) {
        state.userEmail = userEmail;
    }
}