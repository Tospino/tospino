<template>
<!-- 限时抢购 -->
    <div class="flash-sale">
        <search-header></search-header>
        <div class="good-list" v-for="i in 20" :key="i">
            <div class="list-left">
                <div class="good-img">
                    <img src="@/assets/img/tabbar/home/01@3x.png" alt="">
                </div>
            </div>
            <div class="list-right">
                <div class="right-p1">
                    <img src="@/assets/img/tabbar/home/guojia@3x.png" alt="">
                    <span>瑞士</span>
                </div>
                <div class="right-p2">
                    瑞士SWICKY瑞驰双肩包男士背包新款大容量休闲商务旅行笔记本电脑...学生书包出差包USb充电包 深蓝色 大号带usb送多功能刀+锁
                </div>
                <div class="right-p3">
                    <span>{{jn}}</span>
                    <span class="price">187.00</span>
                </div>
                <div class="right-p4">
                    <span class="through">￥360.00</span>
                    <div class="qg-btn">
                        去抢购
                    </div>
                </div>
                <div class="right-p5">
                    <span>距结束</span>
                    <span class="c-666">11:20:30</span>
                    <div class="fl-right">
                        <span class="c-999">已售20%</span>
                        <div class="tj-wrap">
                            <div class="tj" :style="{width:'20%'}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from '../itemComponents/detailsHeader'
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
        searchHeader
    },
};
</script>

<style scoped lang="less">
.flash-sale{
    .good-list{
        padding: 25px 30px;
        overflow: hidden;
        border-bottom: 1px solid #F2F3F5;
        .list-left{
            padding-right:30px;
            float: left;
            .good-img{
                width: 250px;
                height: 250px;
            }
        }
        .list-right{
            float: left;
            width: 407px;
            .right-p1{
                color: #DB9000;
                font-size: 22px;
                img{
                    width: 54px;
                    height: 36px;
                    margin-right:16px;
                    vertical-align: middle;
                }
            }
            .right-p2{
                font-size:26px;
                line-height:39px;
                color: #333;
                margin: 11px 0 18px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .right-p3{
                color: #333;
                font-size: 20px;
                font-weight: bold;
                .price{
                    font-size: 40px;
                }
            }
            .right-p4{
                font-size: 24px;
                color: #999;
                margin: 11px 0 24px;
                overflow: hidden;
                .qg-btn{
                    float: right;
                    width:144px;
                    height:52px;
                    background:rgba(250,83,0,1);
                    border-radius:25px;
                    line-height: 52px;
                    text-align: center;
                    font-size:28px;
                    color: #fff;
                }
            }
            .right-p5{
                font-size: 20px;
                color: #333;
                .tj-wrap{
                    width:100px;
                    height:16px;
                    background:rgba(229,229,229,1);
                    border-radius:8px;
                    display: inline-block;
                    .tj{
                        background:rgba(250,83,0,1);
                        border-radius:8px;
                        height:16px;
                    }
                }
            }
        }
    }
}
</style>
