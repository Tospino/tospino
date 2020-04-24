<template>
<!-- 账户设置 -->
    <div class="account-settings">
        <div class="settings-header">
            <van-icon name="arrow-left" class="arrow-left"  @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <van-icon name="chat-o" class="chat" size="17px" @click="jumpRouter('消息')"/>
        </div>
        <div class="cell"  @click="jumpRouter('收货地址')">
            <span>我的收货地址</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell" @click="jumpRouter('账户安全')">
            <span>账户与安全</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell bor-b-1" @click="clearCache">
            <span>清除缓存</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <!-- <div class="cell bor-b-1">
            <span>法律条款</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div> -->
        <div class="cell bor-b-1" @click="jumpRouter('关于TOSPINO')">
            <span>关于TOSPINO</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell bor-b-1" @click="checkUpdate">
            <span>检查更新</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell bor-b-1">
            <span>意见反馈:info@tospino.com</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <!-- <div class="cell ">
            <span>帮助中心</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div> -->

        
        <!-- 清除缓存和检查更新 -->
        <zhezhao v-if="zhezhaoStatus">
            <div class="dialog">
                <div v-if="qchcDialog">
                    <div class="dialog-title">
                        <span>提示</span>
                        <div class="fl-right">
                            <van-icon name="close" @click="zhezhaoStatus = false"/>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <p>您确定要清除缓存吗？</p>
                        <div class="qd-btn" @click="zhezhaoStatus = false">确定</div>
                    </div>
                </div>
                <div v-else>
                    <div class="gx-title">
                        <span>更新提示</span>
                        <div class="fl-right">
                            <van-icon name="close" @click="zhezhaoStatus = false"/>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <p>{{gxStatus?bbh:'没有检测到最新版本！'}}</p>
                        <div class="ljgx-btn" @click="zhezhaoStatus = false">{{gxStatus?'立即更新':'确定'}}</div>
                    </div>
                </div>
            </div>
        </zhezhao>
    </div>
</template>

<script>
import zhezhao from '@/multiplexing/zhezhao'

export default {
    props: {

    },
    data() {
        return {
            title:'账户设置',
            qchcDialog:false,
            bbh:'新版本：v 1.0.2.0',
            gxStatus:false,
            zhezhaoStatus:false
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
        //进入收货地址
        toAddress(){
            this.$router.push({name:'收货地址'})
        },
        //跳转路由
        jumpRouter(name){
            this.$router.push({name})
        },
        //清除缓存
        clearCache(){
            this.zhezhaoStatus = true
            this.qchcDialog = true
        },
        //检查更新
        checkUpdate(){
            this.zhezhaoStatus = true
            this.qchcDialog = false
            //缺查看是否最新版本
        }
    },
    components: {
        zhezhao
    },
};
</script>

<style scoped lang="less">
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
    color: #333;
    position: relative;
    font-size: 30px;
    &:nth-child(2){
        margin-bottom: 20px;
    }
    &:nth-child(3){
        margin-bottom: 20px;
    }
    .arrow{
        position: absolute;
        right:30px;
        top:50%;
        transform: translateY(-50%);
        
    }
    .text{
        position: absolute;
        right:60px;
    }
    .text-tk{
        position: absolute;
        right:30px;
    }
    .input-xt{
        margin-left:40px;
        height: 40px;
        border: 0;
    }
}
.bor-b-1{
    border-bottom: 1px solid #DCDCDC
}
.zhezhao{
    display: flex;
    justify-content: center;
    align-items: center;
    .dialog{
        width: 500px;
        background-color: #fff;
        .dialog-title{
            padding: 0 30px;
            height: 87px;
            line-height: 87px;
            border-bottom: 1px solid #C9C9C9;
            font-size: 32px;
            color: #666;
        }
        .gx-title{
            padding: 0 30px;
            height: 100px;
            line-height: 100px;
            font-size:36px;
            color: #333;
            border-bottom: 1px solid #C9C9C9;
            font-weight:bold;
        }
        .dialog-body{
            padding: 60px 0 50px;
            font-size:28px;
            color: #333;
            text-align: center;
            .qd-btn{
                display: inline-block;
                margin-top: 46px;
                width:140px;
                height:50px;
                background:rgba(250,83,0,1);
                line-height: 50px;
                text-align: center;
                color: #fff;
                font-size:28px;
            }
            .ljgx-btn{
                display: inline-block;
                margin-top: 80px;
                width:198px;
                height:60px;
                line-height: 60px;
                background:rgba(250,83,0,1);
                text-align: center;
                color: #fff;
                font-size:32px;
            }
        }
    }
}

</style>
