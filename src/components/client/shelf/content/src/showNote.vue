<template>
    <el-dialog
        class="show-note"
        :title="`${diaInfo.title}所有书评`"
        :visible.sync="isShowMore"
        width="80%"
        :close-on-click-modal="false"
        :before-close="close">
        <div class="container">
            <div class="left">
                <div class="cover">
                    <img :src="diaInfo.bookPic" alt="封面">
                </div>
                <div class="bookname">
                    {{diaInfo.title}}
                </div>
            </div>
            <div class="right">
                <div class="note" v-for="item in note" :key="item.id">
                    <div class="row">
                        <span class="line">|</span>
                        原文: {{item.content}}
                    </div>
                    <div class="notation">
                        <span class="line">|</span>
                        笔记: {{item.notation}}
                    </div>
                    <div class="btn">
                        <span class="time">
                            {{item.updated}}
                        </span>
                        <span class="delete" @click="delThis(item.id)">
                            删除
                        </span>
                    </div>
                </div>
                <div class="pager">
                    <el-pagination
                        layout="total, prev, pager, next"
                        :total="page.totalNum"
                        @current-change="getContent"
                        >
                    </el-pagination>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { mapMutations } from 'vuex';

import { queryBookNote, delNote } from '@/api/api';

export default {
    model: {
        prop: 'isShowMore',
        event: 'closeDialog'
    },
    props: ['isShowMore', 'diaInfo'],
    data() {
        return {
            note: [],
            page: {}
        }
    },
    created() {
        this.getContent();
    },
    methods: {
        async getContent(pageNum = 1) {
            const info = this.diaInfo;
            const param = {
                pageNum,
                pageSize: 10,
                userId: info.userId,
                bookId: info.bookId
            };
            const {data, page} = await queryBookNote(param);
            this.note = data;
            this.page = page;
        },
        async delThis(noteId) {
            try {
                await delNote({noteId});
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
            } catch (error) {
                this.$message({
                    message: '删除失败',
                    type: 'error'
                })
            }
        },
        close() {
            this.$emit('closeDialog', false);
        }
    }
}

</script>
<style lang="scss" scoped>
    .show-note {
        .container {
            display: flex;
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
                width: 100%;
                margin-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .note + .note {
                    margin-top: 3vh;
                }
                .line {
                    display: inline-block;
                    color: $green;
                    font-size: 16px;
                    font-weight: 800;
                }
                .command {
                    cursor: pointer;
                }
                .notation {
                    margin-top: 2vh;
                }
                .btn {
                    margin-top: 3vh;
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
