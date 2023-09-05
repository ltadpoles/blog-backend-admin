<template>
  <div class="about">
    <div class="avator">
      <img :src="userInfo.avatar" alt="头像" />
    </div>
    <div class="user-info">
      <div class="user-info-item">
        <div class="user-info-title">用户名：</div>
        <div>{{ userInfo.username }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-title">昵称：</div>
        <div>{{ userInfo.name }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-title">权限：</div>
        <div>{{ getState(userInfo.state) }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-title">性别：</div>
        <div>{{ userInfo.sex === 1 ? '男' : '女' }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-title">电话：</div>
        <div>{{ userInfo.phone }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-title">邮箱：</div>
        <div>{{ userInfo.email }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-title">地址：</div>
        <div>{{ userInfo.address }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/modules/user'
const userStore = useUserStore()
const { userInfo } = userStore

const getState = (state) => {
  switch (state) {
  case 0:
    return '超级管理员'
  case 1:
    return '管理员'
  case 2:
    return '用户'
  default:
    return '未知用户'
  }
}
</script>

<style lang="less">
.about {
  display: flex;
  justify-content: center;

  .avator {
    img {
      width: 120px;
      height: 120px;
      border-radius: 100%;
    }
  }

  .user-info {
    flex: 1;
    // margin-left: 20px;
    margin-top: 32px;

    .user-info-item {
      display: flex;
      margin-bottom: 15px;

      .user-info-title {
        min-width: 80px;
        width: 80px;
        text-align: right;
        color: var(--el-text-color-regular);
      }
    }
  }


}
</style>
