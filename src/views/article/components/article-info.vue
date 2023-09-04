<template>
  <v-dialog :isShow="isShow" :title="title" @close="close" fullscreen>
    <div class="article-info">
      <div class="flex-center">
        <div class="article-info-header">
          <el-space wrap>
            <el-tag>技术研究</el-tag>
            <el-tag type="success">vue</el-tag>
            <el-tag type="success">javaScript</el-tag>
            <span>发布于 2023-2-18</span>
          </el-space>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>

import vDialog from '@/components/dialog/index.vue'

defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  title: String
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close', false)
}
</script>

<style lang="less" scoped>
.article-info {
    display: flex;
    justify-content: center;
    padding: 30px 0;

    .flex-center {
        min-width: 860px;
        max-width: 860px;
        width: 860px;
    }

    .article-info-header {
        color: var(--el-text-color-secondary);
    }
}
</style>>