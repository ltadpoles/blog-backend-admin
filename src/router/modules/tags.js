/**
 * @description 标签
 */

const route = [
  {
    path: '/tags',
    meta: { title: '标签管理' },
    name: 'Tags',
    redirect: '/tags/index',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'TagsIndex',
        meta: { title: '标签列表' },
        component: () => import('@/views/tags/index.vue')
      }
    ]
  }
]

export default route