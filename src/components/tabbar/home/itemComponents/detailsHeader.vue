<template>
<!-- 商品详情头部搜素 -->
    <div class="footprint-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">相似产品</span>
            <van-icon name="shopping-cart-o" class="ellipsis" info="10" @click="$router.push({name:'购物车'})"/>
        </div>
    
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            value:''
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
        onSearch(){}
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.footprint-header{
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: relative;
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
    .ellipsis{
        position: absolute;
        top:20px;
        right: 30px;
        font-size: 40px;
        .van-info{
            line-height: 20px;
            text-align: center;
        }
    }
}
</style>
