<template>
    <div>
        <zhezhao v-if="zhezhaoStatus">
            <div class="config-dialog">
                <div class="dialog-header">
                    {{title}}
                </div>
                <div class="dialog-body">
                    {{bodyTest}}
                </div>
                <div class="dialog-btn">
                    <div class="left-btn" @click="cliLeft">{{leftbtntest}}</div>
                    <div class="right-btn c-orange" @click='cliRight'>{{rightbtntest}}</div>
                </div>
            </div>
        </zhezhao>
    </div>
</template>

<script>
export default {
    props: {
        title:{
            type:String,
            default:'标题'
        },
        bodyTest:{
            type:String,
            default:''
        },
        leftbtntest:{
            type:String,
            default:'取消'
        },
        rightbtntest:{
            type:String,
            default:'确定'
        }
    },
    data() {
        return {
            zhezhaoStatus:true
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
        //左边按钮
        cliLeft(){
            this.zhezhaoStatus = false
            this.$emit('leftBtn')
        },
        //右边按钮
        cliRight(){
            this.zhezhaoStatus = false
            this.$emit('rightBtn')
        },
    },
    components: {
        
    },
};
</script>

<style scoped lang="less">
.zhezhao{
    text-align: center;
    .config-dialog{
        background-color: #fff;
        display: inline-block;
        width: 90vw;
        position: relative;
        top:50%;
        transform: translateY(-50%);
        font-size: 32px;
        border-radius: 32px;
        .dialog-header{
            padding-top:48px;
            height: 48px;
            line-height: 48px;
        }
        .dialog-body{
            padding: 24px 48px 48px;
        }
        .dialog-btn{
            display: flex;
            .left-btn,.right-btn{
                flex: 1;
                height: 100px;
                line-height: 96px;
            }
            
        }
    }
}
</style>
