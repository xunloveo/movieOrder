<template>
	<div class="header">			
			<div class="top-nav">
				<el-container class="w">
					<div style="width: 100%;">
						<el-row>
							<el-col :span="12">
								<div class="top-nav-left">
									<span class="fl">欢迎前来订购电影票</span>	
									<div class="city-area fl" @mouseover="showCity" @mouseout="hideCity">
										<p class="selected font-grey clearfix">
											<span id="selectedCity">南昌</span>
											<span class="arrow"></span>											
										</p>
										<div id="cityList" class="citylist" v-show="isShowCity">
											<h3>热门城市</h3>
											<ul id="hotCityList">												
												<li>北京</li>
												<li>上海</li>
												<li>杭州</li>
												<li>广州</li>
												<li>深圳</li>
												<li>重庆</li>
												<li>成都</li>
												<li>南京</li>
												<li>武汉</li>
												<li>西安</li>
												<li>厦门</li>
												<li>天津</li>
											</ul>
											<a href="#" class="morecity font-shadow">更多城市 ></a>
										</div>
									</div>
									<!-- <router-link class="login blue" to="/userlogin" v-if="name==''">登录</router-link>							
									<router-link class="rigist" to="/rigist" v-if="name==''">注册</router-link>	
									<span class='user' v-if="name!=''">{{alias}}({{name.slice(-4)}})</span>
									<a class="logout" v-if="name!=''" @click='logout'>退出</a> -->
								</div>										
							</el-col>
							<el-col :span="12">
								<div class="top-nav-right">
									<!-- <a @click='goMyself'>个人中心</a>
									<a @click='goOrder'>我的订单</a> -->
									<a href="javascript:;">帮助中心</a>
									<span @click='goConnect' style='cursor: pointer'>联系客服<!-- ：0791-86415161 --></span>
									<!-- <div style='display:inline-block'>
										<el-tooltip effect="dark" content="联系我们" placement="top">
											<div class="connect" @click="goConnect">aaa</div>
										</el-tooltip>
									</div> -->
									
								</div>
								
							</el-col>
						</el-row>
					</div>
				</el-container>
			</div>
			<div class="main-nav">
				<el-container class="w">
					<div class="w main-nav-content" >						
						<el-row>
							<el-col :span="12">									
								<router-link to="/index" class="link">首页</router-link>					
								<router-link to="/movie?type=hot" class="link">影片</router-link>
								<router-link to="/cinema" class="link">影院</router-link>
								<router-link to="/ticket" class="link">票房</router-link>
							</el-col>							
							<el-col :span='6' :offset='offset' style="padding-right: 20px">
								<el-input
    							placeholder="请输入感兴趣的电影"
   								v-model="movieData" @keyup.enter.native='searchMovie'>
    							<i slot="prefix" class="el-input__icon el-icon-search"></i>
  							</el-input>
							</el-col>
							<el-col :span="len" class="user-login">
								<router-link to="/userlogin" class="login-link" v-show="userInfo == null">登录</router-link>
								<div id="userInfo" class="user-info" v-show="userInfo !== null" @mouseover="hover" @mouseout="out">
									<span class="username fr font-grey f14 clearfix" @click='goMyself'>
										<img :src="userImg" alt="" class="avatar fl">
										<em class="name fl">{{alias}}</em>
									</span>
									<span class="arrow fr" v-show="!show">
										<em class="arrow-in"></em>
									</span>
									<div class="slidedown" v-show="show">
										<span class="" @click='goOrder'>我的订单</span>
										<span @click='goWallet'>我的钱包</span>
										<span class="" @click='logout'>退出</span>
									</div>
								</div>
							</el-col>
						</el-row>							
					</div>
				</el-container>
			</div>
			<el-dialog title='个人信息' :visible.sync='personalDialog' width="30%" class='useDialog'>
				<el-row>
					<el-col :span="6" class='item'>账号:</el-col>
					<el-col :span='18' class='black'>{{name}}</el-col>
					<el-col :span="6" class='item'>昵称:</el-col>
					<el-col :span="18" class='black'>{{alias}}</el-col>
					<el-col :span="6" class="item">头像:</el-col>
					<el-col :span="18" class='black'><img :src="userImg" alt=""></el-col>
				</el-row>
				<div slot="footer" class="dialog-footer">
				  <el-button @click="personalDialog = false">取 消</el-button>
				  <el-button type="primary" @click="goEdit">修改</el-button>
				</div>
				<el-dialog title='修改个人信息' :visible.sync="innerVisible" width="30%">
				  <el-form :model="userForm" :rules='rules' ref='userForm'>
						<el-form-item label="账号" label-width="20%">
							<el-input v-model="userForm.name" auto-complete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="昵称" label-width="20%" prop="alias">
							<el-input v-model="userForm.alias" auto-complete="off" clearable placeholder='请输入昵称' @blur = 'checkA' ref='alias'></el-input>
						</el-form-item>
						<el-form-item label="密码" label-width="20%" prop='password'>
							<el-input v-model="userForm.password" auto-complete="off" clearable placeholder='请输入新密码' ></el-input>
						</el-form-item>
						<el-form-item label="头像" label-width="20%" prop="avatar">
							<el-upload
								ref='upload' 
								action='http://localhost:8080/test/uploadfile'
								:show-file-list='false'						
								:on-success='success'
								:before-upload="beforeAvatarUpload"
							>
								<img :src="userImg0" alt="" height="100" width="100" style="border-radius: 50%">
							</el-upload>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
				    <el-button @click="resetEdit">取 消</el-button>
				    <el-button type="primary" @click="edit">保存</el-button>
				  </div> 
				</el-dialog>
			
			</el-dialog>

			<el-dialog title="联系客服" width="12%" top="25vh" :show-close="false" center :visible.sync="connectDialogVisible" class="connectDialog">
			  <div class="imgContent"></div>
			  <div class="imgText">扫一扫上面的二维码图案，添加<span>客服微信</span>，不时会有小惊喜哦~</div>
			</el-dialog>

			<el-dialog title="我的钱包" :visible.sync='walletDialogVisible' width="31%" class='walletDialog' :close-on-click-modal='false' @close='closeCharge'>
				<el-row>
					<el-col :span='12'>
						<div class='f16 mb20'>余额：<span class='nuomi-red f20'>{{walletData.balance}}</span> 元</div>
						<div class='f16 mb20'>积分：<span class='nuomi-red f20'>{{walletData.integration}}</span> 个</div>
						<div class='mb20'><el-button type='primary' @click='goRecharge'>去充值</el-button></div>
					</el-col>
					<el-col :span='12'>
						<p class='font-grey'>温馨提示：充值就有福利送，每充100送100个积分，在付款的时候，会有积分获得</p>
					</el-col>
				</el-row>				
				<el-form :model='moneyData' :label-position='labelPosition' v-show='showCharge' :rules="chargeRules" ref='moneyData'>
					<el-form-item>
						<p>请选择支付方式：</p>
						<ul>
							<li class='pc-cashdesk-pay-type-grid' :class="inx == index ? 'active' : ''" v-for='(item,index) in bankData' @click='choseBank(index)'>
								<div class="pc-cashdesk-pay-type-grid-icon">
									<i class="bind-card-bank-icon-40-40 bind-card-bank-icon-4001"></i>
								</div>
								<div class="pc-cashdesk-pay-type-grid-info">
									<p class='pc-cashdesk-pay-type-grid-title'>{{item.name}}</p>
									<p class='pc-cashdesk-pay-type-grid-desc'>储蓄卡&nbsp;&nbsp;&nbsp;&nbsp;({{item.account}})</p>									
								</div>
								<em class='pc-cashdesk-pay-type-grid-corner'></em>
							</li>
						</ul>
					</el-form-item>
					<el-row>
						<el-col :span='18'>
							<el-form-item label='充值金额' label-width='80px' prop='money'>
								<el-input v-model="moneyData.money" auto-complete="off" placeholder='请输入充值金额'></el-input>
							</el-form-item>
						</el-col>	
						<el-col :span='6' style='text-align:right'>
							<el-form-item>
								<el-button @click='recharge'>充值</el-button>
							</el-form-item>
						</el-col>
					</el-row>					
				</el-form>								
			</el-dialog>
	</div>
