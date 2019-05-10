<template>
    <div class="menu" >
        <header
            @mouseover="showAllSort(false)" @mouseout="showAllSort(true)"
            :style="canPointer ? 'cursor: pointer' : ''"
            @click="displayAllSort">全部图书分类</header>
        <ul class="menu-content">
            <template v-if="!isCover">
                <li
                    v-for="(item, index) in allCategory"
                    :key="index"
                    class="arrow"
                    @mouseover="showAllSort(false)"
                    @mouseout="showAllSort(true)"
                    @mouseleave="toggleTab(index, false)"
                    @mouseenter="toggleTab(index, true)">
                    {{item.bigCategoryDO.cateName}}
                    <div class="secSort" v-if="item.isShow">
                        <span 
                        v-for="(secItem, secIndex) in item.smallCategoryList"
                        :key="secItem.id"
                        @click="toCategory(item, index, secIndex)">
                            {{secItem.cateName}}
                        </span>
                    </div>
                </li>
            </template>
            <template v-else>
                <slot></slot>
            </template>
        </ul>
    </div>
</template>

<script>
import getAllCategory from '@/common/js/getAllCategory.js';

import { getStore } from '@/common/js/storage'

export default {
    model: {
        prop: 'isCover',
        event: 'changeDisplay'
    },
    props: ['isCover'],
    data() {
        return {
            canPointer: false,
            isInSecSort: false,
            allCategory: []
        }
    },
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            if (!getStore('allCategory')) {
                await getAllCategory();
            }
            const allCategory = getStore('allCategory');
            this.allCategory = allCategory;
        },
        changeMenuConfig() {
            const query = this.$route.query;
            const {bigCateId, smallCateId} = query;
            const allCategory = this.allCategory;
            let curCategory = {};
            let index = null;
            allCategory.forEach((cateItem, cateIndex) => {
                if (bigCateId === cateItem.bigCategoryDO.id) {
                    curCategory = cateItem;
                    index = cateIndex;
                    return;
                }
            });
            const secIndex = curCategory.findIndex(item => item.id === smallCateId);
            this.toCategory(curCategory, index, secIndex);
        },
        toggleTab(index, isShow) {
            this.$set(this.allCategory[index], 'isShow', isShow);
        },
        toCategory(curCategory, index, secIndex) {
            if (this.$route.name !== 'sort') {
                this.$router.push(`/sort?bigCateId=${curCategory.bigCategoryDO.id}&smallCateId=${curCategory.smallCategoryList[secIndex].id}`)
                return;
            }
            curCategory.secIndex = secIndex;

            this.isInSecSort = true;
            this.canPointer = true;

            this.toggleTab(index, false);
            this.$emit('set-curgory', curCategory)
            this.$emit('changeDisplay', true);
            this.$emit('get-book');
        },
        displayAllSort() {
            if (this.$route.name !== 'sort') {
                this.$router.push(`/sort`);
                return;
            }
            this.isInSecSort = false;
            this.canPointer = false;

            this.$emit('set-curgory', {})
            this.$emit('changeDisplay', false);
            this.$emit('get-book');
        },
        showAllSort(flag) {
            if (this.isInSecSort) { // 节流
                this.$emit('changeDisplay', flag);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .menu {
        width: $menuWidth;
        background-color: rgb(245, 244, 242);
        header {
            text-align: center;
            height: 40px;
            line-height: 40px;
            background-color: #676a6d;
            color: #fff;
        }
        .menu-content {
            padding-left: 0px;
            margin: 0px;
            z-index: 5;
            li {
                font-size: 15px;
                padding: 10px 0 10px 20px;
                position: relative;
                &:hover {
                    background-color: #f2f2f2;
                }
                .secSort {
                    transition: all 1s;
                    z-index: 5;
                    position: absolute;
                    padding: 5px;
                    width: 320px;
                    top: 0px;
                    left: $menuWidth;
                    display: flex;
                    flex-wrap: wrap;
                    background-color: #f2f2f2;
                    border: .8px solid #ccc;
                    span {
                        height: 30px;
                        padding: 0 10px;
                        line-height: 30px;
                        cursor: pointer;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
            .header {
                background-color: $tabGrey;
                &:hover {
                    background-color: $tabGrey;
                }
            }
            .arrow {
                &::after {
                    content: '>';
                    position: absolute;
                    right: 7px;
                    top: 8px;
                    color: #ccc;
                }
            }
        }
    }
</style>
