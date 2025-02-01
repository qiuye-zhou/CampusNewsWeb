/* eslint-disable no-use-before-define */
import { configs } from '../constants/env'
import { router } from './router'

const title = configs.title

// router.beforeEach(async to => {
//     console.log(to)
// })

router.afterEach(to => {
    document.title = getPageTitle(to?.meta.title as string || null)
})

function getPageTitle(pageTitle?: string | null) {
    if (pageTitle) return `${pageTitle} - ${title}`
    return `${title}`
}
