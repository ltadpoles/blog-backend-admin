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
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="date">
        <el-date-picker v-model="categoryForm.date"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="search(categoryForm)">搜索</el-button>
        <el-button icon="Refresh" @click="onReset(categoryFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-list">
      <el-button icon="CirclePlus" type="primary" @click="addCategory">新增</el-button>
      <el-button icon="Delete" type="danger" @click="del">批量删除</el-button>
    </div>

    <el-table :data="tableData" border @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          {{ scope.row.status === 1 ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template #default="scope">
          {{ scope.row.updateTime ? dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm') : '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" class-name="table-btn">
        <template #default="scope">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button link type="primary" icon="Edit" @click="editCategory(scope.row)" />
          </el-tooltip>
          <el-popconfirm confirm-button-text="确认"
                         cancel-button-text="取消"
                         icon="InfoFilled"
                         title="确认删除?"
                         @confirm="delConfirm(scope.row)">
            <template #reference>
              <span>
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button link type="danger" icon="Delete" />
                </el-tooltip>
              </span>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.status === 0"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         icon="InfoFilled"
                         title="确认启用?"
                         @confirm="statusConfirm(scope.row)">
            <template #reference>
              <span>
                <el-tooltip effect="dark" content="启用" placement="top">
                  <el-button link type="primary" icon="Unlock" />
                </el-tooltip>
              </span>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.status === 1"
                         confirm-button-text="确认"
                         cancel-button-text="取消"
                         icon="InfoFilled"
                         title="确认禁用?"
                         @confirm="statusConfirm(scope.row)">
            <template #reference>
              <span>
                <el-tooltip effect="dark" content="禁用" placement="top">
                  <el-button link type="danger" icon="Lock" />
                </el-tooltip>
              </span>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination v-model:current-page="page.currentPage"
                     v-model:page-size="query.pageSize"
                     size="small"
                     layout="total, prev, pager, next"
                     :total="page.total"
                     @current-change="currentChange" />
    </div>

    <edit-dialog :isShow="editDialogInfo.isShow"
                 :title="editDialogInfo.title"
                 :info="editDialogInfo.info"
                 :type="editDialogInfo.type"
                 @close="editDialogClose" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import editDialog from './components/category-edit.vue'
import { categoryList, categoryDel, categoryUpdate } from '@/api/category'
import { dayjs, ElMessage, ElMessageBox } from 'element-plus'

const categoryFormRef = ref(null)

let multipleSelection = ref([])

let categoryForm = reactive({
  name: '',
  status: '',
  date: null
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

let editDialogInfo = reactive({
  isShow: false,
  title: '新增分类',
  type: 1
})

const getList = async query => {
  const { data } = await categoryList(query)
  tableData.value = data.data.list
  page.total = data.data.total
}

const search = param => {
  let startTime = null
  let endTime = null
  if (param.date && param.date.length) {
    startTime = new Date(param.date[0]).getTime()
    endTime = new Date(param.date[1]).getTime()
  }
  query.param = Object.assign(query.param, param, { startTime, endTime })
  query.pageNum = 1
  page.currentPage = 1
  getList(query)
}

const currentChange = (page) => {
  query.pageNum = page
  getList(query)
}

const onReset = formEl => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
  query.pageNum = 1
  query.param = {}
  page.currentPage = 1
  getList(query)
}

const selectionChange = val => {
  multipleSelection.value = val
}

const del = () => {
  if (multipleSelection.value.length < 1) {
    return ElMessage({
      type: 'warning',
      message: '请选择需要删除的分类'
    })
  }


  ElMessageBox.confirm(
    '确认删除选中分类？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const ids = multipleSelection.value.map(item => item.id).join(',')
      const { data } = await categoryDel({ id: ids })
      ElMessage({
        type: 'success',
        message: data.msg
      })
      getList(query)
    })
}

const addCategory = () => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '新增分类'
  editDialogInfo.type = 1
  editDialogInfo.info = {}
}

const editCategory = row => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '修改分类'
  editDialogInfo.info = row
  editDialogInfo.type = 0
}

const editDialogClose = val => {
  editDialogInfo.isShow = false
  if (val) {
    getList(query)
  }
}

const delConfirm = async (val) => {
  const { data } = await categoryDel({ id: val.id })
  ElMessage({
    type: 'success',
    message: data.msg,
  })
  getList(query)
}

const statusConfirm = async (row) => {
  await categoryUpdate({ id: row.id, name: row.name, status: row.status === 1 ? 0 : 1 })
  getList(query)
  ElMessage({
    type: 'success',
    message: '操作成功',
  })
}


onMounted(() => {
  getList(query)
})
</script>

<style lang="less" scoped>
.btn-list {
  margin-bottom: 15px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
