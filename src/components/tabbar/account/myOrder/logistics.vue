<template>
    <div class="logistics">
        <balance-header></balance-header>
        <div class="logistics-con">
            <div class="baoguo" v-for="(parcel,index) in dataList" :key="parcel.orderId" @click="baoguoInformation(parcel)">
                <div class="baoguo-header">包裹{{index+1}}</div>
                <div class="baoguo-con">
                    <div class="good-con">
                        <div class="good-img" v-for="product in parcel.detailList" :key="product.detailId">
                            <img :src="$webUrl+product.skuImg">
                        </div>
                        <div class="right-con"  v-if="parcel.detailList.length == 1">
                            <div class="p1">{{parcel.detailList[0].supplyName}}</div>
                        </div>
                    </div>
                    <div class="btns" v-if="parcel.canRefund == 1">
                        <div class="tk-btn" @click="tuikuan(parcel)">{{parcel.saleOrderPayStatus == 0 ? '退货':'退款' }}</div>
                    </div>
                </div>
            </div>
            <div class="wuliu">
                <div class="wuliu-title">
                    <span class="t1">{{expressName}}</span>
                    <span class="t2">客服：61465656</span>
                </div>
                <div class="wuliu-num">
                    <span>物流单号：</span>
                    <span id="orderSn">{{expressNo}}</span> 
                    <span class="c-orange fl-right" ref="copy" data-clipboard-action="copy" data-clipboard-target="#orderSn" @click="copyLink">复制</span>
                </div>
            </div>

            <div class="liucheng">
                <van-steps direction="vertical" :active="logisticsList.length" active-color="#FA5300" class="steps-con">
                    <van-step class="steps-item" v-for="(logistics,index) in logisticsList" :key="index">
                        <h3>{{logistics.orderStatusNote}}</h3>
                        <p class="p1">{{logistics.remark}}</p>
                        <p class="p2">{{logistics.addTime}}</p>
                    </van-step>
                </van-steps>
            </div>
        </div>
        <footer-exhibition :footerData="footerData"></footer-exhibition>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import footerExhibition from '@/multiplexing/footerExhibition'
import {getlogisticsorderApi} from '@/api/myOrder/index.js'
import {guessyoulikeApi} from '@/api/search/index'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            active: 0,
            dataList:[],
            logisticsList:[],
            expressName:'',
            expressNo:'',
            footerFromData:{
                page:1,
                limit:6,
                seraname:''
            },
            footerData:{},
            copyBtn: null, //存储初始化复制按钮事件
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getlogisticsorder(this.$route.query.orderid)
        this.guessyoulike(this.footerFromData)
        this.copyBtn = new this.clipboard(this.$refs.copy)  
    },
    watch: {

    },
    methods: {
        getlogisticsorder(id){
            getlogisticsorderApi({orderId:id}).then(res => {
                if(res.code == 0){
                    this.dataList = res.Data.logisticsOrderList
                    this.logisticsList = this.dataList[0].actionList
                    this.expressName = this.dataList[0].expressName
                    this.expressNo = this.dataList[0].expressNo
                }
            })
        },
        //点击的包裹信息
        baoguoInformation(parcel){
            this.logisticsList = parcel.actionList
            this.expressName = parcel.expressName
            this.expressNo = parcel.expressNo
        },
        //猜你喜欢
        guessyoulike(data){
            guessyoulikeApi(data).then(res => {
                if(res.code == 0){
                    this.footerData = res.Data
                    this.footerData.list.forEach(item => {
                        if(item.discountPrice == null){
                            item.discountPrice = item.salePrice
                        }
                    });
                }
            })
        },
        //退款
        tuikuan(parcel){
            this.$router.push({name:'包裹仅退款',query:{orderId:parcel.orderId}})
        },
        //复制
        copyLink(){
            let _this = this;
            let clipboard = _this.copyBtn;
            clipboard.on('success', function() {
                Toast('复制成功！')
            });
            clipboard.on('error', function() {
                Toast('复制失败，请手动选择复制！')
            });
        }
    },
    components: {
        balanceHeader,
        footerExhibition
    },
};
</script>

<style scoped lang="less">
.logistics{
    .logistics-con{
        padding: 0 30px 41px;
        .baoguo{
            background-color: #fff;
            font-size:24px;
            color: #999;
            margin-bottom: 14px;
            .baoguo-header{
                height: 60px;
                line-height: 60px;
                padding: 0 40px;
                border-bottom: 1px solid #E6E6E6;
            }
            .baoguo-con{
                padding: 20px 40px 40px;
                .good-con{
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction:row;
                    .good-img{
                        display: inline-block;
                        width: 120px;
                        height: 120px;
                        vertical-align: top;
                        margin: 0 2px 20px 0;

                    }
                }
                
                .right-con{
                    display: inline-block;
                    width: 458px;
                    margin-left:20px;
                    font-size: 28px;
                    line-height:36px;
                }
                .btns{
                    overflow: hidden;
                    .tk-btn{
                        height:44px;
                        border:1px solid rgba(153,153,153,1);
                        border-radius:22px;
                        line-height: 44px;
                        text-align: center;
                        font-size: 24px;
                        margin-top:14px;
                        float: right;
                        padding: 0 20px;
                    }
                }
                
            }
        }
        .wuliu{
            margin-bottom: 14px;
            .wuliu-title{
                background-color: #fff;
                line-height: 50px;
                padding: 0 40px;
                .t1{
                    display: block;
                    font-size:32px;
                    font-weight:bold;
                    color: #333;
                    margin-right:36px;
                }
                .t2{
                    display: block;
                    font-size:20px;
                    color: #333;
                    font-weight:bold;
                }
            }
            .wuliu-num{
                height: 58px;
                background-color: #F3F4F8;
                line-height: 58px;
                padding: 0 40px;
                font-size:24px;
            }
        }
    }
    .liucheng{
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
                font-size:28px;
            }
            p{
                // height: 40px;
            }
            .p1{
                font-size: 24px;
                line-height: 32px;
                margin-bottom: 10px;
            }
            .p2{
                font-size: 20px;
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
    
}
</style>
