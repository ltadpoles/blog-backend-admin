<template>
  <div class="tags">
    <el-form ref="tagsFormRef" :inline="true" :model="tagsForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="tagsForm.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="tagsForm.status" placeholder="请选择状态" clearable>
          <el-option label="全部" value="" />
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="date">
        <el-date-picker v-model="tagsForm.date" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="search(tagsForm)">搜索</el-button>
        <el-button icon="Refresh" @click="onReset(tagsFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-list">
      <el-button icon="CirclePlus" type="primary" @click="addTags">新增</el-button>
      <el-button icon="Delete" type="danger" @click="batchDel">批量删除</el-button>
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
      <el-table-column label="操作" width="160" align="center">
        <template #default="scope">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button link type="primary" icon="Edit" @click="editTags(scope.row)" />
          </el-tooltip>
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="InfoFilled" title="确认删除?"
            @confirm="delConfirm(scope.row)">
            <template #reference>
              <span>
                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button link type="danger" icon="Delete" />
                </el-tooltip>
              </span>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.status === 0" confirm-button-text="确认" cancel-button-text="取消" icon="InfoFilled"
            title="确认启用?" @confirm="statusConfirm(scope.row)">
            <template #reference>
              <span>
                <el-tooltip effect="dark" content="启用" placement="top">
                  <el-button link type="primary" icon="Unlock" />
                </el-tooltip>
              </span>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.status === 1" confirm-button-text="确认" cancel-button-text="取消" icon="InfoFilled"
            title="确认禁用?" @confirm="statusConfirm(scope.row)">
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
      <el-pagination v-model:current-page="page.currentPage" v-model:page-size="query.pageSize" size="small"
        layout="total, prev, pager, next" :total="page.total" @current-change="currentChange" />
    </div>

    <tags-edit :title="editDialogInfo.title" :isShow="editDialogInfo.isShow" :info="editDialogInfo.info"
      :type="editDialogInfo.type" @close="editDialogClose" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import tagsEdit from './components/tags-edit.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { tagList, tagDel, tagUpdate } from '@/api/tags'
import { dayjs } from 'element-plus'

const tagsFormRef = ref(null)

let tagsForm = reactive({
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

let multipleSelection = ref([])

let editDialogInfo = reactive({
  title: '新增标签',
  isShow: false,
  type: 1 // 1:新增 0: 修改
})

const getList = async query => {
  const { data } = await tagList(query)
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

const addTags = () => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '新增标签'
  editDialogInfo.type = 1
  editDialogInfo.info = {}
}

const editTags = row => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '修改标签'
  editDialogInfo.type = 0
  editDialogInfo.info = JSON.parse(JSON.stringify(row))
}

const editDialogClose = val => {
  editDialogInfo.isShow = false
  if (val) {
    query.pageNum = 1
    getList(query)
  }
}


const batchDel = () => {
  if (multipleSelection.value.length < 1) {
    return ElMessage({
      type: 'warning',
      message: '请选择需要删除的标签'
    })
  }


  ElMessageBox.confirm(
    '确认删除选中标签？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const ids = multipleSelection.value.map(item => item.id).join(',')
      const { data } = await tagDel({ id: ids })
      ElMessage({
        type: 'success',
        message: data.msg
      })
      getList(query)
    })
}

const selectionChange = val => {
  multipleSelection.value = val
}

const delConfirm = async (val) => {
  const { data } = await tagDel({ id: val.id })
  ElMessage({
    type: 'success',
    message: data.msg,
  })
  getList(query)
}

const statusConfirm = async (row) => {
  await tagUpdate({ id: row.id, name: row.name, status: row.status === 1 ? 0 : 1 })
  getList(query)
  ElMessage({
    type: 'success',
    message: '操作成功',
  })
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
