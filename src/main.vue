<template>
	<div class="main">
		<el-row>
			<el-col :span="24" class="mainHeader">
				<el-col :span="3" class="mainHeaderLeft">
					<div class="mainHeaderLogo">某某企业</div>
				</el-col>
				<el-col :span="21" class="mainHeaderRight">
					<el-dropdown trigger="click">
						<p class="el-dropdown-link" style="color: #fff;">
    					欢迎 <b style="color: #f4ea2a;">{{account}}</b>    					
  					</p>
						<el-dropdown-menu slot="dropdown" style="width: 280px;">							
							<el-dropdown-item style="border-bottom: 1px dashed #d4d4d4;padding: 5px 30px;">
								<p>姓名：<span>{{userName}}</span>	</p>
								<p>职位：<span>{{posInfo}}</span></p>
								<p>手机: <span>{{homeTel}}</span></p>
							</el-dropdown-item>
							<!-- <el-dropdown-item style="border-bottom: 1px dashed #d4d4d4;text-align: center; margin: 10px 0 0 0;">
								<img :src="signature" style="width: 180px;height: 40px;"/>
							</el-dropdown-item> -->
							<el-dropdown-item style="text-align: center;padding: 5px 0;">
								<el-button type="danger" @click="logout">注销</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>			
		</el-row>
	</div>
</template>

<style lang="scss">
	$background:#579FE9;
	.main {
		position: relative;
		.mainHeader {
			height: 50px;
			background: $background;
			.mainHeader-logo {
				width: 127px;
				height: 37px;
				margin-left: 20px;
				margin-top: 7px;
				background: url('~img/logo.png');
			}
			.mainHeader-left {
				height: 50px;
				background: $background;
			}
			.mainHeader-right {
				text-align: right;
				padding-right: 30px;
				float: right;
				height: 50px;
				.el-dropdown-link {
					line-height: 50px;
					font-size: 14px;
					color: #444;
					cursor: pointer;
				}
				.mainHeader-userAvatar {
					line-height: 50px;
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 5px 0 5px 5px;
					float: right;
				}
				.avatar-uploader .el-upload {
					border: 1px dashed #d9d9d9;
					border-radius: 6px;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}
				.avatar-uploader .el-upload:hover {
					border-color: #20a0ff;
				}
				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 178px;
					height: 178px;
					line-height: 178px;
					text-align: center;
				}
				.avatar {
					width: 178px;
					height: 178px;
					display: block;
				}
				.mainHeader-modifyAvatarCenter {
					width: 95%;
					margin-left: 2.4%;
					padding: 10px 0;
					text-align: center;
					border-radius: 6px;
					border: 2px dashed #ccc;
				}
				.mainHeader-modifyAvatarFooter {
					margin-top: 20px;
				}
			}
		}
		.mainContent {
			.mainSide-left {
				min-height: calc(100vh - 50px);
				border-right: solid 1px #eaeaea;
				background-color: #333;
				text-align: left;
				font-size: 14px;
				.foldMenu{
					height: 45px;
					line-height: 45px;
					color: #0880f9;
					font-size: 17px;
					margin: 0px 15px;
					border-bottom: solid 2px #0880f9;
					i{
						color: #fff;
					}
					.showIcon{
						padding-left: 30%;
					}
					.showAll{
						padding-left: 30%;
					}
				}
				.el-menu{
					border-radius: none;
					background: #333;
					.leftMenu_title{
						padding-left: 17px;
					}
					img {
						width: 23px;
						position: relative;
						top: 10px;
					}
					span{
						color: #c9c9c9;
					}
					.el-menu-item:hover {
						background: transparent;
						color: #fff;
						background: rgb(42,42,42);
					}
					.el-menu-item.is-active {
						color: #ecf0f5;
						background-color: rgb(42,42,42);
					}			
				}
				.el-menu--collapse {
  				width: 100%;
				}	
				.el-submenu .el-menu-item{
					height: 75px;
					line-height: 35px;
					color: #c9c9c9;
					min-width: 0;
					.menuItemImg{
						width: 30px;
						padding-left: 43px
					}
					.menuItemText{
						padding-left: 25px;
					}
				}
				.el-menu-item-group__title{
					padding-top: 0px;
				}
			}
			.mainContent-right {
				height: 541px;
				background: #fff;
			}
		}
		.mainFooter {
			right: 0;
			position: absolute;
			bottom: 0px;
			text-align: center;
			font-size: 13px;
			.mainFooter-left {
				height: 45px;
			}
			.mainFooter-right {
				float: right;
				line-height: 45px;
				border-top: solid 1px #ccc;
		    .version-1{
		      color: #999;
		    }
		    .version-2{
		      color: #0880f9;
		    }
		    .version-3{
		      color: #999;
		    }
		    .version-4{
		      color: #666;
		    }	
			}
			.mainFooter-left-text {
				color: #337ab7;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				account: 'xsx',
				userName: '谢世勋',
				posInfo: '管理员',
				homeTel: 18720369268
			}
		},

		methods: {
			logout() { // 退出功能
				var _this = this;
				this.$confirm('确定退出吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('userInfo');
					_this.$router.push('/');
					/*logOut().then(() => {
						sessionStorage.removeItem('userInfo');
						_this.$router.push('/');
					});*/
				}).catch(() => {

				});
			}
		},

		mounted() {
					
		}
	}
</script>