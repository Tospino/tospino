<template>
<!-- 支付密码忘记密码 => 输入验证码 -->
    <div class="parrwordOtp">
        <balanceHeader></balanceHeader>
        <div class="parrwordOtp-text">
            <div class="p1 czjz spjz">我们已发送验证码短信到您的手机：</div>
            <div class="p2">{{userinfoShop.mobileCode}} {{userinfoShop.mobile}}</div>
        </div>
        <div class="paymen-content">
            <van-password-input
            :value="value"
            :focused="showKeyboard"
            :length="6"
            info="收短信大约需要59秒"
            @focus="showKeyboard = true"
            :mask="false"
            />
            <!-- 数字键盘 -->
            <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            @blur="showKeyboard = false"
            delete-button-text ='X'
            close-button-text="完成"
            :hide-on-click-outside="false"
            theme='custom'
            @close="wancheng"
            />
            
        </div>
        
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {msglistApi,getverificationcodeApi} from '@/api/login/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            show2:true,
            value: '',
            showKeyboard: true,
            userinfoShop:{},
            formData:{
                msgphone:'',
                types:3,
                areaCode:''
            },
            jiaoyan:{
                msg_phone:'',
                msg_types:'3',
                msg_num:''
            }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        if(localStorage.userinfoShop){
            this.userinfoShop = JSON.parse(localStorage.userinfoShop)
        }
        this.formData.msgphone = this.userinfoShop.mobile
        this.formData.areaCode = this.userinfoShop.mobileCode
        this.msglist(this.formData)
    },
    watch: {

    },
    methods: {
        //实时获取输入值
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        //删除一个
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        //完成按钮
        wancheng(){
            this.jiaoyan.msg_num = this.value
            this.jiaoyan.msg_phone = this.userinfoShop.mobile
            this.getverificationcode(this.jiaoyan)
        },
        //发送短信
        msglist(data){
            msglistApi(data).then(res => {
                if(res.code == 0){

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
        },
        //校验验证码是否正确的接口
        getverificationcode(data){
            getverificationcodeApi(data).then(res => {
                if(res.code == 0){
                   this.$router.push({name:'重置支付密码'})
                }
            })
        }

    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.parrwordOtp{
    border-radius: 0;
    .parrwordOtp-text{
        height: 270px;
        position: relative;
        text-align: center;
        .p1{
            width: 100%;
            position: absolute;
            top:80px;
            font-size:36px;
            color: #666;

        }
        .p2{
            width: 100%;
            position: absolute;
            top:153px;
            font-size:44px;
            color: #333;
            font-weight:bold;
        }
        
    }
    .paymen-content{
        width: 100%;
        height: 800px;
        box-sizing: border-box;
        padding:80px 30px 0;
        position: relative;
        font-size:34px;
        color: #333;
        text-align: center;
        span{
            &:nth-child(2){
                display: inline-block;
                margin-top:39px;
                font-size:30px;
            }
            
        }
        /deep/ .van-password-input__security{
            height: 90px;
            li{
                border:1px solid #999999;
                line-height: 90px;
                font-size: 60px;
            }
        }
        /deep/ .van-password-input__info{
            margin-top:60px;
        }
        /deep/ .van-number-keyboard__body{
            height: 600px;
            .van-hairline{
                height: 148px;
                line-height: 109px;
                font-size: 60px;

            }
            .van-key--extra{
                background-color: #F2F3F5;
            }
        }
        /deep/ .van-number-keyboard__sidebar{
            .van-hairline{
                height: 300px;
                width: 195px;
                top:-386px;
                line-height: 300px;
                font-size: 60px;
           }
            .van-key--delete{
               background-color: #DCDCDC;
               color: #fff;
            }
            .van-key--close{
                background-color: #fff;
                color: #000;

            }
        }
    }
    
}
</style>
