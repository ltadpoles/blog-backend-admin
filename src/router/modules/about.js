/**
 * @description 关于
 */

const route = [
  {
    path: '/about',
    meta: { title: '关于' },
    name: 'About',
    redirect: '/about',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'AboutIndex',
        component: () => import('@/views/about/index.vue')
      }
    ]
  }
]

export default route