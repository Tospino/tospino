<template>
    <div class="search-head">
        <div class="detailsHeader c-b-gray">
            <div class="logo">
                <van-icon name="arrow-left" size="17px" @click="$router.go(-1)"/>
            </div>
            <div class="search-input">
                <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
                    :clearable="true"
                    @clear="cleartxt"
                    @focus="onocus"
                    @input="showInput"
                    >
                    <div slot="action" @click="onSearch" class="sousuo">搜索</div>
                </van-search>
            </div>
        </div>
        <div class="place"></div>
    </div>
</template>

<script>
export default {
    props: {
        searName:{
            type:String,
            default:''
        },
    },
    data() {
        return {
            value:'',
            iconShow:true
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {
        searName:{
            handler:function(newVal, oldVal){
                this.value = newVal
            },
        },
    },
    methods: {
        //搜索按钮
        onSearch(){
            this.$emit('onSearch')
        },
        cleartxt(){
            this.value = '';
        },
        //输入框获得焦点时触发
        onocus(){
            this.$emit('onfocus')
        },
        //输入框内容变化时触发
        showInput(value){
            this.$emit('getInputVal',value)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.search-head{
    .detailsHeader{
        width: 100%;
        height: 88px;
        position: fixed;
        top:0;
        left:0;
        z-index: 1;
        .logo{
            position: absolute;
            left:30px;
            top:26px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .search-input{
            position: absolute;
            left:100px;
            top:6px;
            height: 68px;
            overflow: hidden;

            /deep/ .van-search{
                background: #F2F3F5 !important;
                .van-field{
                    width: 480px;
                    height: 60px;
                    line-height: 50px;
                }
                .van-field__clear{
                    font-size: 30px;
                }
                .van-field__body{
                    .van-field__control{
                        font-size: 26px;
                    }
                }
                .van-icon-search{
                    font-size: 30px;
                }
            }

        }
        .sousuo{
            width:116px;
            height:58px;
            background:rgba(250,83,0,1);
            border-radius:29px;
            text-align: center;
            line-height: 58px;
            color: #fff;
            font-size:30px;
        }
    }
}
</style>
