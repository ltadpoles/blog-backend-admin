/**
 * @description 文章
 */

const route = [
  {
    path: '/article',
    meta: { title: '文章管理' },
    name: 'Article',
    redirect: '/article/index',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'ArticleIndex',
        meta: { title: '文章列表' },
        component: () => import('@/views/article/index.vue')
      }
    ]
  }
]

export default route