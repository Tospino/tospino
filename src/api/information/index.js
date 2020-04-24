import {main, park} from '@/api/index'
//消息列表
export function getsystemmesgApi(params) {
    return park({
        url:`/appusercenter/getsystemmesg`,
        method: 'POST',
        data:params
    })
}
//消息详情
export function getsystemmesgmodelApi(params) {
    return park({
        url:`/appusercenter/getsystemmesgmodel`,
        method: 'POST',
        data:params
    })
}