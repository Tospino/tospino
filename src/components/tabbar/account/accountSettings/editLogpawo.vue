<template>
<!-- 修改登录密码 -->
    <div class="edit-logpawo">
        <settings-header title="修改登录密码" title2=""></settings-header>
        <div class="m-b-19">
            <div class="cell">
                <input :type="inputType3" class="input-xt" placeholder="请输入当前登录密码" v-model="formData.oldPwd" :maxlength="20"  @input="inputFun">
                <van-icon name="eye-o" class="pas-icon" v-if="eyeStuats3" @click="eyeStuats3 = !eyeStuats3"/>
                <van-icon name="closed-eye"  class="pas-icon" v-else @click="eyeStuats3 = !eyeStuats3"/>
            </div>
            <div class="cell">
                <input :type="inputType" class="input-xt" placeholder="输入新密码" v-model="formData.userPwd" :maxlength="20"  @input="inputFun1">
                <van-icon name="eye-o" class="pas-icon" v-if="eyeStuats" @click="eyeStuats = !eyeStuats"/>
                <van-icon name="closed-eye"  class="pas-icon" v-else @click="eyeStuats = !eyeStuats"/>
            </div>
            <div class="cell">
                <input :type="inputType2" class="input-xt" placeholder="确认密码" v-model="formData.userPwd2" :maxlength="20"  @input="inputFun2">
                <van-icon name="eye-o" class="pas-icon" v-if="eyeStuats2" @click="eyeStuats2 = !eyeStuats2"/>
                <van-icon name="closed-eye"  class="pas-icon" v-else @click="eyeStuats2 = !eyeStuats2"/>
            </div>
        </div>
        <p class="tips">密码必须是6-20个字符</p>
        <div class="btn" @click="submit">
            <div class="btn-save">保存</div>
        </div>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
import {updateuserpaypasswordApi} from '@/api/login/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            eyeStuats:false,
            eyeStuats2:false,
            eyeStuats3:false,
            formData:{
                oldPwd:'',
                userPwd:'',
                userPwd2:'',
                msg_types:2
            }
        };
    },
    computed: {
        inputType(){
            return this.eyeStuats ? 'text':'password'
        },
        inputType2(){
            return this.eyeStuats2 ? 'text':'password'
        },
        inputType3(){
            return this.eyeStuats3 ? 'text':'password'
        }
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        //用户修改登录或支付密码
        updateuserpaypassword(data){
            updateuserpaypasswordApi(data).then(res => {
                if(res.code == 0){
                    Toast('设置成功')
                    this.$router.go(-1)
                }else if(res.code == -121){
                    Toast('原登录密码不正确')
                }else if(res.code == -122){
                    Toast('原支付密码不正确')
                }else if(res.code == -12){
                    Toast('密码不一致')
                }
            })  
        },
        //保存
        submit(){
            if(this.formData.oldPwd.length < 6 || this.formData.userPwd.length < 6 ||this.formData.userPwd2.length < 6){
                Toast('所有密码都请输入6位数字')
                return
            }
            if(this.formData.userPwd != this.formData.userPwd2){
                Toast('密码与确认密码不一致')
                return
            }
            if(this.formData.userPwd == this.formData.oldPwd){
                Toast('新密码与旧密码不能相同')
                return
            }
            this.updateuserpaypassword(this.formData)
        },
        inputFun(e){
            this.formData.oldPwd=e.target.value.replace(/\s+/g, "");
        },
        inputFun1(e){
            this.formData.userPwd=e.target.value.replace(/\s+/g, "");
        },
        inputFun2(e){
            this.formData.userPwd2=e.target.value.replace(/\s+/g, "");
        }
    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.edit-logpawo{
    .cell{
        height: 110px;
        line-height: 110px;
        padding: 0 30px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #DCDCDC;
        &:nth-last-child(1){
            border:0
        }
        .input-xt{
            height: 40px;
            border: 0;
            width: 85%;
            background-color: #fff;
        }
        .pas-icon{
            font-size: 40px;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:30px;
        }
    }
    .tips{
        padding: 0 30px;
        color: #999;
        font-size: 22px;
        margin-bottom: 39px;
    }
    .btn{
        height: 88px;
        box-sizing: border-box;
        padding: 0 30px;
        text-align: center;
        line-height: 88px;
        color: #fff;
        font-size:34px;
        .btn-save{
            height:88px;
            background:rgba(250,83,0,1);
        }
    }
}
.m-b-19{
    margin-bottom: 19px;
}
</style>
