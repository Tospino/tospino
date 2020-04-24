<template>
<!-- 可发表评论的列表 -->
    <div class="evaluate-list">
        <div class="commodity-tab">
            <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300">
                <van-tab :title="i.title+`(${i.num})`"  v-for="(i,index) in tabs" :key="index">
                    <div>
                        <div class="good-detail" v-for="i in 3" :key="i">
                            <div class="good-detail-header">
                                <span>订单编号：1234567890</span>
                            </div>
                            <div class="good-detail-content clearfix">
                                <div class="good-detail-img">
                                    <img src="@/assets/img/tabbar/shoppingCart/product-03@2x.png">
                                </div>
                                <div class="good-detail-title">
                                    <span class="name">啄木鸟女包2019新款时尚休闲单肩斜挎包百搭手提包大容量女...</span>
                                    <div class="guige">
                                        红色/L码
                                    </div>
                                </div>
                                <div class="price">
                                    <div class="p3">
                                        {{jn}}596.00
                                    </div>
                                    <div class="p4 fl-right">
                                        x1
                                    </div>
                                </div>
                                <!-- <div style="height:35px;"></div> -->
                                <div class="btns">
                                    <div class="pj" @click="rightBtn">
                                        评价
                                    </div>
                                    <div class="ckdd" @click="jumpRouter('订单详情')">
                                        查看订单
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer-exhibition></footer-exhibition>
                </van-tab>
            </van-tabs>
        </div>
        
    </div>
</template>

<script>
import footerExhibition from '@/multiplexing/footerExhibition.vue'
export default {
    props: {

    },
    data() {
        return {
            active:0,
            tabs:[
                {
                    title:'待评价',
                    num:0
                },
                {
                    title:'追评',
                    num:0
                }
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        //右边按钮（评价或者追评）
        rightBtn(btnName){
            if(btnName == '评价'){
                this.jumpRouter('发表评价')
            }else if(btnName == '追评'){
                this.jumpRouter('追加评价')
            }
        }
    },
    components: {
        footerExhibition
    },
};
</script>

<style scoped lang="less">
.evaluate-list{
    border-top: 2px solid #DCDCDC
}
.commodity-tab{
    height: 80px;
    .tab-list{
        height: 96px;
        /deep/ .van-tabs__wrap{
            height: 96px;
            .van-tabs__nav{
                background-color: #F8F8FA;
            }
            .van-tab{
                line-height:96px;
                flex-basis: 20% !important;
                font-size: 28px;
            }
            .van-tabs__line{
                bottom: 30px;
                background-color: #FA5300;
            }
        }
    }
}
.good-detail{
    padding: 0 30px;
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
        background-color: #fff;
        padding: 20px 20px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 150px;
            height: 150px;
            float: left;
            margin-right:20px;
        }
        .good-detail-title{
            width: 336px;
            float: left;
            .name{
                display: inline-block;
                color: #333;
                font-size: 26px;
                line-height:39px;
                margin-bottom: 35px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .guige{
                color: #999;
                font-size: 18px;
                display: inline-block;
            }
        }
        .price{
            float: right;
            font-size: 26px;
            .p3{
                font-size:26px;
                color: #333;
                margin-bottom: 30px;
            }
            .p4{
                color: #999;
                font-size: 22px;
            }
        }
        .btns{
            float: right;
            overflow: hidden;
            margin-top:20px;
            .ckdd{
                width:150px;
                height:48px;
                border:1px solid rgba(153,153,153,1);
                border-radius:24px;
                line-height: 48px;
                text-align: center;
                font-size:26px;
                float: right;
                color: #666;
            }
            .pj{
                width:98px;
                height:48px;
                border:1px solid rgba(250,83,0,1);
                border-radius:24px;
                font-size:26px;
                text-align: center;
                line-height: 48px;
                float: right;
                color: rgba(250,83,0,1);
                margin-left:20px;
            }
        }
    }
}
</style>
