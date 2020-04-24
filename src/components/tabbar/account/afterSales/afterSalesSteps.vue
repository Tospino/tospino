<template>
    <div class="after-sales-steps">
        <van-steps direction="vertical" :active="active" active-color="#FA5300" class="steps-con">
            <van-step class="steps-item" v-for="i in 9" :key="i">
                <h3>退款成功</h3>
                <p class="p1">已成功退还到你的账户，总金额：{{jn}}74.48</p>
                <p class="p2">2016-07-12 12:40</p>
            </van-step>
        </van-steps>
        
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            active: 2
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

    },
};
</script>

<style scoped lang="less">
.after-sales-steps{
    padding:59px 30px 0;
    box-sizing: border-box;
    .steps-con{
        background-color:#F8F8FA;
    }
    .steps-item{
        padding-bottom: 70px;
        padding-left: 29px;
        &:nth-last-child(1){
            padding-bottom: 0px;
            /deep/ .van-step__line{
                display: none;
            }
        }
        h3{
            height: 50px;
            font-size:32px;
        }
        p{
            height: 40px;
        }
        .p1{
            font-size: 22px;
        }
        .p2{
            font-size: 18px;
        }
       /deep/ .van-step__circle-container{
           .van-step__circle{
               width: 12px;
               height: 12px;
            
           }
       }
        /deep/ .van-step__line{
            width: 2px;
        }
    }
    /deep/ .van-step--finish{
        .van-step__line{
            background-color: #FA5300;
        }
        .van-step__circle{
            background-color: #FA5300;
        }
    }
}
</style>
