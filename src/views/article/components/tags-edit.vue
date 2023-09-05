<template>
  <div>
    <v-dialog :title="title" :isShow="isShow" @close="close">
      <el-form ref="tagsFormRef" :model="tagsForm" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagsForm.name" placeholder="请输入标签名称" maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="tagsForm.status" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="tagsForm.description" type="textarea" show-word-limit placeholder="请输入标签描述" maxlength="30" />
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel(tagsFormRef)">取消</el-button>
          <el-button type="primary" @click="submit(tagsFormRef)" :loading="loading">
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>
<script setup>
import vDialog from '@/components/dialog/index.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { tagAdd } from '@/api/tags'

defineProps({
  title: String,
  id: String,
  isShow: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const tagsFormRef = ref(null)

let loading = ref(false)
let tagsForm = reactive({
  name: '',
  status: true,
  description: ''
})

const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
  ]
}

const close = val => {
  emit('close', val)
}

const cancel = formEl => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
  close()
}

const submit = async (formEl) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      tagAdd({ ...tagsForm, status: tagsForm.status ? 1 : 0 }).then(res => {
        ElMessage({
          message: '操作成功',
          type: 'success',
        })
        close(true)
      }).finally(() => {
        loading.value = false
      })
    } else {
      Promise.reject(fields)
    }
  })
}

</script>
<style lang="less" scoped></style>