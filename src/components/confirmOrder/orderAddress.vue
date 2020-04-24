<script>
import accountAddress from '@/components/tabbar/account/accountSettings/accountAddress'
import {mapActions} from 'vuex'
export default {
    props: {

    },
    extends:accountAddress,
    data() {
        return {
            title:'收货地址',
            title2:'添加新地址',
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
        ...mapActions(['setadressitem']),
        cliCard(data){
            this.setadressitem(data)
            this.$router.go(-1)
        },
        
    },
    components: {

    },
};
</script>

<style scoped lang="less">

</style>
