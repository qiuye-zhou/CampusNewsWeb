import httpApi from "./request"

export function test() {
    return httpApi({
        url: 'test',
        method: 'POST',
    })
}