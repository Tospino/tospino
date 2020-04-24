<template>
<!-- 搜索框未搜到商品 -->
    <div class="no-search">
        <div class="content">
            <div class="no-search-img">
                <img src="@/assets/img/search/chatu@2x.png" alt="">
            </div>
            <div class="no-search-p1">
                没有搜索结果
            </div>
            <div class="no-search-p2">
                没有找到相关的搜索结果
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
.no-search{
    position: relative;
    padding: 39px 30px 0;
    height: calc(100vh - 90px);
    box-sizing: border-box;
    .content{
        position: relative;
        top:200px;
        text-align: center;
    }
    .no-search-img{
        display: inline-block;
        width: 196px;
        height: 179px;
        // left:50%;
        // transform: translateX(-50%)
    }
    .no-search-p1{
        margin-top:49px;
        font-size:30px;
        color: #333;
    }
    .no-search-p2{
        margin-top:18px;
        font-size:24px;
        color: #666;
    }
}
</style>
