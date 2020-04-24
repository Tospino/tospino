<template>
<!-- 重置密码 -->
    <div class="revise-password">
        <balance-header title="重置支付密码"></balance-header>
        <div class="content">
            <div class="line"></div>
            <div class="pass-word"> 
                <span class="margin-l-30">新密码:</span>
                <div class="input-con">
                    <input :type="inputType" class="name-input bgc-moren" placeholder="请输入6-20个字符的密码" v-model="formData.userPwd" @input="inputFun1" :maxlength="6">
                    <van-icon :name="eyeName" class="fl-right" @click="eyeStatus = !eyeStatus" size="18px"/>
                </div>
                <div class="line"></div>
            </div>
            <div class="re-enter"> 
                <span class="margin-l-30">确认密码:</span>
                <div class="input-con">
                    <input :type="inputType2" class="name-input bgc-moren" placeholder="请再次输入新密码" v-model="formData.userPwd2" @input="inputFun2" :maxlength="6">
                    <van-icon :name="eyeName1" class="fl-right" @click="eyeStatus1 = !eyeStatus1" size="18px"/>
                </div>
                 <div class="line"></div>
            </div>
            <div class="upload">
                <van-button type="info" size="large" class="load-btn" @click="confirm">确认</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {setuserpaypasswordApi} from '@/api/login/index'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            eyeStatus:false,
            eyeStatus1:false,
            eyeName:'closed-eye',
            eyeName1:'closed-eye',
            inputType:'password',
            inputType2:'password',
            formData:{
                userPwd:'',
                userPwd2:''
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
        eyeStatus:{
            handler:function(newVal, oldVal){
                this.eyeStatus ? this.eyeName = 'eye-o':this.eyeName = 'closed-eye'
                this.eyeStatus ? this.inputType = 'text':this.inputType = 'password'
            },
        },
        eyeStatus1:{
            handler:function(newVal, oldVal){
                this.eyeStatus1 ? this.eyeName1 = 'eye-o':this.eyeName1 = 'closed-eye'
                this.eyeStatus1 ? this.inputType2 = 'text':this.inputType2 = 'password'
            },
        },
    },
    methods: {
        confirm(){
            if(this.formData.userPwd.length < 6 ||this.formData.userPwd2.length < 6){
                Toast('所有密码都请输入6位数字')
                return
            }
            if(this.formData.userPwd != this.formData.userPwd2){
                Toast('密码与确认密码不一致')
                return
            }
            this.setuserpaypassword(this.formData)
        },
        //设置支付密码
        setuserpaypassword(data){
            setuserpaypasswordApi(data).then(res => {
                if(res.code == 0){
                    this.$router.push({name:'支付密码设置成功'})
                }
            })
        },
        inputFun1(e){
            this.formData.userPwd=e.target.value.replace(/[^\d]/g,'');
        },
        inputFun2(e){
            this.formData.userPwd2=e.target.value.replace(/[^\d]/g,'');
        }
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.revise-password{
    .content{
        width: 100%;
        position: relative;
        p{
            font-size: 36px;
            color:#333333;
            margin-bottom: 38px;
            margin-top:40px;
        }
        .line{
            width: 100%;
            height: 2px;
            background-color: #DCDCDC;
        }
        .upload{
            width: 100%;
            padding:0;
            height:88px;
            position: absolute;
            top:358px;
            box-sizing: border-box;
            overflow: hidden;
            padding: 0 30px;
            .load-btn{
                height:100%;
                background:rgba(250,83,0,1);
                font-size: 40px;
            }
        }
    }
    .re-enter{
        width: 100%;
        position: absolute;
        top:247px;
        left:0;
        display: inline-block;
        .input-con{
            position: absolute;
            top:-5px;
            left:150px;
            width: 530px;
            height:60px;
            font-size: 26px;
            margin-bottom: 50px;
        }
        .name-input{
            position: absolute;
            width: 350px;
            border: 0;
            left:110px;
        }
        .password-icon{
            position: absolute;
            right: 30px;
            width: 40px;
            height: 40px;
        }
        span:nth-child(1){  
            font-size: 30px;
            color: #333333
        }
        .line{
            position: absolute;
            top:58px;
        }
    }
    .pass-word{
        width: 100%;
        position: absolute;
        top:130px;
        left:0;
        display: inline-block;
        .input-con{
            position: absolute;
            top:-5px;
            left:150px;
            width: 530px;
            height:60px;
            font-size: 26px;
            margin-bottom: 50px;
        }
        .name-input{
            position: absolute;
            width: 350px;
            border: 0;
            left:110px;
        }
        .password-icon{
            position: absolute;
            right: 30px;
            width: 40px;
            height: 40px;
        }
        span:nth-child(1){  
            font-size: 30px;
            color: #333333
        }
        .line{
            position: absolute;
            top:58px;
        }
    }
}
.margin-l-30{
    margin-left:30px;
}
</style>
