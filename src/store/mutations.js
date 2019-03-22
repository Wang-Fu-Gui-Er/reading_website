import {
    CHANGE_ALL_CATEGORY
} from './mutation-types';

export default {
    [CHANGE_ALL_CATEGORY](state, allCategory) {
        state.allCategory = allCategory;
    }
}