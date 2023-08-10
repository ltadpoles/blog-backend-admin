<template>
  <div class="category">
    <el-form ref="categoryFormRef" :inline="true" :model="categoryForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="categoryForm.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="categoryForm.status" placeholder="请选择状态" clearable>
          <el-option label="全部" value="" />
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="date">
        <el-date-picker v-model="categoryForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search">搜索</el-button>
        <el-button icon="Refresh" @click="onReset(categoryFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-list">
      <el-button icon="CirclePlus" type="primary" @click="addCategory">新增</el-button>
      <el-button icon="Delete" type="danger">批量删除</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          {{ scope.row.status === '1' ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="160" align="center">
        <template #default="scope">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button link type="primary" icon="Edit" @click="editCategory(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button link type="danger" icon="Delete" />
          </el-tooltip>
          <el-tooltip effect="dark" content="启用" placement="top">
            <el-button link type="primary" icon="Unlock" />
          </el-tooltip>
          <el-tooltip effect="dark" content="禁用" placement="top">
            <el-button link type="danger" icon="Lock" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <edit-dialog :isShow="editDialogInfo.isShow"
                 :title="editDialogInfo.title"
                 :id="editDialogInfo.id"
                 @close="editDialogClose" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import editDialog from './components/category-edit.vue'

const categoryFormRef = ref(null)

let categoryForm = reactive({
  name: '',
  status: '',
  date: null
})

let tableData = ref([{
  name: '技术探讨',
  description: '关于技术方面的研究',
  status: '1',
  createTime: '2023-08-01 13:20:39',
  updateTime: ''
}])

let editDialogInfo = reactive({
  isShow: false,
  title: '新增分类'
})

const onReset = formEl => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

const addCategory = () => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '新增分类'
}

const editCategory = row => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '修改分类'
  editDialogInfo.id = row.id
}

const editDialogClose = val => {
  editDialogInfo.isShow = val
}

</script>

<style lang="less" scoped>
.btn-list {
  margin-bottom: 15px;
}
</style>
