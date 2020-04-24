<template>
<!-- 批量退货退款 -->
    <div class="batch-refund">
        <balance-header title="批量退货退款"></balance-header>
        <div class="good-information">
            <scroll :data='recordGroup' class="bscroll-wrapper" ref="wrapper">
                <div class="good-detail">
                    <div class="good-detail-content" v-for="(data,index) in dataList" :key="index">
                        <van-checkbox v-model="data.checked" icon-size="24px" class="img-checkbox" checked-color="#FA5300" @click="productCheckBox(data)"></van-checkbox>
                        <div class="good-detail-img">
                            <img :src="$webUrl+data.skuImg">
                        </div>
                        <div class="good-detail-title">
                            <span class="name">{{data.skuName}}</span>
                            <div class="guige">{{data.skuValuesTitle}}</div>
                        </div>
                        <div class="price fl-right">
                            <div class="p3">{{data.currencySignWebsite}}{{data.priceWebsite}}</div>
                            <div class="p4 fl-right">x{{data.shouldReturnNum}}</div>
                        </div>
                    </div>
                </div>
                <div class="settlement-place"></div>
            </scroll>
            <div class="settlement">
                <span class="settlement-text">
                    <van-checkbox v-model="checked" icon-size="24px" class="checkbox" checked-color="#F83600" @change="allCheckBox"></van-checkbox>
                    <span class="btn1" @click="assign" :style="{backgroundColor:(btnFlag?'#FA5300':'#999')}">确认</span>
                    <span class="p1">全选</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {getconfirmreturnorderApi} from '@/api/myOrder/index.js'
import {mapState,mapActions} from 'vuex'
export default {
    props: {

    },
    data() {
        return {
            checked:false,
            recordGroup:[],
            dataList:[],
            assignFlag:false,
            btnFlag:false
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
        this.getconfirmreturnorder({orderId:this.$route.query.orderId,detailList:[]})
    },
    beforeDestroy(){
        if(this.assignFlag) {
            let arr = []
            this.dataList.forEach(item => {
                if(item.checked){
                    let obj = {
                        detailId:item.detailId,
                    }
                    arr.push(obj)
                }
            })
            this.setorderdetaillist(arr)
        }else{
            this.setorderdetaillist([])
        }
    },
    watch: {

    },
    methods: {
        ...mapActions(['setorderdetaillist']),
        //全选复选框
        allCheckBox(){
            this.dataList.forEach(ele => {
                ele.checked = this.checked
            })
            this.$forceUpdate()
            this.disabledSubmit()
            
        },
        //单件商品复选框
        productCheckBox(item){
            item.checked = !item.checked
            this.$forceUpdate()
            this.disabledSubmit()
        },
        //确定按钮
        assign(){
            if(!this.btnFlag) return
            this.assignFlag = true
            this.$router.push({name:'退货退款页面',query:{orderId:this.$route.query.orderId}})
        },

        //批量退货退款明细
        getconfirmreturnorder(data){
            getconfirmreturnorderApi(data).then(res => {
                if(res.code == 0){
                    res.Data.order.detailList.forEach(ele => {
                        if(ele.shouldReturnNum > 0){
                            this.dataList.push(ele)
                        }
                    })
                    this.dataList.forEach(item => {
                        item.checked = false
                    })
                }
            })
        },

        //判断是否有选
        disabledSubmit(){
            let flag = false
            this.dataList.forEach(ele => {
                if(ele.checked == true){
                    flag = true
                }
            })
           this.btnFlag = flag
        }
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 88px);
}
.good-detail{
    .good-detail-content{
        background-color: #fff;
        padding: 40px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 120px;
            height: 120px;
            display: inline-block;
        }
        .img-checkbox{
            display: inline-block;
            position: relative;
            top:50%;
            transform: translateY(-50%);
        }
        .good-detail-title{
            display: inline-block;
            width: 346px;
            vertical-align: top;
            .name{
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                line-height:39px;
            }
            .guige{
                color: #999;
                font-size: 18px;
                display: inline-block;
            }
        }
        .price{
            text-align: right;
            font-size: 26px;
            
            .p3{
                font-size:26px;
                color: #333;
                margin:10px 0 20px;
            }
            .p4{
                color: #999;
                font-size: 20px;
            }
        }
    }
}
.settlement-place{
    height: 120px;
}
.settlement{
    width: 100%;
    height: 120px;
    background-color:#fff;
    position:fixed;
    bottom:0px;
    z-index:3;
    line-height: 120px;
    border-top:2px solid #DCDCDC;
    border-bottom:2px solid #DCDCDC;
    .checkbox{
        display: inline-block;
        margin:39px 0 0 30px;
    }
    .settlement-text{
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 100%;;
        top:0px;
        left:0px;
        font-size: 32px;
        .p2,.p3{
            float: right;
        }
        .p1{
            position: absolute;
            left:103px;
            color: #999;
        }
        .p3{
            margin-left:18px;
        }
        .btn{
            float: right;
            width:160px;
            height:90px;
            background:linear-gradient(-90deg,rgba(248,54,0,1),rgba(250,83,0,1));
            border-radius:45px;
            color:rgba(255,255,255,1);
            line-height:90px;
            text-align: center;
            margin:16px 30px 0 18px;
        }
        .btn1{
            position: absolute;
            width: 340px;
            height: 100%;
            right:0px;
            color: #fff;
            font-size:42px;
            line-height: 120px;
            text-align: center;
            background-color: #FA5300;
        }
    }
    
}
</style>
