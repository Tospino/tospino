<template>
<!-- 个人页 -->
    <div class="account">
        <div class="header">
            <span class="header-wd">我的</span>
            <van-icon name="chat-o" size="17px" @click="jumpRouter('消息')"/>
        </div>
        <div class="head-con">
            <div class="head-img">
                <img src="@/assets/img/tabbar/my/account/touxiang@2x.png"><br>
                <span class="head-name">{{userinfoShop.userName?userinfoShop.userName:"设置您的个人昵称"}}</span><br>
                <span class="head-id">会员ID:{{userinfoShop.userId}}</span>
            </div>
        </div>
        <div class="record">
            <van-row>
                <van-col span="8" @click="jumpRouter('收藏夹')">
                    <span class="t1">收藏</span>
                    <span class="num">{{shoucangTotal}}</span>
                </van-col>
                 <van-col span="8">
                    <span class="t1" @click="jumpRouter('我的足迹')">浏览</span>
                    <span class="num">{{zujiTotal}}</span>
                </van-col>
                 <van-col span="8" @click="jumpRouter('账户明细')">
                    <span class="t1">余额</span>
                    <span class="num">{{jn}}{{walletMoney ? walletMoney:0}}</span>
                </van-col>
            </van-row>
        </div>
        <div class="account-myorder">
            <div class="order-title" @click="toMyOrder(0)">
                <span>
                    我的订单
                </span>
            </div>
            <div class="order-tabbar">
                <van-tabbar class="icons" v-model="active" active-color="#666" inactive-color="#666" >
                    <!-- <span>自定义</span> -->
                    <!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive"> -->
                    <van-tabbar-item @click="toMyOrder(1)">
                        <span>待付款</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.daifukuan : icon.daifukuan" class="icon-style">
                    </van-tabbar-item>
                    <van-tabbar-item @click="toMyOrder(2)">
                        <span>待发货</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.daifahuo : icon.daifahuo" class="icon-style">
                    </van-tabbar-item>
                    <van-tabbar-item @click="toMyOrder(3)">
                        <span>待收货</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.daishouhuo : icon.daishouhuo" class="icon-style">
                    </van-tabbar-item>
                    <van-tabbar-item @click="toMyOrder(4)">
                        <span>已完成</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.yiwancheng : icon.yiwancheng" class="icon-style">
                    </van-tabbar-item>
                </van-tabbar>
            </div>
        </div>

        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="评价已购商品" left-icon="arrow" disabled @click="jumpRouter('评价列表')" v-if="false">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/pingjia@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="售后" left-icon="arrow" disabled @click="jumpRouter('售后内容')">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/shouhou@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="我的优惠券" left-icon="arrow" disabled v-if="false">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/youhuiquan@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        <van-cell-group class="border-0" v-if="false">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="账户余额" left-icon="arrow" disabled @click="jumpRouter('账户余额')">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/zhanghuyue@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        <div class="account-myorder maigin-t-14">
            <div class="order-title">
                <span>
                    我的TOSPINO
                </span>
            </div>
            <div class="order-tabbar">
                <van-tabbar class="icons" v-model="active" active-color="#666" inactive-color="#666" >
                    <!-- <span>自定义</span> -->
                    <!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive"> -->
                    <van-tabbar-item info='99' v-if="false">
                        <span>心愿单</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.xinyuandan : icon.xinyuandan" class="icon-style">
                    </van-tabbar-item>
                    <van-tabbar-item @click="jumpRouter('我的足迹')">
                        <span>最近浏览</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.zuijinliulan : icon.zuijinliulan" class="icon-style">
                    </van-tabbar-item>
                    <van-tabbar-item @click="jumpRouter('消息')">
                        <span>消息提醒</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.xiaoxitixing : icon.xiaoxitixing" class="icon-style">
                    </van-tabbar-item>
                    <van-tabbar-item v-if="false">
                        <span>TOSPINO信用</span>
                        <img slot="icon" slot-scope="props" :src="props.active ? icon.xinyong : icon.xinyong" class="icon-style">
                    </van-tabbar-item>
                </van-tabbar>
            </div>
        </div>
        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="意见反馈" left-icon="arrow" disabled v-if="false">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/yijianfankui@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="联系客服" left-icon="arrow" disabled @click="show2=true">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/kefu.png">
                </div>
            </van-field>
        </van-cell-group>
        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="账户设置" left-icon="arrow" disabled @click="jumpRouter('账户设置')">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/zhanghushezhi@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        <van-cell-group class="border-0">
            <van-field v-model="username" clearable right-icon="arrow" placeholder="更换国家/地区" left-icon="arrow" disabled @click="toLanguage">
                <div slot="left-icon" size="small" type="primary" class="icon-left">
                    <img src="@/assets/img/tabbar/my/account/genggaiguojiadiqu@2x.png">
                </div>
            </van-field>
        </van-cell-group>
        
        <div class="footer-btn">
            <van-button type="default" @click="logOut">退出登录</van-button>
        </div>


        <van-overlay :show="show2" @click="show2 = false" class="overlay">
            <!-- 客服电话 -->
            <kefu></kefu>
        </van-overlay>

    </div>
</template>

