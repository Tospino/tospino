<template>
<!-- 商品详情页 -->
    <div class="commodity-details">
        <!-- 头部搜索框 -->
        <details-header></details-header>
        <div class="commodity-tab" v-if="true">
            <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300" @change="changeTab">
                <van-tab title="宝贝" ></van-tab>
                <!-- <van-tab title="评价"></van-tab> -->
                <van-tab title="参数"></van-tab>
                <van-tab title="详情"></van-tab>
                <van-tab title="推荐"></van-tab>
            </van-tabs>
        </div>
        <div class="commodity-tab-place"></div>
        <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" v-show="showData">
            <div class="bscroll-con">
                <div class="commodity-swipe">
                    <van-swipe @change="onChange" v-if="showData">
                        <van-swipe-item v-for="banner in detailmData.productImgList" :key="banner.imgId">
                            <div class="w1">
                                <img :src="$webUrl+banner.imgUrl">
                            </div>
                        </van-swipe-item>
                        <div class="custom-indicator" slot="indicator">
                            {{ current + 1 }}/{{leng}}
                        </div>
                    </van-swipe>
                </div>
                <div class="good-content">
                    <div v-if="detailmData.quoteMethod == 1">
                        <div class="prices">
                            <span class="mark c-orange">{{jn}}</span>
                            <span class="p1 c-orange">{{detailmData.discountPrice}}</span>
                            <span class="p2 through" v-if="detailmData.salePriceFlag">{{jn}}{{detailmData.salePrice}}</span>
                        </div>
                        <div>
                            <span class="p3">起订量{{detailmData.numIntervalStart}}件</span>
                        </div>
                    </div>
                    <div class="miaoshu">
                        <span class="p4">{{detailmData.supplyTitle}}</span>
                        <!-- <span >
                            <img src="@/assets/img/tabbar/home/commodityDetails/share-02@2x.png" class="fenxiang">
                            <span class="fenxiang-txt">分享</span>
                        </span> -->
                    </div>
                    <div class="qujianjia" v-if="detailmData.quoteMethod == 2">
                        <div v-for="(spc,index) in spclist" :key="index" class="qujianjia-item">
                            <div class="price">
                                <span class="huobi">{{jn}}</span>
                                <span>{{spc.price}}</span> 
                            </div>
                            <div class="piece">
                                <span>{{spc.pcs}}件</span>
                                <span v-show="index == 0">起订</span>
                            </div>
                        </div>
                    </div>
                    <div>已售:{{detailmData.skuSalesNum ? detailmData.skuSalesNum:0}}件</div>
                    <div class="supplement" v-if="false">
                        <span class="t1">物流</span>
                        <span class="t2">
                            浙江省 金华市
                        </span>
                        <span class="erect-line"></span>
                        <span class="t3">TOSPINO</span>
                    </div>
                </div>

                <van-cell-group class="border-0" @click="changeComStatus(true,false)">
                    <van-field v-model="username" clearable right-icon="arrow" :placeholder="detailmData.skuValuesTitle" left-icon="arrow" disabled>
                        <div slot="left-icon" size="small" type="primary" class="text-left" >
                            <span>规格</span>
                            <span>选择</span>
                            <span class="erect-line1"></span>
                        </div>  
                    </van-field>
                </van-cell-group>

                <div class="good-comment" @click="$router.push({name:'商品详情评价',query:{skuid:detailmData.skuId}})" ref="goodComment"  v-if="false">
                    <div v-if="detailmData.evaContent">
                        <div class="comment-top">
                            <span class="p1">评价</span>
                            <span class="p2">{{detailmData.starNumber}}</span>
                            <van-rate v-model="detailmData.starNumber" void-color="#FA5300"  color="#FA5300"/>
                        </div>
                        <div class="comment-describe">
                            <span> {{detailmData.nickName}}:{{detailmData.evaContent}}</span>
                        </div>
                        <div class="comment-specifications">
                            <span>
                                {{detailmData.proUnit}}
                            </span>
                        </div>
                        <div class="comment-arrow">
                            <van-icon name="arrow" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="comment-top">
                            <span class="p1">评价</span>
                            <span class="c-999">暂无评论</span>
                            
                        </div>
                    </div>
                </div>
                <div ref="guige">
                    <div class="canshu" v-for="(param,index) in productParamList" :key="index" >
                        <div class="canshu-item fl-left">{{param.paramTitle}}</div>
                        <div class="canshu-item fl-left">{{param.pvValue}}{{param.paramUnit}}</div>
                    </div>
                    <div class="shousuo" v-if="shousuoStatus" @click="zankai">
                        <span>展开</span>
                        <van-icon name="arrow-down" />
                    </div>
                    <div v-html="detailmData.supplyDetailpara"></div>
                </div>
                <div class="bbxq" ref="xiangqing">
                    <span class="line-left"></span>
                    <span class="bbxq-p1">宝贝详情</span>
                    <span class="line-right"></span>
                </div>
                <div class="banner" v-html="detailmData.supplyDetail" ></div>  
                <!-- 推荐宝贝 -->
                <div ref="tjbb"></div>
                <footer-exhibition :footerData="footerData" :webUrl="$webUrl" v-if="showfooter" @clickPro="clickPro" ></footer-exhibition>
            </div>
        </scroll>
        <!-- 底部导航 -->
        <van-tabbar v-model="active" class="footer-tab">
            <div class="icon-collection" @click="cliShoucang">
                <img src="@/assets/img/tabbar/home/commodityDetails/collection-02@2x.png" v-if="Isfavorites == 1 " >
                <img src="@/assets/img/tabbar/home/commodityDetails/collection@2x.png" v-else>
                <span class="icon-collection-p">收藏</span>
            </div>
            <div class="icon-service" @click="service">
                <img src="@/assets/img/tabbar/home/commodityDetails/service@2x.png">
                <span class="icon-collection-p">客服</span>
            </div>
            <van-button type="default" class="add-shopping-cat" @click="changeComStatus(true,true,'确定')">加入购物车</van-button>
            <van-button type="primary" class="spend" @click="changeComStatus(true,true,'立即购买')">立即购买</van-button>
        </van-tabbar>        
        
        <transition name="updown">
            <commodity-selection v-show="comStatus" @changeComStatus="changeComStatus" :selectionData="selectionData" :btnStatus="btnStatus" :btnName="btnName"></commodity-selection>
        </transition>


        <van-overlay :show="show2" @click="show2 = false" class="overlay">
            <!-- 客服电话 -->
            <kefu></kefu>
        </van-overlay>

    </div>
