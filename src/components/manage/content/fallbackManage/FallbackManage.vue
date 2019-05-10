<template>
    <div class="fallback-manage">
        <div class="search">
            <el-select v-model="search.type" placeholder="请选择类型" @change="searchFallback">
                <el-option v-for="item in type" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select class="status" v-model="search.status" placeholder="请选择状态" @change="searchFallback">
                <el-option v-for="item in status" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="fallback">
            <div class="fallback-item" :class="{pull: item.select}" v-for="item, index in fallback" :key="item.id">
                <div class="content" @click="drop(index)">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="user">
                        <span class="userId">反馈人: {{item.userId}}</span>
                        <span class="time">时间: {{item.updated}}</span>
                    </div>
                </div>
                <div class="bottom" :class="{show: item.select}" :style="item.select ? '' : ''">
                    <div class="title">
                        标题: {{item.title}}
                    </div>
                    <div class="desc">
                        描述: {{item.detail}}
                    </div>
                    <div class="email">
                        联系方式: {{item.email}}
                    </div>
                    <div class="msg">
                        <el-radio-group size="mini" v-model="item.status" @change="changeStatus(item)">
                            <el-radio-button :label="0">待处理</el-radio-button>
                            <el-radio-button :label="1">正在处理</el-radio-button>
                            <el-radio-button :label="2">已完成</el-radio-button>
                            <el-radio-button :label="3">被拒绝</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="pager">
            <el-pagination
                layout="total, prev, pager, next"
                :total="page.totalNum"
                @current-change="searchFallback"
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>

import { queryAdvice, searchAuthor, changeAdvice } from '@/api/api';

export default {
    data() {
        return {
            type: [{
                label: '缺失',
                value: 0
            }, {
                label: '举报',
                value: 1
            }, {
                label: '建议',
                value: 2
            }],
            status: [{
                label: '待处理',
                value: 0
            }, {
                label: '正在处理',
                value: 1
            }, {
                label: '已完成',
                value: 2
            }, {
                label: '被拒绝',
                value: 3
            }],
            fallback: [],
            search: {
                pageNum: 1,
                pageSize: 10,
                status: null,
                type: null,
            },
            page: {}
        }
    },
    created() {
        this.searchFallback();
    },
    methods: {
        async searchFallback(pageNum) {
            const search = this.search;
            if (typeof pageNum === 'number') {
                search.pageNum = pageNum;
            }
            const {data, page} = await queryAdvice(search);
            this.fallback = data;
            this.page = page;
        },
        async changeStatus(item) {
            try {
                await changeAdvice({id: item.id, status: item.status});
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }
            catch(err) {
                this.$message({
                    message: '修改失败',
                    type: 'error'
                });
            }
        },
        drop(index) {
            this.$set(this.fallback[index], 'select', true);
        }
    }
}
</script>

<style lang="scss" scoped>
    .fallback-manage {
        .search {
            display: flex;
            .status {
                margin-left: 20px;
            }
        }
        .fallback {
            margin-top: 3vh;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(auto-fill, [row] auto);
            grid-auto-flow: row dense;
            grid-auto-rows: row dense;
            grid-row-gap: 30px;
            grid-gap: 40px;
            color: $grey;
            .fallback-item {
                align-self: start;
                border: 1px solid $blue;
                border-radius: 3px;
                padding: 10px;
                .content {
                    cursor: pointer;
                    z-index: 3;
                    background: #fff;
                    .user {
                        margin-top: 3px;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        font-size: 10px;
                        .time {
                            display: inline-block;
                            margin-left: 4px;
                            font-size: 8px;
                        }
                    }
                }
                .bottom {
                    font-size: 12px;
                    z-index: 1;
                    display: none;
                    // transform: translateY(-100%);
                    > div {
                        padding: 3px 0;
                    }
                    .msg {
                        display: flex;
                        justify-content: flex-end;
                        .el-radio-button--mini .el-radio-button__inner {
                            padding: 6px 10px;
                        }
                    }
                }
                .show {
                    display: block;
                }
            }
            .pull {

            }
        }
    }
</style>
