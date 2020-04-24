<template>
<!-- 退货退款页面 -->
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
                        <div class="guige">{{data.skuValuesTitle}}</div>
                        
                    </div>
                    <div class="price">
                        <div class="p3">{{data.currencySignWebsite}}{{data.priceWebsite}}</div>
                        <div class="p4 fl-right">x{{data.shouldReturnNum}}</div>
                    </div>
                    <div class="tkje">
                        <span class="c-999 f-22">退款金额:</span>
                        <span class="fl-right fs-26">{{data.currencySignWebsite}}{{data.totalPriceWebsite}}</span>
                    </div>
                </div>
            </div>
            <div class="cell" @click="showReason">
                <span>退款原因</span>
                <span class="text" :class="{'c-999':formData.reason=='请选择'}">{{formData.reason}}</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell">
                <span>退款金额</span>
                <span class="text-tk c-orange f-30">
                    <span>{{orderData.currencySignWebsite}}{{orderData.orderAmountWebsite}}</span> 
                    <span class="c-999 f-22">(含运费）</span>
                </span>
            </div>
        </div>
        <div class="cell">
            <span>退款说明</span>
            <input type="text" class="input-xt" placeholder="选填" v-model="formData.remark">
        </div>
        <div class="up-load">
            <div class="title">上传凭证</div>
            <div class="uploader">
                <upload-all @getfilePathList="getfilePathList" :maxCount="6"></upload-all>
            </div>
        </div>
        <div class="btn-submit" @click="submit">提交</div>
        <!-- 退款原因 -->
        <refundReason ref="refundReason" @getReasonText="getReasonText"></refundReason>
    </div>
</template>

<script>
import refundReason from './itemComponents/refundReason.vue'
import uploadAll from '@/multiplexing/uploadAll.vue'
import balanceHeader from './itemComponents/balanceHeader'
import {getconfirmreturnorderApi,returnorderApi} from '@/api/myOrder/index.js'
import {mapState,mapActions} from 'vuex'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            fileList:[],
            show1:false,
            uploadList:[],
            headerTitle:'申请退货退款',
            dataList:[],
            orderData:{},
            formData:{
                orderId:'',
                orderSource:1,
                reason:'请选择',
                remark:'',
                detailList:[],
                imgList:[]
            },
            go:null
        };
    },
    computed: {
        ...mapState({
            orderdetailList:state=>state.orderdetailList
        }),
    },
    created() {

    },
    mounted() {
        this.getconfirmreturnorder({orderId:this.$route.query.orderId,detailList:this.orderdetailList})
        this.formData.orderId = this.$route.query.orderId
    },
    beforeDestroy(){
        this.setorderdetaillist([])
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            if(from.name == '订单详情'){
                vm.go = -1
            }else if(from.name=='批量退货退款'){
                vm.go = -2
            }
        })
    },
    watch: {

    },
    methods: {
         ...mapActions(['setorderdetaillist']),
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
        //批量退货退款明细
        getconfirmreturnorder(data){
            getconfirmreturnorderApi(data).then(res => {
                if(res.code == 0){
                    this.orderData = res.Data.order
                    this.dataList = res.Data.order.detailList
                    this.dataList.forEach(item => {
                        item.checked = false
                    })
                }
            })
        },
        //提交
        submit(){
            if(this.formData.reason == '请选择') {
                Toast('请选择退款原因')
                return
            }
            let arr = []
            let imgList = []
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
                    detailNum:item.shouldReturnNum
                }
                arr.push(obj)
            })
            this.formData.detailList = arr
            this.returnorder(this.formData)
        },
        //订单申请退货退款
        returnorder(data){
            returnorderApi(data).then(res => {
                if(res.code == 0){
                    this.$router.go(this.go)
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('参数订单Id必须大于0')
                }else if(res.code == 3){
                    Toast('退货退款单来源不能为空')
                }else if(res.code == 4){
                    Toast('请选择退货退款原因')
                }else if(res.code == 11){
                    Toast('参数商品列表detailList不能为空')
                }else if(res.code == 12){
                    Toast('参数退货退款商品数量必须大于0')
                }else if(res.code == 21){
                    Toast('该订单不存在')
                }else if(res.code == 22){
                    Toast('该订单不属于当前用户，您无权限操作该订单')
                }else if(res.code == 23){
                    Toast('FBM订单不能申请退货退款')
                }else if(res.code == 24){
                    Toast('该订单未付款，不能申请仅退款')
                }else if(res.code == 25){
                    Toast('该订单暂无可申请退货退款商品')
                }else if(res.code == 26){
                    Toast('申请退货退款商品数量已超过可申请退货退款商品数量')
                }
            })
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
    position: relative;
    min-height: 100vh;
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
            margin-left:40px;
            height: 40px;
            border: 0;
        }
    }
    .btn-submit{
        width: 100vw;
        height:100px;
        position: absolute;
        bottom: 0;
        background:rgba(250,83,0,1);
        font-size:36px;
        line-height: 100px;
        text-align: center;
        color: #fff;
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
    }
    .good-detail-content{
        background-color: #fff;
        padding: 30px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
            vertical-align: top;
            margin-right:20px;
        }
        .good-detail-title{
            display: inline-block;
            width: 397px;
            .name{
                display: inline-block;
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
                margin-bottom: 28px;
            }
        }
        .price{
            float: right;
            text-align: right;
            font-size: 26px;
            .p3{
                font-size:26px;
                color: #333;
                margin-bottom: 24px;
            }
            .p4{
                color: #999;
                font-size: 20px;
            }
        }
        .tkje{
            height: 50px;
            line-height: 50px;
            margin-left:170px;
        }
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
