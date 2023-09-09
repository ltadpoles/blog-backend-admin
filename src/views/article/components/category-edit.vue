<template>
  <div>
    <v-dialog :title="title" :isShow="isShow" @close="close" @open="open">
      <el-form ref="categoryFormRef" :model="categoryForm" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入类别名称" maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="categoryForm.status" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="categoryForm.description"
                    type="textarea"
                    show-word-limit
                    placeholder="请输入类别描述"
                    maxlength="30" />
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel(categoryFormRef)">取消</el-button>
          <el-button type="primary" @click="submit(categoryFormRef)" :loading="loading">
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
import { categoryAdd, categoryUpdate } from '@/api/category'

const props = defineProps({
  title: String,
  info: Object,
  type: Number,
  isShow: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const categoryFormRef = ref(null)

let loading = ref(false)
let categoryForm = reactive({
  name: '',
  status: true,
  description: ''
})

const rules = {
  name: [
    { required: true, message: '请输入类别名称', trigger: 'blur' },
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

const open = () => {
  if (props.type) {
    categoryForm.name = ''
    categoryForm.status = true
    categoryForm.description = ''
  } else {
    categoryForm = Object.assign(categoryForm, props.info)
    categoryForm.status = props.info.status ? true : false
  }

}

const submit = async (formEl) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      if (props.type) {
        categoryAdd({ ...categoryForm, status: categoryForm.status ? 1 : 0 }).then(res => {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
          close(true)
          formEl.resetFields()
        }).finally(() => {
          loading.value = false
        })
      } else {
        categoryUpdate({ ...categoryForm, status: categoryForm.status ? 1 : 0, id: props.info.id }).then((res) => {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
          close(true)
          formEl.resetFields()
        }).finally(() => {
          loading.value = false
        })
      }
    } else {
      Promise.reject(fields)
    }
  })
}

</script>
<style lang="less" scoped></style>