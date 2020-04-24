<template>
<!-- 关于TOSPINO -->
    <div class="about-tospino">
        <settings-header :title="headTitle"></settings-header>
        <div class="tospino-body" v-if="ifAbout">
            <div class="ewm-body">
                <div class="ewm-img"></div>
                <div>
                    14.0版本
                </div>
            </div>
            <div class="cell" @click="jumpRouter('隐私政策')">
                <span>隐私政策</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell" @click="jumpRouter('用户协议')">
                <span>用户协议</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell" @click="jumpRouter('帮助中心')">
                <span>帮助中心</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell" @click="jumpRouter('平台介绍')">
                <span>平台介绍</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell">
                <span>客服电话211-2626622</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
export default {
    props: {

    },
    data() {
        return {
            ifAbout:true,
            headTitle:'关于TOSPINO'
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.ifAbout = this.$route.name == "关于TOSPINO" ? true : false
        this.headTitle = this.$route.name 
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.ifAbout = val.name == "关于TOSPINO" ? true : false
                this.headTitle = this.$route.name 
            },
            // 深度观察监听
            deep: true
        }
    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        
    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.about-tospino{
    height: 100vh;
    background-color: #fff;
}
.settings-header{
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
        top:20px;
        right: 100px;
        font-size: 40px;
    }
}
.tospino-body{
    .ewm-body{
        text-align: center;
        padding: 82px 0 120px;
        .ewm-img{
            display: inline-block;
            width: 300px;
            height: 300px;
            background-color: #E0E2E4;
            margin-bottom: 19px;
        }
    }
}
.cell{
    height: 88px;
    line-height: 88px;
    padding: 0 30px;
    background-color: #fff;
    color: #333;
    position: relative;
    font-size: 30px;
    border-bottom: 1px solid #DCDCDC;
    margin-bottom: 20px;
    .arrow{
        position: absolute;
        right:30px;
        top:50%;
        transform: translateY(-50%);
    }
}
</style>
