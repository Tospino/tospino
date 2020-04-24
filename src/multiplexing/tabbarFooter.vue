<template>
<!-- 底部导航 -->
    <div class="tabbar">
        <van-tabbar class="icons" v-model="active" active-color="#F83600" inactive-color="#010101" route>
            <!-- <span>自定义</span> -->
            <!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive"> -->
            <van-tabbar-item route to="/control/home" replace>
                <span>主页</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.home1 : icon.home" class="icon-style">
            </van-tabbar-item>
             <van-tabbar-item route to="/control/classify" replace>
                <span>分类</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.sort1 : icon.sort" class="icon-style">
            </van-tabbar-item>
            <van-tabbar-item route to="/control/shoppingCart" :replace="isreplace">
                <span>购物车</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.cart1 : icon.cart" class="icon-style">
            </van-tabbar-item>
            <van-tabbar-item route to="/control/account" :replace="isreplace"> 
                <span>我的</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.mine1 : icon.mine" class="icon-style">
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import home1 from '@/assets/img/tabbar/home/home1@3x.png'
import home from '@/assets/img/tabbar/home/home@3x.png'
import cart1 from '@/assets/img/tabbar/home/cart1@3x.png'
import cart from '@/assets/img/tabbar/home/cart@3x.png'
import mine from '@/assets/img/tabbar/home/mine@3x.png'
import mine1 from '@/assets/img/tabbar/home/mine1@3x.png'
import sort from '@/assets/img/tabbar/home/sort@3x.png'
import sort1 from '@/assets/img/tabbar/home/sort1@3x.png'
export default {
    props: {
        
    },
    data() {
        return {
            active:0,
            icon:{
                home1,
                home,
                cart1,
                cart,
                mine,
                mine1,
                sort,
                sort1
            },
            isreplace:false,
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.isreplace = localStorage.token ? true : false
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
.tabbar{
    width: 100%;
    height: 98px;
    .icons{
        height: 98px;
        /deep/ i{
            font-size: 43px;
        }
        /deep/ .van-tabbar-item__text{
            font-size: 20px;
            font-weight: bold;
        }
        
    }
    .icon-style{
        width: 43px;
        height: 43px;
        margin-bottom: 3px;
    }
}
</style>
