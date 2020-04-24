<template>
<!-- 引导页 -->
  <div class="guidePage">
      <div class="logo"></div>
  </div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {
		msg: 'Welcome to Your Vue.js App'
		}
	},
	methods: {
		
	},
	mounted(){
		setTimeout(()=>{
			this.$router.replace({name:'首页'})
		},3000)
	}
}
</script> 

<style scoped lang="less">
.guidePage{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  text-align: center;
  .logo{
    width: 100vw;
    height:100vh;
    background-image:url('~@/assets/img/guidePage/yina.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

</style>
