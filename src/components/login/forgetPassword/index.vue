<template>
<!-- 忘记密码 -->
  <div class="forget-password">
        <navar title="忘记密码"></navar>
        <div class="footer">
            <p>输入与您的TOSPINO账户相关联的电子邮箱地址或者手机号码</p>
            <div class="otp">
                <div class="input-con">
                    <input type="number" class="name-input" placeholder="+86 请输入您的手机号码" v-model="formData.msgphone">
                </div>
                
            </div>
            <div class="confirm-btn">
                <div class="load-btn" @click="next" :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">
                    下一步
                </div>
            </div>
            <p class="fs-26">您是否修改过邮箱地址或者手机号码?</p>
            <p class="fs-20">如果您不再使用与您的TOSPINO账户相关联的电子邮箱地址或者手机号码,可以联系客户服务帮助您恢复账号的访问.</p>
        </div>
  </div>
</template>

<script>
import navar from '@/multiplexing/navar'
export default {
    data () {
        return {
            formData:{
                msgphone:''
            },
            rules:{
                msgphone:{
                    required: true,
                    messages: "请输入手机号码"
                }
            }
        }
    },
    methods: {
        next(){
            if(!this.disabledSubmit) return
            this.$router.push({name:'验证码',query:{msgphone:this.formData.msgphone}})
        }
    },
    computed:{
        disabledSubmit() {
            return !this.$fn.isDisabled(this.formData,this.rules)
        }
    },
    components: {
        navar
    },
}
</script> 

<style scoped lang="less">
.forget-password{
    .nav-bar{
        width: 100%;
        height: 88px;
        // padding-top:28px;
        position: relative;
        .icon{
            width: 40px;
            height:40px;
            position: absolute;
            top:28px;
        }
        .title{
            text-align: center;
            font-size: 36px;
            color: #000;
        }
    }
    .otp{
        width: 100%;
        height:75px;
        position: relative;
        border-bottom: 1px solid #dcdcdc;
        margin: 50px 0;
        .otp-txt{
            position: absolute;
            top:0;
            left:0;
            font-size: 30px;
            color: #333;
        }
        .input-con{
            position: absolute;
            left:0px;
            width: 530px;
            height:60px;
            font-size: 26px;
            .name-input{
                position: absolute;
                width: 450px;
                border: 0;
                background-color: #F8F8FA;
                font-size: 30px;
            }
        }
        .count-down{
            position: absolute;
            right:0px;
            top:-10px;
            .count-down-btn{
                width: 200px;
                height:68px;
                font-size: 30px;
                color: #999
            }
        }
        
    }
    .confirm-btn{
        width: 670px;
        height:88px;
        .load-btn{
            height:88px;
            line-height: 88px;
            background-color: #999;
            color: #fff;
            text-align: center;
            font-size:40px;
        }
    }
    h1{
        font-size: 36px;
        color:#333;
        margin-bottom: 40px;
    }
    .line{
        width: 670px;
        height: 2px;
        background-color: #dcdcdc;
        margin-bottom: 60px;

    }
    .tips{
        font-size: 26px;
        color: #333;
        line-height: 40px;
        margin-bottom: 62px;
    }
    .o-c{
        color: #fa5300;
        font-size: 30px;
    }
    .footer{
        padding: 0 30px;
        margin-top:20px;
        p:nth-child(1){
            font-size: 20px;
            color: #333
        }
        p:nth-child(4){
            font-size: 26px;
            color: #333;
            margin:30px 0 20px
        }
        p:nth-child(5){
            font-size: 20px;
            color: #666
        }
    }
}
</style>
