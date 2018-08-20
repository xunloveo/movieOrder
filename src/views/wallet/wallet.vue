<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar></header-bar>
		<div class="content w">
			<div id="walletWrap">
				{{userInfo}}
			</div>
		</div>		
	</el-scrollbar>		
</template>

<style lang='scss'>

</style>

<script>
import HeaderBar from "@/views/header"

	export default{
		data () {
			return {
				userInfo: null
			}
		},

		methods: {

		},

		components: {
			HeaderBar
		},

		mounted () {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

		}
	}
</script>