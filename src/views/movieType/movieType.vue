<template>
	<div>{{msg}}</div>
</template>

<script>
	export default{
		data() {
			return {
				msg: ''
			}
		},

		methods: {
			getMsg() {
				this.msg = this.$route.query.type;
			}
		},

		mounted() {
			this.getMsg();
		},

		watch: {
			// 如果路由变化  重新执行
			'$route': 'getMsg'
		}
	}
</script>