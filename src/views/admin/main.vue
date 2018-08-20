<template>
	<el-scrollbar class="main">
		 <el-row v-if="adminUserInfo != null">
		 	<el-col :span='24' class='main-header'>
		 		<el-col :span="20" class="main-header-left">
					<div class="logo">
						<h2>在线订票</h2>
						<p>Ordering Online</p>
					</div>
				</el-col>
				<el-col :span='1'>
					<el-tooltip content='首页购票' placement='bottom'>
						<div class="home" @click='goIndex'></div>
					</el-tooltip>
				</el-col>
				<el-col :span="3" class="main-header-right">
					<el-dropdown trigger="click">
						<p class="el-dropdown-link" style="color: #fff;">
    					欢迎 <b style="color: #f4ea2a;">{{adminUserInfo.name}}</b>    					
  					</p>
  					<el-dropdown-menu slot="dropdown" style="width: 280px;">						
							<el-dropdown-item style="border-bottom: 1px dashed #d4d4d4;padding: 5px 30px;">
								<p>账户：<span>{{adminUserInfo.account}}</span>	</p>
								<p>职位：<span>{{job}}</span></p>
								<p>手机: <span>{{adminUserInfo.tel}}</span></p>
							</el-dropdown-item>							
							<el-dropdown-item style="text-align: center;padding: 5px 0;">
								<el-button type="danger" @click="logout">注销</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
		 	</el-col>
		 	<el-col :span='24' class='main-content'>
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
				<el-col :span='isCollapse ? 23 : 21'>
					<el-scrollbar class="mainContentRight">
						<el-row>
							<el-col :span="24">
								<router-view></router-view>					
							</el-col>
						</el-row>						
					</el-scrollbar>		
				</el-col>						
		 	</el-col>
		 </el-row>
		 <el-row v-if="adminUserInfo == null" style="text-align: center; font-size: 18px; padding-top: 100px;">
		 	你还没有登录，不能够访问，请先去 <router-link :to="{path: '/admin/login'}" style='color: #000; font-size: 24px;'>登录</router-link>
		 </el-row>		 
	</el-scrollbar>
</template>

<style lang='scss'>
	.main{
		background-color: #fff;
		.main-header{
			height: 60px;			
			background-color: #3b3a41;
			.main-header-left{
				.logo{
					color: #ddd;
					margin-top: 5px;
					margin-left: 40px;
					h2{
						font-size: 24px;
						letter-spacing: 5px;
					}		
					p{
						font-style: italic;
						color: lightgreen;
					}			
				}				
			}
			.home{
				width: 28px;
		    height: 28px;
		    cursor: pointer;
		    margin-top: 16px;
		    background: url(~img/home.png);
		    background-size: 100%;
			}	
			.main-header-right{
				text-align: right;
				padding-right: 30px;
				.el-dropdown-link{
					line-height: 60px;
					cursor: pointer;					
				}
			}		
		}
		.main-content{
			height: calc(100vh -60px);
			.mainSideLeft {
				min-height: calc(100vh - 60px);
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
							background-color: #333;
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
						margin-top: 10px;
						/* padding-left: 40px */
					}
					.menuItemText{
						/* padding-left: 25px; */
					}
				}				
			}
			.mainContentRight{
				/* height: 100%; */
				height: calc(100vh - 60px);
			}
			h4{
				width: 85px;
		    height: 45px;
		    color: #0880f9;
		    line-height: 45px;
		    font-size: 16px;
		    margin-left: 15px;
		    border-bottom: solid 3px #579FE9;
			}
			.divider{
				margin: 0 15px;
    		border-bottom: solid 1px #579FE9;
			}
			.search-form{
				margin: 5px 0px;
				.el-form{
					padding: 0 15px;
					.el-form-item{
						margin-bottom: 0;
					}
					.el-col{
						padding-right: 20px;
					}
				}
			}
			.block{
				padding: 0 15px;
				/* position: absolute; */
				position: fixed;
				bottom: 20px;
			}	
		}
		thead{
			tr{
				background-color: #f5f7fa;
				color: #333;
				font-size: 14px;
			}
		}
		tbody{
			font-size: 14px;
		}		
	}	
</style>

