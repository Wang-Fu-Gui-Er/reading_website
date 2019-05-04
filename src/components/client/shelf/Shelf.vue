<template>
    <div class="shelf">
        <div class="menu">
            <div class="introduction">
                <div class="avatar">
                    <img :src="userInfo.headPicPath" alt="头像">
                </div>
                <div class="username">
                    {{userInfo.nickName}}
                </div>
            </div>
            <div class="menu-item" @click="changeItem(item.tab)" v-for="item in menu" :key="item.id" :class="curTab === item.tab ? 'selected' : ''">
                {{item.text}}
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import getUserInfo from '@/common/js/getUserInfo';

export default {
    mixins: [getUserInfo],
    data() {
        return {
            curTab: 'config',
            menu: [{
                tab: 'config',
                text: '个人设置'
            }, {
                tab: 'history',
                text: '阅读历史'
            }, {
                tab: 'myBook',
                text: '我的图书'
            }, {
                tab: 'note',
                text: '我的笔记'
            }, {
                tab: 'command',
                text: '我的书评'
            }]
        }
    },
    created() {
        this.curTab = this.$route.name;
    },
    inject: ['reload'],
    methods: {
        changeItem(tab) {
            this.curTab = tab;
            this.$router.push({name: tab});
            this.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
    .shelf {
        width: $width;
        margin: 2rem auto 8rem;
        display: flex;
        .menu {
            width: 13rem;
            background-color: $greyWhite;
            color: $grey;
            font-size: 14px;
            .introduction {
                height: 20vh;
                padding: 30px 0 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                .avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .username {
                    margin-top: 10px;
                }
            }
            .menu-item {
                height: 5vh;
                line-height: 5vh;
                text-align: center;
                border-top: .7px solid $littleGrey;
                cursor: pointer;
                &:hover {
                    background-color: $tabGrey;
                    color: $greyWhite;
                }
            }
            .selected {
                background-color: $tabGrey;
                color: $greyWhite;
            }
        }
        .content {
            flex: 1;
            margin-left: 3rem;
            // background-color: $greyWhite;
        }
    }
</style>
