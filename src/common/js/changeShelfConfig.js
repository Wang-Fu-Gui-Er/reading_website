import { addOrRemoveToShelf } from '@/api/api';

import getUserInfo from './getUserInfo';

export default {
    mixins: [getUserInfo],
    methods: {
        async changeShelfConfig(bookId, onShelf) {
            try {
                await addOrRemoveToShelf({
                    userId: this.userInfo.id,
                    bookId,
                    onShelf
                })
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
            } catch (error) {
                this.$message({
                    message: '修改失败',
                    type: 'fail'
                })
            }
        }
    }
}