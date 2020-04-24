<template>
<!-- 选择付款方式弹窗 -->
    <div>
        <van-action-sheet v-model="showAction" title="选择付款方式" class="action-sheet-yinhang">
            <div class="paymen-content">
                <div class="paymen-content-top" v-for="i in list" :key="i.num" @click="paymen(i)">
                    <span class="yh-icon czjz">
                        <img src="@/assets/img/confirmOrder/zhongguoyinhang@2x.png">
                    </span>
                    <span class="c-999">
                        <van-icon name="success" v-if="i.a"/>
                    </span>
                    <span>中国银行</span>
                </div>
                <div class="paymen-content-top" @click="toaddBankcar">
                    <span></span>
                    <span class="c-999">></span>
                    <span>添加银行卡</span>
                </div>
                <div class="paymen-content-top">
                    <span class="yh-icon czjz">
                        <img src="@/assets/img/confirmOrder/zhanghuyue@2x.png">
                    </span>
                    <span class="c-999">
                    </span>
                    <span class="zhye c-999">账户余额(剩余{{jn}}10.00)</span>
                    <span class="buchong c-999">余额不足</span>
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
            list:[
                {
                    a:false,
                    num:1
                },
                {
                    a:false,
                    num:2
                },
                {
                    a:true,
                    num:3
                }
            ],
            showPayment:false,
            message:'',
            checked:true,
            show:true,
            showAction:false,
            radio:true
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
        paymen(item){
            this.list.forEach(element => {
                element.a = false
                if(item.num == element.num){
                    element.a = true
                }
            });
        },
        //显示支付弹窗
        showpaymen(){
            this.$emit('showpassword')
            // this.$emit('showsucess')
        },
        //添加银行卡
        toaddBankcar(){
            this.$router.push({name:'添加银行卡'})
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.action-sheet-yinhang{
    border-radius: 0;
    /deep/ .van-action-sheet__header{
        height: 109px;
        font-size: 40px;
        font-weight:bold;
        line-height: 109px;
        .van-icon{
            font-size: 34px;
        }
    }
    .paymen-content{
        width: 100%;
        height: 590px;
        background-color: #fff;
        box-sizing: border-box;
        padding:0px 0px 0;
        position: relative;
        font-size:34px;
        color: #333;
    .paymen-content-top{
        position: relative;
        width: 100%;
        height: 97px;
        line-height: 97px;
        border-top:1px solid #DCDCDC;
        padding:0 30px;
        box-sizing: border-box;
        &:nth-last-child(1){
            border-bottom:1px solid #DCDCDC;
            line-height: 60px;
        }
        .yh-icon{
            display: inline-block;
            width: 60px;
            height: 60px;
        }
        span{
            &:nth-child(2){
                float: right;
                font-size: 30px;
                .van-icon{
                    color: #FA5300
                }
            }
            &:nth-child(3){
                // float: right;
                    padding-left:119px;
                }
            }
            .zhye{
                font-size:28px;
            }
            .buchong{
                font-size: 20px;
                position: absolute;
                top:38px;
                left:148px;
            }
        }
    }
        
}
</style>
