<template>
    <div class="user-command" v-if="Object.keys(userInfo).length > 0">
        <div class="avatar">
            <img :src="userInfo.headPicPath" alt="">
        </div>
        <div class="right">
            <div class="score">
                为该书打分
                <star @mousemove.native="mouseMove" @click.native="isSetScore = true" :score="Number(score)"></star>
            </div>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="comment">
            </el-input>
            <div class="bottom">
                <div class="text-number">
                    还能输入{{500 - comment.length}}字
                </div>
                <el-button type="primary" size="mini">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>

import _ from 'underscore';

import star from '@/common/vue/star';
import getUserInfo from '@/common/js/getUserInfo';

import { addOrUpdateNote } from '@/api/api';

export default {
    props: ['bookName', 'bookId'],
    data() {
        return {
            comment: '',
            score: 0,
            isSetScore: false
        }
    },
    components: {
        star
    },
    mixins: [getUserInfo],
    inject: ['reload'],
    methods: {
        mouseMove: _.debounce(function(e) {
            if (!this.isSetScore) {
                const score = e.offsetX / (87 / 5);
                this.score = Math.round(score);
            }
        }, 10),
        async uploadNote() {
            try {
                await addOrUpdateNote({
                    bookId: this.bookId,
                    store: this.score,
                    commtent: this.comment,
                    userId: this.userInfo.id
                });
                this.$message({
                    message: '评论成功',
                    type: 'success'
                });
                this.reload();
            } catch (error) {
                this.$message({
                    message: '评论失败',
                    type: 'fail'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-command {
        margin-top: 30px;
        padding-bottom: 5vh;
        display: flex;
        border-bottom: 1px solid $littleGrey;
        .avatar {
            flex: 1;
            display: flex;
            align-items: center;
            img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }
        .right {
            flex: 6;
            .score {
                display: flex;
                margin: 10px 0;
                .star {
                    cursor: pointer;
                    margin-left: 10px;
                }
            }

            .el-textarea__inner:focus {
                border-color: $green;
            }
            .bottom {
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .text-number {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
