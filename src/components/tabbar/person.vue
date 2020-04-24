<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <tabbar-footer></tabbar-footer>
    </div>
</template>

<script>
import tabbarFooter from '@/multiplexing/tabbarFooter'
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
        tabbarFooter
    },
};
</script>

<style scoped lang="less">

</style>
