import {main, park} from '@/api/index'
//添加购物车
export function addshopcartApi(params) {
    return park({
        url:`/apporder/addshopcart`,
        method: 'POST',
        data:params
    })
}
//购物车列表
export function shopcartlistApi(params) {
    return park({
        url:`/apporder/getshopcartlist`,
        method: 'POST',
        data:params
    })
}

//删除购物车商品
export function deleteshopcartApi(params) {
    return park({
        url:`/apporder/deleteshopcartmodel`,
        method: 'POST',
        data:params
    })
}

//清空购物车失效商品
export function emptycartApi(params) {
    return park({
        url:`/apporder/emptycart`,
        method: 'POST',
        data:params
    })
}

//根据商品skuid与商品数量获取优惠价
export function getproductskunumpricelistApi(params) {
    return park({
        url:`/appproduct/getproductskunumpricelist`,
        method: 'POST',
        data:params
    })
}