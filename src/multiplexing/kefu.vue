<template>
    <div class="kefu">
        <div class="kefu-header">
            <span>联系客服</span>
            <van-icon name="cross" class="cross"/>
        </div>
        <div class="p1">
            <img src="@/assets/img/goodsDetails/whatsapp@2x.png" alt="">
            <span>055 927 9978</span>
        </div>
        <div class="p1">
            <img src="@/assets/img/goodsDetails/phone@2x.png" alt="">
            <span>030 294 9239</span>
        </div>
        <div class="p1">
            <img src="@/assets/img/goodsDetails/mail@2x.png" alt="">
            <span>Gh-service@tospino.com</span>
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
.kefu{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 560px;
    background-color: #fff;
    .kefu-header{
        font-size:36px;
        height: 101px;
        line-height: 101px;
        text-align: center;
        font-weight:bold;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .cross{
            position: absolute;
            top:50%;
            right:39px;
            transform: translateY(-50%);
            color: #999;
        }
    }
    .p1{
        font-size: 30px;
        color: #333;
        padding: 24px 0 24px 72px;
        img{
            width: 41px;
            height: 41px;
            margin-right:27px;
            vertical-align: sub;
        }
    }
}
</style>
