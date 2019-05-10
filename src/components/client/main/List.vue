<template>
    <div class="list">
        <div class="list-content">
            <div class="list-left">
                <book-menu 
                    ref="menu"
                    @get-book="getBooks"
                    v-model="isCover">
                    <template v-if="isCover">
                        <li
                            v-for="item in list"
                            :key="item.id"
                            @click="changeTab(item.recommendType)"
                            :style="item.recommendType === recommendType ? 'font-weight: 600; cursor: pointer;' : 'cursor: pointer'">
                            {{item.text}}
                        </li>
                    </template>
                </book-menu>
            </div>
            <div class="list-right">
                <book-list @get-book="getBooks" :book="book" :page="page"></book-list>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';

import { mapState, mapActions, mapMutations } from 'vuex';

import bookList from './src/bookList';
import bookMenu from './src/bookMenu';

import { getBook } from '@/api/api.js';

export default {
    data() {
        return {
            book: [],
            page: {},
            list: [{
                recommendType: 'newly',
                text: '最新推荐'
            }, {
                recommendType: 'favorable',
                text: '最受欢迎'
            }, {
                recommendType: 'classic',
                text: '经典推荐'
            }],
            recommendType: 'newly',
            isCover: true
        }
    },
    components: {
        bookList,
        bookMenu
    },
    created() {
        this.initBook();
    },
    mounted() {
        this.$refs.menu.isInSecSort = true;
    },
    methods: {
        async initBook() {
            const query = this.$route.query;
            if (!_.isEmpty(query)) {
                this.changeMenuConfig();
            }
            else {
                this.getBooks();
            }
        },
        changeMenuConfig() {
            const recommendType = this.$route.query.recommendType;
            this.changeTab(recommendType);
        },
        async getBooks(pageNum = 1, recommendType = this.recommendType) {
            const curCategory = this.curCategory;
            let {data, page} = await getBook({recommendType, pageNum, pageSize: 10});
            data.map(item => item.avgScore = item.avgScore.toFixed(1));
            this.book = data;
            this.page = page;
        },
        changeTab(recommendType) {
            this.recommendType = recommendType;
            this.getBooks(1, recommendType);
        }
    }
}
</script>
<style lang="scss" scoped>
    .list {
        background-color: #fdfdfb;
        padding-top: 3rem;
        padding-bottom: 3rem;
        margin-bottom: 10vh;
        .list-content {
            width: $width;
            margin: 0 auto;
            display: flex;
            
            .list-right {
                flex-grow: 1;
                margin-left: 2rem;
                
            }
        }
    }
</style>
