<template>
    <div class="edit-phone">
         <settings-header title="更换手机号" title2=""></settings-header>
         <div class="edit-phone-tips">
            请输入您需要绑定的新手机号
         </div>
         <div class="m-b-40">
            <div class="cell">
                <span class="input-name">国家和地区</span>
                <van-icon name="arrow" class="arrow c-999"/>
                <span class="hm c-333">中国大陆 86</span>
            </div>
            <div class="cell">
                <span class="input-name">新手机号</span>
                <input type="search" class="input-xt" placeholder="请输入手机号">
            </div>
        </div>
        <div class="btn">
            <div class="btn-fsyzm" @click="toOtp">
                发送验证码
            </div>
        </div>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
export default {
    props: {

    },
    data() {
        return {

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
        toOtp(){
            this.$router.push({name:'接受验证码'})
        }
    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.edit-phone{
    .edit-phone-tips{
        padding: 0 30px;
        height: 81px;
        line-height: 81px;
        font-size: 24px;
        color: #666;
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #F2F3F5;
        &:nth-last-child(1){
            border:0
        }
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
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
        .hm{
            position: absolute;
            right:80px;
            top:50%;
            transform: translateY(-50%);
        }
    }
    .btn{
        height: 88px;
        box-sizing: border-box;
        padding: 0 30px;
        text-align: center;
        line-height: 88px;
        color: #fff;
        font-size:34px;
        .btn-fsyzm{
            height:88px;
            background:rgba(250,83,0,1);
        }
    }
}
.m-b-40{
    margin-bottom: 40px;
}
</style>
