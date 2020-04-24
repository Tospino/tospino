<template>
<!-- 商品规格选择-->
    <div class="modal" @click="closeModal">
        <div class="commodity-selection" @click.stop>
            <div class="selection-title">
                <div class="selection-img">
                    <van-uploader v-model="fileList" multiple :max-count="1" class="good-img" :deletable ="false"/>
                </div>
                <div class="p1">
                    <span>{{attrTitle}}</span>
                    <span>TSIN:{{tsinCode}}</span>
                    <span class="c-orange">{{jn}}{{sectionPrice}}</span>
                    <span style="color:red">{{tips}}</span>
                </div>
                <van-icon name="cross" class="cross" @click="closeModal"/>
            </div>
            <div class="selection-conten" @click.stop>
                <div>
                    <div class="guige-title">{{oneTitle}}</div>
                    <div class="guige-list">
                        <span class="guige-items" v-for="(one,index) in onedata" :key="index" @click="checkOneItem(one,index)" :class="{active: one.ischeck == true}">{{one.valueVal}}</span>
                    </div>
                </div>
                <div>
                    <div class="guige-title">{{twoTitle}}</div>
                    <div class="guige-list">
                        <span class="guige-items" v-for="(two,index) in twodata" :key="index" @click="checkTwoItem(two,index)" :class="{active: two.ischeck == true}">{{two.valueVal}}</span>
                    </div>
                </div>
                <div class="quantity">
                    <div class="guige-title">数量</div>
                    <div class="stepper">
                        <div class="reduce-btn" @click="operation('jian')">一</div>
                        <div class="num">
                            <input type="number" class="number-input" @blur="blur(makeItem)" v-model="goodNumber">
                        </div>
                        <div class="add-btn" @click="operation('jia')">十</div>
                    </div>
                </div>
                <div class="fl-right stock">库存:{{stock}}</div>
                <div class="footer">
                    <div class="success-btn"  v-if="btnStatus" @click="buyProduct" :style="{backgroundColor:btnbgc}">{{btnName}}</div>
                    <div class="success-btn" v-else>
                        <div class="btn-jrgwc fl-left" @click="buyshoppingCar" :style="{backgroundColor:btncolor.bgc,color:btncolor.color}">加入购物车</div>
                        <div class="btn-qd fl-right" @click="buyProduct" :style="{backgroundColor:btnbuy}">立即购买</div>
                    </div>
                    <div class="ios-place" v-if="jixing=='ios'"></div>
                </div>
                <div class="commoditySelection-place"></div>
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
            selectionObj:{},
            titleImg:'',
            attrTitle:'',
            sectionPrice:0,
            goodNumber:0,
            tsinCode:'',
            jixing:null,
            makeupdata:[],//组合好的参数
            onedata:[],//参数1列表
            oneTitle:'',
            twodata:[],//参数2列表
            twoTitle:'',
            checkList:[],//选中参数id集合
            makeItem:{},//当前商品
            stock:0,//库存
            fileList:[{
                url: '',
            }],
            tips:'',
        };
    },
    computed: {
        btnbgc(){
            let bgc = ''
            if(this.goodNumber >0 && this.tips == ''){
                bgc = '#FA5300'
            }else{
                bgc = '#999'
            }
            return bgc
        },
        btnbuy(){
            let bgc = ''
            if(this.goodNumber >0 && this.tips == ''){
                bgc = '#FAB600'
            }else{
                bgc = '#999'
            }
            return bgc
        },
        btncolor(){
            let obj = {
                color: '#fff',
                bgc: ''
            }
            if(this.goodNumber >0 && this.tips == ''){
                obj.bgc = '#FA5300'
            }else{
                obj.bgc = '#999'
            }
            return obj
        }
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
        checkList:{
            handler:function(newVal, oldVal){
                if(this.twodata.length > 0){
                    if(this.checkList.length == 2){
                        this.setMakeItem()
                    }else{
                        this.tips = `请选择${this.oneTitle}和${this.twoTitle}`
                        this.makeItem.canSalesNum = 0
                        this.goodNumber = 0
                    }
                }else{
                    if(this.checkList.length == 1){
                        this.setMakeItem()
                    }else{
                        this.tips = `请选择 ${this.oneTitle}`
                        this.makeItem.canSalesNum = 0
                        this.goodNumber = 0
                    }
                }
                
            },
        },
        titleImg:{
            handler:function(newVal, oldVal){
                this.fileList[0].url = this.$webUrl + newVal
            },
        }
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
            let arr = []
            let makeupList = []
            this.makeupdata = this.selectionObj.Makeupdata
            this.onedata = this.selectionObj.Onedata
            this.twodata = this.selectionObj.Twodata
            this.makeupdata.forEach(item => {
                if(this.makeupdata.length > 1){
                    if(item.skuPrice > 0){
                        arr.push(item.skuPrice)
                        arr.sort(function (a, b) {
                            return a-b;
                        }); 
                        let min = arr[0];
                        let max = arr[arr.length - 1];
                        this.sectionPrice = min + '~' + max
                    }
                    
                }else{
                    this.sectionPrice = item.skuPrice
                }
                if(item.canSalesNum > 0){
                    makeupList.push(item.skuValues)
                }
            })
            this.oneTitle = this.selectionObj.Onedata[0].attrTitle ? this.selectionObj.Onedata[0].attrTitle : ''
            this.twoTitle = this.selectionObj.Twodata[0] ? this.selectionObj.Twodata[0].attrTitle : ''

            var makeOne = makeupList[0].split(',')
            this.checkList = makeOne.map(Number)
            this.twodata.forEach(item => {
                item.ischeck = false
                this.checkList.forEach(checkItem => {
                    if(checkItem == item.valueId){
                        item.ischeck = true
                    }
                })
            })
             this.onedata.forEach(item => {
                item.ischeck = false
                this.checkList.forEach(checkItem => {
                    if(checkItem == item.valueId){
                        item.ischeck = true
                    }
                })
            })
        },
        //数量加减
        operation(type){
            // let arr = []
            if(type == 'jian'){
                if(this.goodNumber == 0){
                    return
                }else if(this.goodNumber <= this.makeItem.numIntervalStart){
                    this.goodNumber = 0
                }else{
                    this.goodNumber--
                }
            }else{
                if(this.makeItem.canSalesNum > 0){
                    if(this.goodNumber<this.makeItem.numIntervalStart){
                        this.goodNumber = this.makeItem.numIntervalStart
                    }else if(this.goodNumber >= this.makeItem.canSalesNum){
                        return
                    }else{
                        this.goodNumber++
                    }
                }else{
                    return
                }
            }
            if(this.goodNumber == 0) return
            let makeItemObj = {
                num:this.goodNumber,
                skuId:this.makeItem.skuId
            }
           
            let arr = [makeItemObj]
            this.getproductskunumpricelist(arr)
        },
        //input失焦事件
        blur(item){
            if(this.goodNumber < item.numIntervalStart && this.goodNumber != 0 ){ 
                this.goodNumber = item.numIntervalStart
            }else if(this.goodNumber > item.canSalesNum){
                this.goodNumber = item.canSalesNum
            }
            this.goodNumber = Math.ceil(this.goodNumber)
            if(this.goodNumber == 0) return
            let makeItemObj = {
                num:this.goodNumber,
                skuId:this.makeItem.skuId
            }
            let arr = [makeItemObj]
            this.getproductskunumpricelist(arr)
        },
        //点击确定收入购物车
        buyshoppingCar(){
            if(this.goodNumber == 0 || this.tips != '') return
            this.addshopcart()
        },
        //添加购物车
        addshopcart(){
            let data = [{
                    businessId:this.selectionObj.businessId,
                    priceId:this.makeItem.priceId,
                    shopNumber:this.goodNumber,
                    skuId:this.makeItem.skuId,
                    status:0,
                    supplyId:this.makeItem.supplyId,
                    warehouseId:this.makeItem.warehouseId
                }]
            if(data.length == 0) return
            addshopcartApi(data).then(res => {
                if(res.code == 0){
                    Toast('Successful');
                    setTimeout(()=>{
                        this.closeModal()
                    },1000)
                }
            })
        },
        //确定按钮购买商品
        buyProduct(){
            if(this.btnName == 'Confirm'){
                this.buyshoppingCar()
                return
            }
            if(this.goodNumber == 0 || this.tips != '') return
            let data = [{
                skuId:this.makeItem.skuId,
                detailNum:this.goodNumber
            }]
            if(data.length == 0) return
            this.setstopcarlist(data)
            this.$router.push({name:'确认订单详情'})
        },
        
        //根据商品skuid与商品数量获取优惠价
        getproductskunumpricelist(data){
            getproductskunumpricelistApi(data).then(res => {
                if(res.code == 0){
                    this.goodNumber = res.totalnum
                    this.sectionPrice = res.Data[0].price
                }
            })
        },
        //点击一级类目
        checkOneItem(ele,key){
            if(ele.ischeck == false){
                this.onedata.forEach(item => {
                    item.ischeck = false
                    if(this.checkList.indexOf(item.valueId) != -1){
                        this.checkList.splice(this.checkList.indexOf(item.valueId),1)
                    }
                })
                ele.ischeck = true
                this.checkList.push(ele.valueId)
            }else{
                ele.ischeck = false
                if(this.checkList.indexOf(ele.valueId) != -1){
                    this.checkList.splice(this.checkList.indexOf(ele.valueId),1)
                }
            }
            this.$forceUpdate()
        },
        //点击二级类目
        checkTwoItem(ele,key){
            if(ele.ischeck == false){
                this.twodata.forEach(item => {
                    item.ischeck = false
                    if(this.checkList.indexOf(item.valueId) != -1){
                        this.checkList.splice(this.checkList.indexOf(item.valueId),1)
                    }
                })
                ele.ischeck = true
                this.checkList.push(ele.valueId)
            }else{
                ele.ischeck = false
                if(this.checkList.indexOf(ele.valueId) != -1){
                    this.checkList.splice(this.checkList.indexOf(ele.valueId),1)
                }
            }
            this.$forceUpdate()
        },
        setMakeItem(){
            //有两个参数的时候
            function we(a,b){
                let c = [a[0]+','+a[1],a[1]+','+a[0]];
                return  b.find(item => c.find(v => item.skuValues == v) )
            }
            //只有一个参数的时候
            function onefun(a,b){
                let c = [a[0]];
                return  b.find(item => c.find(v => item.skuValues == v) )
            }
            if(this.selectionObj.Twodata.length == 0){
                if(typeof(onefun(this.checkList,this.makeupdata)) == 'object'){
                    this.makeItem = Object.assign({},this.makeItem,onefun(this.checkList,this.makeupdata))
                    this.goodNumber = this.makeItem.canSalesNum ? this.makeItem.numIntervalStart : 0
                    this.attrTitle =  this.makeItem.supplyTitle
                    this.titleImg = this.makeItem.imgUrl
                    this.tsinCode = this.makeItem.tsinCode
                    this.sectionPrice = this.makeItem.skuPrice
                    this.stock = this.makeItem.canSalesNum ? this.makeItem.canSalesNum : 0
                    if(this.goodNumber > this.makeItem.canSalesNum || !this.makeItem.canSalesNum){
                        this.tips = '售罄'
                    }else{
                        this.tips = ''
                    }
                }else{
                    this.makeItem = {}
                    let arr = []
                    this.makeupdata.forEach(item => {
                        if(this.makeupdata.length > 1){
                            if(item.skuPrice > 0){
                                arr.push(item.skuPrice)
                                arr.sort(function (a, b) {
                                    return a-b;
                                }); 
                                let min = arr[0];
                                let max = arr[arr.length - 1];
                                this.sectionPrice = min + '~' + max
                            }
                        }else{
                            this.sectionPrice = item.skuPrice
                        }
                    })
                    this.titleImg = this.selectionObj.Data.productImgList[0].imgUrl
                    this.attrTitle = this.selectionObj.Data.supplyTitle
                    this.tsinCode = this.selectionObj.Data.tsinCode
                    this.goodNumber = 0
                    this.stock = 0
                    this.tips = '售罄'
                }
            }else{
                if(typeof(we(this.checkList,this.makeupdata)) == 'object'){
                    this.makeItem = Object.assign({},this.makeItem,we(this.checkList,this.makeupdata))
                    this.goodNumber = this.makeItem.canSalesNum ? this.makeItem.numIntervalStart : 0
                    this.attrTitle =  this.makeItem.supplyTitle
                    this.titleImg = this.makeItem.imgUrl
                    this.tsinCode = this.makeItem.tsinCode
                    this.sectionPrice = this.makeItem.skuPrice
                    this.stock = this.makeItem.canSalesNum ? this.makeItem.canSalesNum : 0
                    if(this.goodNumber > this.makeItem.canSalesNum || !this.makeItem.canSalesNum){
                        this.tips = '售罄'
                    }else{
                        this.tips = ''
                    }
                }else{
                    this.makeItem = {}
                    let arr = []
                    this.makeupdata.forEach(item => {
                        if(this.makeupdata.length > 1){
                            if(item.skuPrice > 0){
                                arr.push(item.skuPrice)
                                arr.sort(function (a, b) {
                                    return a-b;
                                }); 
                                let min = arr[0];
                                let max = arr[arr.length - 1];
                                this.sectionPrice = min + '~' + max
                            }
                        }else{
                            this.sectionPrice = item.skuPrice
                        }
                    })
                    this.titleImg = this.selectionObj.Data.productImgList[0].imgUrl
                    this.attrTitle = this.selectionObj.Data.supplyTitle
                    this.tsinCode = this.selectionObj.Data.tsinCode
                    this.goodNumber = 0
                    this.stock = 0
                    this.tips = '售罄'
                }
            }
        },
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
    background:#fff;
    max-height: 90%;
    position: absolute;
    bottom: 0;
    overflow: auto;
    .selection-title{
        width: 100%;
        height: 201px;
        border-bottom: 2px solid #DCDCDC;
        .selection-img{
            width: 160px;
            height: 125px;
            margin:40px 0 0 40px;
            .good-img{
                /deep/ .van-image{
                    width: 180px;
                    height: 160px;
                }
            }
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
        min-height: 900px;
        overflow: hidden;
        padding: 20px 40px 0;
        .guige-title{
            font-size:22px;
            margin-bottom: 18px;
            font-size: 22px;
            color: #000;
            font-weight:800;
        }
        .guige-list{
            display: flex;
            flex-direction:row;
            justify-content:flex-start;
            flex-wrap: wrap;
            max-height: 300px;
            overflow: auto;
            .guige-items{
                display: inline-block;
                padding: 13px 50px;
                background-color: #F5F5F7;
                border-radius:24px;
                margin: 0 20px 20px 0;
                &:nth-last-child(1){
                    margin-right:0
                }
            }
            .guige-items.active{
                border:2px solid red;
                background-color: #F9DACA;
                color: #FA5300;
            }
        }
        .quantity{
            overflow: hidden;
            .stepper{
                float: right;
                .add-btn{
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    background-color: #EEEEEE;
                    border: 1px solid #999999;
                }
                .reduce-btn{
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    background-color: #EEEEEE;
                    border: 1px solid #999999;
                }
                .num{
                    display: inline-block;
                    width: 127px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    background-color: #fff;
                    font-size: 36px;
                    color: #333;
                    vertical-align: top;
                    .number-input{
                        width: 100%;
                        height: 94%;
                        text-align: center;
                        border:0;
                    }
                }
            }
        }
        .stock{
            margin-top:20px;
            color: #000;
            font-size: 30px;
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;
        .success-btn{
            width: 100%;
            float: left;
            height: 78px;
            line-height: 78px;
            color: #fff;
            text-align: center;
            font-size: 42px;
            margin-bottom: 30px;
            border-radius:39px;
            .btn-jrgwc,.btn-qd{
                width: 300px;
                font-size: 34px;
                height: 78px;
                text-align: center;
                line-height: 78px;
                color: #FA5300;
                border-radius:39px;
            }
            .btn-qd{
                color: #fff;
            }
        }
    }
    .commoditySelection-place{
        height: 130px;
    }
    .ios-place{
        width: 100%;
        float: left;
        height: 180px;
    }
}

</style>
