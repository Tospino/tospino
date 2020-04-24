<template>
<!-- 首页 -->
    <div class="home">
        <search-header></search-header>
        <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pullup="pullup" @pullup="_pullup" :pulldown="pulldown" @pulldown="_pulldown" :scrollX="true">
            <div>
                <div class="commodity-swipe" v-if="topBananerList.length>0">
                    <van-swipe @change="onChange" :stop-propagation="false" :autoplay="2000" :initial-swipe="swipeIndex">
                        <van-swipe-item v-for="(banner,index) in topBananerList" :key="index" @click="swipeClick(banner)">
                            <div class="w1">
                                <img :src="$webUrl+banner.advertImg">
                            </div>
                        </van-swipe-item>
                        <div class="custom-indicator" slot="indicator">
                            {{ current + 1 }}/{{leng}}
                        </div>
                    </van-swipe>
                </div>
                <!-- 限时抢购先隐藏 -->
                <div class="flash-sale pl-30 box" v-if="false">
                    <div class="flash-sale-1">
                        <span class="put-line"></span>
                        <span class="t1">限时</span>
                        <span class="t2">抢购</span>
                    </div>
                    <div class="flash-sale-2">
                        <div class="pictures">
                            <div class="p1" v-for="(i,index) in 4" :key="index" @click="$router.push({name:'商品详情'})">
                                <img src="@/assets/img/tabbar/home/01@3x.png">
                                <span class="good-name">OG法式连衣裙</span><br>
                                <span class="good-price1">¥99.00</span><br>
                                <span class="good-price2">¥199.00</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="jump-btn-con">
                        <van-button type="primary" size="large" class="jump-btn" @click="jumpRouter('限时抢购')">
                            <span>进入主会场</span>
                            <span class="jump-btn-icon"></span>
                        </van-button>
                    </div>
                </div>
                <!-- 精品推荐 -->
                <div class="good-recommend box">
                    <div class="flash-sale-1">
                        <span class="put-line"></span>
                        <span class="t1">精品推荐</span>
                        <!-- <span class="t2">查看更多</span> -->
                    </div>
                    <div class="flash-sale-2">
                        <div class="pictures">
                            <div class="p1" v-for="finework in homeObj.producteFineWorkpro" :key="finework.skuId">
                                <img :src="$webUrl+finework.imgUrl" @click="toDetail(finework.skuId)">
                                <div class="good-name clamp-2">{{finework.supplyTitle}}</div>
                                <span class="good-price1">{{jn}}{{finework.discountPrice == null ? finework.salePrice:finework.discountPrice}}</span><br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="good-world box">
                    <div class="flash-sale-1">
                        <span class="put-line"></span>
                        <span class="t1">全球品牌精选</span>
                        <!-- <span class="t2">查看更多</span> -->
                    </div>
                    <div class="good-world-brand">
                        <div class="brand-p-1">
                            <img :src="$webUrl+brandLogo1.brandLogo" class="brand-p-1-left" @click="toSearOne(brandLogo1.brandId,'brandId')">
                            <img :src="$webUrl+brandLogo2.brandLogo" class="brand-p-1-right-top" @click="toSearOne(brandLogo2.brandId,'brandId')">
                            <img :src="$webUrl+brandLogo3.brandLogo" class="brand-p-1-right-bottom" @click="toSearOne(brandLogo3.brandId,'brandId')">
                        </div>
                        <div class="brand-p-2">
                            <img :src="$webUrl+globalPro.brandLogo" v-for="globalPro in globalProList" :key="globalPro.brandId" @click="toSearOne(globalPro.brandId,'brandId')">
                        </div>
                    </div>
                </div>
                <div class="good-world-best">
                    <div class="flash-sale-1">
                        <span class="put-line"></span>
                        <span class="t1">全球畅销榜</span>
                        <!-- <span class="t2">查看更多</span> -->
                    </div>
                    <div class="flash-sale-2">
                        <div class="pictures">
                            <div class="good-world-best-p1" :class="'cximg'+(index+1)" v-for="(fineSale1,index) in fineSaleList1" :key="fineSale1.skuId" >
                                <img :src="$webUrl+fineSale1.imgUrl" @click="toDetail(fineSale1.skuId)">
                                <div class="good-name">{{fineSale1.supplyTitle}}</div>
                                <span class="good-price">{{jn}}{{fineSale1.discountPrice ? fineSale1.discountPrice : fineSale1.salePrice}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="banner" @click="swipeClick(banner1)">
                    <img :src="$webUrl+banner1.advertImg">
                </div>
                <div class="exhibition">
                    <div class="flash-sale-2">
                        <div class="pictures">
                            <div class="p1" v-for="fineSale2 in fineSaleList2" :key="fineSale2.skuId">
                                <img :src="$webUrl+fineSale2.imgUrl" @click="toDetail(fineSale2.skuId)">
                                <span class="good-name clamp-2">{{fineSale2.supplyTitle}}</span><br>
                                <span class="good-price1">{{jn}}{{fineSale2.discountPrice ? fineSale2.discountPrice : fineSale2.salePrice}}</span><br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="banner" @click="swipeClick(banner2)">
                    <img :src="$webUrl+banner2.advertImg" >
                </div>
                <div class="good-popular box">
                    <div class="flash-sale-1">
                        <span class="put-line"></span>
                        <span class="t1">热门分类</span>
                        <!-- <span class="t2">查看更多</span> -->
                    </div>
                    <div class="good-popular-top" >
                        <div class="good-popular-top-1" v-for="category in homeObj.producteFinecategory" :key="category.categoryId" @click="toSearOne(category.categoryId,'categoryId')">
                            <img :src="$webUrl+category.categoryImg">
                        </div>
                    </div>
                    
                </div>
                <div class="banner" @click="swipeClick(banner3)">
                    <img :src="$webUrl+banner3.advertImg" >
                </div>
                <div class="good-sort">
                    <van-tabs v-model="active" title-active-color="#FA5300" title-inactive-color="#000" @change="changeTab(bottomTabs,$event)">
                        <van-tab v-for="(tab,index) in bottomTabs" :key="index">
                            <div slot="title">
                                <span class="primary">{{tab.categoryName}}</span>
                            </div>
                        </van-tab>
                    </van-tabs>
                    <div class="footer-exhibition">
                        <div  class="exhibition-con">
                            <div class="exhibition-left" v-for="(searchgoodDao,index) in searchgoodDaolist" :key="index">
                                <img :src="$webUrl + searchgoodDao.imgUrl" @click="toDetail(searchgoodDao.skuId)">
                                <div class="produced">
                                    <span class="icon" v-if="searchgoodDao.locationUrl">
                                        <img :src="$webUrl + searchgoodDao.locationUrl">
                                    </span>
                                    <span class="produced-font">{{searchgoodDao.locationName ? searchgoodDao.locationName : ''}}</span>
                                </div>
                                <div class="clamp-2 miaoshu">{{searchgoodDao.supplyTitle}}</div>
                                <div class="score">
                                    <van-rate v-model="searchgoodDao.starNumber" readonly  color="#FA5300"/>
                                    <!-- <span>477</span> -->
                                </div>
                                <div class="price">
                                    <span class="price1">{{jn}}{{searchgoodDao.discountPrice ?searchgoodDao.discountPrice : searchgoodDao.salePrice}}</span>
                                    <span class="price2" v-if="searchgoodDao.discountPrice">{{jn}}{{searchgoodDao.salePrice}}</span>
                                    <!-- <span class="poin">...</span> -->
                                </div>
                                <div>已售:{{searchgoodDao.skuSalesNum ? searchgoodDao.skuSalesNum : 0}}件</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </scroll>
    </div>
</template>

<script>

import searchHeader from '@/multiplexing/searchHeader'
import {homePageApi,HomePagebottomApi,homeAdvertPictureApi} from '@/api/home/index.js'
import {getuserinfoApi} from '@/api/accountSettings/index'
var scan = null;
export default {
    props: {

    },
    data() {
        return {
            swipeIndex:0,
            active:0,
            homeObj:{},
            globalProList:[],
            fineSaleList1:[],
            fineSaleList2:[],
            brandLogo1:{
                brandLogo:'',
                brandId:0
            },
            brandLogo2:{
                brandLogo:'',
                brandId:0
            },
            brandLogo3:{
                brandLogo:'',
                brandId:0
            },
            formData:{
                brandId: 0,
                categoryId: 0,
                limit: 10,
                page: 1,
                seraname: "",
                sort: 0
            },
            bottomTabs:[],
            searchgoodDaolist:[],
            current:0,
            leng:1,
            recordGroup:[],
            pullup:true,
            pulldown:true,
            guanmengou:true,
            codeUrl: '',
            topBananerList:[],
            banner1:{
                advertImg:''
            },
            banner2:{
                advertImg:''
            },
            banner3:{
                advertImg:''
            }
        };
    },
    computed: {

    },
    created() {
        if(this.$route.query.token && this.$route.query.token != 'undefined'){
            localStorage.token = this.$route.query.token
            this.getuserinfo()
        }
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.name == '搜索商品1'){
            to.meta.isBack = true;
        }
        next()
    },
    mounted() {
        if(localStorage.homeObj){
            this.homeObj = this.$fn.MyLocalStorage.Cache.get('homeObj')
            if(!this.homeObj){
                this.homePage()
            }else{
                this.globalProList = this.homeObj['producteFineBrand'].slice(3)
                this.brandLogo1.brandLogo = this.homeObj['producteFineBrand'][0].brandLogo
                this.brandLogo1.brandId = this.homeObj['producteFineBrand'][0].brandId
                this.brandLogo2.brandLogo = this.homeObj['producteFineBrand'][1].brandLogo
                this.brandLogo2.brandId = this.homeObj['producteFineBrand'][1].brandId
                this.brandLogo3.brandLogo = this.homeObj['producteFineBrand'][2].brandLogo
                this.brandLogo3.brandId = this.homeObj['producteFineBrand'][2].brandId
                this.fineSaleList1 = this.homeObj['productFineSale'].slice(0,3)
                this.fineSaleList2 = this.homeObj['productFineSale'].slice(3)
            }
        }else{
            this.homePage()
        }
        this.refreshOrder()
        this.homeAdvertPicture()
    },
    watch: {

    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        //首页数据
        homePage(data){
            homePageApi(data).then(res => {
                if(res.code == 0){
                    this.homeObj = res.Data
                    this.globalProList = this.homeObj['producteFineBrand'].slice(3)
                    this.brandLogo1.brandLogo = this.homeObj['producteFineBrand'][0].brandLogo
                    this.brandLogo1.brandId = this.homeObj['producteFineBrand'][0].brandId
                    this.brandLogo2.brandLogo = this.homeObj['producteFineBrand'][1].brandLogo
                    this.brandLogo2.brandId = this.homeObj['producteFineBrand'][1].brandId
                    this.brandLogo3.brandLogo = this.homeObj['producteFineBrand'][2].brandLogo
                    this.brandLogo3.brandId = this.homeObj['producteFineBrand'][2].brandId
                    this.fineSaleList1 = this.homeObj['productFineSale'].slice(0,3)
                    this.fineSaleList2 = this.homeObj['productFineSale'].slice(3)

                    let time = 60*60*24*2 //2天
                    this.$fn.MyLocalStorage.Cache.put('homeObj',this.homeObj,time)
                }
            })
        },
        //底部数据分类
        homePagebottom(data,flag){
            HomePagebottomApi(data).then(res => {
                if(res.code == 0){
                    this.bottomTabs = res.top
                    
                    if(flag){
                        this.searchgoodDaolist = this.searchgoodDaolist.concat(res.Data.searchgoodDaolist)
                    }else{
                        this.searchgoodDaolist = res.Data.searchgoodDaolist
                    }
                    this.totalCount = res.Data.total
                    this.recordGroup = this.searchgoodDaolist
                    if(this.searchgoodDaolist.length > 0){
                        if(this.searchgoodDaolist.length >= this.totalCount){
                            this.pullup = false
                        }
                    }else{
                        this.pullup = false
                    }
                }
            })
        },
        //tab切换
        changeTab(list,index){
            this.formData.categoryId = list[index].categoryId
            this.refreshOrder();
        },
        //轮播
        onChange(index) {
            this.current = index;
            setTimeout(()=>{
                this.swipeIndex = index
            },300)
        },
        //上拉加载
        _pullup(){
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.homePagebottom(this.formData,true)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
        },
        //下拉刷新
        _pulldown() {
            setTimeout(()=>{
                this.homePage()
                this.refreshOrder()
            },500)
        },
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.homePagebottom(this.formData)
            this.pullup = true
        },
        //跳转商品详情
        toDetail(skuid){
            this.$router.push({name:'商品详情',query:{skuId:skuid}})
        },
        //去到搜索里面
        toSearOne(id,type){
            if(type == 'categoryId'){
                this.$router.push({name:'搜索商品1',query:{categoryId:id}})
            }else if(type == 'brandId'){
                this.$router.push({name:'搜索商品1',query:{brandId:id}})
            }
        },
        //首页广告
        homeAdvertPicture(){
            homeAdvertPictureApi().then(res => {
                if(res.code == 0){
                    this.topBananerList = res.Data.slideShow
                    this.leng = this.topBananerList.length
                    this.banner1 = res.Data.newHouse[0] ? res.Data.newHouse[0] : {advertImg:""}
                    this.banner2 = res.Data.newHouse[1] ? res.Data.newHouse[1] : {advertImg:""}
                    this.banner3 = res.Data.newHouse[2] ? res.Data.newHouse[2] : {advertImg:""}
                }
            })
        },
        //点击轮播图
        swipeClick(el){
            if(!el.linkUrl) return
            window.location.href = el.linkUrl
        },
        //获取用户信息
        getuserinfo(){
            getuserinfoApi().then(res => {
                if(res.code == 0){
                    localStorage.userinfoShop = JSON.stringify(res.user) 
                }
            })
        }
    },
    components: {
        searchHeader,
    },
};
</script>

