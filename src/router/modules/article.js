/**
 * @description 文章管理
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
        meta: { title: '文章管理' },
        component: () => import('@/views/article/index.vue')
      },
      {
        path: 'tags',
        name: 'ArticleTags',
        meta: { title: '标签管理' },
        component: () => import('@/views/article/tags.vue')
      },
      {
        path: 'category',
        name: 'ArticleCategory',
        meta: { title: '类别管理' },
        component: () => import('@/views/article/category.vue')
      },
    ]
  }
]

export default route