</template>

<style lang="scss">
	.header{
		width: 100%;
		.top-nav{
			a{
				color: #999;
			}
			height: 29px;
			line-height: 29px;
			color: #999;
    	font-size: 12px;
    	background-color: #f8f8f8;
    	border-bottom: 1px solid #e7e7e7;
    	.rigist:hover{
    		color: #4DD0C8;
    	}
    	.logout:hover{
    		color: #4DD0C8;
    	}
    	.top-nav-left{
    		span{
    			margin-right: 8px;    			
    		}
    		.login{
    			margin-right: 8px;
    		}
    		.user{
    			margin-right: 8px;
    		}

    		.city-area{    			
    			position: relative;  			

    			.selected{
    				span{
    					float: left;
    				}

    				.arrow{
    					width: 12px;
					    height: 7px;
					    margin: 10px 0 0 -3px;
					    background: url(~img/arrow1.png) no-repeat 0 top transparent;
					    background-size: 12px auto;
    				}
    			}

    			.citylist{
    				position: absolute;
				    width: 175px;
				    top: 30px;
				    left: 0;
				    line-height: 13px;
				    border: 1px solid #dfdfdf;
				    background: #fff;
				    padding: 15px;
				    z-index: 10;
				    overflow: hidden;
						
						h3{
							color: #73adc9;
					    margin-bottom: 10px;
					    font-size: 12px;
					    height: 16px;
					    line-height: 16px;
					    font-weight: normal;
						}

				    ul{
				    	width: 196px;

				    	li{
				    		display: inline-block;
						    margin: 0 20px 10px 0;
						    height: 16px;
						    line-height: 16px;
						    color: #333;
						    font-size: 12px;
				    	}
				    }
    			}

    			.morecity{
    				display: block;
    				text-align: right;
    			}
    		}
    	}
    	.top-nav-right{
    		text-align: right;
    		a{
    			margin-right: 8px;
    		}
    		a:hover{
    			color: #4DD0C8;
    		}
    		.connect{
    			width: 28px;
					height: 28px;
					background: url('~img/weChat.png') no-repeat;
					background-size: 100%;
					cursor: pointer;
    		}
    	}
		}	
		.main-nav{
			margin-bottom: 35px;
    	line-height: 65px;
    	background-color: #3b3a41;
    	min-width: 1208px;
    	.main-nav-content{
    		height: 65px;
    		.link{
    			display: block;
    			float: left;
    			height: 65px;
    			padding: 0 32px;
    			color: #fff;
    			font-size: 18px;

    			&.active{
    				background-color: #1d1d20;
    			}
    		}
    		.link:hover{
    			background-color: #1d1d20;
    		}
    		.router-link-active{
    			background-color: #1d1d20;
    		}
    	}
    	.el-input__inner:focus {
    		border-color: #dcdfe6;
    		box-shadow: none;
    		transition-duration: .5s;
			}
		}	
		.user-login{
			text-align: right;
			color: #ccc;
			font-size: 14px;
			cursor: pointer;
			.login-link{
				color: #ccc;
				font-size: 14px;
			}

			.user-info{
				position: relative;
		    min-width: 80px;
		    height: 65px;
		    cursor: pointer;

		    em{
		    	font-style: normal;
		    }

		    &:hover{
			    	background-color: #4a4950;
			    }

		    .username{
		    	font-size: 14px;
			    display: block;
			    height: 65px;
			    min-width: 80px;
			    padding: 0 10px 0 15px;
			    line-height: 65px;
			    text-align: center;
			    color: #ccc;

			    .avatar{
			    	display: inline-block;
				    width: 30px;
				    height: 30px;
				    margin-right: 10px;
				    margin-top: 18px;
				    border-radius: 15px;
			    }

		    }

		    .arrow{
		    	position: absolute;
			    right: 0;
			    top: 50%;
			    margin-top: -3px;
			    width: 0;
			    height: 0;
			    border-top: 6px solid #757479;
			    border-right: 6px dotted transparent;
			    border-bottom: 6px dotted transparent;
			    border-left: 6px dotted transparent;
		    }

		    .arrow-in{
		    	width: 0;
			    height: 0;
			    border-top: 5px solid #3b3a41;
			    border-right: 5px dotted transparent;
			    border-bottom: 5px dotted transparent;
			    border-left: 5px dotted transparent;
			    overflow: hidden;
			    position: absolute;
			    top: -7px;
			    left: -5px;
		    }

		    .slidedown{
		    	position: absolute;
			    width: 100%;
			    left: 0;
			    /* bottom: -135px; */
			    top: 65px;
			    z-index: 10;

			    span{
			    	display: block;
				    height: 44px;
				    font-size: 16px;
				    line-height: 44px;
				    background-color: #3b3a41;
				    text-align: center;
				    border-bottom: 1px solid #666;
			    }
		    }
			}
		}
	}
	.useDialog{
		.item{
			text-align: right;
			padding-right: 10px;
			padding-bottom: 20px;	
		}
		.black{
			color: #000;
			padding-bottom: 20px;

			img{
				width: 100px;
				height: 100px;
				border-radius: 50%;
			}
		}
	}

	.connectDialog{
		.el-dialog--center {
				width: 195px;
				.el-dialog__header {
					padding: 10px 20px 0px;
					.el-dialog__close {
						margin: 0px;
					}
				}
				.el-dialog__body {
					padding: 20px;
				}
			}
			.imgContent {
				width: 100%;
				height: 172px;
				background: url('~img/wechat.jpg') center no-repeat;
				background-size: contain;				
			}
			.imgText{
				margin-top: 5px;
				span {
					color: red;
				}
			}
	}

	.walletDialog{
		.pc-cashdesk-pay-type-grid{
			display: table;
	    position: relative;
	    float: left;
	    height: 80px;
	    margin: 0 20px 0 0;
	    padding: 0 15px 0 20px;
	    border: 1px solid #d5d5d5;
	    cursor: pointer;
	    background: #fff;
	    border-radius: 4px;

	    &:last-child{
	    	margin-right: 0;
	    }

	    &.active, &:hover{
				border-color: #0079f2;
	    }

	    &.active{
	    	.pc-cashdesk-pay-type-grid-corner{
	    		display: block;
	    	}
	    }
		}

		.pc-cashdesk-pay-type-grid-icon{
			padding-right: 9px;
    	font-size: 0;
    	display: table-cell;
    	vertical-align: middle;

    	i{
    		display: block;
		    width: 40px;
		    height: 40px;
		    font-style: normal;
    	}
		}

		.pc-cashdesk-pay-type-grid-info{
			position: relative;
			display: table-cell; 
    	vertical-align: middle;    	

    	.pc-cashdesk-pay-type-grid-title{    		
    		font-size: 16px;
   			color: #54576A;
   			line-height: 21px;
    	}
			
			.pc-cashdesk-pay-type-grid-desc {
		    margin-top: 3px;
		    font-size: 12px;
		    color: #333440;
		    line-height: 16px;
			}

		}

		.pc-cashdesk-pay-type-grid-title, .pc-cashdesk-pay-type-grid-desc, .pc-cashdesk-pay-type-grid-msg{
			width: 120px;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
		}

		.bind-card-bank-icon-40-40 {
		  width: 40px;
		  height: 40px;
		  background: url(~img/bank-40-40.png) no-repeat -99999px -99999px;
		}

		.bind-card-bank-icon-4001{
			background-position: 0 -100px;
		}

		.pc-cashdesk-pay-type-grid-corner{
			display: none;
			position: absolute;
	    right: 0;
	    top: 0;
	    width: 25px;
	    height: 25px;	
	    background: url(~img/cashdesk.png) no-repeat 	-19px -503px;	
		}


	}

