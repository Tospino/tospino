<template>
<!-- 首页搜索框 -->
    <div>
        <div class="search-header c-b-gray">
            <div class="logo">
                <img src="@/assets/img/tabbar/home/logo@3x.png" @click="$router.push({name:'语言'})">
            </div>
            <div class="search">
                <van-search v-model="value" shape="round" @click="toSearch"/>
            </div>
            <div class="icons">
                <!-- 扫码功能去掉 -->
                <img src="@/assets/img/tabbar/home/scan@3x.png" class="img1">
                <img src="@/assets/img/tabbar/home/msg@3x.png" class="img2" @click="$router.push({name:'消息'})">
            </div>
        </div>
        <div class="place"></div>
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
        toSearch(){
            this.$router.push({name:'历史记录'})
        },
        saoma(){
            this.$router.push({name:'扫码'})
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.search-header{
    width: 100%;
    height: 88px;
    position: fixed;
    z-index: 1;
    .logo{
        position: absolute;
        left:40px;
        top:20px;
        width: 75px;
        height: 50px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .search{
        position: absolute;
        left:145px;
        top:20px;
        width: 450px;
        height: 58px;
        overflow: hidden;
        /deep/ .van-search{
            background: #F2F3F5 !important;
            .van-search__content--round{
                height: 58px;
                border-radius:29px;
                margin-top:-12px;
                background-color: #fff;
                .van-field__left-icon{
                    margin-top:10px;
                    .van-icon.van-icon-search{
                        font-size: 27px;
                        color: #999;
                    }
                }
            }
        }
    }
    .icons{
        position: absolute;
        left:623px;
        top:30px;
        .img1{
            width: 35px;
            height: 35px;
            margin-right: 25px;
        }
        .img2{
            width: 34px;
            height: 34px;
        }
    }
}
</style>
