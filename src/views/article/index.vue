<template>
  <div class="article">
    <el-form ref="articleFormRef" :inline="true" :model="articleForm">
      <el-form-item label="文章名称" prop="name">
        <el-input v-model="articleForm.name" placeholder="请输入文章名称" clearable />
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
      <el-form-item label="创建时间" prop="date">
        <el-date-picker v-model="articleForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="primary" @click="onReset(articleFormRef)">重置</el-button>
        <el-button type="primary">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column prop="date" label="文章名称" />
      <el-table-column prop="name" label="简述" />
      <el-table-column prop="address" label="分类" />
      <el-table-column prop="address" label="标签" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column label="操作" width="120">
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const articleFormRef = ref(null)

let articleForm = reactive({
  name: '',
  tags: [],
  category: [],
  date: null
})

let tableData = ref([{}])

const onSearch = () => {

}

const onReset = formEl => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="less" scoped></style>
