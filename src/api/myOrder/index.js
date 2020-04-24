import {main, park} from '@/api/index'
//订单列表
export function orderlistApi(params) {
    return park({
        url:`/appsaleorder/orderlist`,
        method: 'POST',
        data:params
    })
}

//订单详情
export function orderinfoApi(params) {
    return park({
        url:`/appsaleorder/orderinfo`,
        method: 'POST',
        data:params
    })
}

//取消订单
export function revokeorderApi(params) {
    return park({
        url:`/appsaleorder/revokeorder`,
        method: 'POST',
        data:params
    })
}

//订单发起支付
export function orderlaunchpayApi(params) {
    return park({
        url:`/appsaleorder/orderlaunchpay`,
        method: 'POST',
        data:params
    })
}

//支付方式列表
export function getonlinepaytypelistApi(params) {
    return park({
        url:`/appsaleorder/getonlinepaytypelist`,
        method: 'POST',
        data:params
    })
}

//订单申请仅退款页面获取订单和订单商品明细
export function getconfirmrefundorderApi(params) {
    return park({
        url:`/appsaleorder/getconfirmrefundorder`,
        method: 'POST',
        data:params
    })
}

//订单申请仅退款
export function refundorderApi(params) {
    return park({
        url:`/appsaleorder/refundorder`,
        method: 'POST',
        data:params
    })
}

//获取订单的物流（包裹）信息
export function getlogisticsorderApi(params) {
    return park({
        url:`/appsaleorder/getlogisticsorder`,
        method: 'POST',
        data:params
    })
}

//订单申请仅退款（通过物流包裹申请）页面获取订单和订单商品明细
export function getconfirmrefundorderbylogisticsApi(params) {
    return park({
        url:`/appsaleorder/getconfirmrefundorderbylogistics`,
        method: 'POST',
        data:params
    })
}

//订单按包裹申请仅退款
export function refundorderbylogisticsApi(params) {
    return park({
        url:`/appsaleorder/refundorderbylogistics`,
        method: 'POST',
        data:params
    })
}

//订单申请退货退款页面获取订单和订单商品明细
export function getconfirmreturnorderApi(params) {
    return park({
        url:`/appsaleorder/getconfirmreturnorder`,
        method: 'POST',
        data:params
    })
}
//订单申请退货退款
export function returnorderApi(params) {
    return park({
        url:`/appsaleorder/returnorder`,
        method: 'POST',
        data:params
    })
}

//订单订单确认收货
export function completeorderApi(params) {
    return park({
        url:`/appsaleorder/completeorder`,
        method: 'POST',
        data:params
    })
}