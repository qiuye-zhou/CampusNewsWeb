export interface UserModel {
    id: string
    created: Date
    code: number
    username: string
    name: string
    mail: string
    password: string
    url: string
    avatar: string
    socialIds?: Record<string, string | number>
    lastLoginTime: string
    lastLoginIp?: string
  }
