<template>
<!-- 购物车 -->
    <div class="shopping-cart" ref="content">
        <div class="shopping-cart-header">
            <span class="header-t1">购物车({{shoplength}})</span>
            <span class="header-t2" @click="mange" v-if="conditions">{{showMange?'管理':'完成'}}</span>
        </div>
        <div class="place"></div>
        <div class="shopping-cart-container" v-if="conditions" ref="shoppingContainer">
            <!-- 有商品的页面 -->
            <div v-if="dataList.length>0">
                <div class="shopping-cart-content" v-for="(data,index) in dataList" :key="index">
                    <div class="serial-number">
                        <van-checkbox v-model="data.checkStatus" icon-size="24px" checked-color="#F83600" @click="changeCheckbox(data,'all')"></van-checkbox>
                    </div>
                    <div class="goods-content" v-for="(dataitem,index) in data.list" :key="index">
                        <van-checkbox v-model="dataitem.checkStatus" icon-size="24px" checked-color="#F83600" @click="changeCheckbox(dataitem,'',data)"></van-checkbox>
                        <div class="good-img" @click="toDetail(dataitem.skuId)">
                            <img :src="$webUrl+dataitem.imgUrl">
                        </div>
                        <span class="good-describe" @click="toDetail(dataitem.skuId)">{{dataitem.skuName}}</span>
                        <div class="good-seclet">
                            <select name="" disabled> 
                                <option value="0">{{dataitem.skuValuesTitle}}</option> 
                            </select> 
                        </div>
                        <!-- <div class="good-logistics">
                            <span>物流：TOSPINO物流</span>
                        </div> -->
                        <div class="good-price">
                            <span class="price-p1">{{jn}}{{dataitem.discountPrice ? dataitem.discountPrice : dataitem.salePrice}}</span>
                            <span class="price-p2" v-if="dataitem.discountPrice">{{jn}}{{dataitem.salePrice}}</span>
                            <van-stepper class="price-quantity" v-model="dataitem.shopNumber" :min="dataitem.numIntervalStart" :max="dataitem.canSalesNum" @change="changeStepper(dataitem)" />
                            <span class="price-batch">起订量{{dataitem.numIntervalStart}}件</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 失效商品 -->
            <div class="shopping-cart-content" v-if="wuxiaoList.length>0">
                <div class="serial-number">
                    <span class="invalid-num">失效宝贝{{wuxiaoList.length}}件</span>
                    <span class="empty" @click="emptyPro">清空</span>
                </div>
                <div class="goods-content" v-for="(wuxiao,index) in wuxiaoList" :key="index">
                    <span class="invalid">
                        失效
                    </span>
                    <div class="good-img">
                        <img :src="$webUrl+wuxiao.imgUrl">
                    </div>
                    <span class="good-describe">{{wuxiao.skuName}}</span>
                    <div class="good-seclet">
                        <span class="specifications">{{wuxiao.skuValuesTitle}}</span>
                    </div>
                    <div class="good-price">
                        <span class="price-batch-left">已下架</span>
                        <span class="price-batch-right" @click="toXiangsi(wuxiao)">找相似</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-shopping" v-else>
            <!-- 没有商品的页面 -->
            <div class="no-shopping-img">
                <img src="@/assets/img/tabbar/shoppingCart/icon@2x.png">
                <div class="no-shopping-p1">
                    您还没有选购商品哦
                </div>
                <div class="no-shopping-p2" @click="jumpRouter('首页')">
                    去商城选购商品
                </div>
            </div>
        </div>
        <div>
            <footer-exhibition v-if="footerShow" :footerData="footerData" ref="footer" @clickPro="toDetail"></footer-exhibition>
        </div>
        <div style="height:60px" v-if="conditions">
            <div class="settlement">
                <span class="settlement-text" v-if="showMange">
                    <van-checkbox v-model="checked" icon-size="24px" class="checkbox" checked-color="#F83600" @change="cliAllcheck"></van-checkbox>
                    <span class="btn" @click="settlementBtn" :style="{background : (totlaNum>0 ? '#FA5300':'#999')}">结算({{totlaNum}})</span>
                    <span class="p3">{{jn}}{{totlaMoney}}</span>
                    <span class="p2">合计:</span>
                    <span class="p1">全选</span>
                </span>
                <span class="settlement-text" v-else>
                    <van-checkbox v-model="checked" icon-size="24px" class="checkbox" checked-color="#F83600" @change="cliAllcheck"></van-checkbox>
                    <span class="btn1" @click="delOrder">删除</span>
                    <span class="btn2" @click="adduserfavor">移入收藏夹</span>
                    <span class="p1">全选</span>
                </span>
            </div>
        </div>
        
        <van-overlay :show="show">
            <!-- 遮罩层确认购买弹框 -->
            <div class="overlay-wrapper" @click.stop>
                <div class="overlay-wrapper-p1">
                    确认删除这{{totlaNum}}件商品吗？
                </div>
                <div class="overlay-wrapper-btns">
                    <span @click="show = false">取消</span>
                    <span @click="delgood">确定</span>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import footerExhibition from '@/multiplexing/footerExhibition'
