<template>
<!-- 修改昵称 -->
    <div class="edit-name">
        <settings-header title="编辑资料" title2="完成" @rightBtn="rightBtn"></settings-header>
        <div class="head" v-if="false">
            <div class="head-con">
                <div class="head-img">
                    <img src="@/assets/img/tabbar/my/account/touxiang@2x.png">
                </div>
                <div class="c-orange head-text">
                    更改头像
                </div>
            </div>
        </div>
        <div>
            <div class="cell">
                <span class="input-name">昵称</span>
                <input type="text" class="input-xt" placeholder="请输入您的昵称" v-model="userinfoShop.nickName" :maxlength="100">
            </div>
            <div class="cell">
                <span class="input-name">会员ID</span>
                <span class="c-999">{{userinfoShop.userId}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
import {updateusernichengApi,getuserinfoApi} from '@/api/accountSettings/index'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            userinfoShop:{
                userId:'',
                nickName:''
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
    },
    watch: {

    },
    methods: {
        rightBtn(){
            this.updateusernicheng({nicheng:this.userinfoShop.nickName})
        },
        //修改昵称
        updateusernicheng(data){
            updateusernichengApi(data).then(res => {
                if(res.code == 0){
                    this.getuserinfo()
                }else if(res.code == -40){
                    Toast('昵称不能为空')
                }
            })
        },
        //获取用户信息
        getuserinfo(){
            getuserinfoApi().then(res => {
                if(res.code == 0){
                    localStorage.userinfoShop = JSON.stringify(res.user) 
                    Toast('成功')
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
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
.edit-name{
    .head{
        height: 300px;
        text-align: center;
        position: relative;
        .head-con{
            position: relative;
            top:50px;
        }
        .head-img{
            display: inline-block;
            width: 160px;
            height: 160px;
            margin-bottom: 19px;
            border-radius:50%;
            border:4px solid rgba(250,83,0,1);
            box-sizing: border-box;
        }
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #F2F3F5;
        &:nth-last-child(1){
            border:0
        }
        .input-xt{
            height: 40px;
            border: 0;
            width: 70%;
            background-color: #fff;
        }
        .input-name{
            width: 180px;
            display: inline-block;
            font-size:28px;
            color: #333;
        }
    }
}
</style>
