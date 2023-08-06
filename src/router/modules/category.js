/**
 * @description 文章类别
 */

const route = [
  {
    path: '/category',
    meta: { title: '类别管理' },
    name: 'Category',
    redirect: '/category/index',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'CategoryIndex',
        meta: { title: '类别列表' },
        component: () => import('@/views/category/index.vue')
      }
    ]
  }
]

export default route