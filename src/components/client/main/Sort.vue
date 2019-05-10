<template>
    <div class="sort">
        <div class="sort-content">
            <div class="sort-left">
                <book-menu 
                    ref="menu"
                    @get-book="getBook"
                    @set-curgory="setCurCategory"
                    v-model="isCover">
                    <template v-if="isCover">
                        <li class="header">
                            {{curCategory.bigCategoryDO.cateName}}
                        </li>
                        <li
                            @click="$set(curCategory, 'secIndex', index)"
                            v-for="(item, index) in curCategory.smallCategoryList"
                            :key="item.id"
                            :style="curCategory.secIndex === index ? 'font-weight: 600; cursor: pointer;' : 'cursor: pointer'">
                            {{item.cateName}}
                        </li>
                    </template>
                </book-menu>
            </div>
            <div class="sort-right">
                <header>
                    喵阅读 > 全部图书 {{Object.keys(curCategory).length > 0 ? `> ${curCategory.bigCategoryDO.cateName} > ${curCategory.smallCategoryList[curCategory.secIndex].cateName}` : ''}}
                </header>
                <book-list @get-book="getBook" :book="book" :page="page"></book-list>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';

import { mapState, mapActions, mapMutations } from 'vuex';

import bookList from './src/bookList';
import bookMenu from './src/bookMenu';

import { getAllBooks, getSmallCateBook } from '@/api/api.js';


export default {
    data() {
        return {
            book: [],
            curCategory: {},
            page: {},
            allCategory: [],
            isCover: false
        }
    },
    components: {
        bookList,
        bookMenu
    },
    created() {
        this.initBook();
    },
    methods: {
        async initBook() {
            const query = this.$route.query;
            if (!_.isEmpty(query)) {
                this.$refs.menu.changeMenuConfig();
            }
            else {
                this.getBook();
            }
        },
        async getBook(pageNum = 1) {
            const curCategory = this.curCategory;
            let {data, page} = Object.keys(curCategory).length > 0 ? await getSmallCateBook({
                smallCateId: curCategory.smallCategoryList[curCategory.secIndex].id,
                pageNum,
                pageSize: 10
            }) : await getAllBooks({pageNum, pageSize: 10});
            data.map(item => item.avgScore = item.avgScore.toFixed(1));
            this.book = data;
            this.page = page;
        },
        setCurCategory(curCategory) {
            this.curCategory = curCategory;
        }
    }
}
</script>
<style lang="scss" scoped>
    
    .sort {
        background-color: #fdfdfb;
        padding-top: 3rem;
        padding-bottom: 3rem;
        margin-bottom: 10vh;
        .sort-content {
            width: $width;
            margin: 0 auto;
            display: flex;
            
            .sort-right {
                flex-grow: 1;
                margin-left: 2rem;
                
            }
        }
    }
</style>
