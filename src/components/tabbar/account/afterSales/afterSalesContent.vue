<template>
    <div>
        <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
            <div class="bscroll-con" v-if="dataList.length>0">
                <div class="good-detail" v-for="(product,index) in dataList" :key="index">
                    <div class="good-detail-header">
                        <span>编号：{{product.orderSn}}</span>
                        
                        <span class="fl-right c-orange">{{orderStatus(product.orderStatusApp,'statusList')}}</span>
                        <br><span>订单编号:{{product.saleOrderSn}}</span>
                    </div>
                    <div class="good-detail-content" v-for="(detail,index) in product.detailList2" :key="index">
                        <div class="good-detail-img">
                            <img :src="$webUrl+detail.skuImg">
                        </div>
                        <div class="good-detail-title">
                            <span class="name">{{detail.skuName}}</span>
                            <div class="guige">{{detail.skuValuesTitle}}</div>
                        </div>
                        <div class="price">
                            <div class="p4 fl-right">x{{detail.detailNum}}</div>
                        </div>
                    </div>
                    <div class="good-detail-dfh-footer">
                        <div class="dfh-footer-top" v-if="product.detailList.length > 2" @click="shousuo(product)">
                            <span>查看其他{{product.lengcha}}个商品</span>
                            <van-icon name="arrow-down" v-if="product.arrowDown"/>
                            <van-icon name="arrow-up" v-else/>
                        </div>
                        <div class="dfh-footer-bottom">
                            <div class="icon-img">
                                <img src="@/assets/img/confirmOrder/refund@2x.png">
                            </div>
                            <span>{{orderStatus(product.backType,'backTypeList')}}</span>
                            <div class="btn-detail c-orange" @click="toDetail(product.orderId)">查看详情</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <noSearch></noSearch>
            </div>
        </scroll>
    </div>
</template>

<script>
import {backorderlistApi} from '@/api/afterSales/index'
import noSearch from './itemComponents/noSearch'
export default {
    props: {

    },
    data() {
        return {
            arrowDown:true,
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,
            formData:{
                page:1,
                limit:10
            },
            dataList:[],
            totalCount:0,
            statusList:[
                {type:0,name:'待审核'},
                {type:1,name:'待寄回'},
                {type:2,name:'待退款'},
                {type:3,name:'退款成功'},
                {type:4,name:'已拒绝'},
                {type:5,name:'已取消'},
            ],
            backTypeList:[
                {type:1,name:'仅退款'},
                {type:2,name:'退货退款'},
                {type:3,name:'退货'},
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.backorderlist(this.formData,true)
    },
    watch: {

    },
    methods: {
        toDetail(id){
            this.$router.push({name:'售后详情',query:{id}})
        },
        jumpRouter(name){
            this.$router.push({name})
        },
        //售后列表
        backorderlist(data,flag){
            backorderlistApi(data).then(res => {
                if(res.code == 0){
                    if(flag){
                        this.dataList = res.Data.list
                    }else{
                        this.dataList = this.dataList.concat(res.Data.list)
                    }
                    this.totalCount = res.Data.totalCount
                    this.recordGroup = this.dataList

                    if(this.dataList.length > 0){
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                        if(this.dataList.length > 2){
                            this.dataList.forEach(item => {
                                item.detailList2 = item.detailList.slice(0,2)
                                item.lengcha = item.detailList.length - 2
                                item.arrowDown = true
                            })
                        }else{
                            this.dataList.forEach(item => {
                                item.detailList2 = item.detailList
                                item.lengcha = item.detailList.length
                            })
                        }
                    }else{
                        this.pulldown = false
                        this.pullup = false
                    }
                }
            })
        },
        //下拉刷新
        _pulldown() {
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup() {
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.backorderlist(this.formData,false)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
        },
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.backorderlist(this.formData,true)
            this.pullup = true
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
        //收缩栏逻辑
        shousuo(list){
            list.arrowDown = !list.arrowDown
            if(list.arrowDown){
                list.detailList2 = list.detailList.slice(0,2)
            }else{
                list.detailList2 = list.detailList
            }
            this.$forceUpdate()
        },
    },
    components: {
        noSearch
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height:calc(100vh - 120px)
}
.good-detail{
    margin-bottom: 20px;
    .good-detail-header{
        line-height: 40px;
        font-size:26px;
        color: #333;
        background-color: #fff;
        padding:10px 30px;
        border-bottom: 1px solid #F2F3F5;
    }
    .good-detail-content{
        background-color: #fff;
        padding: 30px 30px 0;
        position: relative;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
            vertical-align: top;
            margin:0 19px 19px 0;
        }
        .good-detail-title{
            display: inline-block;
            width: 398px;
            .name{
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                line-height: 39px;
                -webkit-line-clamp:2;
                display: -webkit-box; 
                -webkit-box-orient:vertical;
                overflow:hidden; 
                text-overflow: ellipsis;
            }
            .guige{
                color: #999;
                font-size: 18px;
                display: inline-block;
                margin-bottom: 28px;
            }
            
        }
        .price{
            position: absolute;
            top:30px;
            right:30px;
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
            .p5{
                margin-top:75px;
                span{
                    &:nth-child(3){
                        font-size: 30px;
                    }
                }
            }
            .selection-right-stepper{
                position: relative;
                width: 100%;
                height: 156px;
                .add-btn{
                    position: absolute;
                    top:20px;
                    right:0;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .reduce-btn{
                    position: absolute;
                    top:20px;
                    right:128px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .num{
                    position: absolute;
                    top:20px;
                    right:40px;
                    width: 88px;
                    height: 40px;
                    border-top: 1px solid #999999;
                    border-bottom: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                }
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
            width:150px;
            height:60px;
            border:1px solid rgba(250,83,0,1);
            border-radius:30px;
            line-height: 60px;
            text-align: center;
            position: relative;
            top:50%;
            transform: translateY(-50%)

        }
        .btn-qxdd,.btn-xgdz{
            width:180px;
            height:60px;
            border:1px solid rgba(153,153,153,1);
            border-radius:30px;
            line-height: 60px;
            text-align: center;
            position: relative;
            top:50%;
            transform: translateY(-50%);
            margin-right:20px;
        }
    }
    .good-detail-dfh-footer{
        border-top: 1px solid #F2F3F5;
        font-size: 30px;
        color: #333;
        background-color: #fff;
            
        .dfh-footer-top{
            height: 60px;
            text-align: center;
            font-size: 20px;
            line-height:60px;
            border-bottom: 1px solid #F2F3F5;
        }
        .dfh-footer-bottom{
            height: 100px;
            line-height: 100px;
            font-size: 26px;
            color: #333;
            padding: 0 30px;
            .icon-img{
                width: 36px;
                height: 36px;
                display: inline-block;
                vertical-align:sub;
                margin-right:22px;
            }
            .btn-detail{
                width:160px;
                height:60px;
                border:2px solid rgba(250,83,0,1);
                border-radius:6px;
                float: right;
                margin-top:18px;
                font-size:26px;
                text-align: center;
                line-height: 60px;
            }
        }
        
    }
}
</style>