</template>

<script>
import detailsHeader from '@/multiplexing/detailsHeader'
import footerExhibition from '@/multiplexing/footerExhibition'
import commoditySelection from '@/multiplexing/commoditySelection'
import {productdetailApi} from '@/api/home/commodityDetails'
import {adduserbrowhistoryApi,adduserfavoritesApi} from '@/api/favorites/index.js'
import kefu from '@/multiplexing/kefu.vue'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            recordGroup:[],
            current: 0,
            username:'',
            value:4,
            active:0,
            show: false,
            show2:false,
            detailmData:{},
            leng:0,
            footerData:{
                list:[]
            },
            showfooter:false,
            Isfavorites:0,
            comStatus:false,
            selectionData:{},
            btnStatus:false,
            btnName:'',
            productParamList:[],
            productParamList2:[],
            shousuoStatus:false,
            showData:false,
            spclist:[]
        };
    },
    computed: {

    },
    created() {
        
    },
    mounted() {
        setTimeout(()=>{
            this.productdetail(this.$route.query.skuId)
        },10)
        this.adduserbrowhistory(this.$route.query.skuId)
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.name == '搜索商品1'){
            to.meta.isBack = false;
        }
        next()
    },
    watch: {

    },
    methods: {
        onChange(index) {
            this.current = index;
        },
        service(){
            this.show2 = true
        },
        //商品详情
        productdetail(id){
            productdetailApi({skuid:id}).then(res => {
                if(res.code == 0){
                    Toast.loading({loadingType: 'spinner', message: 'loading...',});
                    this.detailmData = res.Data
                    this.leng = res.Data.productImgList.length
                    this.selectionData = res
                    this.detailmData.salePriceFlag = true
                    if(this.detailmData.discountPrice == null){
                        this.detailmData.discountPrice = this.detailmData.salePrice
                        this.detailmData.salePriceFlag = false
                    }
                    this.footerData.list = res.GuessyouLike
                    this.showfooter = true //数据回调回来,显示猜你喜欢
                    this.Isfavorites = res.Data.isfavorites  //收藏状态

                    this.spclist = res.spclist
                    this.productParamList = res.Data.productParamList.slice(0,5)
                    this.productParamList2 = res.Data.productParamList
                    if(res.Data.productParamList.length > 5){
                        this.shousuoStatus = true
                    }
                    setTimeout(()=>{
                        this.showData = true
                        Toast.clear();
                    },1000)
                }else if(res.code == -326){
                    Toast('商品已下架')
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                }
            })
        },
        //猜你喜欢点击了商品
        clickPro(skuid){
            this.productdetail(skuid)
            this.$refs.wrapper.scrollTo(0,0,500)
            this.active = 0
        },
        //弹出规格框
        //第一个参数:弹窗状态,第二个参数:弹窗按钮类型,弹窗按钮名字
        changeComStatus(flag,btnFlag,name){
            this.btnName = name
            this.comStatus = flag
            //没传值就是从组件内部调用
            if(typeof(btnFlag) == 'undefined') return
            this.btnStatus = btnFlag
        },
        //增加用户浏览记录数据
        adduserbrowhistory(id){
            adduserbrowhistoryApi({skuid:id}).then(res => {})
        },
        //点击tab标签
        changeTab(index){
            switch (index){
                case 0:
                    this.$refs.wrapper.scrollTo(0,0,500)
                    break;
                case 1:
                    this.$refs.wrapper.scrollToElement(this.$refs.guige,500)
                    break;
                case 2:
                    this.$refs.wrapper.scrollToElement(this.$refs.xiangqing,500)
                    break;
                case 3:
                    this.$refs.wrapper.scrollToElement(this.$refs.tjbb,500)
            }
        },
        //点击收藏图标
        cliShoucang(){
            if(this.Isfavorites == 1) return
            let arr = []
            arr.push(this.detailmData.skuId)
            this.adduserfavorites(arr)           
        },
        //加入收藏夹
        adduserfavorites(data){
            adduserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    this.Isfavorites = 1
                }
            })
        },
        //展开
        zankai(){
            this.productParamList = this.productParamList2
            this.shousuoStatus = false
        }
    },
    components: {
        detailsHeader,
        footerExhibition,
        commoditySelection,
        kefu
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 168px - 100px);
}
.commodity-details{
    .commodity-swipe{
        width: 750px;
        height: 750px;
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
    }
    .commodity-tab-place{
        height: 80px;
    }
    .commodity-tab{
        height: 80px;
        position: fixed;
        top:80px;
        z-index: 5;
        width: 100%;
        .tab-list{
            height: 80px;
            /deep/ .van-tabs__wrap{
                height: 80px;
                .van-tabs__nav{
                   background-color: #F2F3F5;
                }
                .van-tab{
                    line-height: 80px;
                    flex-basis: 20% !important;
                    font-size: 28px;
                    color: #000;
                }
                .van-tabs__line{
                    bottom: 30px;
                    background-color: #FA5300;
                }
            }
            
        }
    }
    .good-content{
        width: 100%;
        padding: 30px 30px 0;
        box-sizing: border-box;
    }
    .miaoshu{
        position: relative;
        margin: 10px 0;
        .fenxiang{
            position: absolute;
            top:-50px;
            right:0;
            width: 34px;
            height: 34px;
            
        }
        .fenxiang-txt{
            position: absolute;
            right:0;
            top: 0px;
            font-size: 20px;
            color:#999999;
        }
    }
    .qujianjia{
        display: flex;
        flex-direction:row;
        flex-wrap : wrap;
        .qujianjia-item{
            margin:0 40px 10px 0;
            &:nth-child(3){
                margin-right:0
            }
            .huobi{
                font-size: 16px;
            }
            .price{
                font-size: 36px;
                color: #FA5300;
            }
            .piece{
                margin-top: 10px;
                font-size: 18px;
                color: #333;
            }
        }
    }
    .supplement{
        .t1{
            color: #000000;
            font-size:18px;
            font-weight: bold;
        }
        .t2{
            font-size: 18px;
            color: #333;
        }
        .erect-line{
            display: inline-block;
            width: 1px;
            height: 18px;
            background-color: #999999;
        }
        .t3{
            height:18px;
            background:rgba(153,153,153,1);
            border-radius:12px;
            font-size: 12px;
            color: #FFFEFE;
            padding: 0 5px;
        }
    }
    .border-0{ //跳转栏
        margin-top: 14px;
        /deep/ .van-cell{
            height: 100px;
            line-height: 80px;
            .van-cell__value{
                border:0;
                margin-left:100px;
                /deep/ .van-field__body{
                    width: 95%;
                    .van-field__control{
                        font-size: 20px;
                    }
                    .van-icon-arrow{
                        font-size: 30px;
                    }
                }
            }
            .text-left{
                width: 60px;
                position: absolute;
                left:23px;
                top:30px;
                color: #000000;
                font-size: 20px;
                line-height:33px;
                font-weight:bold;
                .erect-line1{
                    position: absolute;
                    display: inline-block;
                    width: 2px;
                    height: 50px;
                    background-color: #DCDCDC;
                    top:3px;
                    left:60px;
                }
            }
        }
    }
    .good-comment{
        width: 100%;
        margin: 21px 0 0;
        position: relative;
        background-color: #fff;
        .comment-top{
            height: 87px;
            line-height: 87px;
            .p1{
                margin:0 20px 0 30px;
                font-size: 22px;
                color: #000;

            }
            .p2{
                color: #F83600;
                font-size: 22px;
            }
        }
        .comment-describe{
            display: inline-block;
            width: 534px;
            font-size: 20px;
            color: #333;
            margin-left:94px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 25px;
        }
        .comment-specifications{
            display: inline-block;
            margin:17px 0 0 94px;
            font-size:16px;
            color: #666666;
        }
        .comment-arrow{
            position: absolute;
            top:102px;
            right:30px;
            color: #999;
            .van-icon-arrow{
                font-size: 30px;
            }
        }
    }
    .canshu{
        overflow: hidden;
        text-align: center;
        border: 1px solid #999;
        padding: 20px 0;
        display: flex;
        display: -webkit-flex;
        align-items:center;
        justify-content:center;
        .canshu-item{
            width: 48%;
        }
    }
    .shousuo{
        text-align: center;
        height: 40px;
        line-height: 40px;
        border: 1px solid #999;
        span{
            vertical-align: text-bottom;
        }
    }
    .bbxq{
        width: 100%;
        height: 85px;
        background-color: #F2F3F5;
        text-align: center;
        line-height: 85px;
        position: relative;
        .line-left{
            display: inline-block;
            position: absolute;
            width: 40px;
            height: 2px;
            background-color: #666666;
            top:40px;
            left:273px;
        }
        .bbxq-p1{
            font-size:28px;
            color: #666666;
        }
        .line-right{
            display: inline-block;
            position: absolute;
            width: 40px;
            height: 2px;
            background-color: #666666;
            top:40px;
            right:273px;
        }
    }

    /deep/ .footer-tab.van-tabbar--fixed{
        height: 100px;
        .icon-collection{
            position:absolute;
            display: inline-block;
            width: 60px;
            height: 100%;
            left:52px;
            color: #666;
            img{
                width: 48px;
                height: 48px;
                position: absolute;
                top:14px;
            }
            .icon-collection-p{
                position: absolute;
                bottom:10px;
                font-size: 20px;
                color: #666;
            }
        }
        .icon-service{
            position:absolute;
            display: inline-block;
            width: 60px;
            height: 100%;
            left:156px;
            color: #666;
            
            img{
                width: 48px;
                height: 48px;
                position: absolute;
                top:14px;
            }
            .icon-collection-p{
                position: absolute;
                bottom:10px;
                font-size: 20px;
                color: #666;
            }
        }
        .add-shopping-cat{
            width: 230px;
            height: 84px;
            background-color: #FA5300;
            position: absolute;
            left:268px;
            top:8px;
            color: #fff;
            font-size: 30px;
            border-radius:39px;
        }
        .spend{
            width: 230px;
            height: 84px;
            background-color:#FAB600;
            position: absolute;
            right:14px;
            top:8px;
            color: #fff;
            font-size: 30px;
            border:0;
            border-radius:39px;
        }
    }
    .w1{
        width: 100%;
        height: 750px;
        
    }
    .mark{
        font-size: 16px;
    }
    .p1{
        font-size: 36px;
    }
    .p2{
        font-size: 18px;
        color: #666
    }
    .p3{
        display: inline-block;
        font-size:18px;
        color: #333333;
        margin: 12px 0 20px;
    }
    .p4{
        display: inline-block;
        width: 606px;
        // height: 60px;
        font-size: 30px;
        color: #010101
    }
    .overlay{
        z-index: 7 !important;
        overflow-y: auto;
        .overlay-wrapper{
            width: 100%;
            height: 1062px;
            position: absolute;
            bottom: 0;
           
        }
    }
    
}
</style>
