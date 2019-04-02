<template>
    <div class="book-detail">
        <div class="left">
            <div class="cover">
                <img :src="bookDetail.bookPic" alt="">
            </div>
            <i class="fas fa-igloo"></i>
            <font-awesome-icon icon="heart"></font-awesome-icon>
            <font-awesome-icon :icon="['far', 'heart']"></font-awesome-icon>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

import {getBookDetail} from '@/api/api';

export default {
    data() {
        return {
            bookDetail: {}
        }
    },
    computed: {
        ...mapState([
            'curBookId'
        ])
    },
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            const bookDetail = await getBookDetail({bookId: this.curBookId});
            this.bookDetail = bookDetail;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
