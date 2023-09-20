<template>
  <div class="article">
    <el-form ref="articleFormRef" :inline="true" :model="articleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleForm.title" placeholder="请输入标题" clearable />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="articleForm.tags" placeholder="请选择文章标签" clearable multiple>
          <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="articleForm.category" placeholder="请选择文章分类" clearable>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="创作类型" prop="type">
        <el-select v-model="articleForm.type" placeholder="请选择创作类型" clearable>
          <el-option label="全部" value="" />
          <el-option label="原创" value="1" />
          <el-option label="转载" value="2" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="发布状态" prop="status">
        <el-select v-model="articleForm.status" placeholder="请选择发布状态" clearable>
          <el-option label="全部" value="" />
          <el-option label="已发布" value="1" />
          <el-option label="未发布" value="2" />
          <el-option label="已下架" value="3" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="创建时间" prop="date">
        <el-date-picker v-model="articleForm.date" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="search(articleForm)">搜索</el-button>
        <el-button icon="Refresh" @click="onReset(articleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="btn-list">
      <el-button icon="CirclePlus" type="primary" @click="addArticle">新增</el-button>
      <el-button icon="Delete" type="danger" @click="delAll">批量删除</el-button>
    </div>

    <el-table :data="tableData" border @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="getArticleInfo(scope.row)">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="作者" />
      <el-table-column prop="tags" label="标签" align="center">
        <template #default="scope">
          <el-tag class="tag-item" type="success" v-for="item in scope.row.tag" :key="item.id">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类">
        <template #default="scope">
          <el-tag v-for="item in scope.row.category" :key="item.id">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="创作类型">
        <template #default="scope">
          {{ scope.row.type === 1 ? '原创' : '转载' }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="status" label="发布状态">
        <template #default="scope">
          {{ scope.row.status === '1' ? '已发布' : '未发布' }}
        </template>
      </el-table-column> -->
      <el-table-column prop="link" label="原文链接" />
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
      <el-table-column label="操作" width="120" class-name="table-btn">
        <template #default="scope">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button link type="primary" icon="Edit" @click="edit(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="置顶" placement="top">
            <el-button link type="primary" icon="Upload" />
          </el-tooltip>
          <!-- <el-tooltip effect="dark" content="删除" placement="top">
            <el-button link type="danger" icon="Delete" />
          </el-tooltip> -->
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
          <!-- <el-tooltip effect="dark" content="发布" placement="top">
            <el-button link type="primary" icon="View" />
          </el-tooltip>
          <el-tooltip effect="dark" content="下架" placement="top">
            <el-button link type="danger" icon="SwitchButton" />
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>

    <info-dialog :isShow="infoDialogInfo.isShow" :title="infoDialogInfo.title" :id="infoDialogInfo.id"
      @close="infoClose" />
    <edit-dialog :isShow="editDialogInfo.isShow" :title="editDialogInfo.title" :type="editDialogInfo.type"
      :id="editDialogInfo.id" @close="editClose" />
  </div>
</template>

<script setup>
import { dayjs, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { articleList, articleDel } from '@/api/article'
import editDialog from './components/article-edit.vue'
import infoDialog from './components/article-info.vue'
import { tagListAll } from '../../api/tags'
import { categoryListAll } from '../../api/category'

const articleFormRef = ref(null)

let multipleSelection = ref([])

const editDialogInfo = reactive({
  isShow: false,
  title: '新增文章',
  type: 1
})

const infoDialogInfo = reactive({
  isShow: false
})

let articleForm = reactive({
  name: '',
  tags: [],
  category: '',
  type: '',
  date: null
})

let tableData = ref([])
let tagList = ref([])
let categoryList = ref([])
let query = reactive({
  pageSize: 10,
  pageNum: 1,
  param: {}
})
let page = reactive({
  currentPage: 1,
  total: 0
})
const getList = async query => {
  const { data } = await articleList(query)
  data.data.list.forEach(item => {
    if (item.link) {
      item.link = decodeURIComponent(item.link)
    }
  })
  tableData.value = data.data.list
  page.total = data.data.total
}
const getTagList = async () => {
  const { data } = await tagListAll()
  tagList.value = data.data
}
const getCategoryList = async () => {
  const { data } = await categoryListAll()
  categoryList.value = data.data
}
const search = (param) => {
  page.currentPage = 1
  query.pageNum = 1
  let startTime = ''
  let endTime = ''
  if (param.date && param.date.length) {
    startTime = new Date(param.date[0]).getTime()
    endTime = new Date(param.date[1]).getTime()
  }
  query.param = Object.assign(query.param, param, { startTime, endTime })
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

const addArticle = () => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '新增文章'
  editDialogInfo.type = 1
  editDialogInfo.id = null
}

const getArticleInfo = row => {
  infoDialogInfo.isShow = true
  infoDialogInfo.title = row.title
  infoDialogInfo.id = row.id
}
const edit = row => {
  editDialogInfo.isShow = true
  editDialogInfo.title = '编辑文章'
  editDialogInfo.type = 0
  editDialogInfo.id = row.id
}

const editClose = val => {
  editDialogInfo.isShow = false
  if (val) {
    getList(query)
  }
}

const infoClose = val => {
  infoDialogInfo.isShow = val
}

const selectionChange = val => {
  multipleSelection.value = val
}
const delConfirm = async row => {

  const { data } = await articleDel({ id: row.id })
  ElMessage({
    type: 'success',
    message: data.msg,
  })
  getList(query)
}
const delAll = () => {
  if (multipleSelection.value.length < 1) {
    return ElMessage({
      type: 'warning',
      message: '请选择需要删除的文章',
    })
  }
  const ids = multipleSelection.value.map(item => item.id).join()
  ElMessageBox.confirm(
    '确认删除选中文章?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      delConfirm({ id: ids })
    })

}

onMounted(() => {
  getList(query)
  getTagList()
  getCategoryList()
})
</script>

<style lang="less" scoped>
.btn-list {
  margin-bottom: 15px;
}

.tag-item {
  margin-right: 5px;
}
</style>
