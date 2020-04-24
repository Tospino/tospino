<template>
<!-- 确认付款弹窗 -->
    <div>
        <van-action-sheet v-model="showAction" title="确认付款" class="action-sheet-paymen">
            <div class="paymen-content">
                <div class="paymen-content-top" @click="payMode">
                    <span>付款方式</span>
                    <van-icon name="arrow" class="fl-right"/>
                    <span>中国银行</span>
                </div>
                <div class="paymen-content-top">
                    <span>付款金额</span>
                    <span class="c-orange">{{jn}}1137</span>
                </div>
                
            </div>
            <div class="upload">
                <van-button type="info" size="large" class="load-btn" @click="confirm">立即付款</van-button>
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
        //立即付款
        confirm(){
            this.$emit('showpassword')
        },
        //付款方式
        payMode(){
            this.$emit('showyinhang')
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.action-sheet-paymen{
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
        padding:80px 30px 0;
        position: relative;
        font-size:34px;
        color: #333;
        .paymen-content-top{
            position: relative;
            width: 100%;
            height: 80px;
            
            span{
                &:nth-child(2){
                    float: right;
                    font-size: 30px;
                }
                &:nth-child(3){
                    float: right;
                    padding-right:29px;
                }
            }
            
        }
        
    }
    .upload{
        overflow: hidden;
        .load-btn{
            display: inline-block;
            height:88px;
            background-color: #FA5300;
            font-size: 40px;
        }
    }
}
</style>
