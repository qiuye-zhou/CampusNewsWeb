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
  || 'https://z1.ax1x.com/2023/10/03/pPOF326.png'

export const avatarUrl = ('https://z1.ax1x.com/2023/10/21/pikAnkd.png')

export const configs = {
    title: 'mix admin'
}