<style scoped lang="less">


.bscroll-wrapper{
    height: calc(100vh - 90px - 100px);
}
.home{
    position: relative;
    overflow: hidden;
    .commodity-swipe{
        margin: 7px 0 40px;
        .custom-indicator{
            position: absolute;
            bottom: 20px;
            right:30px;
            width:60px;
            height:40px;
            background:rgba(153,153,153,1);
            border-radius:20px;
            text-align: center;
            line-height: 40px;
            font-size: 22px;
            color: #FFFEFE;
        }
        .w1{
            height: 320px;
        }
    }
    .flash-sale{
        width: 100%;
        height: 472px;
        vertical-align:text-top;
        .flash-sale-1{
            position: relative;
            .put-line{
                width: 6px;
                height: 40px;
                background-color: #FA5300;
                display: inline-block;
                position: relative;
                top:5px;
                
            }
            .t1{
                font-size:30px;
                color: #333;
                margin-right:20px;
            }
            .t2{
                font-size:30px;
                color: #333;
                display: inline-block;
                position: relative;
                &:after {
                    content: ' ';
                    position: absolute;
                    left: -15px;
                    top: 10px;
                    width: 6px;
                    height: 6px;
                    background-color: #333;
                    border-radius: 6px;
                }
            }
            .t3{
                position: absolute;
                top:20px;
                right: 145px;
                font-size:24px;
                color: #666
            }
            .van-count-down{
                display: inline-block;
                position: absolute;
                top:20px;   
                right:25px
            }
        }
        .flash-sale-2{
            width: 100%;
            height: 300px;
            margin-top: 17px;
            overflow: scroll;
            .pictures{
                height: 210px;
                width: 1000px;
                .p1{
                    width: 200px;
                    height: 210px;
                    display: inline-block;
                    margin-right:11px;
                    text-align: center;
                    .good-name{
                        font-size: 20px;
                        color: #333333
                    }
                    .good-price1{
                        display: inline-block;
                        color: #FA5300;
                        font-size: 24px;
                        margin-top: 8px;
                    }
                    .good-price2{
                        display: inline-block;
                        color: #666;
                        font-size: 16px;
                        margin-top: 10px;
                    }
                }
            }
        }
        .jump-btn-con{
            margin-top:10px;
            margin-right: 30px;
            .jump-btn{
                height: 50px;
                background-color: #fff;
                color: #333333;
                font-size: 24px;
                font-weight:bold;
                border:none;
                .jump-btn-icon{
                    display: inline-block;
                    width: 11px;
                    height: 16px;
                    background: url('~@/assets/img/tabbar/home/Enter@3x.png');
                    background-size: 100%;
                    margin-left:11px;
                    
                }
            }
        }
    }
    .good-recommend{
        width: 100%;
        padding: 0 30px;
        margin-bottom: 40px;
        .flash-sale-1{
            position: relative;
            height: 50px;
            line-height: 50px;
            .put-line{
                width: 6px;
                height: 40px;
                background-color: #FA5300;
                display: inline-block;
                position: relative;
                top:5px;
            }
            .t1{
                font-size:30px;
                color: #333;
                margin-right:20px;
            }
            .t2{
                float: right;
                font-size:20px;
                color: #666
            }
        }
        .flash-sale-2{
            width: 100%;
            margin-top: 17px;
            .pictures{
                display: flex;
                flex-direction:row;
                justify-content : space-between;
                .p1{
                    display: inline-block;
                    margin-right:5px;
                    text-align: center;
                    flex: 1;
                    background-color: #fff;
                    padding-bottom:  24px;
                    box-shadow:0px 2px 5px 0px rgba(0, 0, 0, 0.2);
                    img{
                        width: 220px;
                        height: 220px;
                    }
                    .good-name{
                        font-size: 20px;
                        color: #333333;
                        margin-top:9px;
                        height: 40px;
                    }
                    .good-price1{
                        display: inline-block;
                        color: #FA5300;
                        font-size: 20px;
                        margin-top: 14px;
                    }
                }
            }
        }
    }
    .good-world{
        width: 100%;
        height: 600px;
        padding: 0 30px;
        .flash-sale-1{
            position: relative;
            height: 50px;
            line-height: 50px;
            .put-line{
                width: 6px;
                height: 40px;
                background-color: #FA5300;
                display: inline-block;
                position: relative;
                top:5px;
                
            }
            .t1{
                font-size:30px;
                color: #333;
                margin-right:20px;

            }
            .t2{
                float: right;
                font-size:20px;
                color: #666;
               
            }
            .t3{
                position: absolute;
                top:20px;
                right: 145px;
                font-size:24px;
                color: #666
            }
            .van-count-down{
                display: inline-block;
                position: absolute;
                top:20px;
                right:25px
            }
        }
        .good-world-brand{
            height: 550px;
            width: 100%;
            margin-top: 17px;
            .brand-p-1{
                width: 100%;
                height: 340px;
                .brand-p-1-left{
                    width: 340px;
                    height: 340px;
                    float: left;
                    margin-right:10px;
                }
                .brand-p-1-right-top{
                    width: 340px;
                    height: 165px;
                    float: left;
                }
                .brand-p-1-right-bottom{
                    width: 340px;
                    height: 165px;
                    float: left;
                    margin-top: 10px;
                }
            }
            .brand-p-2{
                // width: 100%;
                height: 80px;
                margin-top: 10px;
                display: flex;
                flex-direction:row;
                flex-wrap: wrap;
                justify-content : space-between;
                img{
                    width: 165px;
                    height: 80px;
                    margin-right: 3px;
                    &:last-child { 
                        margin-right: 0
                    }
                }
            }
        }
    }
    .good-world-best{
        margin-bottom: 40px;
        padding: 0 30px;
        .flash-sale-1{
            position: relative;
            .put-line{
                width: 6px;
                height: 40px;
                background-color: #FA5300;
                display: inline-block;
                position: relative;
                top:5px;
            }
            .t1{
                font-size:30px;
                color: #333;
                margin-right:20px;
            }
            .t2{
                position: absolute;
                top:20px;
                right:30px;
                font-size:20px;
                color: #666
            }
        }
        .flash-sale-2{
            width: 100%;
            margin-top: 17px;
            .pictures{
                background-color: #F7E8C7;
                padding: 24px 24px 20px;
                .good-world-best-p1{
                    padding: 45px 0 16px;
                    width: 200px;
                    display: inline-block;
                    text-align: center;
                    margin-right: 21px;
                    background-color: #F2F3F5;
                    position: relative;
                    &:last-child {
                        margin-right: 0;
                    }
                    img{
                        width: 175px;
                        height: 175px;
                    }
                    .good-name{
                        padding: 0 12px;
                        height: 29px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        margin: 10px 0 14px;
                        color: #000;
                        font-size: 14px;
                    }
                    .good-price{
                        font-size:16px;
                        color: #F83600;
                    }
                }
            }
        }
    }
    .banner{
        width: 100%;
        height: 250px;
    }
    .exhibition{
        padding: 16px 30px 40px;
        background-color:#fff;
        .flash-sale-2{
            .pictures{
                display: flex;
                flex-direction:row;
                justify-content : space-between;
                .p1{
                    width: 166px;
                    display: inline-block;
                    margin-right:5px;
                    text-align: center;
                    img{
                        width: 166px;
                        height: 166px;
                    }
                    .good-name{
                        font-size: 20px;
                        color: #333333;
                        margin-top:9px;
                    }
                    .good-price1{
                        display: inline-block;
                        color: #F83600;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .good-popular{
        width: 100%;
        height: 462px;
        padding: 0 30px;
        .flash-sale-1{
            position: relative;
            height: 50px;
            line-height: 50px;
            .put-line{
                width: 6px;
                height: 40px;
                background-color: #FA5300;
                display: inline-block;
                position: relative;
                top:5px;
            }
            .t1{
                font-size:30px;
                color: #333;
                margin-right:20px;
            }
            .t2{
                float: right;
                font-size:20px;
                color: #666
            }
        }
        .good-popular-top{
            width: 100%;
            height: 170px;
            margin: 19px 0 10px;
            position: relative;
            display: flex;
            flex-direction:row;
            flex-wrap: wrap;
            justify-content : space-between;
            .good-popular-top-1{
                width: 340px;
                height: 170px;
                position: relative;
                margin-bottom: 10px;
            }
            
        }
        .good-popular-bottom{
            margin: 0px;
        }
        
    }
    .good-sort{
        width: 100%;
        // height: 1619px;
        box-sizing: border-box;
        padding-top:20px;
        /deep/ .van-tabs{
            .van-tabs__wrap{
                height: 100px;
                .van-tab{
                    line-height: 88px;
                }
                .primary{
                   font-size:34px;
                }
            }
            
        }
        .footer-exhibition{
            width: 100%;
            box-sizing: border-box;
            padding: 0 30px;
            overflow: hidden;
            margin-top: 20px;
            .exhibition-con{
                width: 100%;
                margin-bottom: 10px;
                display: flex;
                flex-direction:row;
                flex-wrap: wrap;
                justify-content : space-between;

            }
            .exhibition-left{
                width: 340px;
                height: 570px;
                float: left;
                background-color: #fff;
                margin-bottom: 10px;
                position: relative;
                .miaoshu{
                    line-height: 27px;
                    font-size: 18px;
                }
                img{
                    width: 340px;
                    height: 340px;
                }
                .icon{
                    position: relative;
                    top:8px;
                    img{
                        width: 30px;
                        height: 30px;
                        margin-left: 10px;
                    }
                }
                .produced{
                    margin-bottom: 18px;
                    .produced-font{
                        color: #DB9000;
                        margin-left:10px;
                    }
                }
                .score{
                    margin:10px 0 20px;
                    .van-rate{
                        margin-right:8px;
                    }
                }
                .price{
                    position: relative;
                    margin-bottom: 14px;
                    .price1{
                        font-size:28px;
                        color: #FA5300;
                        margin-right:11px;
                    }
                    .price2{
                        font-size:18px;
                        color: #666666;
                        text-decoration:line-through
                    }
                    .poin{
                        position: absolute;
                        font-size: 60px;
                        top: -35px;
                        right: 0;
                    }
                }
                .sales-num{
                    font-size: 24px;
                    margin-top: 10px;
                }
            }
        }
    }
}
.pl-30{
    padding-left: 30px;
}
.box{
    box-sizing: border-box
}
.pictures(@counter) when (@counter < 4 ) {
    .cximg@{counter} {
        &:after {
            content: ' ';
            position: absolute;
            left: 0px;
            top: -10px;
            width: 49px;
            height: 44px;
            background: url('~@/assets/img/tabbar/home/NO.@{counter}@3x.png') no-repeat center;
            background-size: 100%;
        }
    }
    .pictures(( @counter + 1 ));// 递归调用自身
}
.pictures(1);

</style>