import {shopcartlistApi,deleteshopcartApi,emptycartApi,getproductskunumpricelistApi,addshopcartApi} from '@/api/shoppingCart/index'
import {guessyoulikeApi} from '@/api/search/index'
import { Toast,Dialog } from 'vant';
import {mapState,mapActions} from 'vuex'
import {adduserfavoritesApi} from '@/api/favorites/index.js'
export default {
    props: {

    },  
    data() {
        return {
            checked:false,
            show:false,
            showMange:true,
            scroll:'',
            footerShow:false,
            formData:{
                page:1,
                limit:10
            },
            dataList:[],
            youxiaoList:[],
            wuxiaoList:[],
            youlikeData:{
                page:1,
                limit:6,
                seraname:''
            },
            footerData:{},
            shopList:[],
            totlaMoney:0,
            totlaNum:0,
            selectionList:[],
            pullUp:true,
            kanmengou:true,
            shopcarTotal:0
        };
    },
    computed: {
        conditions(){
            return this.shopList.length>0
        },
        shoplength(){
            return this.shopcarTotal
        },
        ...mapState({
            selectionShopCar:state=>state.selectionShopCar
        })
    },
    created() {
        
    },
    mounted() {
        window.addEventListener('scroll', this.menu,true)
        this.shopcartlist(this.formData)
        this.guessyoulike()
    },
    beforeDestroy(){
        window.removeEventListener("scroll",this.menu,true);
    },
    watch: {

    },
    methods: {
        ...mapActions( // 语法糖
            ['setstopcarlist'] // 相当于this.$store.dispatch('setstopcarlist'),提交这个方法
        ),
        toDetail(skuId){
            this.$router.push({name:'商品详情',query:{skuId}})
        },
        mange(){
            this.showMange = !this.showMange
        },
        toXiangsi(item){
            this.$router.push({name:'找相似商品',query:{categoryId:item.categoryId}})
        },
        //获取滚动条距离底部距离
        menu() {
            let footerHeight = this.$refs.footer.$el.clientHeight
            let componentsHeight = this.$refs.content.clientHeight
            let pingmu = document.body.clientHeight
            let dibujuli = pingmu+footerHeight
            let cha = componentsHeight - dibujuli
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop;


            if(this.pullUp && this.scroll>=cha){
                if(this.kanmengou){
                    this.formData.page++
                    this.shopcartlist(this.formData,true)
                    this.kanmengou = false
                }
            }
        },
        jumpRouter(name){
            this.$router.push({name})
        },
        //购物车列表
        shopcartlist(data,flag){
            shopcartlistApi(data).then(res => {
                let youxiaoList = [], wuxiaoList = []
                if(res.code == 0){
                    if(flag){
                        this.shopList = this.shopList.concat(res.Data.list)
                    }else{
                        this.shopList = res.Data.list
                    }
                    this.kanmengou = true
                    this.shopcarTotal = res.Data.totalCount
                    if(this.shopList.length >= this.shopcarTotal){
                        this.pullUp = false
                    }

                    this.shopList.forEach(item => {
                        if(item.isValid == 1){
                            youxiaoList.push(item)
                        }else{
                            wuxiaoList.push(item)
                        }
                    })
                    this.youxiaoList = youxiaoList
                    this.wuxiaoList = wuxiaoList
                    //根据businessId分类
                    this.dataList = this.groupArr(this.youxiaoList,'businessId')
                    this.dataList.forEach(item => {
                        item.list.forEach(listitem => {
                            listitem.checkStatus = false
                        })
                    })
                }else{
                    this.kanmengou = false
                }
            })
        },
        //加入收藏夹
        adduserfavorites(data){
            adduserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    Toast('已加入收藏夹')
                }
            })
        },
        //通过某个字段进行分组
        groupArr(list,field){
            let obj = {};
            let item = '';
            // let list = [];
            for(var i=0;i<list.length;i++){
                for(item in list[i]){
                    if(item==field){
                        obj[list[i][item]] = {
                            list:obj[list[i][field]]?obj[list[i][field]].list:[],
                        };
                    }
                }
                obj[list[i][field]].list.push(list[i])
            }
            let att = [];
            for(item in obj){
                att.push({
                    list:obj[item].list,
                })
            }
            return att;
        },
        //猜你喜欢
        guessyoulike(){
            guessyoulikeApi(this.youlikeData).then(res => {
                if(res.code == 0){
                    this.footerData = res.Data
                    this.footerShow = true
                }
            })
        },
        //点击复选框
        changeCheckbox(item,flag,list){
            item.checkStatus = !item.checkStatus
            if(flag == 'all'){
                //订单上的复选框,该订单商品全选中
                item.list.forEach(ele => {
                    ele.checkStatus = item.checkStatus
                })
            }else{
                //点击订单某一个商品的复选框
                let itemFlag = true //标记
                list.list.forEach(element => {
                    //如果有一个是没选中的
                    if(element.checkStatus == false){
                        itemFlag = false
                    }
                })
                //判断状态
                if(itemFlag){
                    //全部选中
                    list.checkStatus = true
                }else{
                    //有一个没选中
                    list.checkStatus = false
                }
            }
            this.zongji()
            this.$forceUpdate()
        },
        //点击全选
        cliAllcheck(status){
            this.dataList.forEach(ele => {
                ele.checkStatus = status
                ele.list.forEach(item => {
                    item.checkStatus = status
                })
            })
            this.zongji()
            this.$forceUpdate()
        },
        //结算
        settlementBtn(){
            if(this.totlaNum == 0) {
                Toast('没有选择商品')
                return
            }
            this.setstopcarlist(this.selectionList.map(o => Object.assign({}, o)))
            this.$router.push({name:'确认订单详情',query:{type:'shopcar'}})
        },
        //总计计算
        zongji(){
            let arr = []
            let arr2 = []
            this.dataList.forEach(ele => {
                ele.list.forEach(item => {
                    if(item.checkStatus){
                        let obj = {
                            skuId:item.skuId,
                            detailNum:item.shopNumber,
                            shopcrtId:item.shopcrtId
                        }
                        let obj2 = {
                            skuId:item.skuId,
                            num:item.shopNumber,
                        }
                        arr.push(obj)
                        arr2.push(obj2)
                    }
                })
            })
            this.selectionList = arr.map(o => Object.assign({}, o));
            if(arr2.length==0){
                this.totlaMoney = 0
                this.totlaNum = 0
                return
            }
            this.getproductskunumpricelist(arr2)
        },
        //更改数量
        changeStepper(itemdetail){
            let arr = []
            let addshopcartObj = {
                shopcrtId:itemdetail.shopcrtId,
                shopNumber:itemdetail.shopNumber
            }
            this.dataList.forEach(ele => {
                ele.list.forEach(item => {
                    if(item.checkStatus){
                        let obj = {
                            num:item.shopNumber,
                            skuId:item.skuId
                        }
                        arr.push(obj)
                    }
                })
            })
            this.addshopcart([addshopcartObj])
            this.zongji()
        },
        //删除订单
        delOrder(){
            if(this.totlaNum == 0) {
                Toast('没有可以删除的东西')
                return
            }
            this.show = true
        },
        //删除商品
        delgood(){
            let arr = []
            this.selectionList.forEach(item => {
                arr.push(item.shopcrtId)
            })
            this.deleteshopcart(arr)
        },
        //删除购物车商品
        deleteshopcart(dataList){
            deleteshopcartApi(dataList).then(res => {
                if(res.code == 0){
                    this.shopcartlist(this.formData)
                    this.guessyoulike()
                    this.show = false
                }
            })
        },
        //清空失效商品
        emptycart(){
            emptycartApi({name:'不请求'}).then(res => {
                if(res.code == 0){
                    this.shopcartlist(this.formData)
                    this.guessyoulike()
                }
            })
        },
        //清空按钮
        emptyPro(){
            this.emptycart()
        },
        //移入收藏夹
        adduserfavor(){
            let arr = []
            this.dataList.forEach(ele => {
                ele.list.forEach(item => {
                    if(item.checkStatus){
                        arr.push(item.skuId)
                    }
                })
            })
            if(arr.length == 0){
                Toast('请选择移入收藏夹的商品')
                return
            }
            
            this.adduserfavorites(arr)
        },
        //根据商品skuid与商品数量获取优惠价
        getproductskunumpricelist(data){
            getproductskunumpricelistApi(data).then(res => {
                if(res.code == 0){
                    this.totlaMoney = res.totalprice
                    this.totlaNum = res.totalnum
                    this.dataList.forEach(ele => {
                        ele.list.forEach(item => {
                            res.Data.forEach(dataItem => {
                                if(item.skuId == dataItem.skuId){
                                    if(item.discountPrice){
                                        item.discountPrice = dataItem.price
                                    }else{
                                        item.salePrice = dataItem.price
                                    }
                                }
                            })
                            
                        })
                    })
                }
            })
        },
        //添加购物车
        addshopcart(data){
            addshopcartApi(data).then(res => {
                if(res.code == 0){
                    
                }
            })
        },
    },
    components: {
        footerExhibition
    },
};
</script>

