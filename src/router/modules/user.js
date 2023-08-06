/**
 * @description 用户
 */

const route = [
  {
    path: '/user',
    meta: { title: '用户管理' },
    name: 'User',
    redirect: '/user/index',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        meta: { title: '用户列表' },
        component: () => import('@/views/user/index.vue')
      }
    ]
  }
]

export default route