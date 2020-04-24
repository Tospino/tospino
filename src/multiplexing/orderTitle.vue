<template>
<!-- 订单头部 -->
    <div class="orderTitle">
        <div class="footprint-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <van-icon name="chat-o" size="17px" @click="jumpRouter('消息')" class="chat"/>
        </div>
        <div class="place"></div>
        
    </div>
</template>

<script>
export default {
    props: {
        title:{
            type: String,
            default: '我的订单'
        },
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
        jumpRouter(name){
            this.$router.push({name})
        },
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
    position: fixed;
    top:0;
    left:0;
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
        top:20px;
        right: 100px;
        font-size: 40px;
    }
    .chat{
        position: absolute;
        top:20px;
        right: 30px;
    }
}
</style>
