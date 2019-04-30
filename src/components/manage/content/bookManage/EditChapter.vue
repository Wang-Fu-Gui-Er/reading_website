<template>
    <div class="edit-chapter">
        <div class="back" @click="$router.back()">
            <img src="../../../../assets/img/return.svg" alt="返回">
        </div>
        <div class="header">
            <button @click="chapter.push({isEdit: true})">新增章节</button>
            <div @click="changeSort" class="change-sort" :class="{select: sort}">
                <font-awesome-icon icon="sort-amount-up"></font-awesome-icon>
            </div>
        </div>
        <div class="content">
            <div class="chapter-header">
                <div class="sequence">
                    章节序号
                </div>
                <div class="title">
                    章节名称
                </div>
                <div class="content-path">
                    章节地址
                </div>
                <div class="edit">
                    
                </div>
            </div>
            <div class="chapter-item" v-for="(item, index) in chapter" :key="item.id">
                <div class="sequence">
                    <template v-if="item.isEdit">
                        <el-input v-model="item.sequence">
                        </el-input>
                    </template>
                    <template v-else>
                        {{item.sequence}}
                    </template>
                </div>
                <div class="title">
                    <template v-if="item.isEdit">
                        <el-input v-model="item.title">
                        </el-input>
                    </template>
                    <template v-else>
                        {{item.title}}
                    </template>
                </div>
                <div class="content-path" :title="item.contentPath">
                    <template v-if="item.isEdit">
                        <el-input v-model="item.contentPath">
                        </el-input>
                    </template>
                    <template v-else>
                        {{item.contentPath}}
                    </template>
                </div>
                <div class="edit">
                    <a @click="$refs.file[index].click()">
                        <input style="display:none;" ref="file" type="file" @change="uploadChapter">
                        上传章节
                    </a>
                    <a @click="$set(chapter[index], 'isEdit', true)">编辑</a>
                    <a @click="chapter.splice(index, 1)">删除</a>
                </div>
            </div>
        </div>
        <div class="submit">
            <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

import { getAllChapter, upload, updateChapter } from '@/api/api';

export default {
    data() {
        return {
            chapter: [],
            sort: true
        }
    },
    inject: ['reload'],
    computed: {
        ...mapState(['editBookId'])
    },
    created() {
        this.changeChapter();
    },
    methods: {
        async changeChapter(sort = 'asc') {
            const bookId = this.editBookId;
            const chapter = await getAllChapter({bookId, sort});
            this.chapter = chapter;
        },
        async uploadChapter(e) {
            const event = e.target || e.srcElement;
            const result = await upload({file: event.files[0], type: 'chapter'});
            this.$message({
                message: '上传成功',
                type: 'success'
            });
            this.reload();
        },
        async submitForm() {
            try {
                const result = await updateChapter(this.chapter);
                this.$message({
                    message: '更新成功',
                    type: 'success'
                });
                this.$router.push({name: 'bookManage'});
            }
            catch(err) {
                this.$message({
                    message: '更新失败',
                    type: 'fail'
                });
            }
        },
        changeSort() {
            const sort = !this.sort;
            const sortParam = sort ? 'asc' : 'desc';
            this.changeChapter(sortParam);
            this.sort = sort;
        }
    }
}
</script>

<style lang="scss" scoped>
    .edit-chapter {
        img {
            width: 1.5rem;
            height: 1.5rem;
        }
        .back {
            color: $blue;
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
            img {
                color: $blue;
            }
        }
        .header {
            margin: 1vh 0;
            display: flex;
            align-items: center;
            button {
                margin: 0;
                padding: 0;
                border: 1px solid $butonBg;
                outline: none;
                padding: 3px 5px;
                border-radius: 5px;
                color: $grey;
                background-color: $addBookGreen;
                cursor: pointer;
                &:hover {
                    background-color: $greyWhite;
                }
            }
            .change-sort {
                color: $grey;
                margin-left: 2rem;
                transition: transform 1s;
            }
            .select {
                transform: rotate(180deg);
            }
        }
        .content {
            margin-top: 1rem;
            border: .6px solid $blue;
            border-radius: 10px;
            padding: 15px 5px;
            .chapter-item, .chapter-header {
                display: grid;
                grid-template-columns: 1fr 2fr 2fr 2fr;
                grid-template-rows: 35px;
                padding: 5px 0;
                justify-items: center;
                justify-content: center;
                align-items: center;
                > div {
                    overflow: hidden;
                }
                .content-path {
                    text-align: center;
                    width: 200px;
                    @include single-overflow;
                }
                .edit {
                    font-size: 13px;
                    a {
                        cursor: pointer;
                        padding: 0 3px;
                    }
                    a:first-of-type {
                        color: $green;
                    }
                    a:nth-of-type(2) {
                        color: $blue;
                    }
                    a:nth-of-type(3) {
                        color: $red;
                    }
                }
            }
        }
        .submit {
            margin-top: 2vh;
            display: flex;
            justify-content: center;
        }
    }
</style>
