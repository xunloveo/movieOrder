<template>
	<div class="main">
		<el-row>
			<el-col :span="24" class="mainHeader">
				<el-col :span="3" class="mainHeaderLeft">
					<div class="mainHeaderLogo">九峰企业</div>
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

		<el-row class="mainContent">
			<el-col :span="24">
				<el-col :span="isCollapse ? 1 : 3" class="mainSideLeft">
					<div class="foldMenu" @click.prevent="fold">
						<span v-show="!isCollapse">系统菜单</span>
						<i class="fa fa-bars" :class="isCollapse ? 'showIcon' : 'showAll'"></i>
					</div>

					<el-menu  :collapse="isCollapse" :unique-opened="true" v-for="(menu, index) in menuList" :key="menu.id" :default-openeds=[activeIndex] @open="handleOpen" >
					  <el-submenu :index="menu.id">
					    <template slot="title">
					      <img :src="menu.pic"/>
					      <span class="leftMenu_title" slot="title">{{menu.mname}}</span>
					    </template>
					    <el-menu-item-group v-for="child in menu.children" :key="child.id">
						    <router-link :to="child.page">
						      <el-menu-item :index="child.id">
						      	<img class="menuItemImg" :src="child.pic"/><br>
						      	<span class="menuItemText">{{child.mname}}</span>
						      </el-menu-item>
						    </router-link>
					    </el-menu-item-group>
					  </el-submenu>
					</el-menu>				
				</el-col>

				<el-col :span="isCollapse?23:21" class="mainContentRight">
					<router-view></router-view>					
				</el-col>
			</el-col>
		</el-row>		

		<!-- 底部版本信息 -->
		<el-row class="version">
			<el-col :span="24" class="mainFooter">
				<el-col :span="isCollapse?1:3" class="mainFooter-left">
				</el-col>
				<el-col :span="isCollapse?23:21" class="mainFooter-right">
			    <span class="version-1"><b>Copyright © 2016-2020 </b></span>
			    <span class="version-2"><b>JF Healthcare</b></span>
			    <span class="version-3"><b>. All rights reserved.</b></span>
			    <span class="version-4"><b>Version 2.0.0</b></span>
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
			.mainHeaderLogo {
				width: 127px;
				height: 50px;
				line-height: 50px;	
				font-size: 20px;
				padding-left: 30px;	
				color: #eee;
				font-weight: 700;
			}
			.mainHeaderLeft {
				height: 50px;
				background: $background;
			}
			.mainHeaderRight {
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
			.mainSideLeft {
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
						/* padding-left: 30%; */
						display: inline-block;
    				float: right;
    				padding-right: 4px;
    				line-height: 46px;
					}
				}
				.el-menu{
					.el-submenu__icon-arrow{
						font-size: 14px;
					}
					ul{
						li{
							text-align: center;
						}
					}
					border: none;
					border-radius: none;
					background: #333;
					.leftMenu_title{
						padding-left: 17px;
					}
					img {
						width: 23px;
						/* position: relative;
						top: 10px; */
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
						/* padding-left: 40px */
					}
					.menuItemText{
						/* padding-left: 25px; */
					}
				}
				.el-menu-item-group__title{
					padding-top: 0px;
				}
			}
			.mainContentRight {
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
	import ordermanager from "../assets/img/ordermanager.png"
	import orderlist from "../assets/img/orderlist.png"
	import paramsetting from "../assets/img/paramsetting.png"
	import person from "../assets/img/person.png"
	import count from "../assets/img/count.png"
	import achievement from "../assets/img/achievement.png"
	import prosale from "../assets/img/prosale.png"
	import customerfeedback from "../assets/img/customerfeedback.png"
	import syssetting from "../assets/img/syssetting.png"
	import usermana from "../assets/img/usermana.png"
	import promana from "../assets/img/promana.png"
	import customermana from "../assets/img/customermana.png"

	export default {
		data() {
			return {
				account: '',
				userName: '',
				posInfo: '',
				homeTel: '',
				isCollapse: false,
				menuList: [],
				activeIndex: ''
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
			},

			fold() {  // 折叠导航栏
				this.isCollapse = !this.isCollapse;
				this.activeIndex = '';
			},

			handleOpen(key, keyPath) { //菜单只打开一个
				this.activeIndex = key;								
			},

			/** 获取 菜单列表
			 * @return {[type]}
			 */
			getMenuList() {
				var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
				console.log('u',userInfo);
				this.account = userInfo.account;
				this.userName = userInfo.name;
				this.homeTel = userInfo.phone;
				this.posInfo = userInfo.job;
				if(userInfo.permission == 1){
					this.menuList = [
						{
							id: '1',
							mname: '订单管理',
							pic: ordermanager,
							children: [
								{
									id: '1-1',
									mname: '订单列表',
									pic: orderlist,
									page: '/orderList'
								}
							]
						},
						{
							id: '2',
							mname: '参数设置',
							pic: paramsetting,
							children: [
								{
									id: '2-1',
									mname: '个人信息',
									pic: person,
									page: '/personalInfo'
								}
							]
						},
						{
							id: '3',
							mname: '统计信息',
							pic: count,
							children: [
								{
									id: '3-1',
									mname: '销售人员业绩信息',
									pic: achievement,
									page: '/achievement'
								},{
									id: '3-2',
									mname: '商品销售情况',
									pic: prosale,
									page: '/proSale'
								},{
									id: '3-3',
									mname: '客户反馈情况',
									pic: customerfeedback,
									page: '/customerFeedback'
								}
							]
						},
						{
							id: '4',
							mname: '系统设置',
							pic: syssetting,
							children: [
								{
									id: '4-1',
									mname: '用户管理',
									pic: usermana,
									page: '/userMana'
								},{
									id: '4-2',
									mname: '商品管理',
									pic: promana,
									page: '/proMana'
								},{
									id: '4-3',
									mname: '客户管理',
									pic: customermana,
									page: '/customerMana'
								}
							]
						}
					]
				}else{
					this.menuList = [
						{
							id: '1',
							mname: '订单管理',
							pic: ordermanager,
							children: [
								{
									id: '1-1',
									mname: '订单列表',
									pic: orderlist,
									page: '/orderList'
								}
							]
						},
						{
							id: '2',
							mname: '参数设置',
							pic: paramsetting,
							children: [
								{
									id: '2-1',
									mname: '个人信息',
									pic: person,
									page: '/personalInfo'
								}
							]
						},
						{
							id: '3',
							mname: '统计信息',
							pic: count,
							children: [
								{
									id: '3-1',
									mname: '销售人员业绩信息',
									pic: achievement,
									page: '/achievement'
								},{
									id: '3-2',
									mname: '商品销售情况',
									pic: prosale,
									page: '/proSale'
								},{
									id: '3-3',
									mname: '客户反馈情况',
									pic: customerfeedback,
									page: '/customerFeedback'
								}
							]
						}
					]
				}
				
			}


		},

		mounted() {
			/*var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			console.log('u',userInfo);
			this.account = userInfo.account;
			this.userName = userInfo.name;
			this.homeTel = userInfo.phone;
			this.posInfo = userInfo.job;*/
			this.getMenuList();
		}
	}
</script>