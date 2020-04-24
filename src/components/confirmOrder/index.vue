<template>
<!-- 确认订单母页面 -->
    <div class="confirm-order">
        <router-view></router-view>
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
        editTitle(name){
            this.title = name
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.confirm-order-header{
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
        transform: rotate(-90deg)
    }
}
</style>
