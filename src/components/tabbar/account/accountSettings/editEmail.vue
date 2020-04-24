<template>
    <div class="edit-email">
        <settings-header title="更改邮箱" title2=""></settings-header>
        <div class="edit-email-top">
            <p class="top-p1">您目前正在使用的电子邮箱：</p>
            <p class="top-p2">8165513561@qq.com</p>
        </div>
        <div class="m-b-40">
            <div class="cell">
                <input type="search"  class="input-xt" placeholder="新邮箱地址">
            </div>
            <div class="cell">
                <input type="search"  class="input-xt" placeholder="确认邮箱地址">
            </div>
            <div class="cell">
                <input type="search"  class="input-xt-otp" placeholder="验证码">
                <div class="yzm">
                    <img src="@/assets/img/tabbar/my/account/yanzhengma@2x.png">
                </div>
                <span class="c-orange fl-right">换一个</span>
            </div>
        </div>
        <div class="btn">
            <div class="btn-save">
                保存
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

    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.edit-email{
    .edit-email-top{
        height: 176px;
        box-sizing: border-box;
        padding: 55px 30px 0;
        .top-p1{
            font-size:30px;
            color: #333;
            margin-bottom: 20px;
        }
        .top-p2{
            font-size:26px;
            color: #666;
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
        .btn-save{
            height:88px;
            background:rgba(250,83,0,1);
        }
    }
}
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
        width: 90%;
        background-color: #fff;
    }
    .input-xt-otp{
        height: 40px;
        border: 0;
        width: 50%;
        background-color: #fff;
    }
    .yzm{
        width:200px;
        height:80px;
        display: inline-block;
        position: absolute;
        left:410px;
        top:50%;
        transform: translateY(-50%);
    }
    
}
.m-b-40{
    margin-bottom: 40px;
}
</style>
