<template>
    <div class="sort">
        <div class="sort-content">
            <div class="menu">
                <header>全部图书分类</header>
                <ul class="menu-content">
                    <li v-for="item in allCategory" :key="item.id">
                        <!-- <slot/> -->
                        {{item.bigCateGoryDO.cateName}}
                        <div class="secSort">
                            <span v-for="secItem in item.smallCateGoryDO" :key="secItem.id">
                                {{secItem.cateName}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
// import {getAllCategory} from '@/api/api.js';
import {mapState, mapActions} from 'vuex';

import getAllCategory from './common/getAllCategory.js';

export default {
    data() {
        return {
            // allCategory: []
        }
    },
    created() {
        console.log(getAllCategory(this.allCategory));
        // console.log(getAllCategory(this.allCategory));
    },
    computed: {
        ...mapState([
            'allCategory'
        ])
    },
    methods: {
        async initConfig() {
            // const allBook = await getAllCategory();
        }
    },
}
</script>
<style lang="scss" scoped>
    .sort {
        background-color: #fdfdfb;
        padding-top: 20px;
        .sort-content {
            width: 900px;
            margin: 0 auto;
            .menu {
                width: 100px;
            }
        }
    }
</style>
