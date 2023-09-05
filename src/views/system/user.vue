<template>
  <div class="user">
    <el-form ref="userFormRef" :inline="true" :model="userForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="userForm.name" placeholder="请输入昵称" clearable />
      </el-form-item>
      <!-- <el-form-item label="状态" prop="status">
        <el-select v-model="userForm.status" placeholder="请选择状态" clearable>
          <el-option label="全部" value="" />
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="2" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="Search" @click="search">搜索</el-button>
        <el-button icon="Refresh" @click="onReset(userFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-list">
      <el-button icon="CirclePlus" type="primary">新增</el-button>
      <el-button icon="Delete" type="danger">批量删除</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="avatar" label="头像" align="center">
        <template #default="scope">
          <img class="list-avatar" :src="scope.row.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="昵称" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="userRole" label="用户角色" /> -->
      <!-- <el-table-column prop="status" label="状态" /> -->
      <el-table-column prop="createTime" label="注册时间">
        <template #default="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default>
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button link type="primary" icon="Edit" />
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

    <div class="pagination">
      <el-pagination v-model:current-page="page.currentPage" v-model:page-size="query.pageSize" size="small"
        layout="total, prev, pager, next" :total="page.total" @current-change="currentChange" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { userList } from '../../api/user'
import { dayjs } from 'element-plus';

const userFormRef = ref(null)

let userForm = reactive({
  name: '',
  username: '',
})

let query = reactive({
  pageSize: 10,
  pageNum: 1,
  param: {}
})

let page = reactive({
  total: 0,
  currentPage: 1
})

let tableData = ref([])

const onReset = formEl => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
  page.currentPage = 1
  query.param = {}
  getUserList(query)
}

const getUserList = async query => {
  let { data } = await userList(query)
  tableData.value = data.data.list
  page.total = data.data.total
}

const search = () => {
  query.param = userForm
  getUserList(query)
}

const currentChange = (page) => {
  query.pageNum = page
  getUserList(query)
}

onMounted(() => {
  getUserList(query)
})

</script>

<style lang="less" scoped>
.btn-list {
  margin-bottom: 15px;
}

.list-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
