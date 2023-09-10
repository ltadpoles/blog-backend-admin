<template>
  <v-dialog :isShow="isShow" :title="title" @close="close" fullscreen>
    <div class="article-edit">
      <div class="article-edit-head">
        <div class="article-edit-head-left">
          <div class="article-title article-flex margin-b10">
            <span class="article-item-title">标题：</span>
            <el-input v-model="info.title" placeholder="请输入标题" maxlength="30" show-word-limit clearable />
          </div>
          <div class="article-flex margin-b10">
            <div class="article-flex margin-r10">
              <span class="article-item-title">标签：</span>
              <el-tag class="margin-r10" closable type="success" v-for="item in tags" :key="item.id"
                @close="tagClose(item)">
                {{ item.name }}
              </el-tag>
              <el-tooltip placement="bottom-end" effect="light" trigger="click" v-if="tags.length < 3">
                <template #content>
                  <div class="list-sty">
                    <!-- <div class="type-search">
                      <span class="search-title">标签：</span>
                      <el-input v-model="tagSearch" placeholder="请输入标签名称" />
                    </div> -->
                    <div class="add-sty">添加标签：</div>
                    <div class="tag-list">
                      <el-tag class="tag-item" type="success" @click="addTag(item)" v-for="item in tagsAll"
                        :key="item.id">
                        {{ item.name }}
                      </el-tag>
                    </div>
                  </div>
                </template>
                <el-button plain size="small">添加标签</el-button>
              </el-tooltip>
            </div>
            <div class="article-flex">
              <span class="article-item-title">分类：</span>
              <el-tag class="margin-r10" closable v-for="item in categorys" :key="item.id" @close="categoryClose(item)">{{
                item.name }}</el-tag>
              <el-tooltip placement="bottom-end" effect="light" trigger="click" v-if="categorys.length < 1">
                <template #content>
                  <div class="list-sty">
                    <!-- <div class="type-search">
                      <span class="search-title">分类：</span>
                      <el-input v-model="categorySearch" placeholder="请输入分类名称" />
                    </div> -->
                    <div class="add-sty">添加分类：</div>
                    <div class="tag-list">
                      <el-tag class="tag-item" @click="addCategory(item)" v-for="item in categoryAll" :key="item.id">
                        {{ item.name }}
                      </el-tag>
                    </div>
                  </div>
                </template>
                <el-button plain size="small">添加分类</el-button>
              </el-tooltip>
            </div>
          </div>

          <div class="article-flex margin-b10">
            <div class="article-flex margin-r10">
              <span class="article-item-title">创作类型：</span>
              <el-select v-model="info.type" clearable placeholder="请选择创作类型">
                <el-option label="原创" value="1" />
                <el-option label="转载" value="2" />
              </el-select>
            </div>
            <div class="article-flex ">
              <span class="article-item-title">原文链接：</span>
              <el-input v-model="info.link" placeholder="请输入原文链接" clearable />
            </div>
          </div>
        </div>
        <div class="article-edit-head-right article-flex">
          <span class="article-item-title">标题图：</span>
          <v-upload className="upload-sty" :limit="1" list-type="picture-card" :isShowFileList="false" />
        </div>
      </div>

      <div class="article-editor">
        <v-md-editor v-model="info.text" :height="editorHeight" @save="save" />
      </div>

      <div class="article-edit-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary" @click="publish">发布</el-button>
      </div>
    </div>
  </v-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { tagListAll } from '@/api/tags'
import { categoryListAll } from '@/api/category'
import vDialog from '@/components/dialog/index.vue'
import vUpload from '@/components/upload/index.vue'

defineProps({
  title: String,
  isShow: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: '0'
  }
})

const emit = defineEmits(['close'])

let tags = ref([])
let tagsAll = ref([])
let categoryAll = ref([])
let categorys = ref([])

let editorHeight = ref('400px')

const info = reactive({
  title: ''
})

const close = () => {
  emit('close', false)
}

const getTagsList = async (param = {}) => {
  const { data } = await tagListAll(param)
  tagsAll.value = data.data
}
const addTag = item => {
  const isAdd = tags.value.some(tag => tag.id === item.id)
  if (!isAdd) {
    tags.value.push(item)
  }
}
const tagClose = (item) => {
  const index = tags.value.findIndex(tag => tag.id === item.id)
  tags.value.splice(index, 1)
}

const getCategoryList = async (param = {}) => {
  const { data } = await categoryListAll(param)
  categoryAll.value = data.data
}
const addCategory = item => {
  const isAdd = categorys.value.some(category => category.id === item.id)
  if (!isAdd) {
    categorys.value.push(item)
  }
}
const categoryClose = (item) => {
  const index = categorys.value.findIndex(category => category.id === item.id)
  categorys.value.splice(index, 1)
}

const save = (val, html) => { }
const submit = () => { }
const publish = () => { }

onMounted(() => {
  editorHeight.value = document.documentElement.clientHeight - 320 + 'px'
  getTagsList()
  getCategoryList()
})
</script>
<style lang="less" scoped>
.article-edit {

  .article-edit-head {
    display: flex;
  }

  .article-edit-head-left {
    flex: 1;
  }

  .article-flex {
    display: flex;
    align-items: center;

    .article-item-title {
      min-width: 72px;
      width: 72px;
      text-align: right;
    }
  }

  .article-edit-head-right {
    width: 240px;
    min-width: 240px;
    align-items: flex-start;
  }

  .margin-r10 {
    margin-right: 10px;
  }

  .margin-b10 {
    margin-bottom: 10px;
  }

  .el-upload--picture-card {
    height: 100px;
  }

  .article-editor {
    margin-top: 20px;
  }

  .article-edit-footer {
    text-align: center;
    margin-top: 32px;
  }
}


.list-sty {
  padding: 10px 0;
  max-width: 420px;
  min-width: 420px;
  width: 420px;

  .add-sty {
    padding: 10px 0;
  }

  .tag-list {
    .tag-item {
      margin-right: 8px;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }

  .type-search {
    display: flex;
    align-items: center;

    .search-title {
      width: 40px;
      min-width: 40px;
    }
  }
}
</style>

<style lang="less">
.upload-sty {
  .el-upload--picture-card {
    height: 100px;
  }
}
</style>