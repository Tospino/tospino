import {main, park} from '@/api/index'
//增加用户浏览记录数据【详情页调用】
export function adduserbrowhistoryApi(params) {
    return park({
        url:`/appbrowserachistory/adduserbrowhistory`,
        method: 'POST',
        data:params
    })
}

//查询用户浏览记录数据【浏览足迹】
export function selectuserbrowhistoryApi(params) {
    return park({
        url:`/appbrowserachistory/selectuserbrowhistory`,
        method: 'POST',
        data:params
    })
}

//查询用户所有浏览时间
export function selectuserbrowhistorydateApi(params) {
    return park({
        url:`/appbrowserachistory/selectuserbrowhistorydate`,
        method: 'POST',
        data:params
    })
}

//删除用户足迹
export function deleteuserbrowhistoryApi(params) {
    return park({
        url:`/appbrowserachistory/deleteuserbrowhistory`,
        method: 'POST',
        data:params
    })
}

//加入收藏夹
export function adduserfavoritesApi(params) {
    return park({
        url:`/appbrowserachistory/adduserfavorites`,
        method: 'POST',
        data:params
    })
}

//收藏夹列表
export function selectuserfavoritesApi(params) {
    return park({
        url:`/appbrowserachistory/selectuserfavorites`,
        method: 'POST',
        data:params
    })
}

//删除收藏
export function deleteuserfavoritesApi(params) {
    return park({
        url:`/appbrowserachistory/deleteuserfavorites`,
        method: 'POST',
        data:params
    })
}