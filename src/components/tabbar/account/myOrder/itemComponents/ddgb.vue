

<script>
//待收货
import dfk from './dfk.vue'
export default {
    props: {

    },
    extends:dfk,
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
.good-detail{
    margin-bottom: 20px;
    .good-detail-header{
        width: 100%;
        height: 79px;
        line-height: 79px;
        font-size:26px;
        color: #333;
        background-color: #fff;
        padding-left: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #F2F3F5;
        .dfk{
            float: right;
            margin-right: 30px;
        }
    }
    .good-detail-content{
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 30px;
        position: relative;
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
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .guige{
                color: #999;
                font-size: 18px;
                margin-bottom: 12px;
            }
            
        }
        .price{
            position: absolute;
            top:30px;
            right:30px;
            text-align: right;
            .p3{
                font-size:28px;
                color: #333;
                margin-bottom: 5px;
            }
            .p4{
                color: #999;
                font-size: 20px;
            }
            
            .selection-right-stepper{
                position: relative;
                width: 100%;
                height: 156px;
                .add-btn{
                    position: absolute;
                    top:20px;
                    right:0;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .reduce-btn{
                    position: absolute;
                    top:20px;
                    right:128px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .num{
                    position: absolute;
                    top:20px;
                    right:40px;
                    width: 88px;
                    height: 40px;
                    border-top: 1px solid #999999;
                    border-bottom: 1px solid #999999;
                    text-align: center;
                    line-height: 40px;
                }
            }
        }
    }
    .total{
        background-color: #fff;
        padding: 0 30px 19px;
        span{
            &:nth-child(3){
                font-size: 30px;
            }
        }
        
    }
    
    .good-detail-footer{
        height: 100px;
        border-top: 1px solid #F2F3F5;
        font-size: 30px;
        color: #666;
        background-color: #fff;
        .lan{
            height: 100%;
        }
        .btn-qzf{
            width:150px;
            height:60px;
            border:1px solid rgba(250,83,0,1);
            border-radius:30px;
            line-height: 60px;
            text-align: center;
            position: relative;
            top:50%;
            transform: translateY(-50%);
            margin-right:20px;
        }
        .btn-qxdd,.btn-xgdz{
            width:180px;
            height:60px;
            border:1px solid rgba(153,153,153,1);
            border-radius:30px;
            line-height: 60px;
            text-align: center;
            position: relative;
            top:50%;
            transform: translateY(-50%);
            margin-right:20px;
        }
    }
    .dfh-footer-top{
        height: 60px;
        text-align: center;
        font-size: 20px;
        line-height:60px;
        background-color: #fff;
    }
}
</style>