<script>
	import ordermanager from "../../assets/img/ordermanager.png"
	import orderlist from "../../assets/img/orderlist.png"
	import paramsetting from "../../assets/img/paramsetting.png"
	import person from "../../assets/img/person.png"
	import count from "../../assets/img/count.png"	
	import customercomment from "../../assets/img/comment.png"
	import syssetting from "../../assets/img/syssetting.png"
	import usermana from "../../assets/img/usermana.png"
	import moviemana from "../../assets/img/movie.png"
	import cinemamana from "../../assets/img/customermana.png"
	import ticket from '../../assets/img/ticket.png'
	import session from '../../assets/img/session.png'

	export default {
		data() {
			return {
				adminUserInfo: null,
				isCollapse: false,
				menuList: [],
				activeIndex: '',
				job: ''
			}
		},

		methods: {
			/**
			 * [goIndex description] 跳到首页购票
			 * @return {[type]} [description]
			 */
			goIndex() {
				this.$router.push({path: '/index'});
			},

			/**
			 * [logout description] 注销
			 * @return {[type]} [description]
			 */
			logout() {
				var _this = this;
				this.$confirm('确定退出吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('adminUserInfo');
					_this.$router.push('/admin/login');					
				}).catch(() => {

				});
			},

			uncompileStr(code){   // 对字符串进行解密     
        code=unescape(code);        
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
        for(var i=1;i<code.length;i++)  
        {        
         c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
        }        
        return c;   
      },

      fold() {  // 折叠导航栏
				this.isCollapse = !this.isCollapse;
				this.activeIndex = '';
			},

			handleOpen(key, keyPath) { //菜单只打开一个
				this.activeIndex = key;								
			},

			/**
			 * [getMenuList description] 获取菜单列表
			 * @return {[type]} [description]
			 */
			getMenuList() {				
				if(this.adminUserInfo.permission == 0){
					// 如果是超级管理员
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
									page: '/admin/main/orderList'
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
									page: '/admin/main/personalInfo'
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
									mname: '票房',
									pic: ticket,
									page: '/admin/main/ticketCount'
								},{
									id: '3-2',
									mname: '电影评论',
									pic: customercomment,
									page: '/admin/main/movieComment'
								},{
									id: '3-3',
									mname: '影院评论',
									pic: customercomment,
									page: '/admin/main/cinemaComment'
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
									mname: '电影管理',
									pic: moviemana,
									page: '/admin/main/movieInfo'
								},{
									id: '4-2',
									mname: '影院管理',
									pic: cinemamana,
									page: '/admin/main/cinemaInfo'
								},{
									id: '4-3',
									mname: '用户管理',
									pic: usermana,
									page: '/admin/main/userInfo'
								},{
									id: '4-4',
									mname: '排片管理',
									pic: session,
									page: '/admin/main/sessionManage'
								}
							]
						}
					]
				}else{
					// 管理员
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
									page: '/admin/main/orderList'
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
									page: '/admin/main/personalInfo'
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
									mname: '票房',
									pic: ticket,
									page: '/admin/main/ticketCount'
								},{
									id: '3-2',
									mname: '电影评论',
									pic: customercomment,
									page: '/admin/main/movieComment'
								},{
									id: '3-3',
									mname: '影院评论',
									pic: customercomment,
									page: '/admin/main/cinemaComment'
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
									mname: '电影管理',
									pic: moviemana,
									page: '/admin/main/movieInfo'
								},{
									id: '4-2',
									mname: '影院管理',
									pic: cinemamana,
									page: '/admin/main/cinemaInfo'
								},{
									id: '4-3',
									mname: '排片管理',
									pic: session,
									page: '/admin/main/sessionManage'
								}
							]
						}
					]
				}
				
			}
		},

		mounted() {
			this.getMenuList();
			
		},

		created() {
			if(JSON.parse(sessionStorage.getItem('adminUserInfo'))){
				var info = JSON.parse(sessionStorage.getItem('adminUserInfo'));
				info.password = this.uncompileStr(info.password);			
				this.adminUserInfo = info;
				if(this.adminUserInfo.permission == 0){
					this.job = '超级管理员';
				}else{
					this.job = '管理员';
				}
			}			
		}
	}
</script>