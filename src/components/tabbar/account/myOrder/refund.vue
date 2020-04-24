<template>
<!-- 退款页面 -->
    <div class="refund">
        <balance-header :title="headerTitle"></balance-header>
        <div class="good-information">
            <div class="good-detail" >
                <div class="good-detail-header">
                    <span>商品信息</span>
                </div>
                <div class="good-detail-content" v-for="(data,index) in dataList" :key="index">
                    <div class="good-detail-img">
                        <img :src="$webUrl+data.skuImg">
                    </div>
                    <div class="good-detail-title">
                        <span class="name">{{data.skuName}}</span>
                        <div class="guige">
                            {{data.skuValuesTitle}}
                        </div>
                    </div>
                    <div class="price">
                        <div class="p3">
                            {{data.currencySignWebsite}}{{data.priceWebsite}}
                        </div>
                        <div class="p4 fl-right">
                            x{{data.shouldRefundNum}}
                        </div>
                    </div>
                    <div class="tkje">
                        <span class="t1">运费:</span>
                        <span class="fl-right t2">{{data.currencySignWebsite}}{{detailObj.orderFareWebsite}}</span>
                    </div>
                    <div class="tkje">
                        <span class="t1">退款金额:</span>
                        <span class="fl-right t2">{{data.currencySignWebsite}}{{data.totalPriceWebsite}}</span>
                    </div>
                </div>
            </div>
            <div class="cell" @click="showReason">
                <span>退款原因</span>
                <span class="text " :class="{'c-999': formData.reason == '请选择'}">{{formData.reason}}</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell">
                <span>退款金额</span>
                <span class="text-tk c-orange f-30">
                    {{detailObj.currencySignWebsite}}{{detailObj.orderAmountWebsite}}
                    <span class="c-999 f-22">(含运费）</span>
                </span>
            </div>
        </div>
        <div class="cell">
            <span>退款说明</span>
            <input type="text" class="input-xt" placeholder="选填" v-model="formData.remark">
        </div>
        <div class="up-load">
            <div class="title">
                上传凭证
            </div>
            <div class="uploader">
                <upload-all @getfilePathList="getfilePathList" :maxCount="6"></upload-all>
            </div>
        </div>
        <p class="f-22 c-999">注:确认退款，平台将扣除您订单总金额1%的手续费用！</p>
        <div class="btn-submit" @click="submit">提交</div>
        <!-- 退款原因 -->
        <refundReason ref="refundReason" @getReasonText="getReasonText"></refundReason>
    </div>
</template>

<script>
import refundReason from './itemComponents/refundReason.vue'
import uploadAll from '@/multiplexing/uploadAll.vue'
import balanceHeader from './itemComponents/balanceHeader'
import {getconfirmrefundorderApi,refundorderApi} from '@/api/myOrder/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            fileList:[],
            show1:false,
            uploadList:[],
            headerTitle:'申请退款',
            formData:{
                orderId:'',
                orderSource:1,
                reason:'请选择',
                remark:'',
                detailList:[],
                imgList:[

                ]
            },
            detailObj:{},
            dataList:[],

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.formData.orderId = this.$route.query.orderId
        this.getconfirmrefundorder({orderId:this.$route.query.orderId})
    },
    watch: {

    },
    methods: {
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
        },
        //弹出退款原因弹窗
        showReason(){
            this.$refs.refundReason.closeStatu = true
        },
        //获取退款原因
        getReasonText(text){
            this.formData.reason = text
        },
        //获取上传图片列表
        getfilePathList(list){
            this.uploadList = list
            
        },
        //订单申请仅退款页面获取订单和订单商品明细
        getconfirmrefundorder(data){
            getconfirmrefundorderApi(data).then(res => {
                if(res.code == 0){
                    this.detailObj = res.Data.order
                    this.dataList = this.detailObj.detailList
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('参数orderId必须大于0')
                }else if(res.code == 3){
                    Toast('该订单暂无可申请仅退款的商品')
                }else if(res.code == 4){
                    Toast('您无权限查看该订单或者该订单不存在')
                }
            })
        },

        //订单申请仅退款
        refundorder(data){
            data.reason = data.reason == '请选择' ? '': data.reason
            refundorderApi(data).then(res => {
                if(res.code == 0){
                    Toast('提交成功')
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('参数订单Id必须大于0')
                }else if(res.code == 3){
                    Toast('退款单来源不能为空')
                }else if(res.code == 4){
                    Toast('请选择退款原因')
                }else if(res.code == 11){
                    Toast('参数商品列表detailList不能为空')
                }else if(res.code == 12){
                    Toast('参数退款商品数量必须大于0')
                }else if(res.code == 21){
                    Toast('该订单不存在')
                }else if(res.code == 22){
                    Toast('该订单不属于当前用户，您无权限操作该订单')
                }else if(res.code == 23){
                    Toast('该订单不是待发货状态，不能申请仅退款')
                }else if(res.code == 24){
                    Toast('该订单未付款，不能申请仅退款')
                }else if(res.code == 25){
                    Toast('该订单已申请仅退款，不能重复申请')
                }else if(res.code == 26){
                    Toast('该订单可退款数量已经改变，请重新确认退款单')
                }
            })
        },
        //提交订单
        submit(){
            if(this.formData.reason == '请选择') {
                Toast('请选择退款原因')
                return
            }
            let arr = []
            let imgList = []
            // this.formData.imgList = this.uploadList
            this.uploadList.forEach(ele => {
                let obj = {
                    imgUrl:ele
                }
                imgList.push(obj)
                
            })
            this.formData.imgList = imgList

            this.dataList.forEach(item => {
                let obj = {
                    detailId:item.detailId,
                    detailNum:item.shouldRefundNum
                }
                arr.push(obj)
            })
            this.formData.detailList = arr
            this.refundorder(this.formData)
        }
    },
    components: {
        refundReason,
        uploadAll,
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.refund{
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        color: #333;
        position: relative;
        font-size: 26px;
        margin-bottom: 20px;
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
        .text{
            position: absolute;
            right:60px;
        }
        .text-tk{
            position: absolute;
            right:30px;
        }
        .input-xt{
            width: 500px;
            margin-left:40px;
            height: 40px;
            border: 0;
        }
    }
    .btn-submit{
        width: 100vw;
        height:100px;
        background:rgba(250,83,0,1);
        font-size:36px;
        line-height: 100px;
        text-align: center;
        color: #fff;
        margin: 50px 0 80px
    }
}
.good-detail{
    margin-bottom: 20px;
    .good-detail-header{
        width: 100%;
        height: 79px;
        line-height: 79px;
        font-size:26px;
        color: #333;
        background-color: #fff;
        padding-left: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #F2F3F5;
        .dfk{
            float: right;
            margin-right: 30px;
        }
    }
    .good-detail-content{
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 30px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
        }
        .good-detail-title{
            display: inline-block;
            width: 336px;
            vertical-align: top;
            margin-left:20px;
            .name{
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .guige{
                color: #999;
                font-size: 18px;
                display: inline-block;
                margin-bottom: 28px;
            }
        }
        .price{
            float: right;
            text-align: right;
            font-size: 26px;
            .p4{
                color: #999;
                font-size: 20px;
            }
        }
        .tkje{
            margin-left:170px;
            height: 40px;
            line-height: 40px;
            .t1{
                color: #999;
                font-size: 22px;
            }
            .t2{
                font-size:26px;
                color: #333;
            }
        }
    }
    .good-detail-footer{
        height: 100px;
        border-top: 1px solid #F2F3F5;
        font-size: 30px;
        color: #666;
        background-color: #fff;
    }
}
.up-load{
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 40px;
    .title{
        margin-bottom: 32px;
        font-size: 26px;
    }
    .uploader{
        width: 100%;
        position: relative;
        /deep/ .van-row{
            .van-col{
                position: relative;
                .uploader-name{
                    position: absolute;
                    bottom: -125px;
                    width: 172px;
                    text-align: center;
                    font-size: 24px;
                    color: #666;
                }
            }
        }
    }
}
.f-30{
    font-size: 30px;
}
.f-22{
    font-size: 22px;
}

</style>
