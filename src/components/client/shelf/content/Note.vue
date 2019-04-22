<template>
    <div class="note">
        <div class="note-item" v-for="item in note" :key="item.id">
            <div class="left">
                <div class="cover">
                    <img :src="item.bookPic" alt="封面">
                </div>
                <div class="bookname">
                    {{item.bookName}}
                </div>
            </div>
            <div class="right">
                <template v-if="$route.name === 'note'">
                    <div class="row">
                        <span class="line">|</span>
                        原文: {{item.content}}
                    </div>
                    <div class="notation">
                        <span class="line">|</span>
                        笔记: {{item.notation}}
                    </div>
                </template>
                <template v-if="$route.name === 'command'">
                    <div class="command">
                        {{item.comment}}
                    </div>
                </template>
                <div class="btn">
                    <span class="time">
                        {{item.updated}}
                    </span>
                    <span class="delete" @click="delThis(item.id)">
                        删除
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getUserInfo from '@/common/js/getUserInfo';

import {userNote, delNote, getBookCommand} from '@/api/api';

export default {
    data() {
        return {
            note: [],
            page: {
            }
        }
    },
    mixins: [getUserInfo],
    created() {
        this.getContent();
    },
    methods: {
        async getContent(pageNum = 1) {
            const routeName = this.$route.name;
            const param = {
                pageNum,
                pageSize: 10,
                userId: this.userInfo.id
            };
            const {data, page} = routeName === 'history' ? await userHistory(param) : await userShelf(param);
            this.note = data;
            this.page = page;
        }
    }
}
</script>

<style lang="scss" scoped>
    .note {
        .note-item {
            display: flex;
            font-size: 13px;
            &:not(:first-of-type) {
                margin-top: 15px;
            }
            .left {
                // flex-basis: 10rem;
                width: 10rem;
                text-align: center;
                .cover {
                    width: 6rem;
                    height: 8rem;
                }
            }
            .right {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                div {
                    // display: flex;
                    // align-items: center;
                }
                .line {
                    display: inline-block;
                    color: $green;
                    font-size: 16px;
                    font-weight: 800;
                    // font-size: 10px;
                    // width: 2px;
                }
                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    span {
                        // margin: 0 10px;
                    }
                    .delete {
                        cursor: pointer;
                        color: $red;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>
