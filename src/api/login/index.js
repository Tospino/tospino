import {main, park} from '@/api/index'
//登录
export function loginApi(params) {
    return park({
        url:'/h5login/h5/login',
        method: 'POST',
        data:params
    })
}

//手机验证码
export function msglistApi(params) {
    return park({
        url:'/msginfo/msg/msglist',
        method: 'POST',
        data:params
    })
}


//校验验证码是否正确的接口
export function getverificationcodeApi(params) {
    return park({
        url:'/h5login/getverificationcode',
        method: 'POST',
        data:params
    })
}

//找回登录密码支付密码
export function setretrievepasswordApi(params) {
    return park({
        url:'/h5login/setretrievepassword',
        method: 'POST',
        data:params
    })
}

//设置支付密码
export function setuserpaypasswordApi(params) {
    return park({
        url:'/appusercenter/setuserpaypassword',
        method: 'POST',
        data:params
    })
}

//用户修改登录或支付密码
export function updateuserpaypasswordApi(params) {
    return park({
        url:'/appusercenter/updateuserpaypassword',
        method: 'POST',
        data:params
    })
}
//登出
export function logoutApi(params) {
    return park({
        url:'/appusercenter/logout',
        method: 'POST',
        data:params
    })
}


//返回图片服务器的路径
export function gethttpimgurlApi(params) {
    return park({
        url:'/h5login/gethttpimgurl',
        method: 'POST',
        data:params,
        loading:'jianadizhi'
    })
}

//获取站点的国家语言信息
export function getcountryWebUrlApi(params) {
    return park({
        url:'/h5login/getcountryWebUrl',
        method: 'POST',
        data:params,
    })
}