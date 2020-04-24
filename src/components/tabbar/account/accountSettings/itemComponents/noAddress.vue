<template>
    <div class="no-address">
        <div class="address-p1">
            您的地址：
        </div>
        <div class="address-p2">
            <span>TOSPINO友情提示：此处我们只开放可配送区域的地址，若没有您需要的收获地址，请联系</span>
            <span class="c-orange" @click="show2=true">TOSPINO</span>
        </div>
       <div class="address-p3" @click="jumpRouter('新增地址')">
            <span>添加新地址</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>

        <van-overlay :show="show2" @click="show2 = false" class="overlay">
            <!-- 客服电话 -->
            <kefu></kefu>
        </van-overlay>
    </div>
</template>

<script>
import kefu from '@/multiplexing/kefu.vue'
export default {
    props: {

    },
    data() {
        return {
            show2:false
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
        kefu
    },
};
</script>

<style scoped lang="less">
.no-address{
    padding: 0 30px;
    .address-p1{
        font-size:40px;
        color: #666;
        margin:71px 0 24px;
    }
    .address-p2{
        font-size:24px;
        color: #666;
        margin-bottom:38px;
        line-height:36px;
    }
    .address-p3{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        color: #666;
        position: relative;
        font-size: 30px;
        border:1px solid #666;
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
    }
    .overlay{
        // position: relative;
        .overlay-wrapper{
            width: 100%;
            height: 1062px;
            position: absolute;
            bottom: 0;
        }
    }
}

</style>
