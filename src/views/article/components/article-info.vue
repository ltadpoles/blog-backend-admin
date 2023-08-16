<template>
    <v-dialog :isShow="isShow" :title="title" @close="close" fullscreen>
        <div class="article-info">
            <div class="article-info-title">我的第一篇文章</div>
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
.article-info {}
</style>>