import { RouteRecordRaw } from 'vue-router'

import { RouteName } from './name'

import SidebarLayout from '../layout/sidebar/index.vue'
import SetupLayout from '../layout/setup-view.vue'
import LayRouterView from '../layout/router-view.vue'
import {
    Analyze, Notes, Article, Dashboard, Files, Friends, Maintain, Other,
    Pages, Projects, EyeIcon, PencilAltIcon, PuzzlePieceIcon, TopicIcon,
    MarkdownIcon, UndoAltIcon, LogIcon
} from '../components/icons'
import { markRaw } from 'vue'

export const routeForMenu: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        component: () => import('../views/dashboard/index.vue'),
        name: RouteName.Dashboard,
        meta: {
            title: '仪表盘',
            icon: markRaw(Dashboard)
        }
    },
    {
        path: '/posts',
        name: RouteName.Post,
        meta: {
            title: '博文',
            icon: markRaw(Article)
        },
        redirect: '/posts/view?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'view',
                name: RouteName.ViewPost,
                meta: {
                    title: '管理文章',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-posts/list.vue').then(m => m.default)
            },
            {
                path: 'edit',
                name: RouteName.EditPost,
                meta: {
                    title: '撰写文章',
                    icon: markRaw(PencilAltIcon)
                },
                props: true,
                component: () => import('../views/manage-posts/edit.vue')
            },
            {
                path: 'category',
                name: RouteName.EditCategory,
                meta: {
                    title: '分类 / 标签',
                    icon: markRaw(PuzzlePieceIcon)
                },
                component: () => import('../views/manage-posts/category.vue')
            }
        ]
    },
    {
        path: '/notes',
        name: RouteName.Note,
        meta: {
            title: '记录',
            icon: markRaw(Notes)
        },
        redirect: '/notes/view?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'view',
                name: 'view-notes',
                meta: {
                    title: '管理记录',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-notes/list.vue')
            },
            {
                path: 'edit',
                name: RouteName.EditNote,
                meta: {
                    title: '撰写记录',
                    icon: markRaw(PencilAltIcon)
                },
                component: () => import('../views/manage-notes/edit.vue')
            },
            {
                path: 'topic',
                name: RouteName.Topic,
                meta: {
                    title: '专栏',
                    icon: markRaw(TopicIcon)
                },
                component: () => import('../views/manage-notes/topic.vue')
            }
        ]
    },
    {
        path: '/pages',
        name: RouteName.Page,
        meta: {
            title: '页面',
            icon: markRaw(Pages)
        },
        redirect: '/pages/list?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'list',
                name: RouteName.ListPage,
                meta: {
                    title: '管理页面',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-pages/list.vue')
            },
            {
                path: 'edit',
                name: RouteName.EditPage,
                meta: {
                    title: '编辑页面',
                    icon: markRaw(PencilAltIcon)
                },
                component: () => import('../views/manage-pages/edit.vue')
            }
        ]
    },
    {
        path: '/projects',
        name: RouteName.Project,
        meta: {
            title: '项目',
            icon: markRaw(Projects)
        },
        redirect: '/projects/list?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'list',
                name: RouteName.ListProject,
                meta: {
                    title: '项目列表',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-project/list.vue')
            },
            {
                path: 'edit',
                name: RouteName.EditProject,
                meta: {
                    title: '创建项目',
                    icon: markRaw(PencilAltIcon)
                },
                component: () => import('../views/manage-project/edit.vue')
            }
        ]
    },
    {
        path: '/friends',
        name: RouteName.Friend,
        meta: {
            title: '朋友们',
            icon: markRaw(Friends),
            query: { state: '0' }
        },
        component: () => import('../views/manage-friends/index.vue')
    },
    {
        path: '/files',
        name: RouteName.File,
        meta: {
            title: '文件',
            icon: markRaw(Files)
        },
        component: () => import('../views/manage-files/index.vue')
    },
    {
        path: '/analyze',
        name: RouteName.Analyze,
        meta: {
            title: '数据',
            icon: markRaw(Analyze),
            query: { page: 1 }
        },
        component: () => import('../views/analyze/index.vue')
    },
    {
        path: '/other-features',
        name: RouteName.Other,
        meta: {
            title: '附加功能',
            icon: markRaw(Other)
        },
        redirect: '/other-features/markdown',
        component: LayRouterView,
        children: [
            {
                path: 'markdown',
                name: RouteName.Markdown,
                meta: {
                    title: 'Markdown 导入导出',
                    icon: markRaw(MarkdownIcon)
                },
                component: () => import('../views/other/markdown-helper.vue')
            }
        ]
    },
    {
        path: '/maintain',
        name: RouteName.Maintain,
        meta: {
            title: '维护',
            icon: markRaw(Maintain)
        },
        redirect: '/maintain/backup',
        component: LayRouterView,
        children: [
            {
                path: 'backup',
                name: RouteName.Backup,
                meta: {
                    title: '备份',
                    icon: markRaw(UndoAltIcon)
                },
                component: () => import('../views/maintain/backup.vue')
            },

            {
                path: 'log',
                name: RouteName.Log,
                meta: {
                    title: '日志',
                    icon: markRaw(LogIcon)
                },
                component: () => import('../views/maintain/log.vue')
            }
        ]
    }
]

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: SidebarLayout,
        name: RouteName.Home,
        redirect: '/dashboard',
        children: [...routeForMenu]
    },
    {
        path: '/',
        component: SetupLayout,

        children: [
            {
                path: '/login',
                name: RouteName.Login,
                meta: { isPublic: true, title: '登录' },
                component: () => import('../views/login/index.vue')
            },
            {
                path: '/setup',
                name: RouteName.Setup,
                meta: { isPublic: true, title: '初始化' },
                component: () => import('../views/setup/index.vue')
            },
            {
                path: '/setup-api',
                name: RouteName.SetupApi,
                meta: { isPublic: true, title: '设置接口地址' },
                component: () => import('../views/setup-api/index.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: { isPublic: true },
        redirect: '/'
    }
]
