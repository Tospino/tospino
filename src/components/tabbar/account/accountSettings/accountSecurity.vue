<template>
    <div class="account-security">
        <div class="security-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <van-icon name="chat-o" class="chat" size="17px" @click="jumpRouter('消息')"/>
        </div>
        <div class="cell" @click="$router.push({name:'修改昵称'})">
            <span class="c-333">昵称</span>
            <span class="ziliao c-999">{{userinfoShop.nickName}}</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <!-- <div class="cell" @click="$router.push({name:'修改手机号码'})"> -->
        <div class="cell">
            <span class="c-333">手机号码</span>
            <span class="ziliao c-999">{{userinfoShop.mobile}}</span>
            <!-- <van-icon name="arrow" class="arrow c-999"/> -->
        </div>
        <!-- <div class="cell" @click="$router.push({name:'修改邮箱'})"> -->
        <div class="cell">
            <span class="c-333">电子邮件</span>
            <span class="ziliao c-999">{{userinfoShop.email}}</span>
            <!-- <van-icon name="arrow" class="arrow c-999"/> -->
        </div>
        <div class="cell" @click="$router.push({name:'修改登录密码'})">
            <span class="c-333">修改登录密码</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell" @click="$router.push({name:'修改支付密码'})">
            <span class="c-333">修改支付密码</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <!-- <div class="cell" @click="$router.push({name:'公司信息'})"> -->
        <!-- <div class="cell">
            <span class="c-333">公司信息</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div> -->
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            title:'账户与安全',
            isBace:true,
            userinfoShop:{
                nickName:'',
                mobile:'',
                email:'',
            }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        if(localStorage.userinfoShop){
            this.userinfoShop = JSON.parse(localStorage.userinfoShop)
        }
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
.account-security{
    .security-header{
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
        .chat{
            position: absolute;
            top:20px;
            right: 30px;
        }
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #DCDCDC;
        &:nth-last-child(1){
            border: 0
        }
        span{
            &:nth-child(1){
                font-size:30px;
            }
        }
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
        .ziliao{
            position: absolute;
            right:80px;
            top:50%;
            transform: translateY(-50%);
            font-size:30px;
        }
    }
}
</style>
