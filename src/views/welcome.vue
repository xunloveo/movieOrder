<template>
	<div class="container">
		<section class="welcome">
			<h3>欢迎使用网上订购电影票管理系统</h3>
			<div class="divider"></div>
			<div class="content">				
				<el-row>
					<el-col :span="4" :offset="1" class="content-left">
						<p class="text-3">通过这个系统,你可以对影院和电影进行相应的操作,查看相应票房信息以及客户相应的评论,顾客不用跑到电影院购票，可以直接到网站订购,并把相应的订单信息录入系统,系统就会做出相应反映。</p>
					</el-col>
					<el-col :span="18" :offset="1" class="content-right"></el-col>
				</el-row>
			</div>
		</section>
	</div>
</template>
<style lang="scss" scoped>	
	.welcome{
		h3{
			height: 45px;
			line-height: 45px;
			padding-left: 15px;
		}
		.divider{
			width: 98%;
			margin: auto;
			border-bottom: solid 2px #579FE9;
		}
		.content{
			padding: 10px 15px;			
			.el-row{
				margin-top: 80px;
			}
			.content-left{
				.text-3{
					color: #999;
					line-height: 30px;
					text-indent: 16px;
					font-size: 15px;
				}
			}
			.content-right{
				height: 450px;
				background: url('~img/wbg.jpg') no-repeat;
				background-size: 100%;
			}
		}
	}
</style>
<script>
	export default {
		data() {
			return {}
		},
		methods: {
		}
	}
</script>