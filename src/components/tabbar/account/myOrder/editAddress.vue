<template>
<!-- 修改地址 -->
<!-- 等接口 -->
    <div class="edit-address">
        <balance-header title="修改地址"></balance-header>
        <div class="tips">
            <div class="tips-con">
                <div class="lingdang-icon">
                    <img src="@/assets/img/confirmOrder/lingdang.png" alt="">
                </div>
                <span class="tips-text">
                    <span>请注意：修改地址会影响物流时效，只能修改且付款后只能修改一次，若商品已发货、换仓、库存及配送变更等原因，可能会导致修改地址失败，请即时联系</span> 
                    <span class="c-orange" @click="show2 = true">TOSPINO客服</span>
                    <span>,请您谅解.</span>
                </span>
            </div>
        </div>
        <div class="address" @click="toOrderDetail">
            <div class="lingdang-icon">
                <img src="@/assets/img/confirmOrder/lingdang.png" alt="">
            </div>
            <div class="address-text">
                <div class="address-text-top">
                    <span>收货人：陆丰</span>
                    <span class="fl-right">15246616466</span>
                </div>
                <div class="address-text-bottom">
                    <span>收货地址：中国-广东省-深圳市马田街道南环大道禾仓路格雅大厦格雅表1栋3楼307</span>
                </div>
            </div>
            <van-icon name="arrow" class="arrow"/>
        </div>
        <div class="footer">
            <div class="qx">
                <span>取消</span>
            </div>
            <div class="tj" @click="aaa">
                <span>提交修改</span>
            </div>
        </div>

        <van-overlay :show="show2" @click="show2 = false" class="overlay">
            <kefu></kefu>
        </van-overlay>
    </div>
</template>

<script>
import kefu from '@/multiplexing/kefu.vue'
import balanceHeader from './itemComponents/balanceHeader'
import {querydefaultObjectApi} from '@/api/accountSettings/index'
export default {
    props: {

    },
    data() {
        return {
            show2:false
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
        aaa(){
            // this.$toast('提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容   ');
        },
        toOrderDetail(){
            this.$router.push({name:'地址列表'})
        }
    },
    components: {
        kefu,
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.edit-address{
    .tips{
        height:250px;
        background-color: #FFF8DB;
        position: relative;
        margin-bottom: 20px;
        .tips-con{
            height: 100%;
            .lingdang-icon{
                width: 60px;
                height: 60px;
                display: inline-block;
                position: absolute;
                top:50%;
                left: 38px;
                transform: translateY(-50%);

            }
            .tips-text{
                position: absolute;
                width:597px;
                height:144px;
                font-size:26px;
                top:50px;
                left:122px;
                line-height:39px;
                color: #333;
            }
        }
        
    }
    .address{
        height: 200px;
        background-color: #FFF;
        position: relative;
        padding:62px 30px 0;
        box-sizing: border-box;
        .lingdang-icon{
            width: 60px;
            height: 60px;
            display: inline-block;
            position: absolute;
            top:50%;
            left: 38px;
            transform: translateY(-50%);
        }
        .address-text{
            position: relative;
            width:509px;
            left:121px;
            font-size: 26px;
            color: #333;
            .address-text-top{
                margin-bottom: 14px;
            }
            .address-text-bottom{
                width:509px;
                font-size:22px;
                line-height:33px;
            }
        }
        .arrow{
            position: absolute;
            top:50%;
            right:30px;
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 120px;
        text-align: center;
        line-height: 120px;
        font-size:40px;
        .qx{
            width: 50%;
            height: 100%;
            background-color: #fff;
            float: left;
            color: #333;
        }
        .tj{
            width: 50%;
            height: 100%;
            background-color: #FA5300;
            float: left;
            color: #fff;
        }
    }
}
</style>
