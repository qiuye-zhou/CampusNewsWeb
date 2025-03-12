import { RouteRecordRaw } from 'vue-router'

import { RouteName } from './name'

import SetupLayout from '../layout/setup-view.vue'
import WebhomeLayout from '../layout/webhome-view.vue'
import LayRouterView from '../layout/router-view.vue'
import {
    Analyze, Notes, Article, Dashboard, Friends, Maintain, Other, EyeIcon, PencilAltIcon, PuzzlePieceIcon,
    MarkdownIcon, UndoAltIcon, LogIcon
} from '../components/icons'
import { markRaw } from 'vue'
import storage from '~/utils/localstorage'

//管理员menu
export const routeForMenuAdmin: Array<RouteRecordRaw> = [
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
            title: '新闻管理',
            icon: markRaw(Article)
        },
        redirect: '/posts/view?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'view',
                name: RouteName.ViewPost,
                meta: {
                    title: '管理新闻',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-posts/list.vue').then(m => m.default)
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
        path: '/examine',
        name: RouteName.Note,
        meta: {
            title: '审核',
            icon: markRaw(Notes)
        },
        redirect: '/examine/view?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'view',
                name: 'view-examine',
                meta: {
                    title: '待审核',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-examine/list.vue')
            },
            {
                path: 'edit',
                name: RouteName.EditNote,
                meta: {
                    title: '已审核',
                    icon: markRaw(PencilAltIcon)
                },
                component: () => import('../views/manage-examine/edit.vue')
            },
        ]
    },
    {
        path: '/account',
        name: RouteName.Friend,
        meta: {
            title: '帐号管理',
            icon: markRaw(Friends),
            query: { state: '0' }
        },
        component: () => import('../views/manage-account/index.vue')
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
            title: '个人中心',
            icon: markRaw(Other)
        },
        redirect: '/other-features/updateinfo',
        component: LayRouterView,
        children: [
            {
                path: 'updateinfo',
                name: RouteName.Updateinfo,
                meta: {
                    title: '修改信息',
                    icon: markRaw(MarkdownIcon)
                },
                component: () => import('../views/other/update-info.vue')
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

//编辑menu
export const routeForMenuEdit: Array<RouteRecordRaw> = [
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
            title: '新闻管理',
            icon: markRaw(Article)
        },
        redirect: '/posts/view?page=1',
        component: LayRouterView,
        children: [
            {
                path: 'view',
                name: RouteName.ViewPost,
                meta: {
                    title: '管理新闻',
                    icon: markRaw(EyeIcon),
                    query: { page: 1 }
                },
                component: () => import('../views/manage-posts/list.vue').then(m => m.default)
            },
            {
                path: 'edit',
                name: RouteName.EditPost,
                meta: {
                    title: '撰写新闻',
                    icon: markRaw(PencilAltIcon)
                },
                props: true,
                component: () => import('../views/manage-posts/edit.vue')
            }
        ]
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
            title: '个人中心',
            icon: markRaw(Other)
        },
        redirect: '/other-features/updateinfo',
        component: LayRouterView,
        children: [
            {
                path: 'updateinfo',
                name: RouteName.Updateinfo,
                meta: {
                    title: '修改信息',
                    icon: markRaw(MarkdownIcon)
                },
                component: () => import('../views/other/update-info.vue')
            }
        ]
    }
]

export const routeForMenu = storage.get("role") == 'admin' ? routeForMenuAdmin : routeForMenuEdit

export const routeForWebSiteMenu: Array<RouteRecordRaw> = [
    {
        path: '/webhome',
        name: RouteName.Webhome,
        meta: { isPublic: true, title: '首页', isWeb: true },
        component: () => import('../views/website/webhome/index.vue')
    },
    {
        path: '/column',
        name: RouteName.Column,
        meta: { isPublic: true, title: '专栏', isWeb: true },
        redirect: '/column/home',
        children: [
            {
                path: 'home',
                name: RouteName.TagHome,
                meta: { isPublic: true, title: '专栏', isWeb: true },
                component: () => import('../views/website/column/index.vue'),
            },
            {
                path: 'tag',
                name: RouteName.Tag,
                meta: { isPublic: true, title: '专栏', isWeb: true },
                component: () => import('../views/website/column/tag/index.vue')
            },
        ]
    },
    {
        path: '/timeline',
        name: RouteName.Timeline,
        meta: { isPublic: true, title: '时间线', isWeb: true },
        component: () => import('../views/website/timeline/index.vue')
    },
]

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: WebhomeLayout,
        name: RouteName.WebSiteHome,
        redirect: '/webhome',
        children: routeForWebSiteMenu
    },
    {
        path: '/detail',
        component: WebhomeLayout,
        name: RouteName.Detail,
        redirect: '/detail/page?id=1',
        children: [
            {
                path: 'page',
                name: RouteName.Detail,
                meta: { isPublic: true, title: '新闻', isWeb: true },
                component: () => import('../views/website/detail/index.vue')
            }
        ]
    },
    {
        path: '/search',
        component: WebhomeLayout,
        name: RouteName.Search,
        redirect: '/search/result?str=',
        children: [
            {
                path: 'result',
                name: RouteName.Search,
                meta: { isPublic: true, title: '搜索结果', isWeb: true },
                component: () => import('../views/website/search/index.vue')
            }
        ]
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
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: { isPublic: true },
        redirect: '/'
    }
]
