/* eslint-disable no-use-before-define */
import { configs } from '../constants/env'
import { router } from './router'

const title = configs.title

// router.beforeEach(async to => {
//     console.log(to)
// })

router.afterEach(to => {
    document.title = getPageTitle(to?.meta.title as string || null, to?.meta.isWeb as boolean || null)
})

function getPageTitle(pageTitle?: string | null, pageisWeb?: boolean | null) {
    if (pageTitle) return `${pageTitle} - ${pageisWeb ? '校园新闻' : title}`
    return `${title}`
}
