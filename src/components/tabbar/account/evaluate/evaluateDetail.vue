<template>
    <div class="evaluate-detail">
        <div class="detail-d1">
            <div>
                <span>订单编号：</span>
                <span>1230456156461648</span>
            </div>
            <div>
                <span>订单编号：</span>
                <span>1230456156461648</span>
            </div>
        </div>
        <div class="detail-d2">
            <div class="good-img">
                <img src="@/assets/img/confirmOrder/chanpin-06@2x.png">
            </div>
            <div class="d2-right">
                <div>VH女包高级感刺绣撞色方包小蜜蜂时尚单肩包2019新款潮流斜挎包</div>
                <div>{{jn}}596.00</div>
            </div>
        </div>
        <div class="detail-d3">
            <div class="d3-con" v-for="(rate,index) in rateList" :key="index">
                <div class="top-rate">
                    <span class="rate-p3">{{rate.name}}</span>
                    <van-rate v-model="rate.value" color="#FA5300" class="rate"/>
                    <span class="rate-p2">{{rate.value}}.0分</span>
                </div>
            </div>
        </div>
        
        <div class="detail-d4">
            <div class="d4-title">
                <span>我的评价</span>
                <span class="fl-right">2019-06-11</span>
            </div>
            <div class="d4-content">
                <span v-for="i in 2" :key="i">我来到这里，特别喜欢这个充值功能，方便快捷，优惠多多，福利多多，充值10000送100，简直太划算了!!!</span>
            </div>
        </div>
        <!-- 追评 -->
        <div class="detail-d5" v-if="isAppend">
            <div class="d5-title">
                <span>购买120天后追评</span>
            </div>
            <div class="d5-content">
                <span>用了一段时间，产品挺好谢谢！！</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            value:3,
            rateList:[
                {
                    name:'商品评分',
                    value:2
                },
                {
                    name:'物流服务',
                    value:3
                },
            ],
            isAppend:false
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

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.evaluate-detail{
    .detail-d1{
        box-sizing: border-box;
        height: 148px;
        padding: 41px 0 0 30px;
        background-color: #fff;
        margin-bottom: 20px;
        div{
            &:nth-child(1){
                margin-bottom: 20px;
            }
        }
        span{
            &:nth-child(1){
                font-size:26px;
                color: #999;
            }
            &:nth-child(2){
                font-size:28px;
                color: #333;
            }
        }
    }
    .detail-d2{
        box-sizing: border-box;
        height: 180px;
        background-color: #fff;
        margin-bottom: 20px;
        padding: 25px 42px 0 30px;
        .good-img{
            width: 130px;
            height: 130px;
            float: left;
        }
        .d2-right{
            float: left;
            width: 528px;
            div{
                &:nth-child(1){
                    font-size:26px;
                    color: #333;
                    line-height:39px;
                    margin-bottom: 34px;
                }
                &:nth-child(2){
                    font-size:30px;
                    color: #333;
                    font-weight:bold;
                }
            }
            
        }
    }
    .detail-d3{
        margin-bottom: 20px;
        .d3-con{
            height: 100px;
            background-color: #fff;
            font-size:26px;
            line-height: 100px;
        }
        .top-rate{
            height: 100px;
            line-height: 100px;
            padding:0 30px;
            .rate-p1{
                font-size:34px;
                color: #333;
                margin-right: 30px;
            }
            .rate-p2{
                font-size:30px;
                color: #999;
                margin-left: 30px;
            }
            .rate-p3{
                font-size:26px;
                color: #333;
                margin-right: 60px;
            }
            .rate{
                /deep/ .van-icon{
                    font-size: 30px;
                }
            }
        }
        
    }
    .detail-d4{
        padding: 0 30px 20px;
        background-color: #fff;
        line-height: 93px;
        font-size: 26px;
        color: #999;
        .d4-content{
            background-color: #fff;
            font-size:28px;
            line-height:42px;
            color: #333;
        }
    }
    .detail-d5{
        padding: 0 30px 20px;
        background-color: #fff;
        line-height: 93px;
        font-size: 26px;
        color: #999;
        border-top: 2px solid #DCDCDC;
        min-height: 324px;
        .d5-content{
            background-color: #fff;
            font-size:28px;
            line-height:42px;
            color: #333;
        }
    }
}
</style>