</style>

<script>
	import {updateUser, checkUserAlias, QueryWallet, EditWallet} from '../api/api'
	export default{	
		props: ['msg'],		
		data() {
			var checkAlias = (rule,value,callback) => {
        if(value == ''){
          callback(new Error('请输入昵称'));
        }else if(!(/^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/).test(value)){
          callback(new Error('请输入2-16位由字母，数字，汉字组成的'));
        }else{
          callback();
        }
      };

      var checkPwd = (rule,value,callback) => {
        if(value === ''){
          callback(new Error('请输入密码'));
        }else if(!(/^[a-zA-Z0-9_]{6,16}$/).test(value)){
          callback(new Error('请输入6-16位由字母，数字，_组成的'));
        }else{
          callback();
        }
      };

      var checkMax = (rule,value,callback) => {
      	if(value === ''){
      		callback(new Error('请输入金额'));
      	}      	
      	else if(!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(value)){
      		callback(new Error('输入金额有误'));
      	}
      	else if(parseInt(value) >= 1000){
      		callback(new Error('最高充值不能超过1000元'));
      	}else{
      		callback();
      	}
      };

			return {
				name: '',	
				alias: '',	
				avatar: '',	
				userImg: '',
				userImg0: '',
				movieData: '',
				personalDialog: false,
				connectDialogVisible: false,
				walletDialogVisible: false,
				walletData: {
					balance: '',
					integration: ''					
				},
				moneyData: {
					money: ''
				},
				innerVisible: false,
				userInfo1: {
					name: '',
					alias: '',
				},
				userInfo: null,
				userForm: {
					name: '',
					alias: '',
					password: '',
					avatar: ''
				},				
				rules: {          
          alias: [
            /*{ required: true, message: '请输入昵称', trigger: 'blur' }*/
            { validator: checkAlias, trigger: 'blur' } 
          ],
          password: [
            /*{ required: true, message: '请输入密码', trigger: 'blur' }*/ 
            { validator: checkPwd, trigger: 'blur' }           
          ]
        },
        chargeRules: {
        	money: [
        		{required: true, message: '请输入金额', trigger: 'blur'},
        		/*{pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '输入的金额有误', trigger: 'change'},*/
        		{ validator: checkMax, trigger: 'change'}
        	]
        },
        offset: 5,
        len: 1,
        show: false,
        isShowCity: false,
        labelPosition: 'left',
        bankData: [
        	{name: '农业银行' , account: '5611'},
        	{name: '建设银行' , account: '7238'}
        ],
        inx: 0,
        showCharge: false
			}
		},

		methods: {
			// 向父组件传值
			iclick() {
				this.$emit('sendWalletData', this.walletData);
			},

			// 查看电影
			searchMovie() {
				console.log(this.movieData);
				let params = new URLSearchParams();
				params.append("name",this.movieData);
				this.axios.post("http://localhost:8080/test/findmoviebyname",params).then((res) => {
					console.log('r',res);
					if(res.data.data == null){
						this.$message({
							type: 'error',
							message: '没有对应的结果',
							duration: 1000
						})
					}else{
						this.$router.push('/moviedetail?id='+res.data.data.id);						
						window.location.reload();	
					}
				})
			},

			// 获取钱包信息
			getWalletData() {
				let params = new URLSearchParams();
				console.log('uid', this.userInfo.id);
				params.append("uid", this.userInfo.id);

				QueryWallet(params).then(res => {		
					console.log('r', res);			
					this.walletData = res.data.data;
					console.log('wd', this.walletData);
					this.iclick();
				})
			},

			// 点击去充值
			goRecharge() {
				this.showCharge = true;
			},

			// 充值
			recharge() {

				this.$refs.moneyData.validate((valid) => {
					if(valid){						
						let params = new URLSearchParams();
						params.append("uid", this.userInfo.id);
						params.append("balance", this.moneyData.money);
						console.log("balance", this.moneyData.money);
						params.append("integration", Math.floor(this.moneyData.money));
						console.log('integration', Math.floor(this.moneyData.money));

						EditWallet(params).then(res => {
							console.log('rr', res.data.data);
							if(res.data.data){
							  this.$message({
                  message: '充值成功',
                  type: 'success',                  
                  center: true
                });
								this.getWalletData();
							}							
						});
						this.showCharge = false;
						this.$refs.moneyData.resetFields(); // 重置表单

					}else{						
						return false;
					}
				});
			},

			// 关闭dialog
			closeCharge() {
				this.showCharge = false;
				this.$refs.moneyData.resetFields(); // 重置表单
			},

			// 选择银行
			choseBank(index) {
				this.inx = index;
			},		

			hover() {
				this.show = true;				
			},

			out() {
				this.show = false;
			},

			showCity() {
				this.isShowCity = true;
			},

			hideCity() {
				this.isShowCity = false;
			},

			/**
			 * [beforeAvatarUpload description] 上传头像之前限制图像
			 * @param  {[type]} file [description]
			 * @return {[type]}      [description]
			 */
			beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      /**
       * [success description] 头像上传成功
       * @return {[type]} [description]
       */
      success(response, file, fileList) {
      	this.userForm.avatar = response.filename;
      	this.userImg0 = 'http://localhost:8080/test/img/' + response.filename;
      },

			// 退出
			logout() {				
				var _this = this;
				this.$confirm('确定退出吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('userInfo');
					_this.$router.push('/index');		
					_this.name = '';		
					_this.userInfo = null;	
					_this.offset = 5;
					_this.len = 1;
				}).catch(() => {

				});			
			},

			/**
			 * 跳到个人中心
			 * [goMyself description]
			 * @return {[type]} [description]
			 */
			goMyself() {				
				if(JSON.parse(sessionStorage.getItem('userInfo')) === null){
					// 跳到登录界面
					this.$confirm('你还没有登录，是否登录',{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
          	this.$router.push('/userlogin');
        	}).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消登录',
	            duration: 800
	          });          
        	});
												
				}else{
					this.personalDialog = true;
				}
			},

			/**
			 * [goConnect description] 微信链接
			 * @return {[type]} [description]
			 */
			goConnect() {
				this.connectDialogVisible = true;
			},

			/**
       * [checkA description] 检查该昵称是否存在
       * @return {[type]} [description]
       */
      checkA() {
        // 检查用户是否存在
        var _this = this;
        console.log(this.userForm.alias);
        if((/^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/).test(this.userForm.alias) && this.userForm.alias != this.alias){
          var params = new URLSearchParams();
          params.append('alias', this.userForm.alias);
          checkUserAlias(params).then((res) => {
            console.log("res:",res);                  
            if(res.data){ 
              _this.logining = false;                 
              _this.$message({
                message: '该昵称已存在',
                type: 'error',                  
                center: true
              });  
              this.userForm.alias = "";   
              this.$refs.alias.focus();             
            }else{
               
            }              
          })      
        }        
      },

      goEdit() {
      	this.innerVisible = true;
      	this.userImg0 = this.userImg;
      },

			/**
			 * 修改用户信息
			 * [edit description]
			 * @return {[type]} [description]
			 */
			edit() {
				//this.innerVisible = false;
				var _this = this;       
        this.$refs.userForm.validate((valid) => { //表单验证
        	if (valid) {
        		var params = new URLSearchParams();
        		params.append('name',_this.userForm.name);
        		params.append('alias',_this.userForm.alias);
        		params.append('password',_this.userForm.password);
        		params.append("avatar", _this.userForm.avatar);

        		// 修改用户
        		updateUser(params).then((res) => {
        			console.log('res',res);
        			if(res.status == 200){
        				 _this.$message({
                  message: '修改成功',
                  type: 'success',                  
                  center: true
                });
        				_this.innerVisible = false;
        				res.data.data.password = this.compileStr(res.data.data.password);
        				
        				sessionStorage.setItem('userInfo',JSON.stringify(res.data.data)); // 保存用户信息


        				var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        				userInfo.password = this.uncompileStr(userInfo.password);
								if(userInfo){
									this.name = userInfo.name;
									this.alias = userInfo.alias;
									this.userInfo1 = userInfo;
									this.userForm = userInfo;
									this.userImg = 'http://localhost:8080/test/img/' + userInfo.avatar;									
								}		
        			}
        		});

        	}else{
						console.log('error');
            return false;
        	}
        });
				console.log('d',this.userInfo1);
				console.log('a',JSON.parse(sessionStorage.getItem('userInfo')))
				
			},

			/**
			 * 重置表单
			 * [resetEdit description]
			 * @return {[type]} [description]
			 */
			resetEdit() {
				this.innerVisible = false;
				this.$refs.userForm.resetFields();
			},

			/**
			 * 
			 * [goOrder description]
			 * @return {[type]} [description]
			 */
			goOrder() {
				if(JSON.parse(sessionStorage.getItem('userInfo')) === null){
					// 跳到登录界面
					this.$confirm('你还没有登录，是否登录',{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
          	this.$router.push('/userlogin');
        	}).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消登录',
	            duration: 800
	          });          
        	});	
				}else{
					// 跳到订单页面
					this.$router.push('/order');	
				}
			},

			/**
			 * [goWallet description] 跳到我的钱包
			 * @return {[type]} [description]
			 */
			goWallet() {
				/*if(JSON.parse(sessionStorage.getItem('userInfo')) === null){
					// 跳到登录界面
					this.$confirm('你还没有登录，是否登录',{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
          	this.$router.push('/userlogin');
        	}).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消登录',
	            duration: 800
	          });          
        	});	
				}else{
					// 跳到我的钱包页面
					this.$router.push('/wallet');	
				}*/

				this.walletDialogVisible = true;
			},

			compileStr(code){ //对字符串进行加密         
        var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
        for(var i=1;i<code.length;i++) {                
          c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
        }     
        return escape(c);  
      },

			uncompileStr(code){   // 对字符串进行解密     
        code=unescape(code);        
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
        for(var i=1;i<code.length;i++)  
        {        
         c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
        }        
        return c;   
      }
		},


		mounted() {
			var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			this.userInfo = userInfo;			
			if(userInfo){
				userInfo.password = this.uncompileStr(userInfo.password); // 将密码解密
				this.name = userInfo.name;
				this.alias = userInfo.alias;
				this.userInfo1 = userInfo;
				this.userForm = userInfo;
				this.avatar = userInfo.avatar;
				this.userImg = 'http://localhost:8080/test/img/'+this.avatar;
				this.offset = 4;
				this.len = 2;

				this.getWalletData();
				

			}
		}
	}
</script>