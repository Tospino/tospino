<template>
    <div>
        <div class="balance-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <span class="header-t2" @click="title2Click" v-if="iconShow"></span>
        </div>
        <div class="place"></div>
    </div>
</template>

<script>
export default {
    props: {
        title:{
            type: String,
            default: ''
        },
        title2:{
            type: String,
            default: ''
        },
        iconShow:{
            type: Boolean,
            default: false
        }
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
        title2Click(){
            this.$emit('aaa')
        },
        aaa(){

        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.balance-header{
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: fixed;
    line-height: 88px;
    border-bottom: 1px solid #DCDCDC;
    z-index: 2;
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
        right: 30px;
        width: 30px;
        height: 30px;
        top:50%;
        background: url('~@/assets/img/confirmOrder/share@2x.png');
        background-size: 100%;
        transform: translateY(-50%)
    }
}
</style>
