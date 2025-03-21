import httpApi from '~/api/request'
import { NewModelType } from './type'

//category api>>>
export function getAllCategory() {
    return httpApi({
        url: '/category/all',
        method: "GET"
    })
}

export function addCategory(data: any) {
    return httpApi({
        url: '/category/add',
        method: "POST",
        data
    })
}

export function deleteCategory(id: string) {
    return httpApi({
        url: `/category/${id}`,
        method: "DELETE"
    })
}
//category api<<<

//list api>>>
export function getAllPass() {
    return httpApi({
        url: '/news/allpass',
        method: "GET"
    })
}

export function deleteNew(id: string) {
    return httpApi({
        url: `/news/${id}`,
        method: "DELETE"
    })
}
//list api<<<

//edit api>>>
export function getAllEditPass() {
    return httpApi({
        url: '/news/alleditpass',
        method: "GET"
    })
}

export function getAllPendingPass() {
    return httpApi({
        url: '/news/allpendingpass',
        method: "GET"
    })
}

export function getAllCategorySelect() {
    return httpApi({
        url: '/category/allselect',
        method: "GET"
    })
}

export function addNew(data: NewModelType) {
    return httpApi({
        url: '/news/add',
        method: "POST",
        data
    })
}
//edit api<<<