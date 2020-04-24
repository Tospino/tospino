<template>
<!-- 平台介绍 -->
    <div class="introduce">
        <div class="title" v-if="showTitle">关于我们</div>
        <p>
            TOSPINO APP是一款跨境B2B线上商城，专注于通过智能高效的线上交易模式帮助零售商家完成海量商品的轻松采购。<br>
            TOSPINO拥有数十年的进出口经验，发展了丰富的产品渠道，通过供应链升级的方式，TOSPINO汇聚了来自各地优质品牌和工厂的产品，品类全面，性价比更高。为了进一步升级采购体验，Tospino以移动互联网为媒介，让用户在手机上随时随地即可大小批量的采购活动，下单时，用户可选择充值余额/Paypal 线上支付和货到付款的结算方式。<br>
            <br>
            关于团队<br>
            Tospino的服务团队90%以上由本地人员组成，包括仓储人员、物流团队以及线上客服人员，所有员工都接受了专业的培训，保证用户的消费体验。<br>
            <br>
            平台功能<br>
            Tospino APP主要由首页、分类、购物车、资讯、我的五大功能模块组成，用户可以在APP里完成下单采购、物流跟踪、退换货等操作，体验更轻松、优惠的采购模式。<br>
            <br>
            1）首页<br>
            “首页”的展示内容包括定位、商品搜索、商品分类、限时抢购、商品列表、品牌展示。<br>
            输入关键词可以搜索相关的商品，点击首页的商品可以跳转到商品的详情页。<br>
            2）分类<br>
            “分类”模块的页面内容包括商品搜索、分类列表、排序方式、筛选、商品列表。<br>
            产品分类内容包括“数码、食品、母婴、建材、日用、服装、美妆、家电”等几大类型产品和对应的细分类。<br>
            3）购物车<br>
            APP用户在商品的详情页中可以将商品加入“购物车”。<br>
            “购物车”的页面包括商品列表，功能有列表商品选中、结算、删除<br>
            4）我的<br>
            “我的”模块内容包括个人资料、余额、优惠券、积分、订单状态、浏览记录、收藏、积分说明、APP设置
        </p>
    </div>
</template>

<script>
export default {
    props: {
        showTitle:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {

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
.title{
    margin:72px 0 41px;
    font-weight:bold;
    font-size:32px;
    text-align: center;
}
p{
    padding: 0 30px 131px;
    font-size:26px;
    line-height:39px;
    color: #333;
}
</style>
