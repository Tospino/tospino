<script>
//搜索我的订单
import searchRecord from '@/components/search/searchRecord.vue'
import {mapActions} from 'vuex'
export default {
    props: {

    },
    extends:searchRecord,
    data() {
        return {
            faxian:false
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
        ...mapActions(
            ['setorderformdata'] 
        ),
         //点击搜索按钮
        onSearch(){
            let formData = {
                product_key_name:this.goodName,
                order_status_app:null,
                page:1,
                limit:10
            }
            this.setorderformdata(formData)
            this.$router.replace({name:'我的订单搜索商品',query:{keyName:this.goodName}})
        },
        
        //订单历史记录
        searchHistory(){
            //后台还没做接口
        },
        getInputVal(value){
            this.goodName = value
        },
        //搜索发现
        searchFind(){
            
        }
        
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.search-record{
    position: relative;
    background-color: #fff;
    height: 100vh;
    box-sizing: border-box;
    .record{
        padding: 39px 30px 0;
    }
    .search-title{
        height: 60px;
        .title-p1{
            font-size: 30px;
            color: #333;
        }
        .van-icon{
            float: right;
            font-size: 40px;
        }
    }
    
    .search-labels{
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-align-content: center;
        align-content: flex-start;
        .label{
            display: inline-block;
            background-color: #F2F3F5;
            border-radius:25px;
            padding: 12px 26px;
            font-size: 26px;
            color: #333;
            margin:20px 20px 0px 0;
        }
    }
    .sousuo{
        ul{
            li{
                height: 87px;
                line-height: 87px;
                font-size:24px;
                color: #333;
                border-bottom:1px solid #DCDCDC;
                padding:0 30px;
                .icon{
                    float: right;
                    width: 30px;
                    height: 30px;
                    
                }
            }
        }
    }
    .van-overlay{
        .overlay-wrapper{
            width: 500px;
            height: 200px;
            background-color: #fff;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            .overlay-wrapper-p1{    
                margin:49px 0 39px 40px;
                font-size:36px;
                color: #333
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
