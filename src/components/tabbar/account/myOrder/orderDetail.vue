<template>
<!-- 订单详情 -->
    <div class="order-detail">
        <balance-header title="订单详情"></balance-header>
        <div class="address-p1">
            <div class="p1-top">{{orderStatus(detailObj.orderStatusApp,'status')}}</div>
        </div>
        <div class="address-p2">
            <div class="p2-top">
                <div class="car-icon">
                    <img src="@/assets/img/confirmOrder/logistics@2x.png">
                </div>
                <span>{{orderStatus(detailObj.deliverType,'deliverTypes')}}</span>
                <div class="fl-right" v-if="detailObj.hasLogistics == 1" @click="toLogistics(detailObj.orderId)">
                    <van-icon name="arrow" size="21" class="arrow-icon"/>
                </div>
            </div>
            <div class="p2-bottom">
                <div class="bottom-left">
                    <div class="add-icon">
                        <img src="@/assets/img/confirmOrder/add-02@2x.png">
                    </div>
                </div>
                <div class="bottom-right">
                    <span class="name"> {{detailObj.consignee}}</span>
                    <span class="phone"> 86-{{detailObj.mobile}}</span>
                    <div class="addre">{{detailObj.country}}{{detailObj.province}}{{detailObj.city}}{{detailObj.district}}{{detailObj.address}}</div>
                </div>
            </div>
        </div>
        <div class="address-p3">
            <div class="p3-header">商品信息</div>
            <div class="good-detail">
                <div class="good-detail-content" v-for="data in dataList" :key="data.detailId">
                    <div class="good-detail-img" @click="toDetail(data.skuId)">
                        <img :src="$webUrl+data.skuImg">
                    </div>
                    <div class="good-detail-title" @click="toDetail(data.skuId)">
                        <span class="name">{{data.skuName}}</span>
                        <div class="guige">
                            {{data.skuValuesTitle}}
                        </div>
                    </div>
                    <div class="price">
                        <div class="p3">
                            {{data.currencySignWebsite}}{{data.priceWebsite}}
                        </div>
                        <div class="p4 through" v-if="data.originPriceWebsite">
                            {{data.currencySignWebsite}}{{data.originPriceWebsite}}
                        </div>
                        <div class="p4">
                            x{{data.detailNum}}
                        </div>
                        <div class="p2">
                            <span v-if="data.applyRefund == 1">仅退款</span>
                            <span v-if="data.applyReturn == 1">退货</span>
                            <span v-if="data.applyReturnAndRefund == 1">退货退款</span>
                        </div>
                    </div>
                    <!-- 售后成功:按钮审核中或者退款成功 -->
                    <div v-if="detailObj.orderStatusApp == 2 || detailObj.orderStatusApp == 3">
                        <div class="sqsh" @click="toReturnRefund(data)" v-if="data.canReturn == 1">退货退款</div>
                    </div>
                    <!-- <div class="fl-right c-jinse">申请中</div> -->
                    <!-- <div class="fl-right c-jinse">退款成功</div> -->
                </div>
                <div class="mingxi m-t-29">
                    <span >商品总价：</span>
                    <span class="fl-right">{{detailObj.currencySignWebsite}}{{detailObj.orderProductAmountWebsite}}</span>
                </div>
                <div class="mingxi">
                    <span>运费：</span>
                    <span class="fl-right">{{detailObj.currencySignWebsite}}{{detailObj.orderFareWebsite}}</span>
                </div>
                <div class="mingxi">
                    <span>订单总价：</span>
                    <span class="fl-right c-orange font-24">{{detailObj.currencySignWebsite}}{{detailObj.orderAmountWebsite}}</span>
                </div>
            </div>
        </div>
        <div class="address-p4">
            <div class="p4-top">
                订单信息
            </div>
            <div class="p4-middle">
                <div class="middle-p1">
                    <span>订单备注:</span>
                    <span>{{detailObj.orderRemark}}</span>
                </div>
                <div class="middle-p2">
                    <span>订单编号:</span>
                    <span id="orderSn">{{detailObj.orderSn}}</span>
                    <span class="fl-right c-orange" ref="copy" data-clipboard-action="copy" data-clipboard-target="#orderSn" @click="copyLink">复制</span>
                </div>
                <div class="middle-p1">
                    <span>下单时间:</span>
                    <span>{{detailObj.orderAddtime}}</span>
                </div>
                <div class="middle-p1">
                    <span>支付时间:</span>
                    <span>{{detailObj.orderPaytime}}</span>
                </div>
                <div class="middle-p1">
                    <span>支付方式:</span>
                    <span>{{orderStatus(detailObj.payType,'payTypes')}}</span>
                </div>
            </div>
        </div>
        <div class="address-p5">
            <div class="phone-icon">
                <img src="@/assets/img/confirmOrder/phone@2x.png">
            </div>
            <span @click="show3 = true">拨打电话</span>
        </div>
        <div style="height:100px"></div>
        <div class="good-detail-footer">
            <!-- 待付款按钮栏 -->
            <div class="lan">
                <div class="btn-qzf fl-right c-orange" @click="showPay" v-if="detailObj.orderStatusApp == 0">付款</div>
                <!-- <div class="btn-xgdz fl-right" @click="toEditAddress" v-if="detailObj.orderStatusApp == 0">修改地址</div> -->
                <div class="btn-xgdz fl-right" v-if="detailObj.orderStatusApp == 2 || detailObj.orderStatusApp == 3" @click="toLogistics(detailObj.orderId)">查看物流</div>
                <!-- <div class="btn-qzf fl-right c-orange" v-if="detailObj.orderStatusApp == 3">评价</div> -->
                <!-- <div class="btn-qzf fl-right c-orange" v-if="detailObj.orderStatusApp == 4">删除订单</div> -->

                <div class="btn-qxdd fl-right" @click="closeOverlay(true,detailObj.orderId)" v-if="detailObj.canRevoke == 1">取消订单</div>
                <div class="btn-qzf fl-right c-orange" @click="toRefund" v-if="detailObj.canRefund == 1">退款</div>
                <div class="btn-qzf fl-right c-orange" @click="showPassWord(true,'确认收货')" v-if="detailObj.canComplete == 1">确认收货</div>
                <div class="btn-xgdz fl-right" @click="toReturnRefund" v-if="dataList.length == 1 && detailObj.canReturn == 1">退货退款</div>
                <div class="btn-xgdz fl-right" @click="toBatchRefund" v-if="dataList.length > 1 && detailObj.canReturn == 1">退货退款</div>
            </div>
        </div>

        <van-overlay :show="show3" @click="show3 = false" class="overlay">
            <!-- 客服电话 -->
            <kefu></kefu>
        </van-overlay>

        <transition name="canorder">
            <zhezhao v-show="show">
                <cancel-order @closeOverlay="closeOverlay" :orderId="orderId" ref="cancelorder" @refreshOrder="refreshOrder"></cancel-order>
            </zhezhao>
        </transition>

        <!-- 支付成功弹窗 -->
        <action-sheet-sucess ref="sucess" @showsucess="showsucess"></action-sheet-sucess>
        <!-- 密码弹窗 -->
        <action-sheet-password ref="actionSheetPassword" @getPassWord="getPassWord" :typeLeixing="typeLeixing"></action-sheet-password>
        <!-- 付款方式弹窗 -->
        <action-sheet-paymen ref="actionSheetPaymen" :moeny="moeny" @showPassWord="showPassWord"></action-sheet-paymen>

    </div>
