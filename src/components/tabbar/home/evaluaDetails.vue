<template>
    <div class="evaluaDetails">
        <details-header></details-header>
        <div class="commodity-tab">
            <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300" @change="changeTab">
                <van-tab :title="i.title+`(${i.num})`" v-for="(i,index) in tabs" :key="index">
                    <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                        <div class="bscroll-con">
                            <div class="pingjia" v-for="data in dataList" :key="data.evaluaId">
                                <div class="diyi">
                                    <div class="touxiang">
                                        <img src="@/assets/img/confirmOrder/Twitter@2x.png" >
                                    </div>
                                    <span class="name">{{data.nickName}}</span>
                                    <van-rate v-model="data.starNumber" disabled disabled-color="#FA5300"/>
                                </div>
                                <div class="dier">
                                    <span>
                                        {{data.evaContent}}
                                    </span>
                                </div>
                                <div class="disan">
                                    <span class="p1">数量:{{data.buyCount}}</span>
                                    <span class="p2">规格：{{data.proUnit}}</span>
                                    <span class="p3">{{data.evaTiem}}</span>
                                </div>
                            </div>
                        </div>
                    </scroll>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import detailsHeader from '@/multiplexing/detailsHeader'
import {productevaluationlistApi} from '@/api/home/commodityDetails'
export default {
    props: {

    },
    data() {
        return {
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,//看门狗
            totalCount:0,


            active:0,
            value:2,
            formData:{
                skuid:'',
                page:1,
                limit:10,
                type:1
            },
            dataList:[],
            tabs:[
                {
                    title:'有内容的评价',
                    num:0
                },
                {
                    title:'全部评价',
                    num:0
                }
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.formData.skuid = this.$route.query.skuid
        this.refreshOrder()
    },
    watch: {

    },
    methods: {
        //商品评论列表
        productevaluationlist(data,flag){
            productevaluationlistApi(data).then(res => {
                if(res.code == 0){
                    this.tabs[0].num = res.totalleft
                    this.tabs[1].num = res.totalright
                    if(flag){
                        this.dataList = res.Data.list
                    }else{
                        this.dataList = this.dataList.concat(res.Data.list);
                    }
                    this.totalCount = res.Data.totalCount
                    this.recordGroup = this.dataList
                    if(this.dataList.length > 0){
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                    }else{
                        this.pulldown = false
                        this.pullup = false
                    }

                }
            })
        },
        //切换tab
        changeTab(index,title){
            this.formData.type = index+1
            this.refreshOrder()
        },
        //下拉刷新
        _pulldown(){
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup() {
            if(!this.pullup) return
            //不知道为什么触发两次,使用看门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.productevaluationlist(this.formData,false)
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
            this.productevaluationlist(this.formData,true)
            this.pullup = true
        },
    },
    components: {
        detailsHeader
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 88px - 96px);
}
.commodity-tab{
    height: 80px;
    background-color: #fff;
    .tab-list{
        height: 96px;
        /deep/ .van-tabs__wrap{
            height: 96px;
            .van-tabs__nav{
                background-color: #fff;
            }
            .van-tab{
                line-height:96px;
                flex-basis: 20% !important;
                font-size: 28px;
            }
            .van-tabs__line{
                bottom: 30px;
                background-color: #FA5300;
            }
        }
    }
    .pingjia{
        padding:30px 30px;
        background-color: #fff;
        border-bottom: 1px solid #DCDCDC;
        border-top: 1px solid #DCDCDC;
        .diyi{ 
            height: 50px; 
            line-height: 50px;
            position: relative;
            .touxiang{
                display: inline-block;
                width: 50px;
                height: 50px;
                position: absolute;
                top:0;
                left:0;
            }
            .name{
                margin-left:70px;
                font-size:28px;
                color: #333;
            }
            .van-rate{
                float: right;
            }
        }
        .dier{
            color: #333;
            font-size:28px;
            line-height:42px;
            margin:28px 0;
        }
        .disan{
            color: #666;
            font-size: 20px;
            span{
                margin-right:20px;
            }
            .p3{
                float: right;
            }
        }
    }
}
</style>
