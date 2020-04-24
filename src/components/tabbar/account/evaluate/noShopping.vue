<template>
<!-- 没有购买商品的评论列表 -->
    <div class="no-shopping">
        <div class="no-shopping-content">
            <div class="tips">
                <span class="c-orange text">！很抱歉，您尚未达到在TOSPINO上撰写评论的最低资格要求。</span>
            </div>
        </div>
        <footer-exhibition></footer-exhibition>
    </div>
</template>

<script>
import footerExhibition from '@/multiplexing/footerExhibition.vue'
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
        footerExhibition
    },
};
</script>

<style scoped lang="less">
.no-shopping{
    .no-shopping-content{
        box-sizing: border-box;
        padding: 40px 50px;
        .tips{
            height:120px;
            border:2px solid rgba(250,83,0,1);
            border-radius:10px;
            padding: 28px 22px;
            box-sizing: border-box;
            .text{
                width: 606px;
                font-size: 26px;
            }
        }
    }
}
</style>
