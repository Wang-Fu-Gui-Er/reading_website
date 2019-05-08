import { checkOnShelf } from '@/api/api';

import { CHANGE_SHELF_STATUS } from './mutation-types';

export default {
    async getShelfStatus({ commit }, userId, bookId, onShelf) {
        commit(CHANGE_SHELF_STATUS, await checkOnShelf({ userId, bookId, onShelf }));
    }
}