<template>
    <div class="no-sear-good">
        <div class="no-sear-good-img">
            <img :src="imgSrc">
            <div>{{describe}}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        imgSrc:{
            type:String,
            default:''
        },
        describe:{
            type:String,
            default:''
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

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.no-sear-good-img{
    width: 100%;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    text-align: center;
    img{
        width: 498px;
        height: 364px;
    }
    div{
        margin-top: 29px;
        font-size: 30px;
        color: #666;
    }
}
</style>
