<template>
    <div class="append-evaluate">
        <div class="evaluate-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <span class="header-t2 c-orange">发表追评</span>
        </div>
        <div class="place"></div>
        <div class="evaluate-top" v-for="(i,index) in 2" :key="index">
            <div class="top-title">
                <div class="good-img">
                    <img src="@/assets/img/confirmOrder/chanpin-07@2x.png" alt="">
                </div>
                <div class="title-p1">啄木鸟女包2019新款时尚休闲单肩斜挎包休闲单肩斜挎包</div>
            </div>
            <div class="top-textarea">
                <textarea rows="3" cols="30" placeholder="来说说您的使用心得，分享给想买的人吧。"></textarea>
            </div>
            <div class="uploader">
                <van-uploader v-model="fileList" multiple :max-count="3"></van-uploader>
            </div>
            <div class="line"></div>
        </div>

        <van-overlay :show="show" @click="show = false" >
            <!-- 遮罩层确认退出弹框 -->
            <div class="overlay-wrapper" @click.stop>
                <div class="overlay-wrapper-p1">
                   确认要退出评价？
                </div>
                <div class="overlay-wrapper-p2">
                   退出后编辑过的内容将不保存
                </div>
                <div class="overlay-wrapper-btns">
                    <span>取消</span>
                    <span>确定</span>
                </div>
            </div>
        </van-overlay>


    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            title:'发表追评',
            fileList:[],
            fileList2:[],
            show:false
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
.append-evaluate{
    height: 100%;
    .evaluate-header{
        width: 100%;
        height: 88px;
        background-color: #f2f3f5;
        text-align: center;
        position: fixed;
        z-index: 1;
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
            top:50%;
            right: 30px;
            font-size: 36px;
            transform: translateY(-50%)
        }
    }
    .evaluate-top{
        background-color: #fff;
        box-sizing: border-box;
        margin-bottom: 20px;
        .top-title{
            padding: 0 30px 20px;
            box-sizing: border-box;
            position: relative;
            line-height: 100px;
            border-bottom: 2px solid #DCDCDC;
            margin-bottom: 20px;
            .good-img{
                height: 100px;
                width: 100px;
                float: left;
            }
            .title-p1{
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 28px;
                color: #333;
            }
        }
        .top-textarea{
            padding: 0 30px;
            textarea{
                width: 100%;
                border:0;
                font-size: 26px;
                line-height: 39px;
                margin-bottom: 20px;
            }
        }
        .uploader{
            height: 140px;
            width: 100%;
            position: relative;
            box-sizing: border-box;
            padding: 0 30px;
            margin-bottom: 20px;
            /deep/ .van-uploader{
                display: -webkit-flex;
                display: flex;
                -webkit-flex-wrap: wrap;
                flex-wrap: wrap;
                -webkit-align-content: center;
                align-content: flex-start;
                justify-content : space-between;
                .van-uploader{
                    width: 100%;
                }
                .van-uploader__preview{
                    width: 140px;
                    height: 140px;
                    margin-right:36px;
                    &:nth-child(3){
                        margin-right:0
                    }
                    .van-image{
                        width: 100%;
                        height: 100%;
                    }
                    .van-icon-clear{
                        font-size: 40px;
                    }
                }
                .van-uploader__upload{
                    margin-left: 8px;
                    width: 140px;
                    height: 140px;
                    border: 2px dashed #999999;
                }
            }
            /deep/ .van-row{
                .van-col{
                    position: relative;
                    .uploader-name{
                        position: absolute;
                        bottom: -125px;
                        width: 172px;
                        text-align: center;
                        font-size: 24px;
                        color: #666;
                    }
                }
            }
        }
        .line{
            height:2px;
            background:rgba(220,220,220,1);
        }
    }
    .van-overlay{
        .overlay-wrapper{
            width: 600px;
            background-color: #fff;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            padding: 59px 0 40px 0px;
            .overlay-wrapper-p1{    
                margin:0px 0 39px 40px;
                color: #333;
                font-size:42px;
            }
            .overlay-wrapper-p2{
                margin:38px 0 90px 40px;
                color: #333;
                font-size:30px;
            }
            .overlay-wrapper-btns{
                padding-left:267px;
                font-size:30px;
                color: #FA5300;
                span{
                    &:nth-child(1){
                        margin-right: 65px
                    }
                }
            }
        }
    }
}
</style>
