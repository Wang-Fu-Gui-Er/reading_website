<template>
    <div class="sort">
        <div class="sort-content">
            <div class="menu">
                <header>全部图书分类</header>
                <ul class="menu-content">
                    <li v-for="item in sort" :key="item.id">
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
export default {
    data() {
        return {
            sort: [{
                bigCateGoryDO: {
                    id: 1,
                    created: '1234',
                    cateName: '小说'
                },
                smallCateGoryDO: [{
                    id: 0,
                    cateName: '言情'
                },{
                    id: 0,
                    cateName: '青春'
                },{
                    id: 0,
                    cateName: '历史'
                }]
            }, {
                bigCateGoryDO: {
                    id: 1,
                    created: '1234',
                    cateName: '小说'
                },
                smallCateGoryDO: [{
                    id: 0,
                    cateName: '言情'
                },{
                    id: 0,
                    cateName: '青春'
                },{
                    id: 0,
                    cateName: '历史'
                }]
            }, {
                bigCateGoryDO: {
                    id: 1,
                    created: '1234',
                    cateName: '小说'
                },
                smallCateGoryDO: [{
                    id: 0,
                    cateName: '言情'
                },{
                    id: 0,
                    cateName: '青春'
                },{
                    id: 0,
                    cateName: '历史'
                }]
            }, {
                bigCateGoryDO: {
                    id: 1,
                    created: '1234',
                    cateName: '小说'
                },
                smallCateGoryDO: [{
                    id: 0,
                    cateName: '言情'
                },{
                    id: 0,
                    cateName: '青春'
                },{
                    id: 0,
                    cateName: '历史'
                }]
            }]
        }
    }
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
