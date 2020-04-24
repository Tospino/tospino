<template>
<!-- 支付成功页面 -->
    <div>
        <van-action-sheet v-model="showAction" title="" class="action-sheet-sucess">
            <div class="sucess-content">
                <div class="sucess-img">
                    <img src="@/assets/img/confirmOrder/icon-05@2x.png" alt="">
                </div>
                <div class="sucess-txt c-orange">
                    已支付成功
                </div>
            </div>
            
        </van-action-sheet>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            showAction:false
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
        confirm(){}
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.action-sheet-sucess{
    border-radius: 0;
    height: 60%;
    /deep/ .van-action-sheet__header{
        height: 109px;
        font-size: 40px;
        font-weight:bold;
        line-height: 109px;
        .van-icon{
            font-size: 34px;
        }
    }
    .sucess-content{
        width: 100%;
        height: 590px;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;
        font-size:34px;
        color: #333;
        text-align: center;
        .sucess-img{
            position: relative;
            display: inline-block;
            width: 220px;
            height: 220px;
            top:200px;
        }
        .sucess-txt{
            position: relative;
            font-size: 40px;
            top:230px;
            left:0;
            font-weight: bold;
        }
    }
    
}
</style>
