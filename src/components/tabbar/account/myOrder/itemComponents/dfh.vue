<template>
<!-- 待发货类型 -->
    <div class="dfh">
        <div class="good-detail" v-for="dfhData in dfhDataList" :key="dfhData.orderId">
            <div class="good-detail-header">
                <span>订单编号：{{dfhData.orderSn}}</span>
                <span class="dfk c-orange">待发货</span>
            </div>
            <div class="good-detail-content" @click="toEditAddress" v-for="detail in dfhData.detailList2" :key="detail.detailId">
                <div class="good-detail-img">
                    <img :src="$webUrl+detail.skuImg">
                </div>
                <div class="good-detail-title">
                    <span class="name">{{detail.skuName}}</span>
                    <div class="guige">
                        {{detail.skuValuesTitle}}
                    </div>
                </div>
                <div class="price">
                    <div class="p3">
                        {{detail.currencySignWebsite}}{{detail.priceWebsite}}
                    </div>
                    <div class="p4 through">
                        {{detail.currencySignWebsite}}{{detail.originPriceWebsite}}
                    </div>
                    <div class="p4 fl-right">
                        x{{detail.detailNum}}
                    </div>
                    
                </div>
                <div style="height:35px;">

                </div>
            </div>
            <div class="good-detail-dfh-footer">
                <div class="dfh-footer-top" v-if="dfhData.detailListFlag" @click="lookTotal">
                    <span v-if="arrowDown">查看其他{{dfhData.lengcha}}个商品</span>
                    <span v-else>收起</span>
                    <van-icon name="arrow-down" v-if="arrowDown" />
                    <van-icon name="arrow-up" v-else/>
                </div>
                <div class="dfh-footer-bottom">
                    <span>共{{dfhData.goodCount}}件</span>
                    <span>合计:</span>
                    <span class="c-orange font-30">{{dfhData.currencySignWebsite}}{{dfhData.orderProductAmountWebsite}}</span>
                    <span>(含运费{{dfhData.currencySignWebsite}}{{dfhData.orderFareWebsite}}）</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dfhList:{
            type:Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            arrowDown:true,
            dfhDataList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {
        dfhList:{
            handler:function(newVal){
                this.getData()
            }
        }
    },
    methods: {
        toEditAddress(){
            this.$router.push({name:'订单详情'})
        },
        //获取数据
        getData(){
            this.dfhDataList = this.dfhList.map(o => Object.assign({}, o));
            this.shousuo(this.dfhDataList)
        },
        //收缩栏逻辑
        shousuo(list){
           list.forEach(item => {
                if(item.detailList.length > 2){
                    item.detailListFlag = true
                    item.lengcha = item.detailList.length - 2
                    item.detailList2 = item.detailList.slice(0,2);
                    
                }else{
                    item.detailListFlag = false
                    item.detailList2 = item.detailList
                }
            })
        },
        //查看全部商品
        lookTotal(){
            if(this.arrowDown){
                this.dfhDataList.forEach(item => {
                    item.detailList2 = item.detailList
                })
            }else{
                this.shousuo(this.dfhDataList)
            }
            this.arrowDown = !this.arrowDown 
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
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
        padding: 0 30px;
        position: relative;
        .good-detail-img{
            width: 150px;
            height: 150px;
            position: relative;
            top:30px;
            left:0px;
            display: inline-block;
        }
        .good-detail-title{
            display: inline-block;
            position: absolute;
            width: 336px;
            top:30px;
            left:200px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
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
                margin-bottom: 12px;
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
        // height: 120px;
        border-top: 1px solid #F2F3F5;
        font-size: 30px;
        color: #333;
        background-color: #fff;
            
        .dfh-footer-top{
            height: 60px;
            text-align: center;
            font-size: 20px;
            line-height:60px;
        }
        .dfh-footer-bottom{
            height: 60px;
            text-align: right;
            font-size: 20px;
            line-height:60px;
        }
    }
}
</style>
