export const TokenKey = 'mix-admin-token'

export function getToken(): string | null {
    const token = localStorage.getItem(TokenKey)
    return token || null
}

export function setToken(token: string) {
    if (typeof token !== 'string') {
        throw new TypeError('token is not string')
    }
    localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}
