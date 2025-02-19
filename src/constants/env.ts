// eslint-disable-next-line unicorn/prevent-abbreviations
export const API_URL = (() => {
    const url = localStorage.getItem('__api')
      || (import.meta.env.VITE_APP_BASE_API as string)
      || 'http://localhost:2666'

    return url.endsWith('/') ? url.slice(0, -1) : url
})()

export const GATEWAY_URL = localStorage.getItem('__gateway')
  || import.meta.env.VITE_APP_GATEWAY
  || ''

export const bgUrl = (import.meta.env.VITE_APP_LOGIN_BG as string)
  || localStorage.getItem('LOGIN_BG')
  || '../../public/img/loginbg.png'

export const avatarUrl = ('/img/avatarUrl.png')

export const configs = {
    title: '校园新闻管理平台'
}
