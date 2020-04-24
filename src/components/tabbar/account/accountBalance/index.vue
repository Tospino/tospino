<template>
<!-- 账户余额 -->
    <div class="account-balance">
        <balance-header title="账户余额" title2="查看明细" @jumpRouter="jumpRouter" jumpName="账户明细"></balance-header>
        <div class="balance-top">
            <div class="top-p1">
                账户充值
            </div>
            <div class="top-p2">
                <van-rate v-model="value" color="#FA5300" class="rate"/>
                <span @click="jumpRouter('评论详情')">2,206条评论</span>
            </div>
            <div class="top-p3">
                <span>当前余额: {{jn}}{{walletMoney}}</span>
            </div>
        </div>
        <div class="balance-bottom">
            <p class="bottom-p1">选择金额（您可以选择充值面额或者自定义充值金额）</p>
            <div class="money-list" v-for="(money,index) in moneyList" :key="index">
                <div v-for="num in money.numList" :key="num">{{num}}</div>
            </div>
            <div class="cell">
                <input type="number" class="input-xt" placeholder="请输入金额">
            </div>
            <div class="btn-next" @click="showyinhang" :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">
                下一步
            </div>
            <div class="footer-tips">
                <p class="tip1">充值说明：</p>
                <p class="tip2">“账户充值”指通过TOPINO支持的支付方式进行付款并充值到购买人的TOSPINO账户的行为。</p>
            </div>
        </div>


        <!-- 确认付款弹窗 -->
        <action-sheet-paymen ref="paymen" @showpaymen="showpaymen"></action-sheet-paymen>
        
        <!-- 选择付款方式弹窗 -->
        <action-sheet-yinhang ref="yinhang" @showyinhang="showyinhang" @showpassword="showpassword" @showsucess="showsucess" :title="yinhangTitle"></action-sheet-yinhang>

        <!-- 支付成功弹窗 -->
        <action-sheet-sucess ref="sucess" @showsucess="showsucess"></action-sheet-sucess>

        <!-- 支付密码 -->
        <action-sheet-password ref="password" @showpassword="showpassword"></action-sheet-password>

    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import actionSheetPaymen from "@/multiplexing/actionSheetPaymen"
import actionSheetYinhang from '@/multiplexing/actionSheetYinhang'
import actionSheetSucess from '@/multiplexing/actionSheetSucess'
import actionSheetPassword from '@/multiplexing/actionSheetPassword'
import {walletInfoApi} from '@/api/accountBalance/index.js'
export default {
    props: {

    },
    data() {
        return {
            value:2,
            moneyList:[
                {
                    numList:[50,100,300]
                },
                {
                    numList:[1000,2000,5000]
                }
            ],
            showPaymen:false,
            yinhangTitle:'￥10825.00',
            walletMoney:0
        };
    },
    computed: {
        disabledSubmit(){
            return false
        }
    },
    created() {

    },
    mounted() {
        this.walletInfo()
    },
    watch: {

    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        //弹出银行
        showyinhang(){
            if(!this.disabledSubmit) return
            this.$refs.yinhang.showAction = true
        },
        //弹出支付
        showpaymen(){
            this.$refs.paymen.showAction = true
        },
        //弹出支付成功
        showsucess(){
            this.$refs.sucess.showAction = true
        },
        //弹出密码框
        showpassword(){
            this.$refs.password.showAction = true
        },
        walletInfo(){
            walletInfoApi().then(res=>{
                if(res.code == 0){
                    this.walletMoney = res.wallet.walletMoney
                }
            })
        }
    },
    components: {
        balanceHeader,
        actionSheetPaymen,
        actionSheetYinhang,
        actionSheetSucess,
        actionSheetPassword
    },
};
</script>

<style scoped lang="less">
.account-balance{
    .balance-top{
        padding: 60px 30px 40px;
        border-top:1px solid #DCDCDC;
        border-bottom:1px solid #DCDCDC;
        .top-p1{
            font-size:40px;
            color: #333;
            font-weight:bold;
        }
        .top-p2{
            color: #DB9000;
            .rate{
                vertical-align: middle;
                margin:19px 29px 19px 0;
                /deep/ .van-icon{
                    font-size: 38px;
                    
                }
            }
        }
        .top-p3{
            color: #666;
            font-size: 22px;
        }
    }
    .balance-bottom{
        padding: 39px 30px 0;
        .bottom-p1{
            font-size:22px;
            color: #666;
            margin-bottom: 19px;
        }
        .money-list{
            display: -webkit-flex;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            justify-content : space-between;
            margin-bottom: 15px;
            div{
                width:220px;
                height:120px;
                border:2px solid rgba(250,83,0,1);
                border-radius:10px;
                line-height: 120px;
                text-align: center;
                font-size:36px;
                color: #FA5300;
            }
        }
        .btn-next{
            height:88px;
            border-radius:10px;
            line-height: 88px;
            text-align: center;
            color: #fff;
            margin:20px 0 79px;
            font-size: 32px;
        }
        .tip1{
            font-size:26px;
            color: #333;
            margin-bottom: 18px;
        }
        .tip2{
            font-size:22px;
            color: #999;
            line-height:33px;
        }
    }
}
.cell{
    height: 88px;
    line-height: 88px;
    padding: 0 30px;
    color: #999;
    position: relative;
    font-size: 26px;
    margin-top:40px;
    border: 1px solid #999;
    background: #fff;
    .input-xt{
        height: 40px;
        border: 0;
        width: 90%;
        
    }
}
</style>
