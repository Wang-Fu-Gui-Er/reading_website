<template>
    <div class="user-read">
        <div class="read">
            <div class="read-item" v-for="item in content" :key="item.id" @click="$router.push(`/read?bookId=${item.bookId}&chapterIndex=0`)">
                <div class="cover">
                    <img :src="item.bookPic" alt="封面图片">
                </div>
                <div class="read-content">
                    <div class="bookname">
                        {{item.bookName}}
                    </div>
                    <div class="recent">
                        最近阅读章节: 第{{item.sequence}}章 {{item.title}}
                    </div>
                    <div class="progress">
                        阅读进度; {{item.progress}}%
                    </div>
                </div>
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
</template>

<script>
import getUserInfo from '@/common/js/getUserInfo';

import { getUserBook } from '@/api/api';

export default {
    data() {
        return {
            content: [],
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
                userId: this.userInfo.id,
                isOnShelf: routeName === 'history' ? false : true
            };
            const {data, page} = await getUserBook(param);
            this.content = data;
            this.page = page;
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-read {
        .read {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-row-gap: 1rem;
            .read-item {
                cursor: pointer;
                display: flex;
                font-size: 12px;
                .cover {
                    flex-basis: 6rem;
                    width: 6rem;
                    height: 8rem;
                }
                .read-content {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    div:not(:first-of-type) {
                        margin-top: .7rem;
                    }
                    .recent {
                        @include single-overflow;
                        width: 15rem;
                    }
                }
            }
        }
        .pager {
            margin-top: 3vh;
            text-align: center;
            .el-pagination {
                display: inline-block;
            }
        }
    }
</style>
