<template>
<!-- 输入验证码点击确定 => 修改密码页 -->
    <div class="revise-password">
        <navar title="忘记密码"></navar>
        <div class="content">
            <p class="padding-l-30">请设定新密码</p>
            <div class="line"></div>
            <div class="pass-word"> 
                <span class="margin-l-30">密码</span>
                <div class="input-con">
                    <input :type="inputType" class="name-input bgc-moren" placeholder="请输入6-20个字符的密码" v-model="reviseData.userPwd" :maxlength="20" @input="inputFun">
                    <van-icon :name="eyeName" class="eye" @click="eyeStatus = !eyeStatus" size="18px"/>
                </div>
                <div class="line"></div>
            </div>
            <div class="re-enter"> 
                <span class="margin-l-30">确认密码</span>
                <div class="input-con">
                    <input :type="inputType2" class="name-input bgc-moren" placeholder="请再次输入新密码" v-model="reviseData.userPwd2" :maxlength="20" @input="inputFun1">
                     <van-icon :name="eyeName1" class="fl-right" @click="eyeStatus1 = !eyeStatus1" size="18px"/>
                </div>
                 <div class="line"></div>
            </div>
            <div class="upload" :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">
                <div class="load-btn" @click="confirm" >确定</div>
            </div>
            <div class="tips">
                <span>安全密码提示:</span>
                <div class="spot">&nbsp;&nbsp;至少包含6个字符，最好是数字和字母的组合；</div>
                <div class="spot">&nbsp;&nbsp;不要使用您之前已经在本网站上使用过的密码；</div>
                <div class="spot">&nbsp;&nbsp;不要使用字典词汇、您的姓名、邮箱地址、手机号码或其他可以轻易获取的个人信息。</div>
            </div>
        </div>
    </div>
</template>

<script>
import navar from '@/multiplexing/navar'
import {setretrievepasswordApi} from '@/api/login/index.js'
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
            reviseData:{
                msg_phone:'',
                msg_types:'2',
                msg_num:'',
                userPwd:'',
                userPwd2:''
            },
            inputType:'password',
            inputType2:'password'
        };
    },
    computed: {
        disabledSubmit() {
            return this.reviseData.userPwd2.length >= 6 
        }
    },
    created() {
        
    },
    mounted() {
        this.reviseData.msg_phone = this.$route.query.phone
        this.reviseData.msg_num = this.$route.query.verCode
    },
    watch: {
        eyeStatus:{
            handler:function(newVal, oldVal){
                this.eyeStatus ? this.eyeName = 'eye-o':this.eyeName = 'closed-eye'
                this.eyeStatus ? this.inputType = 'text' : this.inputType = 'password'
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
            if(!this.disabledSubmit) return
            if(this.reviseData.userPwd.length < 6 ||this.reviseData.userPwd2.length < 6){
                Toast('所有密码都请输入6位数字')
                return
            }
            if(this.reviseData.userPwd != this.reviseData.userPwd2){
                Toast('密码与确认密码不一致')
                return
            }
            this.setretrievepassword(this.reviseData)
        },
        //找回登录密码支付密码
        setretrievepassword(data){
            setretrievepasswordApi(data).then(res => {
                if(res.code == 0){
                    this.$router.push({name:'修改密码成功'})
                }else if(res.code == -26){
                    Toast('该手机号已被冻结，请联系后台客服')
                }else if(res.code == -27){
                    Toast('该手机号已被删，除请联系后台客服')
                }else if(res.code == -28){
                    Toast('该手机号未注册')
                }
            })
        },
        inputFun(e){
            this.reviseData.userPwd=e.target.value.replace(/\s+/g, "");
        },
        inputFun1(e){
            this.reviseData.userPwd2=e.target.value.replace(/\s+/g, "");
        },
    },
    components: {
        navar
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
            height:88px;
            position: absolute;
            top:358px;
            box-sizing: border-box;
            overflow: hidden;
            font-size:40px;
            line-height: 88px;
            background-color: #999;
            color: #fff;
            text-align: center;
            .load-btn{
                height:100%;
            }
        }
        .tips{
            position: absolute;
            top:500px;
            padding: 0 30px;
            p{
                font-size: 18px;
                color: #666666
            }
            span{
                color: #333333;
                font-size: 26px;
                font-weight:600;
            }
            .spot{
                margin-top:10px;
                position: relative;
                font-size: 18px;
                line-height:36px;
                &:after {
                    content: ' ';
                    position: absolute;
                    left: 0px;
                    top: 12px;
                    width: 6px;
                    height: 6px;
                    background-color: #666666;
                    border-radius: 6px;
                }
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
            font-size: 30px;
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
        // padding: 0 30px;
        .input-con{
            position: absolute;
            top:-5px;
            left:150px;
            width: 530px;
            height:60px;
            font-size: 26px;
            margin-bottom: 50px;
            .eye{
                float:right
            }
        }
        .name-input{
            position: absolute;
            width: 350px;
            border: 0;
            left:110px;
            font-size: 30px;
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
.padding-l-30{
    padding-left:30px;
}
</style>
