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

import {userNote, delNote, getBookCommand, delCommand} from '@/api/api';

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
                pageSize: 8,
                userId: this.userInfo.id
            };
            const {data, page} = routeName === 'note' ? await userNote(param) : await getBookCommand(param);
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
                margin-top: 8vh;
            }
            .left {
                width: 4rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                .cover {
                    width: 4rem;
                    height: 4 / 3 * 4rem;
                }
            }
            .right {
                margin-left: 2rem;
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
                }
                .notation {
                    margin-top: 2vh;
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
