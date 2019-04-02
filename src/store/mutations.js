import {
    CHANGE_CURRENT_BOOKID
} from './mutation-types';

export default {
    // [CHANGE_ALL_CATEGORY](state, allCategory) {
    //     state.allCategory = allCategory;
    // }
    [CHANGE_CURRENT_BOOKID](state, curBookId) {
        state.curBookId = curBookId;
    }
}