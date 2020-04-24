import {main, park} from '@/api/index'
//搜索商品
export function searchGoodApi(params) {
    return park({
        url:`/apphomepage/getkeynamelist`,
        method: 'POST',
        data:params
    })
}

//历史记录
export function searchHistoryApi(params) {
    return park({
        url:`/appbrowserachistory/getsearchnamelist`,
        method: 'POST',
        data:params
    })
}

//搜索商品
export function searchProductApi(params) {
    return park({
        url:`/apphomepage/getproductlist`,
        method: 'POST',
        data:params
    })
}

//搜索发现
export function searchFindApi(params) {
    return park({
        url:`/appbrowserachistory/getsearchhistory`,
        method: 'POST',
        data:params
    })
}

//删除所有历史记录
export function delHistoryApi(params) {
    return park({
        url:`/appbrowserachistory/deletesearchname`,
        method: 'POST',
        data:params
    })
}

//猜你喜欢
export function guessyoulikeApi(params) {
    return park({
        url:`/apporder/guessyoulike`,
        method: 'POST',
        data:params
    })
}