<template>
<!-- 发表评论 -->
    <div class="expressed-evaluate">
        <div class="evaluate-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <span class="header-t2 c-orange">发布</span>
        </div>
        <div class="place"></div>
        <div class="evaluate-top" v-for="(i,index) in 2" :key="index">
            <div class="top-title">
                <div class="good-img">
                    <img src="@/assets/img/confirmOrder/chanpin-07@2x.png" alt="">
                </div>
                <div class="title-p1">11啄木鸟女包2019新款时尚休闲单肩斜挎包休闲单肩斜挎包</div>
                <div class="title-p2">红色/L</div>
            </div>
            <div class="top-rate">
                <span class="rate-p1">开始打分:</span>
                <van-rate v-model="value" color="#FA5300" class="rate"/>
                <span class="rate-p2">{{value}}.0分</span>
            </div>
            <div class="top-textarea">
                <textarea rows="3" cols="30" placeholder="我们的服务满足您的期待吗？在此发布您的心声，我们会不断满足您的需求..."></textarea>
            </div>
            <div class="uploader">
                <van-uploader v-model="fileList" multiple :max-count="3"></van-uploader>
            </div>
           
        </div>
         <div class="niming">
                <div class="yuan" v-if="istrue" @click="istrue =!istrue"></div>
                <div class="yuan-img" v-else @click="istrue =!istrue">
                    <img src="@/assets/img/confirmOrder/icon@2x.png">
                </div>
                <span class="niming-p1">匿名</span>
            </div>
        <div class="footer">
            <div class="top-rate">
                <span class="rate-p3">物流</span>
                <van-rate v-model="value" color="#FA5300" class="rate"/>
                <span class="rate-p2">{{value}}.0分</span>
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
            title:'发表评价',
            value:5,
            username:'',
            fileList:[],
            fileList2:[],
            istrue:false
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
.expressed-evaluate{
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
        padding: 40px 0;
        box-sizing: border-box;
        margin-bottom: 20px;
        .top-title{
            padding: 0 30px;
            box-sizing: border-box;
            height: 100px;
            position: relative;
            .good-img{
                height: 100px;
                width: 100px;
                float: left;
            }
            .title-p1{
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 30px;
                color: #333;
            }
            .title-p2{
                font-size:24px;
                color: #999;
                float: left;
                margin-top:20px;
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
    }
    .niming{
        height: 100px;
        line-height: 100px;
        box-sizing: border-box;
        padding: 0 30px;
        font-size:28px;
        color: #333;
        position: relative;
        border-top:2px solid #DCDCDC;
        border-bottom:2px solid #DCDCDC;
        .yuan{
            width:40px;
            height:40px;
            border-radius: 50%;
            border:1px solid rgba(153,153,153,1);
            position: absolute;
            top:50%;
            left:30px;
            transform: translateY(-50%);
        }
        .yuan-img{
            width:40px;
            height:40px;
            position: absolute;
            top:50%;
            left:30px;
            transform: translateY(-50%);
            img{
                position: absolute;
                top:0;
                left:0
            }
        }
        .niming-p1{
            margin-left:60px;
            font-size:28px;
            color: #333;
        }
    }
    .footer{
        height: 100px;
        background-color: #fff;
        font-size:26px;
        line-height: 100px;
        margin:20px 0 140px;
        .top-rate{
            height: 100px;
            line-height: 100px;
        }
    }
    .top-rate{
        height: 80px;
        line-height: 80px;
        padding:0 30px;
        .rate-p1{
            font-size:34px;
            color: #333;
            margin-right: 30px;
        }
        .rate-p2{
            font-size:30px;
            color: #999;
            margin-left: 30px;
        }
        .rate-p3{
            font-size:26px;
            color: #333;
            margin-right: 60px;
        }
        .rate{
            /deep/ .van-icon{
                font-size: 30px;
            }
        }
    }
}

</style>
