/**
 * @description 消息管理
 */

const route = [
    {
        path: '/message',
        meta: { title: '消息管理' },
        name: 'Message',
        redirect: '/message/comment',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: 'comment',
                name: 'MessageComment',
                meta: { title: '留言管理' },
                component: () => import('@/views/message/comment.vue')
            }
        ]
    }
]

export default route