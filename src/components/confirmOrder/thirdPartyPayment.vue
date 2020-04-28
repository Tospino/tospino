<template>
<div>
    <div>我是返回按钮</div>
    <iframe :src="url" frameborder="0"></iframe>
</div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            url: this.$store.state.thirdPartyPaymentUrl
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
        editTitle(name){
            this.title = name
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">

</style>
