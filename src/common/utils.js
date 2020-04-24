//对象数组的深拷贝
export function objDeepCopy(source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
// 实时监听提交按钮是否可以点击
export function isDisabled(formData, rules) {
    let rulesData = Object.keys(rules)
    let disabled = false
    try {
        rulesData.forEach(item => {            
            if (rules[item].required && (formData[item] == '' || formData[item].length == 0 || formData[item] == null)) {
                disabled = true
                foreach.break = new Error();
            }
        });
    } catch (e) {
        return disabled;
    }
    return disabled
}

// 校验表单
export function formValidate(formData, rules) {
    
    let rulesData = Object.keys(rules)
    
    let errorMassage = { isError: false, message: '' }
    try {
        rulesData.forEach(item => {
            if(rules[item].required && formData[item] == ''){
                errorMassage = { isError: true, message: rules[item].meage}
                foreach.break = new Error();
            }else if (formData[item]!=''&&rules[item].reg&&!formData[item].match(rules[item].reg)) {
                errorMassage = { isError: true, message: rules[item].messages }
                foreach.break = new Error();
            }else if(formData[item] != '' && rules[item].validate){
                rules[item].validate(formData[item],function(){
                    errorMassage = { isError: true, message: rules[item].messages }
                    foreach.break = new Error();
                })
            }
        });
    }catch (e) {
        return errorMassage;
    }
    return errorMassage
}



//字符串去除左右空格
export function strTrim(string){
    return string.replace(/(^\s*)|(\s*$)/g, "");
}

//对象内所有字符串去除左右空格
export function objTrim(obj){
    var trims = {}
    Object.keys(obj).forEach(item=>{
        if(typeof obj[item] == 'string'){
            trims[item] = typeof obj[item] === 'string' ? obj[item].replace(/(^\s*)|(\s*$)/g, ""):"" 
        }else{
            trims[item] = obj[item]
        }
    })
    return trims;
}

//价格字段匹配
export function priceReg(row){
    let price = ""
    if(row.priceXq){
        price = row.priceXq
    }else{
        price = (typeof row.price) == 'object' ? 0 : row.price
    }
    return price
}

export function deepnull(obj){
    for(let k in obj){
        if(typeof obj[k] == 'object'){
            deepnull(obj[k])
        }else if(obj[k] == ''){
            obj[k] = null
        }else{
            obj[k] = null
        }
    }
}

//定时 缓存
export var MyLocalStorage ={		
    Cache : {			
        // /**
        //  * 总容量5M
        //  * 存入缓存，支持字符串类型、json对象的存储
        //  * 页面关闭后依然有效 ie7+都有效
        //  * @param key 缓存key
        //  * @param stringVal
        //  * @time 数字 缓存有效时间（秒） 默认60s 
        //  * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
        //  * */

        //存值
        put : function(key,stringVal,time){
            try{
                if(!localStorage){return false;}
                if(!time || isNaN(time)){time=60;}
                var cacheExpireDate = (new Date()-1)+time*1000;
                var cacheVal = {val:stringVal,exp:cacheExpireDate};
                localStorage.setItem(key,JSON.stringify(cacheVal));//存入缓存值
                //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
            }catch(e){}	
        },
        /**获取缓存*/
        get : function (key){
            try{
                if(!localStorage){return false;}
                var cacheVal = localStorage.getItem(key);
                var result = JSON.parse(cacheVal);
                var now = new Date()-1;
                if(!result){return null;}//缓存不存在
                if(now>result.exp){//缓存过期
                    this.remove(key);					
                    return "";
                }
                //console.log("get cache:"+key);
                return result.val;
            }catch(e){
                this.remove(key);
                return null;
            }
        },/**移除缓存，一般情况不手动调用，缓存过期自动调用*/
        remove : function(key){
            if(!localStorage){return false;}
            localStorage.removeItem(key);
        },/**清空所有缓存*/
        clear : function(){
            if(!localStorage){return false;}
            localStorage.clear();
        }
    }//end Cache
}