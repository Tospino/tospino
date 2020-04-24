<template>
<!-- 支付密码设置成功 -->
    <div class="password-success">
        <balance-header></balance-header>
        <div class="success-img">
            <img src="@/assets/img/confirmOrder/icon-02@2x.png" alt="">
        </div>
        <div class="success-test c-orange">
            支付密码设置成功
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
        setTimeout(()=>{
            this.$router.go(-3)
        },1500)
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
.password-success{
    position: relative;
    text-align: center;
    .success-img{
        display: inline-block;
        width: 160px;
        height: 160px;
        position: relative;
        top:172px;
    }
    .success-test{
        position: relative;
        top:200px;
        font-size:36px;
    }
}
</style>