</template>

<script>
import {orderlistApi,orderlaunchpayApi,completeorderApi,orderinfoApi} from '@/api/myOrder/index.js'
import cancelOrder from './itemComponents/cancelOrder'
import actionSheetPassword from '@/multiplexing/actionSheetPassword'
import actionSheetPaymen from '@/multiplexing/actionSheetPaymen'
import actionSheetSucess from '@/multiplexing/actionSheetSucess'
import zhezhao from '@/multiplexing/zhezhao'
import kefu from '@/multiplexing/kefu.vue'
import balanceHeader from './itemComponents/balanceHeader'
import {mapActions} from 'vuex'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            moeny:0,
            show:false,
            show2:false,
            show3:false,
            formData:{
                order_id:""
            },
            dataList:[],
            detailObj:{},
            status:[
                {type:0,name:'待付款'},
                {type:1,name:'待发货'},
                {type:2,name:'待收货'},
                {type:3,name:'已收货(已完成)'},
                {type:4,name:'交易关闭'},
                {type:5,name:'已拒签'},
            ],
            deliverTypes:[
                {type:1,name:'Tospino物流'},
                {type:2,name:'上门自取'},
                {type:3,name:'第三方物流'},
            ],
            payTypes:[
                {type:1,name:'货到付款'},
                {type:2,name:'在线支付'},
                {type:3,name:'余额支付'},
            ],
            orderId:0,
            copyBtn: null, //存储初始化复制按钮事件
            userinfoShop:{},
            typeLeixing:'',
            payTypeDetail:201,//余额支付ID,暂时写死
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.orderinfo()
        if(localStorage.userinfoShop){
            this.userinfoShop = JSON.parse(localStorage.userinfoShop)
        }
        this.copyBtn = new this.clipboard(this.$refs.copy)
    },
    watch: {

    },
    methods: {
        ...mapActions(['setorderdetaillist']),
        orderinfo(){
            this.formData.order_id = this.$route.query.id
            orderinfoApi(this.formData).then(res => {
                if(res.code == 0){
                    this.detailObj = res.Data
                    this.dataList = res.Data.detailList
                }   
            })
        },
        //秒转化成时分
        settingTime(){
            var hours = Math.floor(second / 3600);
            var minutes = Math.floor((second % 3600) / 60);
        },
        //编译状态
        orderStatus(type,list){
            let name = ''
            this[list].forEach(statu => {
                if(statu.type == type){
                    name = statu.name
                }
            })
            return name
        },
        //控制取消订单弹窗
        closeOverlay(falg,id){
            this.orderId = id
            this.show = falg
            this.$refs.cancelorder.anima = true
        },
        //弹出付款弹窗
        showPay(){
            if(!this.userinfoShop.payPwd){
                this.$router.push({name:'设置支付密码'})
                return
            }
            this.$refs.actionSheetPaymen.showAction = true
            this.moeny = this.detailObj.orderAmountWebsite
        },
        //修改地址
        toEditAddress(){
            this.$router.push({name:'我的订单修改地址'})
        },
        //退款页面
        toRefund(){
            this.$router.push({name:'退款页面',query:{orderId:this.detailObj.orderId}})
        },
        //退货退款页面
        toReturnRefund(item){
            let arr = []
            if(!item.detailId){
                this.dataList.forEach(ele => {
                    if(ele.canReturn == 1){
                        let obj = {detailId:ele.detailId}
                        arr.push(obj)
                        this.setorderdetaillist(arr)
                    }
                    
                })
            }else{
                arr.push({detailId:item.detailId})
                this.setorderdetaillist(arr)
            }
            this.$router.push({name:'退货退款页面',query:{orderId:this.detailObj.orderId}})
        },
        //批量退货退款页面
        toBatchRefund(){
            let arr = []
            let arr1 = this.dataList.map(o => Object.assign({}, o))
            arr1.forEach(item => {
                let obj = {
                    detailId:item.detailId
                }
                arr.push(obj)
            })
            this.setorderdetaillist(arr)
            this.$router.push({name:'批量退货退款',query:{orderId:this.detailObj.orderId}})
        },
        refreshOrder(){
            this.$router.go(-1)
        },
        toLogistics(id){
            this.$router.push({name:'物流信息',query:{orderid:id}})
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
        },
        //跳转商品详情
        toDetail(skuid){
            this.$router.push({name:'商品详情',query:{skuId:skuid}})
        },
        //订单发起支付
        orderlaunchpay(data){
            orderlaunchpayApi(data).then(res => {
                if(res.code == 0){
                    this.showsucess()
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('参数支付方式不能为空')
                }else if(res.code == 3){
                    Toast('余额支付支付密码不能为空')
                }else if(res.code == 4){
                    Toast('参数订单列表orderList不能为空')
                }else if(res.code == 5){
                    Toast('参数订单Id必须大于0')
                }else if(res.code == 21){
                    Toast('请先设置支付密码')
                    setTimeout(()=>{this.$router.push({name:'设置支付密码'})},1000)
                }else if(res.code == 22){
                    Toast('支付密码不正确')
                }else if(res.code == 23){
                    Toast('余额不足')
                }else if(res.code == 31){
                    Toast('提交的订单列表不能为空')
                }else if(res.code == 32){
                    Toast('存在订单不属于当前用户，不能进行操作')
                }else if(res.code == 33){
                    Toast('存在订单已经支付，不能重复支付')
                }else if(res.code == 34){
                    Toast('提交的订单列表包含状态不为待付款的订单')
                }else if(res.code == 35){
                    Toast('提交的订单列表包含已过支付有效期的订单')
                }
            })
        },
        //获取到密码,请求接口
        getPassWord(value,type){
            if(type == '支付'){
                let orderList = []
                orderList.push({orderId:this.detailObj.orderId})
                let obj = {
                    payTypeDetail:this.payTypeDetail,
                    payPwd:value,
                    orderList:orderList
                }
                this.orderlaunchpay(obj)
            }else if(type == '确认收货'){
                let obj = {
                    orderId:this.detailObj.orderId,
                    payPwd:value,
                }
                this.completeorder(obj)
            }
        },
        //弹出支付成功
        showsucess(){
            this.$refs.sucess.showAction = true
            setTimeout(()=>{
                this.$refs.sucess.showAction = false
                this.showPay(false)
                this.showPassWord(false)
                this.refreshOrder()
            },1000)
        },
        //密码弹窗
        showPassWord(flag,typeLeixing){
            this.$refs.actionSheetPassword.showAction = flag
            this.typeLeixing = typeLeixing
        },
        //确认收货
        completeorder(data){
            completeorderApi(data).then(res => {
                if(res.code == 0){
                    this.showPassWord(false)
                    this.refreshOrder()
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('订单Id必须大于0')
                }else if(res.code == 3){
                    Toast('支付密码不能为空')
                }else if(res.code == 21){
                    Toast('请先设置支付密码')
                    setTimeout(()=>{this.$router.push({name:'设置支付密码'})},1000)
                }else if(res.code == 22){
                    Toast('支付密码不正确')
                }else if(res.code == 23){
                    Toast('该订单不存在')
                }else if(res.code == 24){
                    Toast('该订单不属于当前用户，不能进行操作')
                }else if(res.code == 25){
                    Toast('该订单未支付，不能确认收货')
                }else if(res.code == 26){
                    Toast('该订单已完成，无需重复确认收货')
                }else if(res.code == 27){
                    Toast('该订单不是待收货状态，不能确认收货')
                }
            })
        }
    },
    components: {
        cancelOrder,
        actionSheetPassword,
        zhezhao,
        kefu,
        balanceHeader,
        actionSheetPaymen,
        actionSheetSucess
    },
};
</script>

