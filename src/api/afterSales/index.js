import {main, park} from '@/api/index'
//售后列表
export function backorderlistApi(params) {
    return park({
        url:`/appsaleorder/backorderlist`,
        method: 'POST',
        data:params
    })
}

//售后详情
export function backorderinfoApi(params) {
    return park({
        url:`/appsaleorder/backorderinfo`,
        method: 'POST',
        data:params
    })
}

//撤销申请
export function revokebackorderApi(params) {
    return park({
        url:`/appsaleorder/revokebackorder`,
        method: 'POST',
        data:params
    })
}