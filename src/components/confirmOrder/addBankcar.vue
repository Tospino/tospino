<template>
<!-- 添加银行卡 -->
    <div class="addBankcar">
        <balance-header></balance-header>
        <div class="addBankcar-title">
            添加银行卡
        </div>
        <div class="re-enter"> 
            <span>卡号</span>
            <div class="input-con">
                <input type="text" class="name-input" placeholder="该交易支持储蓄卡/信用卡/国际信用卡">
            </div>
                <div class="line"></div>
        </div>
        <div class="upload">
            <van-button type="info" size="large" class="load-btn" @click="confirm">提交卡号</van-button>
        </div>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
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
        confirm(){

        }
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.addBankcar{
    .addBankcar-title{
        height: 200px;
        background-color: #fff;
        line-height: 200px;
        text-align: center;
        font-size: 40px;
        font-weight:bold;
        border-top:1px solid #DCDCDC;
        border-bottom:1px solid #DCDCDC
    }
    .re-enter{
        // width: 100%;
        height: 97px;
        line-height: 97px;
        padding-left: 30px;
        font-size:30px;
        color: #333;
        position: relative;
        background-color: #fff;
        font-size:30px;
        .input-con{
            position: absolute;
            top:0px;
            left:60px;
            width: 530px;
            height:60px;
            font-size: 26px;
            margin-bottom: 50px;
            font-size:30px;
        }
        .name-input{
            position: absolute;
            width: 600px;
            border: 0;
            left:80px;
            background-color: #fff;
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
    .upload{
        padding:0 30px;
        height:242px;
        box-sizing: border-box;
        overflow: hidden;
        line-height: 242px;
        background-color: #fff;
        border-top:1px solid #DCDCDC;
        border-bottom:1px solid #DCDCDC;
        margin-top:4px;
        .load-btn{
            display: inline-block;
            height:88px;
            background-color: #DCDCDC;
            font-size: 40px;
        }
    }
}
</style>
