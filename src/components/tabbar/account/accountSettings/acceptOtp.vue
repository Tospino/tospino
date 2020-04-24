<template>
<!-- 更换手机号码 -->
    <div class="accept-otp">
        <settings-header title="验证信息"></settings-header>
        <div class="content">
            <div class="accept-otp-top">
                <div class="top-p1">
                    我们已通过短信方式发送验证码至手机号
                </div>
                <div class="top-p2">
                    +86 15646161665
                </div>
            </div>
            <div class="accept-otp-middle">
                <input type="search" class="input-xt" placeholder="请输入验证码" v-model="verCode">
                <!-- <span class="count-down">Resend after 59s</span> -->
                <div class="count-down">
                    <!-- <div class="count-down-btn">59s后重发</div> -->
                    <div @click="getCode" v-show="countTrue">{{countdown}}</div>
                    <div v-show="!countTrue">{{count}}S</div>
                </div>
            </div>
            <div class="accept-otp-btn">
                确定
            </div>
        </div>
        
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
import {msglistApi} from '@/api/login/index.js'
import { Toast } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            timer: null,
            countdown:'发送验证码',
            count: '',
            countTrue:true,
            verCode:'',
            yzmData:{
                msgphone:'',
                types:'',
                areaCode:'86'
            }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        //倒计时
        getCode(){
            this.msglist(this.yzmData)
        },
        //验证码
        msglist(data){
            msglistApi(data).then(res => {
                if(res.code == 0){
                    const TIME_COUNT = 120;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.countTrue = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.countTrue = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }else if(res.code == 1){
                    Toast('手机号一天不能超于20条短信发送请求')
                }else if(res.code == 2){
                    Toast('发送失败')
                }else if(res.code == -130){
                    Toast('该手机号未注册')
                }else if(res.code == -131){
                    Toast('该手机号已被系统冻结,请联系后台客服')
                }else if(res.code == -132){
                    Toast('该手机号已被系统删除,请联系后台客服')
                }else if(res.code == -133){
                    Toast('该手机号还在审核中,请联系后台客服')
                }else if(res.code == -134){
                    Toast('该手机号未通过审核,请联系后台客服')
                }else{
                    Toast('error')
                }
            })
        }
    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.accept-otp{
    .content{
        padding: 0 30px;
        .accept-otp-top{
            height: 209px;
            box-sizing: border-box;
            padding-top: 59px;
            .top-p1{
                font-size:30px;
                color: #333;
                margin-bottom: 20px;
            }
            .top-p2{
                font-size:32px;
                color: #999;
            }
        }
        .accept-otp-middle{
            height: 88px;
            background-color: #fff;
            line-height: 88px;
            padding: 0 30px;
            position: relative;
            margin-bottom: 40px;
            .input-xt{
                height: 40px;
                border: 0;
                width: 60%;
                background-color: #fff;
                display: inline-block;
                
            }
            .count-down{
                width:220px;
                height:60px;
                background:rgba(220,220,220,1);
                display: inline-block;
                line-height: 60px;
                position: absolute;
                right:30px;
                top:50%;
                transform: translateY(-50%);
                text-align: center;
            }
        }
        .accept-otp-btn{
            width:690px;
            height:88px;
            background:rgba(153,153,153,1);
            line-height: 88px;
            text-align: center;
            font-size:34px;
            color: #fff;
        }
    }
}
</style>
