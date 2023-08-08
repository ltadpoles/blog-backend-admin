/**
 * @description 系统管理
 */

const route = [
    {
        path: '/system',
        meta: { title: '系统管理' },
        name: 'System',
        redirect: '/system/user',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: 'user',
                name: 'SystemUser',
                meta: { title: '用户管理' },
                component: () => import('@/views/system/user.vue')
            }
        ]
    }
]

export default route