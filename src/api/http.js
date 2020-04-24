import axios from 'axios';
import main from '@/main.js'
import { Toast } from 'vant';
import Qs from 'qs'
//form Data格式
const mainAxios = axios.create({
    timeout: 180000,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    withCredentials: true,
});

const parkAxios = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type':'application/json;charset=utf-8'
    },
    withCredentials: true,
});


// 添加请求拦截器
mainAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        message: 'loading',
        forbidClick: true,
        loadingType: 'spinner',
        duration:180000
      });
    
    return config;

    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加请求拦截器
parkAxios.interceptors.request.use(function (config) {
    if(localStorage.token){
        config.headers.token = localStorage.token; 
    }
    
    // 在发送请求之前做些什么
    Toast.loading({
        message: 'loading',
        forbidClick: true,
        loadingType: 'spinner',
        duration:30000
      });
    config.transformRequest = [function (data) {
        if(config.loading == 'shouyedibu'){
            //首页底部
            if(config.data.page == 1 && config.data.categoryId == 0){
                Toast.clear();
            }
        }else if(config.loading == 'jianadizhi'){
            Toast.clear();
        }
        // 在请求之前对data传参进行格式转换
        data = JSON.stringify(data)
        return data
    }];
    return config;

    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
mainAxios.interceptors.response.use(function (response) {
    let { noError = true } =  response.config

    if (noError) {
        let data = response.data
        if(data.code < 0){
            if(data.code == -1){
                data.msg = "请重新登录"
                setTimeout(()=>{main.$router.replace({name: '登录'})},1000)
            }else if(data.code == -2){
                data.msg = "用户信息不存在,请重新登录"
                setTimeout(()=>{main.$router.replace({name: '登录'})},1000)
            }else if(data.code == -3){
                data.msg = "用户登录信息已失效,请重新登录"
                setTimeout(()=>{main.$router.replace({name: '登录'})},1000)
            }else if(data.code == -4){
                data.msg = "账户不存在或者密码错误,请重新登录"
            }
        }else{
            if (data.code == 500) {
                data.msg = "网络繁忙，请稍后再试！"
                Toast(data.msg);
            }else if(data.code == 0){
                Toast.clear();
            }
        }
        
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    if(error.message == 'timeout of 180000ms exceeded'){
        Toast('超时')
    }else{
        Toast('error');
    }
    if (error.response) {
        console.log(error.response);
        Toast("网络繁忙，请稍后再试！");
    }

    return Promise.reject(error);
});

// 添加响应拦截器
parkAxios.interceptors.response.use(function (response) {
    let { noError = true } =  response.config
    if (noError) {
        let data = response.data
        if(data.code < 0){
            if(data.code == -1){
                data.msg = "请重新登录"
                setTimeout(()=>{main.$router.replace({name: '登录'})},1000)
                if(localStorage.token) {localStorage.removeItem('token')}
            }else if(data.code == -2){
                data.msg = "用户信息不存在,请重新登录"
                setTimeout(()=>{main.$router.replace({name: '登录'})},1000)
                if(localStorage.token) {localStorage.removeItem('token')}
            }else if(data.code == -3){
                data.msg = "用户登录信息已失效,请重新登录"
                setTimeout(()=>{main.$router.replace({name: '登录'})},1000)
                if(localStorage.token) {localStorage.removeItem('token')}
            }else if(data.code == -4){
                data.msg = "账户不存在或者密码错误"
            }
            Toast(data.msg);
        }else{
            if (data.code == 500) {
                data.msg = "网络繁忙，请稍后再试！"
                Toast(data.msg);
            }else if(data.code == 0){
                Toast.clear();
            }else{
                Toast('error');
            }
        }
        
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    if(error.message == 'timeout of 20000ms exceeded'){
        Toast('超时')
    }else{
        Toast('error');
    }
    if (error.response) {
        console.log(error.response);
        Toast("网络繁忙，请稍后再试！");
    }

    return Promise.reject(error);
});

function redirect(){}



export {mainAxios,parkAxios}
