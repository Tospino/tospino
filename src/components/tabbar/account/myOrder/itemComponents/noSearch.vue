<template>
<!-- 我的订单未搜到商品 -->
    <div class="no-search">
        <div class="content">
            <div class="no-search-img">
                <img src="@/assets/img/confirmOrder/order@2x.png" alt="">
            </div>
            <div class="no-search-p1">
                您还没有相关的订单
            </div>
            <div class="no-search-p2">
                可以去看看有哪些想买的
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
.no-search{
    position: relative;
    padding: 39px 30px 0;
    box-sizing: border-box;
    .content{
        position: relative;
        margin-top:200px;
        text-align: center;
    }
    .no-search-img{
        display: inline-block;
        width: 160px;
        height: 160px;
    }
    .no-search-p1{
        margin-top:41px;
        font-size:30px;
        color: #333;
    }
    .no-search-p2{
        margin-top:24px;
        font-size:26px;
        color: #666;
    }
}
</style>
