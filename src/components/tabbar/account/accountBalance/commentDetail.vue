<template>
<!-- 评论详情 -->
    <div class="comment-detail">
        <balance-header title2="我要评论" @jumpRouter="jumpRouter" jumpName="我的评论"></balance-header>
        <div class="detail-top">
            <div class="detail-top-left">
                <div class="zhanshiban">
                    <div class="zhanshiban-header">
                        平均评分
                    </div>
                    <div>
                        <p class="zhanshiban-p1">3.5</p>
                        <van-rate v-model="value" color="#FA5300" class="rate" disabled disabled-color="#FA5300" />
                        <p class="zhanshiban-p2">5,454用户</p>
                    </div>
                   
                </div>
            </div>
            <div class="detail-top-right">
                <div class="statistics" v-for="(tiao,index) in tiaoList" :key="index">
                    <span>{{tiaoList.length - index}}星</span>
                    <div class="statistics-tiao">
                        <div class="statistics-bfb" :style="{width:tiao}">

                        </div>
                    </div>
                    <span>{{tiao}}</span>
                </div>
            </div>
        </div>
        <p class="ping-num">展示1-10条评论，共计1,152条评论</p>
        <div class="detail-bottom" v-for="(tiao,index) in tiaoList" :key="index">
            <div class="bottom-con">
                <div class="con-p1">
                    <div class="head-img">
                        <img src="@/assets/img/tabbar/my/account/touxiang@2x.png">
                    </div>
                    <span class="name">曲***jin</span>
                </div>
                <div class="con-p2">
                    <van-rate v-model="value" color="#FA5300" class="rate" disabled disabled-color="#FA5300"/>
                    <span>特别棒的功能</span>
                </div>
                <p class="con-p3">2019月10月25日</p>
                <p class="con-p4"> 我来到这里，特别喜欢这个充值功能，方便快捷，优惠多多，福利多多，充值10000送100，这简直太划算了。</p>
            </div>
        </div>
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
export default {
    props: {

    },
    data() {
        return {
            value:3,
            tiaoList:['60%','20%','5%','12%','3%']
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
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.comment-detail{
    .detail-top{
        padding: 40px 30px 59px;
        overflow: hidden;
        border-bottom: 1px solid #dcdcdc;
        .detail-top-left{
            width: 230px;
            float: left;
            margin-right:48px;
            .zhanshiban{
                text-align: center;
                background-color: #fff;
                padding-bottom: 50px;
                .zhanshiban-header{
                    background-color: #999;
                    color: #fff;
                    height: 80px;
                    line-height: 80px;
                    font-size:34px;
                }
                .zhanshiban-p1{
                    margin:40px 0 30px;
                    font-size:60px;
                }
            }
            
            .rate{
                vertical-align: middle;
                margin-bottom: 28px;
                /deep/ .van-icon{
                    font-size: 30px;
                }
            }
        }
        .detail-top-right{
            float: left;
            padding-top:20px;
            .statistics{
                margin-bottom: 25px;
                font-size:24px;
                color: #333;
                .statistics-tiao{
                    width: 270px;
                    height: 42px;
                    display: inline-block;
                    background-color: #DCDCDC;
                    vertical-align: middle;
                    margin:0 16px;
                    .statistics-bfb{
                        background-color: #999;
                        height: 100%;
                    }
                }
            }
        }
    }
    .detail-bottom{
        padding: 0 30px 38px;
        border-bottom: 1px solid #DCDCDC;
        .bottom-con{
            margin-top:20px;
            .con-p1{
                height: 90px;
                .head-img{
                    width: 90px;
                    height: 90px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right:19px;
                }
                .name{
                    font-size:34px;
                    color: #333;
                }
            }
            .con-p2{
                font-size:26px;
                color: #333;
                .rate{
                    vertical-align: middle;
                    margin:19px 32px 19px 0;
                    /deep/ .van-icon{
                        font-size: 30px;
                        
                    }
                }
            }
            .con-p3{
                font-size:20px;
                color: #666;
            }
            .con-p4{
                color: #333;
                font-size:22px;
                margin:28px 0 0;
            }
        }
    }
    .ping-num{
        padding:38px 30px 10px;
    }
}
</style>
