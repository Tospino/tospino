<template>
    <div class="account-details">
        <balance-header title="账户明细"></balance-header>
        <div class="account-tab">
            <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300" @change="changeTab">
                <van-tab :title="tab.title" v-for="(tab,index) in tabList" :key="index">
                    <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                        <div class="bscroll-con">
                            <div v-if="noSearchStatus">
                                <div class="tab-con" v-for="(account,index) in dataList" :key="index">
                                    <div class="con-p1">
                                        <span>{{account.listNo}}</span>
                                        <span class="fl-right">{{account.paidTime}}</span>
                                    </div>
                                    <div class="con-p2">
                                        <span>{{orderStatus(account.accountMode,'accountList')}}</span>
                                        <span>{{jn}}{{account.amount}}</span>
                                    </div>
                                    <div class="con-p4" v-if="account.giveMoney > 0 && account.accountType==1">
                                        <span>赠送{{jn}}{{account.giveMoney}}</span>
                                    </div>
                                    <div class="con-p3">
                                        <span>交易流水号：</span>
                                        <span>{{account.payNo}}</span>
                                        <span>{{orderStatus(account.isPaid,'payStatusList')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="no-sear-good-img" v-else>
                                <img src="@/assets/img/search/nosear3.png">
                                <div>{{describe}}</div>
                            </div>
                        </div>
                    </scroll>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {walletListInfoApi} from '@/api/accountBalance/index.js'
import noSearGood from '@/multiplexing/noSearGood.vue'
export default {
    props: {

    },
    data() {
        return {
            active:0,
            accountType:1,
            tabList:[
                {title:'充值记录',type:1},
                {title:'消费记录',type:2}
            ],
            formData:{
                page:1,
                limit:10
            },
            totalCount:0,
            dataList:[],
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,
            noSearchStatus:true,
            accountList:[
                {type:1,name:'余额支付'},
                {type:2,name:'后台充值'},
            ],
            payStatusList:[
                {type:1,name:'成功'},
                {type:2,name:'失败'},
            ]
        };
    },
    computed: {
        describe(){
            return this.accountType==1 ? '您还没有充值记录':'您还没有充值消费'
        }
    },
    created() {

    },
    mounted() {
        this.refreshOrder()
    },
    watch: {    

    },  
    methods: {  
        //获取用户充值/消费记录1充值/2消费
        walletListInfo(data,type,flag){
            walletListInfoApi(data,type).then(res => {
                if(res.code == 0){
                    if(flag){
                        this.dataList = this.dataList.concat(res.pageUtil.list) 
                    }else{
                        this.dataList = res.pageUtil.list
                    }
                    this.totalCount = res.pageUtil.totalCount
                    this.recordGroup = this.dataList
                    if(this.dataList.length > 0){
                        this.noSearchStatus = true
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                    }else{
                        this.noSearchStatus = false
                        this.pulldown = false
                        this.pullup = false
                    }
                }
            })
        },
        //下拉刷新
        _pulldown() {
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup() {
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.walletListInfo(this.formData,this.accountType,true)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
        },
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.walletListInfo(this.formData,this.accountType,false)
            this.pullup = true
        },
        //更改tab页
        changeTab(tabIndex){
            this.accountType = tabIndex + 1
            this.refreshOrder()
        },
        //编译状态
        orderStatus(type,list){
            let name = ''
            this[list].forEach(statu => {
                if(statu.type == type){
                    name = statu.name
                }
            })
            return name
        },
    },  
    components: {   
        balanceHeader,
        noSearGood   
    },  
};  
</script>   

<style scoped lang="less">
.bscroll-wrapper{
    height:calc(100vh - 200px)
}
.account-details{
    .account-tab{
        height: 80px;
        .tab-list{
            height: 80px;
            /deep/ .van-tabs__wrap{
                height: 80px;
                .van-tabs__nav{
                    background-color: #F2F3F5;
                }
                .van-tab{
                    line-height: 80px;
                    flex-basis: 20% !important;
                    font-size: 28px;
                    color: #000;
                }
                .van-tabs__line{
                    bottom: 30px;
                    background-color: #FA5300;
                }
            }
            /deep/ .van-tabs__content{
                position: relative;
                padding: 20px 30px;
                overflow: hidden;
            }
            .tab-con{
                padding: 30px;
                background-color: #fff;
                margin-bottom: 20px;
                .con-p1{
                    span{
                        &:nth-child(1){
                            font-size:24px;
                            margin-right:18px;
                        }
                        &:nth-child(2){
                            color: #999;
                        }
                    }
                }
                .con-p2{
                    margin:20px 0;
                    height: 40px;
                    span{
                        &:nth-child(1){
                            font-size:26px;
                            color: #333;
                        }
                        &:nth-child(2){
                            float: right;
                            color: #FA5300;
                            font-size:36px;
                        }
                    }
                }
                .con-p3{
                    span{
                        &:nth-child(1){
                            font-size:18px;
                            color: #666;
                        }
                        &:nth-child(2){
                            color: #666;
                            font-size:22px;
                        }
                        &:nth-child(3){
                            float: right;
                            color: #999;
                            font-size:24px;
                        }
                    }
                }
                .con-p4{
                    text-align: right;
                    margin-bottom: 10px;
                    height: 30px;
                }
            }
        }
    }
    .no-sear-good-img{
        position: relative;
        padding-top: 250px;
        box-sizing: border-box;
        text-align: center;
        img{
            width: 500px;
            height: 322px;
        }
        div{
            margin-top: 29px;
            font-size: 30px;
            color: #666;
        }
    }
}
</style>
