<template>
<!-- 商品规格选择左右 废弃-->  
    <div class="modal">
        <div class="commodity-selection">
            <div class="selection-title">
                <div class="selection-img">
                    <img :src="$webUrl+titleImg" alt="">
                </div>
                <div class="p1">
                    <span>{{attrTitle}}</span>
                    <span>TSIN:{{tsinCode}}</span>
                    <span class="c-orange">{{jn}}{{sectionPrice}}</span>
                </div>
                <van-icon name="cross" class="cross" @click="closeModal"/>
            </div>
            <div class="selection-conten" @click.stop>
                <van-sidebar v-model="activeKey" class="selection-sidebar" @change="cliLeft">
                    <van-sidebar-item :title="leftData.attrTitle" v-for="leftData in dataList" :key="leftData.attrId"/>
                </van-sidebar>
                <div class="selection-right"  v-for="(rightData,index) in leftDataItem" :key="index" :class="{active: currentKey === index}" @click="son(index)">
                    <div class="selection-right-item" @click="getIndex(index)">
                        <div class="shouwan" v-if="!rightData.canSalesNum">售罄</div>
                        <div class="selection-right-p1">
                            <span class="ggms">{{rightData.attrTitle}}</span>
                            <div class="jsq">
                                <div class="reduce-btn" @click="operationNumber('jian',rightData)">
                                    <span>一</span>
                                </div>
                                <div class="num">
                                    <!-- <span>{{rightData.shopNumber}}</span> -->
                                    <input type="number" class="number-input" v-model="rightData.shopNumber" @blur="blur(rightData)">
                                </div>
                                <div class="add-btn" @click="operationNumber('jia',rightData)">
                                    <van-icon name="plus" />
                                </div>
                            </div>
                        </div>
                        <div class="selection-right-p2">
                            <span>{{jn}}{{rightData.skuPrice}}</span>
                            <span class="fl-right">库存:{{rightData.canSalesNum ? rightData.canSalesNum : 0}}</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <span class="c-orange" style="margin-left:10px;">{{jn}}{{money}}</span>
                    <span>件</span>
                    <span class="c-orange">&nbsp;{{leijia}} &nbsp;</span>  
                    <span>共 </span>
                </div>
                <div>
                    <div class="success-btn"  v-if="btnStatus" @click="buyProduct" :style="{backgroundColor:btnbgc}">{{btnName}}</div>
                    <div class="success-btn" v-else>
                        <div class="btn-jrgwc" @click="buyshoppingCar" :style="{backgroundColor:btncolor.bgc,color:btncolor.color}">加入购物车</div>
                        <div class="btn-qd" @click="buyProduct" :style="{backgroundColor:btnbgc}">立即购买</div>
                    </div>
                </div>
                <div class="ios-place" v-if="jixing=='ios'"></div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import {addshopcartApi,getproductskunumpricelistApi} from '@/api/shoppingCart/index'
