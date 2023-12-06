<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">{{ item.meta?.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { watch, ref, toRaw } from 'vue'
import { deepClone } from '@/utils'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadCrumbList = ref([])

watch(
  () => route.path,
  () => {
    let arr = deepClone(toRaw(route.matched))
    let index = arr.findIndex(item => !item.meta.title)

    if (index > -1) {
      arr.splice(index, 1)
    }
    breadCrumbList.value = arr
  },
  { immediate: true, deep: true }
)
</script>