<style scoped lang="less">
.shopping-cart{
    .shopping-cart-header{
        width: 100%;
        height: 88px;
        background-color: #f2f3f5;
        text-align: center;
        position: fixed;
        z-index: 1;
        .header-t1{ 
            display: inline-block;
            line-height: 88px;
            font-size: 36px;
        }
        .header-t2{
            position: absolute;
            font-size:30px;
            right: 30px;
            top:30px;
        }
    }
    .shopping-cart-content{
        width: 100%;
        background-color: #fff;
        margin-bottom: 20px;
        overflow: hidden;
        .serial-number{
            width: 100%;
            // height: 72px;
            padding-top: 30px;
            box-sizing: border-box;
            /deep/ .van-checkbox{
                height: 50px;
                .van-checkbox__icon{
                    margin-left:30px;
                }
                .van-checkbox__label{
                    margin-left:29px;
                    font-size: 32px;
                    color: #333;
                    font-weight: bold;
                }
            }
            .invalid-num{
                color: #333333;
                font-size: 26px;
                margin-left:29px;
            }
            .empty{
                float: right;
                margin-right: 26px;
                color: #999;
                font-size: 28px;
            }
        }
       .goods-content{
           width: 100%;
           height: 350px;
           background-color: #fff;
           box-sizing: border-box;
           padding-top:50px;
           position: relative;
           .good-img{
               width: 200px;
               height: 200px;
               display: inline-block;
               margin-right:20px;
               vertical-align: middle;
           }
           .van-checkbox{
                display: inline-block;
                position: relative;
                left: 0;
                top:-60px;
                margin:0 12px 0 30px;
           }
           .good-describe{
                display: inline-block;
                position: absolute;
                width: 410px;
                top:50px;
                left:320px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
           }
           .good-seclet{
                height: 44px;
                position: absolute;
                top:115px;
                left:320px;
                select{
                    width: 100%;
                }   
                .specifications{
                    display: inline-block;
                    background-color: #EEE;
                    padding: 12px 18px;
                }
            }
            .good-logistics{
                position: absolute;
                top:166px;
                left:320px;
                font-size: 16px;
                color: #666666;
            }
            .good-price{
                position: absolute;
                top:209px;
                left:320px;
                width: 400px;
                .price-p1{
                    font-size:40px;
                    color: #FA5300;
                }
                .price-p2{
                    font-size:20px;
                    color: #999;
                    text-decoration: line-through;
                    margin-right:30px;
                }
                .price-quantity{
                    display: inline-block;
                    width: 147px;
                    height: 36px;
                    text-align: center;
                    line-height: 36px;
                    position: absolute;
                    right:0;
                    top:40px;
                    /deep/ .van-stepper__input{
                        width: 76px
                    }
                }
                .price-batch{
                    width: 162px;
                    height: 24px;
                    display: inline-block;
                    position: absolute;
                    top:85px;
                    left:270px;
                    font-size: 24px
                }
                .price-batch-right{
                    position: absolute;
                    top:35px;
                    left:250px;
                    font-size: 24px
                }
                .price-batch-left{
                    width: 162px;
                    height: 40px;
                    display: inline-block;
                    position: absolute;
                    top:35px;
                    left:0px;
                    font-size: 24px;
                    color: #666;
                    line-height: 40px;
                }
                .price-batch-right{
                    width: 140px;
                    height: 40px;
                    display: inline-block;
                    border:2px solid rgba(219,144,0,1);
                    border-radius:20px;
                    text-align: center;
                    line-height: 40px;
                }
            }
            .invalid{
                display: inline-block;
                width: 52px;
                height: 34px;
                border:2px solid rgba(220,220,220,1);
                border-radius:5px;
                line-height: 34px;
                text-align: center;
                margin-left:30px;
            }
       }
    }
    .settlement{
        width: 100%;
        height: 120px;
        background-color:#fff;
        position:fixed;
        bottom:98px;
        z-index:5;
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
                // background:linear-gradient(-90deg,rgba(248,54,0,1),rgba(250,83,0,1));
                border-radius:45px;
                color:rgba(255,255,255,1);
                line-height:90px;
                text-align: center;
                margin:16px 30px 0 18px;
            }
            .btn2{
                width:186px;
                height:50px;
                border:2px solid rgba(219,144,0,1);
                border-radius:25px;
                font-size:28px;
                color: #DB9000;
                position: absolute;
                right:154px;
                top:34px;
                line-height: 50px;
                text-align: center
            }
            .btn1{
                width:104px;
                height:50px;
                border:2px solid rgba(250,83,0,1);
                border-radius:25px;
                color: #FA5300;
                font-size:28px;
                line-height: 50px;
                text-align: center;
                position: absolute;
                right:30px;
                top:34px;
            }
        }
       
    }
    .no-shopping{
        width: 100%;
        height: 858px;
        position: relative;
        .no-shopping-img{
            width: 400px;
            height: 300px;
            position: absolute;
            top:200px;
            left:175px;
            text-align: center;
            .no-shopping-p1{
                font-size: 28px;
                color: #666666;
            }
            .no-shopping-p2{
                display: inline-block;
                padding: 6px 11px;
                font-size: 20px;
                color: #fff;
                background-color: #FA5300;
                border-radius: 15px;
            }
        }
        .no-shopping-p1{
            margin:36px 0;
        }
    }
    .van-overlay{
        z-index:10 !important ;
        .overlay-wrapper{
            width: 500px;
            height: 200px;
            background-color: #fff;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            .overlay-wrapper-p1{    
                margin:49px 0 39px 40px;
                font-size:36px;
                color: #333
            }
            .overlay-wrapper-btns{
                padding-left:267px;
                font-size:30px;
                color: #FA5300;
                span{
                    &:nth-child(1){
                        margin-right: 65px
                    }
                }
            }
        }
    }
    
}
</style>
