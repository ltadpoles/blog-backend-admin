<template>
  <div class="sidebar">
    <v-logo />
    <el-scrollbar class="menu-scrollbar">
      <el-menu router :default-active="route.path" :unique-opened="true" :collapse="settingStore.isCollapsed">
        <menu-tree :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import MenuTree from '../menu/index.vue'
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
// import { useAuthStore } from '@/stores/modules/auth'
import vLogo from '../logo/index.vue'

const settingStore = useSettingStore()
// const authStore = useAuthStore()

const route = useRoute()

const menu = [
  { path: '/dashboard', icon: 'PieChart', name: '首页', id: '01', children: [] },
  {
    path: '/article', icon: 'Notebook', name: '文章管理', id: '02', children: [
      {
        path: '/article/index', icon: '', name: '文章列表', id: '021', children: []
      }
    ]
  },
  {
    path: '/tags', icon: 'PriceTag', name: '标签管理', id: '03', children: [
      {
        path: '/tags/index', icon: '', name: '标签列表', id: '031', children: []
      }
    ]
  },
  {
    path: '/category', icon: 'CollectionTag', name: '分类管理', id: '04', children: [
      {
        path: '/category/index', icon: '', name: '类别列表', id: '041', children: []
      }
    ]
  },
  {
    path: '/user', icon: 'User', name: '用户管理', id: '05', children: [
      {
        path: '/user/index', icon: '', name: '用户列表', id: '051', children: []
      }
    ]
  },
  {
    path: '/about', icon: 'Warning', name: '关于', id: '06', children: []
  }
]
</script>

<style lang="less" scoped>
.sidebar {
  box-shadow: var(--el-box-shadow);
  height: 100vh;

  .el-menu {
    border: none;
  }

  .menu-scrollbar {
    height: calc(100vh - 68px);
  }
}
</style>
