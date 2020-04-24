import {main, park} from '@/api/index'
//分类列表
export function procategorylistApi(params) {
    return park({
        url:`/appproduct/getprocategorylist`,
        method: 'POST',
        data:params
    })
}