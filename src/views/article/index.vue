<template>
  <div class="article">
    <el-form ref="articleFormRef" :inline="true" :model="articleForm">
      <el-form-item label="标题" prop="name">
        <el-input v-model="articleForm.name" placeholder="请输入标题" clearable />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="articleForm.tags" placeholder="请选择文章标签" clearable multiple>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="articleForm.category" placeholder="请选择文章标签" clearable multiple>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="创作类型" prop="type">
        <el-select v-model="articleForm.type" placeholder="请选择创作类型" clearable>
          <el-option label="全部" value="" />
          <el-option label="原创" value="1" />
          <el-option label="转载" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态" prop="status">
        <el-select v-model="articleForm.status" placeholder="请选择发布状态" clearable>
          <el-option label="全部" value="" />
          <el-option label="已发布" value="1" />
          <el-option label="未发布" value="2" />
          <el-option label="已下架" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="date">
        <el-date-picker v-model="articleForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search">搜索</el-button>
        <el-button icon="Refresh" @click="onReset(articleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-list">
      <el-button icon="CirclePlus" type="primary" @click="addArticle">新增</el-button>
      <el-button icon="Delete" type="danger">批量删除</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="tags" label="标签" align="center">
        <template #default="scope">
          <el-tag type="success" v-for="item in scope.row.tags.split(',')" :key="item">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类">
        <template #default="scope">
          <el-tag v-for="item in scope.row.category.split(',')" :key="item">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="创作类型">
        <template #default="scope">
          {{ scope.row.type === '1' ? '原创' : '转载' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="发布状态">
        <template #default="scope">
          {{ scope.row.status === '1' ? '已发布' : '未发布' }}
        </template>
      </el-table-column>
      <el-table-column prop="link" label="原文链接" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="180" align="center">
        <template #default>
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button link type="primary" icon="Edit" />
          </el-tooltip>
          <el-tooltip effect="dark" content="置顶" placement="top">
            <el-button link type="primary" icon="Upload" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button link type="danger" icon="Delete" />
          </el-tooltip>
          <el-tooltip effect="dark" content="发布" placement="top">
            <el-button link type="primary" icon="View" />
          </el-tooltip>
          <el-tooltip effect="dark" content="下架" placement="top">
            <el-button link type="danger" icon="SwitchButton" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <edit-dialog :isShow="editDialogInfo.isShow" :title="editDialogInfo.title" @close="editClose" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import editDialog from './components/article-edit.vue'

const articleFormRef = ref(null)

const editDialogInfo = reactive({
  isShow: false,
  title: '新增文章',
  type: '0'
})

let articleForm = reactive({
  name: '',
  tags: [],
  category: [],
  type: '',
  status: '',
  date: null
})

let tableData = ref([{
  title: '我的第一篇文章',
  author: 'tadpole',
  tags: 'vue',
  category: '技术探讨',
  type: '1',
  status: '1',
  link: '',
  createTime: '2023-08-02 13:20:39',
  updateTime: '2023-08-10 20:30:30'
}])

const onReset = formEl => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

const addArticle = () => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '新增文章'
  editDialogInfo.type = '0'
}

const editClose = val => {
  editDialogInfo.isShow = val
}

</script>

<style lang="less" scoped>
.btn-list {
  margin-bottom: 15px;
}
</style>
