import {main, park} from '@/api/index'
//收货地址列表
export function useraddresslistApi(params) {
    return park({
        url:`/appusercenter/getuseraddress`,
        method: 'POST',
        data:params
    })
}

//国家城市列表
export function basearealistApi(params) {
    return park({
        url:`/appusercenter/getbasearealist`,
        method: 'POST',
        data:params
    })
}


//添加用户收货地址
export function adduseraddressApi(params) {
    return park({
        url:`/appusercenter/adduseraddress`,
        method: 'POST',
        data:params
    })
}

//删除用户收货地址信息
export function deladdressApi(params) {
    return park({
        url:`/appusercenter/deleteuseraddress`,
        method: 'POST',
        data:params
    })
}

//修改用户收货地址信息
export function updateaddressApi(params) {
    return park({
        url:`/appusercenter/updateuseraddress`,
        method: 'POST',
        data:params
    })
}

//获取用户默认收货地址信息
export function querydefaultObjectApi(params) {
    return park({
        url:`/appusercenter/querydefaultObject`,
        method: 'POST',
        data:params
    })
}

//修改昵称
export function updateusernichengApi(params) {
    return park({
        url:`/appusercenter/updateusernicheng`,
        method: 'POST',
        data:params
    })
}

//获取用户信息
export function getuserinfoApi(params) {
    return park({
        url:`/appusercenter/getuserinfo`,
        method: 'POST',
        data:params
    })
}