import { Toast } from 'vant';
import {mapActions} from 'vuex'
export default {
    props: {
        selectionData:{
            type:Object,
            default: ()=>{
                return {}
            }
        },
        btnStatus:{
            type:Boolean,
            default:false
        },
        btnName:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            activeKey:0,
            selectionObj:{},
            dataList:[],
            leftDataItem:[],
            titleImg:'',
            attrTitle:'',
            sectionPrice:0,
            money:0,
            leijia:0,
            currentKey:-1,
            tsinCode:'',
            jixing:null
        };
    },
    computed: {
        btnbgc(){
            let bgc = this.leijia>0 ? '#FA5300' : '#999'
            return bgc
        },
        btncolor(){
            let obj = {
                color: this.leijia>0 ? '#FA5300' : '#fff',
                bgc: this.leijia>0 ? '#FFC4A6' : '#999'
            }
            
            return obj
        }
    },
    created() {

    },
    mounted() {
        function checkSystem() {
            var u = window.navigator.userAgent, app = window.navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                return 'android'
            }
            if (isIOS) {
                return 'ios';
            }
        }
        this.jixing = checkSystem()
    },
    watch: {
        selectionData:{
            handler:function(newVal, oldVal){
                this.getData()
            },
        },
    },
    methods: {
        ...mapActions( // 语法糖
            ['setstopcarlist'] // 相当于this.$store.dispatch('setstopcarlist'),提交这个方法
        ),
        //关闭规格
        closeModal(){
            this.$emit('changeComStatus',false)
        },
        getData(){
            this.selectionObj = Object.assign({},this.selectionObj,this.selectionData)
            this.dataList = this.selectionObj.productSkuList
            let arr = []
            let arr2 = []
            this.dataList.forEach(item => {
                item.tpproductskuattrvalue.forEach(item2 => {
                    item2.shopNumber = 0
                    //价格区间(最小值和最大值)
                    if(item.tpproductskuattrvalue.length > 1){
                        arr.push(item2.skuPrice)
                        arr.sort(function (a, b) {
                            return a-b;
                        }); 
                        let min = arr[0];
                        let max = arr[arr.length - 1];
                        item.sectionPrice = min + '~' + max

                        
                    }else{
                        item.sectionPrice = item2.skuPrice
                    }
                })
            })
            this.leftDataItem = this.dataList[0].tpproductskuattrvalue
            this.titleImg = this.leftDataItem[0].imgUrl
            this.attrTitle = this.leftDataItem[0].supplyTitle
            this.tsinCode = this.leftDataItem[0].tsinCode
            this.sectionPrice = this.dataList[0].sectionPrice
        },
        //点击左侧导航
        cliLeft(index){
            this.leftDataItem = this.dataList[index].tpproductskuattrvalue
            this.titleImg = this.leftDataItem[0].imgUrl
            this.attrTitle = this.leftDataItem[0].supplyTitle
            this.tsinCode = this.leftDataItem[0].tsinCode
            this.sectionPrice = this.dataList[index].sectionPrice
            this.currentKey = -1
        },
        getIndex(i){
            this.titleImg = this.leftDataItem[i].imgUrl
        },
        //数量加减
        operationNumber(type,data){
            let arr = []
            if(type=='jian'){
                if(data.shopNumber == 0) {
                    return
                }else if(data.shopNumber <= data.numIntervalStart){
                    data.shopNumber = 0
                }else{
                    data.shopNumber--
                }
            }else{
                if(data.canSalesNum > 0){
                    if(data.shopNumber<data.numIntervalStart){
                        data.shopNumber = data.numIntervalStart
                    }else if(data.shopNumber >= data.canSalesNum){
                        return
                    }else{
                        data.shopNumber++
                    }
                }else{
                    return
                }
            }
            this.dataList.forEach(ele => {
                ele.tpproductskuattrvalue.forEach(item => {
                    if(item.shopNumber > 0){
                        let obj = {
                            num:item.shopNumber,
                            skuId:item.skuId
                        }
                        arr.push(obj)
                    }
                })
            })
            this.getproductskunumpricelist(arr)
            this.$forceUpdate()
        },
        //点击确定收入购物车
        buyshoppingCar(){
            this.addshopcart(this.dataList)
        },
        //添加购物车
        addshopcart(data){
            let arr = data
            data = []
            arr.forEach(ele => {
                ele.tpproductskuattrvalue.forEach(item => {
                    if(item.shopNumber > 0){
                        let obj = {
                            businessId:this.selectionObj.businessId,
                            priceId:item.priceId,
                            shopNumber:item.shopNumber,
                            skuId:item.skuId,
                            status:0,
                            supplyId:item.supplyId,
                            warehouseId:item.warehouseId
                        }
                        data.push(obj)
                    }
                })
            })
            if(data.length == 0) return
            addshopcartApi(data).then(res => {
                if(res.code == 0){
                    Toast('成功添加购物车');
                    setTimeout(()=>{
                        this.closeModal()
                    },1000)
                }
            })
        },
        //确定按钮购买商品
        buyProduct(){
            if(this.btnName == '确定'){
                this.buyshoppingCar()
                return
            }
            let data = []
            this.dataList.forEach(ele => {
                ele.tpproductskuattrvalue.forEach(item => {
                    if(item.shopNumber > 0){
                        let obj = {
                            skuId:item.skuId,
                            detailNum:item.shopNumber
                        }
                        data.push(obj)
                    }
                })
            })
            if(data.length == 0) return
            this.setstopcarlist(data)
            this.$router.push({name:'确认订单详情'})
        },
        //input失焦事件
        blur(item){
            let arr = []
            if(item.shopNumber<item.numIntervalStart && item.shopNumber != 0 ){ 
                item.shopNumber = item.numIntervalStart
            }else if(item.shopNumber > item.canSalesNum){
                item.shopNumber = item.canSalesNum
            }
            item.shopNumber = Math.ceil(item.shopNumber)
            this.dataList.forEach(ele => {
                ele.tpproductskuattrvalue.forEach(item => {
                    if(item.shopNumber > 0){
                        let obj = {
                            num:item.shopNumber,
                            skuId:item.skuId
                        }
                        arr.push(obj)
                    }
                })
            })
            this.getproductskunumpricelist(arr)
            this.$forceUpdate()
        },
        //点击变色
        son(key){
            this.currentKey =  key
            this.attrTitle = this.leftDataItem[key].supplyTitle
            this.tsinCode = this.leftDataItem[key].tsinCode
            setTimeout(()=>{this.sectionPrice = this.leftDataItem[key].skuPrice},100)
        },
        //根据商品skuid与商品数量获取优惠价
        getproductskunumpricelist(data){
            getproductskunumpricelistApi(data).then(res => {
                if(res.code == 0){
                    this.leijia = res.totalnum
                    this.money = res.totalprice
                    this.dataList.forEach(ele => {
                        ele.tpproductskuattrvalue.forEach(item => {
                            res.Data.forEach(dataItem => {
                                if(dataItem.skuId == item.skuId){
                                    item.skuPrice = dataItem.price
                                }
                            })
                        })
                    })
                }
            })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.modal{
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
}
.commodity-selection{
    width: 100%;
    background:rgba(242,243,245,1);
    max-height: 90%;
    position: absolute;
    bottom: 0;
    // overflow: auto;
    .selection-title{
        width: 100%;
        height: 201px;
        border-bottom: 2px solid #DCDCDC;
        .selection-img{
            width: 200px;
            height: 200px;
            position: absolute;
            top:-30px;
            left:40px;
        }
        .p1{
            position: absolute;
            width:378px;
            height:64px;
            left:259px;
            top:29px;
            color: #010101;
            font-size: 26px;
            line-height: 40px;
            span{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
        .cross{
            position: absolute;
            top:86px;
            right:45px;
            font-size: 29px;
            color: #666666;
        }
    }
    .selection-conten{
        width: 100%;
        position: relative;
        max-height: 1000px;
        overflow: auto;
        .selection-sidebar{
            float: left;
            width: 220px;
            max-height: 750px;
            overflow-y: auto;
            .van-sidebar-item{
                width: 220px;
                height: 160px;
                display: inline-block;
                line-height: 120px;
                text-align: center;
                font-size: 22px;
                border-bottom:1px solid #dcdcdc;
                /deep/ .van-sidebar-item__text{
                    line-height: 40px;
                }
            }
            /deep/ .van-sidebar-item--select{
                background-color: #F2F3F5;
                border-left:15px solid red;
            }
        }
        .selection-right{
            position: relative;
            float: right;
            width: 530px;
            max-height: 750px;
            overflow-y: auto;
            .selection-right-item{
                padding: 37px 30px 19px 17px;
                .shouwan{
                    position: absolute;
                    left:0;
                    top:0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    color: #fff;
                    font-size: 30px;
                    line-height: 40px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                }
                .selection-right-p1{
                    overflow: hidden;
                    .ggms{
                        width: 175px;
                        float: left;
                    }
                    .jsq{
                        float: right;
                        .add-btn{
                            float: left;
                            width: 60px;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                            background-color: #EEEEEE;
                            border: 1px solid #999999;
                        }
                        .reduce-btn{
                            float: left;
                            width: 60px;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                            background-color: #EEEEEE;
                            border: 1px solid #999999;
                        }
                        .num{
                            float: left;
                            width: 124px;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                            background-color: #fff;
                            font-size: 36px;
                            color: #333;
                            .number-input{
                                width: 100%;
                                height: 94%;
                                text-align: center;
                                border:0;
                                border-top:1px solid #999999;
                                border-bottom:1px solid #999999;
                            }
                        }
                    }
                }
                .selection-right-p2{
                    margin-top:18px;
                    color: #666;
                    font-size: 18px;
                }
            }
            
        }
    }
    .total{
        height: 40px;
        line-height: 40px;
        padding-right: 40px;
        float: left;
        width: 100%;
        box-sizing: border-box;
        span{
            float: right;
        }
    }
    .success-btn{
        width: 100%;
        float: left;
        height: 110px;
        line-height: 110px;
        color: #fff;
        text-align: center;
        font-size: 42px;
        .btn-jrgwc,.btn-qd{
            width: 50%;
            float: left;
            font-size: 42px;
            text-align: center;
            line-height: 110px;
            color: #FA5300;
        }
        .btn-qd{
            color: #fff;
        }
    }
    .ios-place{
        width: 100%;
        float: left;
        height: 140px;
    }
    .active{
        background: #969292;
    }
}
</style>
