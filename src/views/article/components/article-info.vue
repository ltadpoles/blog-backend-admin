<template>
  <v-dialog :isShow="isShow" :title="title" @close="close" @open="open" fullscreen>
    <div class="article-info">
      <div class="flex-center">
        <div class="article-info-header">
          <el-space wrap>
            <el-tag v-for="item in info.category" :key="item.id">{{ item.name }}</el-tag>
            <el-tag type="success" v-for="item in info.tag" :key="item.id">{{ item.name }}</el-tag>
            <span>发布于 {{ dayjs(info.createTime).format('YYYY-MM-DD HH:DD:ss') }}</span>
          </el-space>
        </div>
      </div>

      <div class="editor-content">
        <v-md-editor v-model="info.content" mode="preview" default-show-toc :include-level="[1, 2, 3, 4]" />
      </div>

    </div>
  </v-dialog>
</template>

<script setup>
import { articleInfo } from '@/api/article'
import vDialog from '@/components/dialog/index.vue'
import { dayjs } from 'element-plus';
import { reactive } from 'vue'

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  title: String,
  id: Number
})

let info = reactive({
  title: '',
  category: [],
  content: '',
  createTime: '',
  createUser: '',
  createUserName: '',
  id: '',
  image: '',
  like: '',
  link: '',
  operator: '',
  operatorName: '',
  publishTime: '',
  status: '',
  tag: [],
  type: '',
  updateTime: ''
})

const getInfo = async id => {
  const { data } = await articleInfo({ id })
  info = Object.assign(info, data.data)
}

const emit = defineEmits(['close'])
const close = () => {
  emit('close', false)
}
const open = () => {
  resetData(info)
  console.log(info)
  getInfo(props.id)
}

const resetData = (data) => {
  const keys = Object.keys(data)
  let obj = {}
  keys.forEach((item) => {
    obj[item] = (typeof obj[item]) === 'object' ? (Array.isArray(obj[item]) ? [] : {}) : ''
  })
  Object.assign(data, obj)
};

</script>

<style lang="less" scoped>
.article-info {
  padding: 30px 0;

  .flex-center {
    min-width: 860px;
    max-width: 860px;
    width: 860px;
  }

  .editor-content {
    margin-top: 20px;
  }

  .article-info-header {
    color: var(--el-text-color-secondary);
  }
}
</style>>