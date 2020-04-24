import {main, park} from '@/api/index'
//获取用户钱包信息
export function walletInfoApi() {
    return park({
        url:`/appWallet/walletInfo`,
        method: 'get',
    })
}
//获取用户充值/消费记录1充值/2消费
export function walletListInfoApi(params,accountType) {
    return park({
        url:`/appWallet/walletListInfo/${accountType}`,
        method: 'POST',
        data:params
    })
}