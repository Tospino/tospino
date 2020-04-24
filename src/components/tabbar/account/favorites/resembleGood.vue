<template>
<!-- 找相似商品 -->
    <div class="resemble-good">
        <div class="footprint-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">相似产品</span>
            <van-icon name="chat-o" class="chat" size="17px" @click="jumpRouter('消息')"/>
        </div>
        <div class="place"></div>
        <!-- 未失效商品 -->
        <div class="footprint-goods-content" v-for="product in footerData.list" :key="product.skuId">
            <div class="good-img">
                <img :src="$webUrl+product.imgUrl">
            </div>
            <div class="good-desc">
                <span class="p1 clamp-2">{{product.supplyTitle}}</span><br>
            </div>
            <div class="country">
                <div class="good-img" v-if="product.locationUrl">
                    <img :src="$webUrl+product.locationUrl">
                </div>
                <div class="guojia" v-if="product.locationName">
                     <span>{{product.locationName}}</span><br>
                </div>
            </div>
            <div class="good-price" >
                <span class="p1">{{jn}}{{product.discountPrice}}</span>
                <span class="p3">已售{{product.skuSalesNum ? product.skuSalesNum : 0}}件</span>
                <span class="p2" @click="buyProduct(product)">购买</span>
            </div>
        </div>
        <footer-exhibition :footerData="footerData2"></footer-exhibition>
    </div>
</template>

<script>
import footerExhibition from '@/multiplexing/footerExhibition'
import {guessyoulikeApi} from '@/api/search/index'
export default {
    props: {

    },
    data() {
        return {
            footerData:{},
            footerData2:{},
            youlikeData:{
                page:1,
                limit:10,
                categoryId:''
            },
            youlikeData2:{
                page:1,
                limit:6,
                seraname:''
            },
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.youlikeData.categoryId = this.$route.query.categoryId
        this.guessyoulike(this.youlikeData)
        this.guessyoulike2(this.youlikeData2)
    },
    watch: {

    },
    methods: {
        //找相似商品
        guessyoulike(data){
            guessyoulikeApi(data).then(res => {
                if(res.code == 0){
                    this.footerData = res.Data
                    this.footerData.list.forEach(item => {
                        if(item.discountPrice == null){
                            item.discountPrice = item.salePrice
                        }
                    });
                }
            })
        },
        //猜你喜欢
        guessyoulike2(data){
            guessyoulikeApi(data).then(res => {
                if(res.code == 0){
                    this.footerData2 = res.Data
                }
            })
        },
        jumpRouter(name){
            this.$router.push({name})
        },
        //点击购买
        buyProduct(item){
            this.$router.push({name:'商品详情',query:{skuId:item.skuId}})
        }
    },
    components: {
        footerExhibition,
    },
};
</script>

<style scoped lang="less">
.resemble-good{
    .footprint-header{
        width: 100%;
        height: 88px;
        background-color: #f2f3f5;
        text-align: center;
        position: fixed;
        z-index: 2;
        .arrow-left{
            position: absolute;
            top:20px;
            left:30px;
            font-size: 40px;
            
        }
        .header-t1{ 
            display: inline-block;
            line-height: 88px;
            font-size: 36px;
            color: #010101;
        }
        .header-t2{
            position: absolute;
            font-size:30px;
            right: 100px;
            top:30px;
        }
        .chat{
            position: absolute;
            top:20px;
            right: 30px;
        }
    }
    .footprint-goods-content{
        width: 100%;
        height: 250px;
        background-color: #fff;
        position: relative;
        margin-bottom: 20px;
        .good-img{
            width: 160px;
            height: 160px;
            position: relative;
            top:20px;
            left:30px;
            .img-checkbox{
                position: absolute;
                left:20px;
                top:20px;
                /deep/ .van-icon{
                    background:rgba(51,51,51,0.5);
                }
            }
        }
        .good-desc{
            position: absolute;
            top:39px;
            left:211px;
            font-size:26px;
            color: #333;
            .p1{
                line-height:39px;
            }
            .p2{
                font-size:20px;
                color:rgba(102,102,102,1);
                margin-top:20px;
                display: inline-block;
            }
        }
        .country{
            position: absolute;
            top:110px;
            left:190px;
            color: #333;
            font-size:36px;
            .good-img{
                width: 30px;
                height: 30px;

            }
            .guojia{
                font-size: 20px;
                color: #DB9000;
                margin-left:70px;
                margin-top:-5px;
            }
        }
        .good-price{
            position: absolute;
            top:184px;
            left:211px;
            color: #333;
            font-size:36px;
            .p2{
                width:100px;
                height:40px;
                background:rgba(250,83,0,1);
                border-radius:20px;
                font-size: 26px;
                color: #FFFEFE;
                text-align: center;
                line-height: 40px;
                position: absolute;
                left:400px;
            }
            .p3{
                font-size: 16px;
                color: #666;
            }
        }
    }
}
</style>
