<template>
<!-- 公司信息 -->
    <div class="company-information">
        <settings-header title="公司信息" title2=""></settings-header>
        <div class="company-information-content">
            <div class="company-title">
                <div class="company-text">
                    <span class="text-p1 c-999">公司名称：</span>
                    <span class="text-p2 c-333">深圳市卜鸣网络技术有限公司</span>
                </div>
                <div class="company-text">
                    <span class="text-p1 c-999">公司地址：</span>
                    <span class="text-p2 c-333">中国-广东省-深圳市-光明区公明街道上村旭发科技园七栋5楼区公明街道上村旭发科技园七栋5楼</span>
                </div>
                <div class="company-text">
                    <span class="text-p1 c-999">账户等级：</span>
                    <span class="text-p2 c-333">钻石VIP</span>
                </div>
                <div class="company-text">
                    <span class="text-p1 c-999">主营业务类型：</span>
                    <span class="text-p2 c-333">母婴用品</span>
                </div>
            </div>
            <div class="company-list" v-for="(company,index) in 2" :key="index">
                <van-row type="flex" justify="space-around">
                    <van-col span="8">
                        <div class="company-name">公司正面照</div>
                        <div class="company-img"></div>
                        
                    </van-col>
                    <van-col span="8">
                        <div class="company-name">公司内部照</div>
                        <div class="company-img"></div>
                        
                    </van-col>
                    <van-col span="8">
                        <div class="company-name">营业执照</div>
                        <div class="company-img"></div>
                    </van-col>
                </van-row>
            </div>

            <div class="btn-sqxg">
                申请修改
            </div>

        </div>
        
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
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
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.company-information{
    .company-information-content{
        box-sizing: border-box;
        padding: 0 30px;
        .company-title{
            padding-top:39px;
            font-size:28px;
            margin-bottom: 79px;
            .company-text{
                margin-bottom: 30px;
            }
            .text-p1{
                color: #999;
                display: inline-block;
                width: 200px;
            }
            .text-p2{
                display: inline-block;
                width: 467px;
                vertical-align: top;
            }
            
        }
        .company-list{
            width: 100%;
            position: relative;
            margin-top:40px;
            .company-img{
                width:210px;
                height:210px;
                background-color: #DCDCDC;
                margin-top:20px;
            }
            .company-name{
                font-size:28px;
            }
        }
        .btn-sqxg{
            height: 88px;
            line-height: 88px;
            color: #fff;
            font-size: 34px;
            text-align: center;
            margin-top:60px;
            background-color: #FA5300;
        }
    }
}

</style>
