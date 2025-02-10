/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RouteRecordNormalized } from 'vue-router'

type TRouteRecordNormalized = Omit<RouteRecordNormalized, 'meta'> & {
    meta?: {
      query?: string
      params?: string
      title?: string
      icon?: any
      [key: string]: any
    }
}
export interface MenuModel {
    title: string
    icon: any
    path: string
    subItems?: Array<MenuModel>
    fullPath: string
    query?: any
}

const parsePath = (path: string, parameters?: any) => {
    let n = /^\//.test(path) ? path : `/${path}`
    const hasParameters = n.match(/(\/?:)/)
    if (!hasParameters) {
        return n
    }
    if (!parameters || Object.prototype.toString.call(parameters) !== '[object Object]') {
        throw new TypeError('params must be object')
    }
    // eslint-disable-next-line guard-for-in
    for (const parameterKey in parameters) {
        n = n.replaceAll(`:${parameterKey}`, parameters[parameterKey])
    }
    return n
}

function buildSubMenus(route: TRouteRecordNormalized, previousPath = '') {
    if (Array.isArray(route.children)) {
        return route.children
            .map(item => {
                return buildModel(item as TRouteRecordNormalized, previousPath)
            })
    }
    return []
}

const buildModel = (
    item: TRouteRecordNormalized,
    previousPath: string
): MenuModel => {
    const path = parsePath(item.path, item.meta?.params)

    const fullPath = `${previousPath}/${path}`

    return {
        title: (item.meta?.title as string) || item.name?.toString() || path,
        icon: item.meta?.icon as any,
        path,
        subItems: buildSubMenus(item, fullPath),
        fullPath: fullPath.replaceAll('//', '/'),
        query: item.meta?.query
    }
}

// 管理平台menus
export const buildMenus = (
    routes: Array<TRouteRecordNormalized>
): MenuModel[] =>
    (
      routes.find(item => item.name === 'home') as any
    ).children
        .map((item: TRouteRecordNormalized) => {
            return buildModel(item, '')
        })

// 新闻展示网站menus
export const buildWebSiteMenus = (
    routes: Array<TRouteRecordNormalized>
): MenuModel[] =>
    (
        routes.find(item => item.name === 'websitehome' && item.path === '/') as any
    ).children
        .map((item: TRouteRecordNormalized) => {
            return buildModel(item, '')
        })