<script>
import daifahuo from '@/assets/img/tabbar/my/account/daifahuo@2x.png'
import daifukuan from '@/assets/img/tabbar/my/account/daifukuan@2x.png'
import daishouhuo from '@/assets/img/tabbar/my/account/daishouhuo@2x.png'
import xiaoxitixing from '@/assets/img/tabbar/my/account/xiaoxitixing@2x.png'
import xinyong from '@/assets/img/tabbar/my/account/xinyong@2x.png'
import xinyuandan from '@/assets/img/tabbar/my/account/xinyuandan@2x.png'
import yiwancheng from '@/assets/img/tabbar/my/account/yiwancheng@2x.png'
import zuijinliulan from '@/assets/img/tabbar/my/account/zuijinliulan@2x.png'
import {logoutApi} from '@/api/login/index'
import {selectuserfavoritesApi} from '@/api/favorites/index.js'
import {walletInfoApi} from '@/api/accountBalance/index.js'
import {selectuserbrowhistoryApi} from '@/api/favorites/index'
import kefu from '@/multiplexing/kefu.vue'
export default {
    props: {

    },  
    data() {    
        return {    
            active:0,
            icon:{
                daifahuo,
                daifukuan,
                daishouhuo,
                xiaoxitixing,
                xinyong,
                xinyuandan,
                yiwancheng,
                zuijinliulan
            },
            username:"",
            userinfoShop:{
                userName:'',
                userId:''
            },
            shoucangTotal:0,
            walletMoney:0,
            zujiTotal:0,
            formData:{
                page:1,
                limit:10,
                createtime:''
            },
            show2:false
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        if(localStorage.userinfoShop){
            this.userinfoShop =  JSON.parse(localStorage.userinfoShop)
        }
        this.selectuserfavorites()
        this.walletInfo()
        this.selectuserbrowhistory(this.formData)
    },
    watch: {

    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        toLanguage(){
            this.$router.push({name:'语言',query:{type:0}})
        },
        toMyOrder(num){
            sessionStorage.setItem("activeIndex", num);
            this.$router.push({name:'我的订单'})
        },
        //登出
        logOut(){
            logoutApi().then(res => {
                if(localStorage.token){localStorage.removeItem('token')}
                this.$router.push({name:'登录'})
            })
        },
        //收藏夹总数
        selectuserfavorites(){
            let data = {
                seraname:'',
                sort:2,
                page:1,
                limit:10
            }
            selectuserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    this.shoucangTotal = res.Data.totalCount
                }
            })
        },
        //钱包信息
        walletInfo(){
            walletInfoApi().then(res => {
                if(res.code == 0){
                    this.walletMoney = res.wallet.walletMoney
                }
            })
        },
        selectuserbrowhistory(data){
            selectuserbrowhistoryApi(data).then(res => {
                if(res.code == 0){
                    this.zujiTotal = res.browtotal
                }
            })
        },
    },
    components: {
        kefu
    },
};
</script>

<style scoped lang="less">
.account{
    padding: 0 30px;
    .header{
        line-height: 88px;
        box-sizing: border-box;
        /deep/ .van-icon-chat-o{
            position: relative;
            left:585px;
        }
    }
    .header-wd{
        font-size: 36px;
        color: #000;
    }
    .head-con{
        width: 100%;
        // height: 212px;
        position: relative;
        text-align: center;
        .head-img{
            display: inline-block;
            width: 100%;
            // height: 160px;
            img{
                width: 160px;
                height: 160px;
                margin-bottom: 15px;
            }
            .head-name{
                font-size: 30px;
                color: #333333;
                
            }
            .head-id{
                display: inline-block;
                height:24px;
                background:rgba(219,144,0,1);
                border-radius:12px;
                color: #FFFFFF;
                font-size: 16px;
                margin: 8px 0 34px;
                padding: 0 11px;
                line-height:28px;
            }
        }
    }
    .record{
        width: 100%;
        height: 150px;
        margin-bottom: 35px;
        .van-row{
            height: 100%;
            background-color: #fff;
            
        }
        /deep/ .van-col--8{
            display: inline-block;
            height: 100%;
            text-align: center;
            position: relative;
            .t1{
                position: absolute;
                top:48px;
                font-size:26px;
                color: #666;
                transform: translate(-50%)
            }
            .num{
                position: absolute;
                top:93px;
                font-size:30px;
                color: #333;
                transform: translate(-50%)
            }
        }
    }
    .account-myorder{
        width: 100%;
        background-color: #fff;
        .order-title{
            height: 67px;
            border-bottom: 1px solid #DCDCDC;
            font-size:30px;
            color: #333;
            line-height: 67px;
            span{
                margin-left: 20px;
            }
        }
        .order-tabbar{
            position: relative;
            height: 126px;
            .icons{
                position: absolute;
                height: 98px;
                bottom: 10px;
                /deep/ i{
                    font-size: 43px;
                }
            }
            .icon-style{
                // width: 43px;
                height: 40px;
                margin-bottom: 3px;
            }
           /deep/ .van-hairline--top-bottom{
               &::after{
                   border-width: 0
               }
           }
        }
    }
    
    .border-0{ //跳转栏
        margin-top: 14px;
        /deep/ .van-cell{
            height: 100px;
            line-height: 80px;
            .van-cell__value{
                border:0;
                margin-left:45px;
                /deep/ .van-field__body{
                    width: 95%;
                    .van-field__control{
                        font-size: 30px;
                    }
                    .van-icon-arrow{
                        font-size: 30px;
                    }
                }
            }
            .icon-left{
                position: absolute;
                left:23px;
                top:20px;
            }
        }
    }
    .footer-btn{
        width: 100%;
        margin: 40px 0;
        text-align: center;
        /deep/ .van-button{
            width: 240px;
            height: 75px;
            background-color: #DCDCDC;
            color: #333333;
            font-size: 34px;
        }
    }
    .p-30{
        padding: 0 30px
    }
    .maigin-t-14{
        margin-top:14px;
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
