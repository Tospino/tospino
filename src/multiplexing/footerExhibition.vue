<template>
<!-- 你可能还喜欢,推荐商品页 -->
    <div class="footer-exhibition">
        <div class="nknxh" v-if="showIlike">
            <span class="line-left"></span>
            <span class="icon">
                <img src="@/assets/img/tabbar/home/commodityDetails/disabled@2x.png">
            </span>
            <span class="nknxh-p1">你可能还喜欢</span>
            <span class="line-right"></span>
        </div>
        <div class="exhibition-con clearfix">
            <div  v-for="good in dataList" :key="good.skuId">
                <div v-if="good.canSalesNum > 0" class="exhibition-left" @click="toProduDetail(good.skuId)">
                    <img :src="$webUrl+good.imgUrl">
                    <div class="produced">
                        <span class="icon">
                            <img :src="$webUrl+good.locationUrl" v-if="good.locationUrl">
                        </span>
                        <span class="produced-font">{{good.locationName ? good.locationName:''}}</span>
                    </div>
                    <div class="produced-title">
                        <span>{{good.supplyTitle}}</span>
                    </div>
                    <div class="score">
                        <van-rate v-model="good.starNumber" readonly  color="#FA5300"/>
                        <span>{{good.manNumber}}</span>
                    </div>
                    <div class="price">
                        <span class="price1">{{jn}}{{good.discountPrice == null ? good.salePrice:good.discountPrice}}</span>
                        <span class="price2" v-if="good.discountPrice != null">{{jn}}{{good.salePrice}}</span>
                        <!-- <span class="poin">...</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showIlike:{
            type:Boolean,
            default:true
        },
        footerData:{
            type:Object,
            default: ()=>{
                return {}
            }
        },
    },
    data() {
        return {
            value:1,
            footerObj:{},
            dataList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getData()
    },
    watch: {
        footerData:{
            handler:function(newVal, oldVal){
                this.getData()
            },
        },
    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        //跳转到商品详情
        toProduDetail(skuId){
            this.$emit('clickPro',skuId)
            // this.$router.push({name:'商品详情',query:{skuId}})
        },
        getData(){
            this.footerObj = Object.assign({},this.footerObj,this.footerData)
            if(!this.footerObj.list) return
            this.dataList = this.footerObj.list
        }

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.footer-exhibition{
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    overflow: hidden;
    margin-top: 20px;
    .nknxh{
        width: 100%;
        height: 85px;
        text-align: center;
        line-height: 85px;
        position: relative;
        .line-left,.line-right{
            display: inline-block;
            width: 40px;
            height: 2px;
            background-color: #666666;
            vertical-align: super;
        }
        .nknxh-p1{
            font-size:28px;
            color: #666666;
            vertical-align: top;
        }
        .icon{
            display: inline-block;
            width: 30px;
            height: 30px;
            position: relative;
            vertical-align: middle;
            img{
                position: absolute;
                top:0;
                left:0
            }
        }
    }
    .exhibition-con{
        width: 100%;
        margin-bottom: 10px;
    }
    .exhibition-left{
        width: 340px;
        height: 570px;
        float: left;
        background-color: #fff;
        margin-bottom: 10px;
        padding-bottom: 20px;
        &:nth-child(2n+0){
            margin-left:10px;
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
        .produced-title{
            padding-left:10px;
            height: 35px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 18px;
        }
        .score{
            margin:10px 0 20px;
            color: #999;
            .van-rate{
                margin-right:8px;
            }
        }
        .price{
            position: relative;
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
    }
    
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: "";
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
</style>
