<template>
    <div class="evaluate-success">
        <div class="success-top">
            <div class="aaa">
                <div class="sucess-img">
                    <img src="@/assets/img/confirmOrder/icon-05@2x.png" alt="">
                </div>
                <span class="sucess-status">
                    评价成功！
                </span>
            </div>
            <div class="btns">
                <div class="btn-fhddlb">
                    返回订单列表
                </div>
                <div class="btn-ckpl">
                    查看评论
                </div>
            </div>
        </div>
        <div class="success-footer">
            <div class="footer-title">
                继续评价
            </div>
            <div class="footer-content">
                <div class="good-detail-content" v-for="i in 2" :key="i">
                    <div class="good-detail-img">
                        <img src="@/assets/img/tabbar/shoppingCart/product-03@2x.png">
                    </div>
                    <div class="good-detail-title">
                        <span class="name">啄木鸟女包2019新款时尚休闲单肩斜挎包百搭手提包大容量女...</span>
                        <div class="guige">
                            红色/L
                        </div>
                        <div class="p1">
                            {{jn}}298
                        </div>
                    </div>
                    <div class="btn-qpj">
                        去评价
                    </div>
                </div>
            </div>
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
.evaluate-success{
    position: relative;
    height: 100%;
    .success-top{
        height: 330px;
        position: relative;
        background-color: #fff;
        margin-bottom: 20px;
        .aaa{
            position: absolute;
            top:50px;
            left:230px;
            .sucess-img{
                width: 80px;
                height: 80px;
                display: inline-block;
                vertical-align: middle;
                margin-right:34px;
            }
            .sucess-status{
                font-size:42px;
                color: #333;
            }
        }
        .btns{
            position: absolute;
            top:210px;
            left:200px;
            .btn-fhddlb{
                width:180px;
                height:40px;
                border:2px solid rgba(153,153,153,1);
                border-radius:20px;
                text-align: center;
                line-height: 40px;
                font-size:24px;
                float: left;
                margin-right:40px;
            }
            .btn-ckpl{
                width:130px;
                height:40px;
                border:2px solid rgba(153,153,153,1);
                border-radius:20px;
                text-align: center;
                line-height: 40px;
                font-size:24px;
                float: left;
            }
        }
    }
    .success-footer{
        position: relative;
        bottom:0;
        height: 896px;
        background-color: #fff;
        box-sizing: border-box;
        .footer-title{
            height: 87px;
            line-height: 87px;
            padding-left:30px;
            font-size:32px;
            color: #333;
        }
        .good-detail-content{
            width: 100%;
            height: 210px;
            background-color: #fff;
            box-sizing: border-box;
            padding: 0 30px;
            position: relative;
            border-top: 2px solid #DCDCDC;
            .good-detail-img{
                width: 150px;
                height: 150px;
                position: relative;
                top:30px;
                left:0px;
                display: inline-block;
            }
            .good-detail-title{
                display: inline-block;
                position: absolute;
                width: 336px;
                top:30px;
                left:200px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                .name{
                    display: inline-block;
                    margin-bottom: 11px;
                    color: #333;
                    font-size: 26px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .guige{
                    color: #666;
                    font-size: 20px;
                    display: inline-block;
                    margin-bottom: 18px;
                }
                .p1{
                    color: #333;
                    font-size:36px;
                }
            }
            .btn-qpj{
                position: absolute;
                top:61px;
                right:30px;
                width:120px;
                height:46px;
                border:2px solid rgba(250,83,0,1);
                border-radius:23px;
                font-size:26px;
                text-align: center;
                line-height: 46px;
                color: #FA5300;
            }
            
        }
    }
}
</style>
