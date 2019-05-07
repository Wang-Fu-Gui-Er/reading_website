<template>
    <div class="note">
        <div class="note-item" v-for="(item, index) in note" :key="item.id">
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
                    <div class="notation-item" @click="showMore(item)">
                        <div class="row">
                            <span class="line">|</span>
                            原文: {{item.content}}
                        </div>
                        <div class="notation">
                            <span class="line">|</span>
                            笔记: {{item.notation}}
                        </div>
                    </div>
                </template>
                <template v-if="$route.name === 'command'">
                    <!-- 下面是我的书评 -->
                    <template v-if="item.isEdit">
                        <div class="edit-note">
                            <el-input type="textarea" placeholder="请输入书评" v-model="editContent"></el-input>
                            <div class="btn">
                                <el-button @click="saveEditConetnt(item, editContent)" size="mini" type="primary">保存</el-button>
                                <el-button @click="clearEditContent" size="mini" type="danger">取消</el-button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div @click="editNote(index, item.comment)" class="command">
                            {{item.comment}}
                        </div>
                    </template>
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
        <show-note v-model="isShowMore" :diaInfo="diaInfo"></show-note>
    </div>
</template>

<script>
import getUserInfo from '@/common/js/getUserInfo';

import {userNote, delNote, getBookCommand, delCommand, addOrUpdateNote} from '@/api/api';

import showNote from './src/showNote';

export default {
    data() {
        return {
            note: [],
            page: {
            },
            editContent: '',
            isShowMore: false,
            diaInfo: {
                userId: 0,
                bookId: 0,
                title: null,
                bookPic: null
            }
        }
    },
    components: {
        showNote
    },
    inject: ['reload'],
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
            const {data, page} = routeName === 'note' ? await userNote(param) : await getBookCommand(param);
            this.note = data;
            this.page = page;
        },
        editNote(index, content) {
            this.clearEditContent();
            this.note[index].isEdit = true;
            this.editContent = content;
        },
        async saveEditConetnt(item, content) {
            if (content) {
                try {
                    await addOrUpdateNote({
                        bookId: item.bookId,
                        comment: content,
                        userId: this.userInfo.id,
                        id: item.id
                    })
                    this.$message({
                        message: '更新成功',
                        type: 'success'
                    })
                    this.reload();
                }
                catch(err) {
                    this.$message({
                        message: '并没有编辑成功',
                        type: 'error'
                    })
                }
            }
            else {
                this.$message({
                    message: '不可以设置为空噢',
                    type: 'error'
                })
                this.clearEditContent();
            }
        },
        clearEditContent() {
            let note = this.note;
            note = note.map(item => {
                if (item.isEdit) {
                    item.isEdit = false;
                }
                return item;
            });
            this.note = note;
            this.editContent = null;
        },
        showMore(note) {
            this.diaInfo = {
                userId: this.userInfo.id,
                bookId: note.bookId,
                title: note.bookName,
                bookPic: note.bookPic
            };
            this.isShowMore = true;
        },
        async delThis(id) {
            try {
                if (this.$route.name === 'note') {
                    await delNote({noteId: id});
                }
                else {
                    await delCommand({reviewId: id})
                }
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
                width: 100%;
                margin-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                div {
                    // display: flex;
                    // align-items: center;
                }
                .notation-item {
                    cursor: pointer;
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