<style scoped lang="less">
.order-detail{
    .address-p1{
        height: 200px;
        color: #333;
        padding:59px 0 0 78px;
        box-sizing: border-box;
        .p1-top{
            font-size:34px;
            margin-bottom: 25px;
        }
    }
    .address-p2{
        box-sizing: border-box;
        padding: 30px;
        background-color: #fff;
        margin-bottom: 20px;
        .p2-top{
            height: 119px;
            line-height: 119px;
            .car-icon{
                display: inline-block;
                width: 60px;
                height: 60px;
                vertical-align: text-bottom;
                margin-right:23px;
            }
        }
        .p2-bottom{
            height: 180px;
            font-size: 28px;
            position: relative;
            .bottom-left{
                height: 180px;
                line-height: 180px;
                float: left;
                margin-right:20px;
                .add-icon{
                    width: 60px;
                    height: 60px;
                    display: inline-block;
                }
            }
            .name{
                color: #333;
                margin-right:39px;
            }
            .addre{
                margin-top:32px;
                font-size: 26px;
                color: #333;
                max-height: 108px;
                overflow: hidden;
            }
        }
    }
    .address-p3{
        background-color: #fff;
        margin-bottom: 30px;
        .p3-header{
            height: 69px;
            line-height: 69px;
            font-size:26px;
            padding-left:30px;
            color: #333;
            border-bottom: 1px solid #F2F3F5;
        }
        .mingxi{
            height: 50px;
            font-size: 20px;
            padding: 0 30px;
        }
    }
    .address-p4{
        background-color: #fff;
        .p4-top{
            height: 69px;
            border-bottom: 1px solid #F2F3F5;
            font-size:26px;
            color: #333;
            line-height: 69px;
            padding-left:30px;
        }
        .p4-middle{
            padding:30px;
            border-bottom: 1px solid #F2F3F5;
            font-size: 20px;
            color: #666;
            line-height:45px;
        }
    }
    .address-p5{
        height: 90px;
        background-color: #fff;
        line-height: 90px;
        text-align: center;
        font-size: 26px;
        color: #666;
        .phone-icon{
            width: 40px;
            height: 40px;
            display: inline-block;
            vertical-align: sub;
        }
    }
}
.good-detail{
    margin-bottom: 20px;
    .good-detail-content{
        background-color: #fff;
        padding: 30px 30px;
        position: relative;
        overflow: hidden;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
            vertical-align: top;
        }
        .good-detail-title{
            width: 397px;
            display: inline-block;
            margin-left:20px;
            .name{
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                height: 48px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .guige{
                color: #999;
                font-size: 18px;
                margin-bottom: 12px;
            }
            
        }
        .price{
            float: right;
            text-align: right;
            .p3{
                font-size:28px;
                color: #333;
                margin-bottom: 5px;
            }
            .p4{
                color: #999;
                font-size: 20px;
            }
            .p2{
                color: #DB9000;
                font-size: 20px;
            }
        }
        .sqsh{
            width:128px;
            height:48px;
            border:1px solid rgba(153,153,153,1);
            border-radius:24px;
            line-height: 48px;
            text-align: center;
            margin-top:30px;
            float: right;
        }
        .c-jinse{
            color: #DB9000;
        }
    }
}
.good-detail-footer{
    height: 100px;
    border-top: 1px solid #F2F3F5;
    font-size: 30px;
    color: #666;
    background-color: #fff;
    .lan{
        height: 100%;
    }
    .btn-qzf{
        padding: 0 25px;
        height:60px;
        border:2px solid rgba(250,83,0,1);
        border-radius:30px;
        line-height: 60px;
        text-align: center;
        position: relative;
        top:50%;
        transform: translateY(-50%);
        margin-right:20px;
    }
    .btn-qxdd,.btn-xgdz{
        width:180px;
        height:60px;
        border:2px solid rgba(153,153,153,1);
        border-radius:30px;
        line-height: 60px;
        text-align: center;
        position: relative;
        top:50%;
        transform: translateY(-50%);
        margin-right:20px;
    }
}
.font-24{
    font-size: 24px;
}
.m-t-29{
    margin-top:29px;
}
</style>
