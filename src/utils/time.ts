import { format } from 'date-fns'

export enum DateFormat {
    'yyyy 年 M 月 d 日',
    'yyyy 年 M 月 d 日 HH:mm:ss',
    'HH:mm',
  }
  
export const parseDate = (
    time: string | Date,
    formattype: keyof typeof DateFormat = 'yyyy 年 M 月 d 日',
) => {
    const date = new Date(time)
    if (isNaN(date as any)) return 'N/A'
    return format(date, formattype)
}