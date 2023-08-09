<template>
    <div class="comment">
        <el-form ref="commentFormRef" :inline="true" :model="commentForm">
            <el-form-item label="用户名称" prop="name">
                <el-input v-model="commentForm.name" placeholder="请输入用户名称" clearable />
            </el-form-item>
            <el-form-item label="留言时间" prop="date">
                <el-date-picker v-model="commentForm.date" type="daterange" start-placeholder="开始日期"
                    end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search">搜索</el-button>
                <el-button icon="Refresh" @click="onReset(commentFormRef)">重置</el-button>
            </el-form-item>
        </el-form>

        <div class="btn-list">
            <el-button icon="Delete" type="danger">批量删除</el-button>
        </div>

        <el-table :data="tableData" border>
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="用户" />
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="ip" label="ip地址" />
            <el-table-column prop="createTime" label="留言时间" />
            <el-table-column label="操作" width="120">
                <template #default>
                    <el-tooltip effect="dark" content="编辑" placement="top">
                        <el-button link type="primary" icon="Edit" />
                    </el-tooltip>
                    <el-tooltip effect="dark" content="删除" placement="top">
                        <el-button link type="danger" icon="Delete" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script setup>
import { reactive, ref } from "vue";

const commentFormRef = ref(null)

let commentForm = reactive({
    name: '',
    date: null
})

let tableData = ref([{}])

const onReset = formEl => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
  
<style lang="less" scoped>
.btn-list {
    margin-bottom: 15px;
}
</style>
  