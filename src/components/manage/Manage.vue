<template>
    <div class="manage">
        <div class="menu">
            <div class="menu-item" v-for="item in menu" :key="item.id" :class="curTab === item.tab ? 'selected' : ''">
                {{item.text}}
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curTab: 'book',
            menu: [{
                text: '图书管理',
                tab: 'book'
            }, {
                text: '作者管理',
                tab: 'author'
            }, {
                text: '反馈管理',
                tab: 'fallback'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
    .manage {
        display: flex;
        width: $width;
        margin: 3vh auto 14vh;
        .menu {
            width: 13rem;
            background-color: #f5f5f5;
            color: #666;
            font-size: 14px;
            .menu-item {
                height: 5vh;
                line-height: 5vh;
                text-align: center;
                border-top: 0.7px solid #e6e6e0;
                cursor: pointer;
            }
            .selected {
                background-color: $tabGrey;
                color: $greyWhite;
            }
        }
        .content {
            flex: 1;
            margin-left: 3rem;
        }
    }
</style>
