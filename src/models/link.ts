/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum LinkState {
    Pass = 0,
    Audit = 1,
    Outdate = 2,
    Banned = 3,
    Reject = 4
}

export const LinkStateNameMap: Record<keyof typeof LinkState, string> = {
    Pass: '通过',
    Audit: '待审核',
    Outdate: '过时',
    Banned: '屏蔽',
    Reject: '拒绝'
}
