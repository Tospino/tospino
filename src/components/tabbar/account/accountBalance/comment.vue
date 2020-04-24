<template>
<!-- 我要评论 -->
    <div class="comment">
        <balance-header title2="发布"></balance-header>
        <div class="comment-top">
            <div class="top-con">
                <div class="head-img">
                    <img src="@/assets/img/tabbar/my/account/touxiang@2x.png">
                </div>
                <span class="top-con-p1">开始打分:</span>
                <van-rate v-model="value" color="#FA5300" class="rate"/>
                <span class="top-con-p2">{{value}}.0分</span>
                <div class="cell">
                    <input type="search" class="input-xt" placeholder="评论主题(不超过16个字）">
                </div>
            </div>
            <div class="top-textarea">
                <textarea rows="3" cols="30" placeholder="我们的服务满足您的期待吗？在此发布您的心声，我们会不断满足您的需求..."></textarea>
            </div>
            <div class="uploader">
                <van-uploader v-model="fileList" multiple :max-count="3"></van-uploader>
            </div>
            <div class="niming">
                <div class="yuan" v-if="istrue" @click="istrue =!istrue"></div>
                <div class="yuan-img" v-else @click="istrue =!istrue">
                    <img src="@/assets/img/confirmOrder/icon@2x.png">
                </div>
                <span class="niming-p1">匿名</span>
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
            fileList:[],
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
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.comment{
    .comment-top{
        .top-con{
            padding: 0 30px 29px;
            line-height: 170px;
            margin-bottom: 20px;
            border-bottom: 1px solid #DCDCDC;
            .head-img{
                width: 90px;
                height: 90px;
                display: inline-block;
                vertical-align: middle;
            }
            .rate{
                vertical-align: initial;
                /deep/ .van-icon{
                    font-size: 30px;
                }
            }
            .top-con-p1{
                font-size:34px;
                color: #333;
                margin:0 26px 0 30px;
            }
            .top-con-p2{
                font-size:28px;
                color: #999;
                margin-left: 30px;
            }
            .cell{
                width:580px;
                height: 68px;
                line-height: 68px;
                padding: 0 30px;
                color: #999;
                position: relative;
                font-size: 26px;
                border: 1px solid #999;
                background: #fff;
                box-sizing: border-box;
                .input-xt{
                    height: 40px;
                    border: 0;
                    width: 90%;
                    
                }
            }
        }
        
    }
    
}
.top-textarea{
    padding: 0 30px;
    textarea{
        width: 100%;
        border:0;
        font-size: 26px;
        margin-bottom: 30px;
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
.niming{
    height: 86px;
    line-height: 86px;
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
</style>
