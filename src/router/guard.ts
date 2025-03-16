/* eslint-disable no-use-before-define */
import storage from '~/utils/localstorage'
import { configs } from '../constants/env'
import { router } from './router'
import { TokenKey } from '~/utils/token'

const title = configs.title

const regex = /^(webhome|home|tag|taghome|timeline|detail|search)$/;

router.beforeEach((to, _from, next) => {
    const token = storage.get(TokenKey)
    const toname = to.name?.toString() ?? ''
    if (regex.test(toname)) {
        next()
    } else {
        if (!token && toname !== 'login') {
            next({ name: 'login' })
        } else {
            if (toname === 'login' && token) {
                next({ name: 'dashboard' })
            } else {
                next()
            }
        }
    }
})

router.afterEach(to => {
    document.title = getPageTitle(to?.meta.title as string || null, to?.meta.isWeb as boolean || null)
})

function getPageTitle(pageTitle?: string | null, pageisWeb?: boolean | null) {
    if (pageTitle) return `${pageTitle} - ${pageisWeb ? '校园新闻' : title}`
    return `${title}`
}
