<template>
    <div>
        <div class="settings-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">{{title}}</span>
            <span class="header-t2 c-orange" v-if="title2Show" @click="toAddAdder">{{title2}}</span>
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
        title2Show:{
            type: Boolean,
            default: true
        },
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
        toAddAdder(){
            this.$emit('rightBtn')
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.settings-header{
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: fixed;
    line-height: 88px;
    top:0;
    z-index: 5;
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
        font-size: 30px;
    }
}
</style>
