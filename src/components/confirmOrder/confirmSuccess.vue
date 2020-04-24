<template>
<!-- 订单提交成功页面 -->
    <div>
        <balance-header title="确认订单"></balance-header>
        <div class="confirm-success">
            <div class="confirm-success-con">
                <div class="confirm-success-img">
                    <img src="@/assets/img/confirmOrder/icon-04@2x.png">
                </div>
                
            </div>
            <div class="p1 c-orange">
                订单提交成功
            </div>
            <div class="p2">
                您的订单已成功提交,我们会以最快的速度将商品交到您的手上
            </div>
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

    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.confirm-success{
    position: relative;
    padding-top:160px;
    box-sizing: border-box;
    
    .confirm-success-con{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .confirm-success-img{
            width: 300px;
            height: 250px;
        }  
        
    }
    .p1{
        font-size:34px;
        text-align: center;
        margin:40px 0 16px;
    }
    .p2{
        font-size:20px;
        color:rgba(153,153,153,1);
        text-align: center;
    }
}
</style>
