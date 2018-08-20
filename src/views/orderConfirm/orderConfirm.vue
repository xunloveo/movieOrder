<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar @sendWalletData = 'sendWalletData'></header-bar>
		<div class="content w" v-show="phone != '' && orderId != 0">
			<div class="orderConfirm">
				<h2 class="title f16 clearfix">确认订单信息<span class="fr f12 font-shadow">订单号：{{orderData.orderNum}}</span></h2>
			</div>
			<div class="wrapContent">
				<div class="cuttimeDes nuomi-red">{{text}}
					<div class="cuttime fr">
						<span class="font-shadow">剩余支付时间：</span>
						<time class="nuomi-red">{{restTime}}</time>
					</div>
				</div>
				<ul class="orderList">
					<li class="item-tr">
						<label  class="item-td check"></label>
						<div class="item-td orderInfo">
							<div class="orderDetail">
								<router-link :to="{path:'/moviedetail',query:{id: orderData.movieId}}"><p class="orderName">{{orderData.mname}}</p></router-link>
								<div class="typeTime font-shadow">&nbsp;&nbsp;</div>
								<ul class="theaterInfo f14">
									<router-link :to="{path:'/cinemadetail',query:{id: orderData.cinemaId}}"><li style="color: #333;"><span class="font-shadow f14">影院：</span>{{orderData.cname}}</li></router-link>
									<li><span class="font-shadow f14">影厅：</span>{{orderData.rname}}</li>
									<li><span class="font-shadow f14">场次：</span>{{pieceTime}}  {{time}}</li>
								</ul>
								<ul class="seat f14">
									<li v-for='item in seatData'>
										<i></i>
										{{item}}
										<em></em>
									</li>
								</ul>
							</div>
						</div>
						<div class="item-td split-levline1"></div>
						<div class="item-td orderEdit font-shadow f14">接收取票码的手机号:
							<p v-show='edit' class='phone-edit'>
								<span class="phone">{{phone}}</span>
								<a class="nuomi-red" @click="editPhone">修改</a>
							</p>
							<p v-show='!edit'>
								<el-input type="text" placeholder="请输入接收取票码的手机号" v-model='phone1' class='input-phone' @input.native="change" clearable></el-input>
								<el-button class="confirm" :disabled='disabled' @click='confirmOk'>确认</el-button>
							</p>
						</div>
						<div class="item-td split-levline1"></div>
						<div class="item-td order-price">金额小计：
							<p class='price'>¥{{orderData.price}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="pay font-shadow">
				<p class="total-money">实际支付：<span class="nuomi-red">{{orderData.price}}元</span></p>
			</div>
			<div class='pay-btn'>
				<el-button type='primary' @click='pay'>{{payText}}</el-button>
			</div>
		</div>
		<div class="content w" v-show="phone !== '' && orderId == 0" style="text-align: center">您还没有订单</div>
		<div class="content w" v-show="phone == ''" style="text-align: center">订单不存在</div>
	</el-scrollbar>
</template>

<style lang="scss">
	.content{
		.title{
			padding-bottom: 15px;
			font-weight: normal;
			color: #333;
		}
		.wrapContent{
			margin-bottom: 30px;
	    padding-bottom: 20px;
	    border: 1px solid #f1f1f1;
		}
		.cuttimeDes{
			margin-bottom: 30px;
	    padding: 24px 30px 24px 42px;
	    background-color: #ffedf3;
	    font-size: 12px;
		}
		.cuttime{	
			margin-top: -4px;		
			span{
				margin-right: 4px;
		    font-size: 14px;
		    vertical-align: middle;
			}
			time{
				font-size: 24px;
    		vertical-align: middle;
			}
		}
		.orderList{
			color: #333;
			.item-tr{
				.item-td{
					display: inline-block;
    			vertical-align: middle;
				}
				.check{
					width: 60px;
    			text-align: center;
				}
				.orderInfo{
					.orderDetail{
						display: inline-block;
				    width: 442px;
				    vertical-align: top;
				    .orderName{
				    	margin-bottom: 8px;
					    font-size: 18px;
					    cursor: pointer;
					    color: #333;
				    }
				    .typeTime{
				    	margin-bottom: 18px;
				    }
				    .theaterInfo{
				    	margin-bottom: 18px;
				    }
				    .seat{
							li{
								position: relative;
						    display: inline-block;
						    margin: 0 5px 5px 0;
						    padding: 4px 12px;
						    border: 1px solid #d5d5d5;
						    i,em{
									position: absolute;
							    z-index: 10;
							    top: 50%;
							    width: 4px;
							    height: 8px;
							    margin-top: -4px;
							    border: 1px solid #999;
							    background-color: #fff;
						    }
						    i{
						    	left: -1px;
							    border-left: 0;
							    border-radius: 0 4px 4px 0;
						    }
						    em{
						    	right: -1px;
							    border-right: 0;
							    border-radius: 4px 0 0 4px;
						    }
							}							
				    }
					}
				}
				.split-levline1{
					width: 0;
			    height: 172px;
			    margin: 0 50px;
			    border-left: 1px solid #f1f1f1;
				}
				.orderEdit{
					width: 204px;
					.phone-edit{
						margin: 10px 0 0 -4px;
					}
					p{
						margin-top: 13px;
					}
					.phone{
						font-size: 24px;
						color: #333;
					}
					a{
						margin-left: 6px;
					}
					.input-phone{
						width: 156px;
						display: inline-block;
						.el-input__inner{
							display: inline-block;
					    width: 156px;
					    height: 28px;
					    padding-left: 4px;
					    border: 1px solid #f1f1f1;
					    font-size: 12px;
					    line-height: 28px;
					    vertical-align: middle;
					    border-radius: 0;
					    padding: 0;
					    padding-left: 5px;
						}					
					}
					.confirm{
						display: inline-block;
				    height: 28px;
				    margin-left: -5px;
				    padding: 0 6px;
				    border: 1px solid #f1f1f1;
				    font-size: 14px;
				    line-height: 28px;
				    text-align: center;
				    vertical-align: middle;
				    color: #fff;
				    background-color: #999;	
				    border-radius: 0;	
				    background-color: #fc4984		    
					}
					.is-disabled{
						background-color: #999;
					}
				}
				.order-price{
					color: #333;
					font-size: 12px;
					.price{
						margin: 10px 0 0 -2px;
    				font-size: 24px;
					}
				}
			}
		}
		.pay{
			text-align: right;
			margin: -10px 0 10px 0;
			.total-money{
				font-size: 14px;
				span{
					font-size: 24px;
				}
			}
		}
		.pay-btn{
			text-align: right;
		}
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import util from '@/common/util'
	import {QueryOrderByOrderNum, EditSeat, EditOrder, EditOrderPayCode, EditOrderPhone, EditWallet1, SendTicketNum} from "@/api/api"

	export default {
		data() {
			return {
				phone: '',
				phone1: '',
				edit: true,
				disabled: false,
				seatDataList: [],
				orderData: {},
				text: '请在15分钟内完成支付',
				restTime: '00:00',
				orderTime: '',
				timer: null,
				rest: '',
				seatData: [],
				orderId: 0,
				payText: '确认并支付',
				walletData: {},
				walletData1: {}
			}
		},

		computed: {
			pieceTime: function() {
				if(this.orderData.pieceTime)
					return this.orderData.pieceTime.split('-')[1]+'月'+this.orderData.pieceTime.split('-')[2]+'日';
			},

			time: function() {
				if(this.orderData.startTime)
					return this.orderData.startTime.slice(0,5)
			},
		},

		methods: {

			// 获取子组件传来的值 获取钱包信息
			sendWalletData(data){
				console.log('data',data);
				this.walletData = data;
			},

			/**	
			 * [editPhone description] 编辑接收取票码的手机号
			 * @return {[type]} [description]
			 */
			editPhone() {
				this.edit = false;
			},

			/**
			 * [change description] 手机号变化的时候
			 * @return {[type]} [description]
			 */
			change() {
				console.log(this.phone1);				
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone1))){
					this.disabled = true;
					console.log('error');
				}else{
					this.phone = this.phone1;
					this.disabled = false;
				}
			},

			/**
			 * [confirmOk description] 点击确认之后
			 * @return {[type]} [description]
			 */
			confirmOk() {
				this.edit = true;
				// 更改收取 手机号
				let params = new URLSearchParams();
				params.append("orderNum", this.$route.query.orderNum);
				params.append("phone", this.phone1);
				EditOrderPhone(params).then(res => {
					console.log('ep', res);
				})
				this.$message({
          message: '请点击支付,取票码将会发至该手机,注意查收',
          type: 'success'
        });
			},

			getOrderData() {
				let params = new URLSearchParams();
				params.append('orderNum', this.$route.query.orderNum);
				console.log('orderNum', this.$route.query.orderNum);
				QueryOrderByOrderNum(params).then(res => {
					console.log('r', res);
					this.orderId = res.data.data.id;
					this.orderData = res.data.data;
					this.seatData = res.data.data.seat.split(',');
					this.orderTime = res.data.data.orderTime;	
					this.phone = res.data.data.phone;
					this.phone1 = this.phone;
					if(res.data.data.id != 0){
						this.getRestTime();
						if(this.restTime != '00:00'){
							this.timer = setInterval(() => {
								this.getRestTime();
							},1000);
						}
						if(this.text == '已过支付时间，请重新选座'){
							/*// 将支付状态 改为已取消
							let params = new URLSearchParams();
		        	params.append('orderNum', this.$route.query.orderNum);
		        	params.append("payCode",2);
		        	EditOrderPayCode(params).then(res => {
		        		console.log('editp2', res);
		        	})
							// 将座位 腾出
							this.seatData.forEach((val,index) => {
								let sid = this.orderData.sessionId;
								let seatX = val.toString().split('排')[0];
								let seatY = parseInt(val.toString().split('排')[1]);
								console.log('sid', sid);
								console.log('x', seatX);
								console.log('y', seatY);
								let params = new URLSearchParams();
								params.append('sessionId', sid);
								params.append('seatX', seatX);
								params.append('seatY', seatY);
								params.append('isSold', 0);

								EditSeat(params).then(res => {
									console.log('edit', res);
								})
							})*/
						}
					}				
					
					
				})
			},

			/**
			 * [getRestTime description] 获取剩余的时间
			 * @return {[type]} [description]
			 */
			getRestTime() {
				//var orderTime = this.orderData.orderTime;
				this.rest = (new Date(this.orderTime).getTime() + 15 * 60 * 1000) - new Date().getTime();
				if(this.rest >= 0){
					this.restTime = util.formatDate.format(new Date(this.rest),"mm:ss");
				}
				/*console.log('ffff');*/
				if(this.restTime == "00:00"){
					clearInterval(this.timer);
					//this.timer = null;						
					this.text = '已过支付时间，请重新选座';		
					// 将支付状态 改为已取消
					let params = new URLSearchParams();
        	params.append('orderNum', this.$route.query.orderNum);
        	params.append("payCode",2);
        	params.append("orderTime","");
        	EditOrderPayCode(params).then(res => {
        		console.log('editp2', res);
        	})
					// 将座位 腾出
					this.seatData.forEach((val,index) => {
						let sid = this.orderData.sessionId;
						let seatX = val.toString().split('排')[0];
						let seatY = parseInt(val.toString().split('排')[1]);
						console.log('sid', sid);
						console.log('x', seatX);
						console.log('y', seatY);
						let params = new URLSearchParams();
						params.append('sessionId', sid);
						params.append('seatX', seatX);
						params.append('seatY', seatY);
						params.append('isSold', 0);

						EditSeat(params).then(res => {
							console.log('edit', res);
						})
					})			
				}
			},

			/**
			 * [pay description] 点击支付
			 * @return {[type]} [description]
			 */
			pay(){
				if(this.restTime == '00:00'){
					this.$message({
						showClose: true,
	          message: '已过支付时间',
	          type: 'error'
	        });
				}else{
					this.$confirm('是否支付?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'info'
	        }).then(() => {
	        	console.log(this.walletData.balance, this.orderData.price);
	        	// 判断余额是否不足
	        	if(this.walletData.balance < this.orderData.price){
	        		this.$message({
		          	message: '余额不足，请充值！',
		          	type: 'error',
		          	duration: 1500
		        	}); 
	        	}else{
	        		this.payText = '支付中...';
							setTimeout(() => {

								// 给用户发送取票码
								
								this.$message({
			          	message: '取票码已发送，注意查收，切莫忘记！',
			          	type: 'success',
			          	duration: 1500
			        	}); 
			        	// 将状态码修改为  3 待取票状态(支付成功状态)
		        	
			        	let params = new URLSearchParams();
			        	let ticketCode = JSON.parse(sessionStorage.getItem('userInfo')).name.slice(-4) + Math.floor(1000 + Math.random() * 9000);
			        	params.append('orderNum', this.$route.query.orderNum);
			        	params.append("payCode",3);
			        	params.append('orderTime', util.formatDate.format(new Date(),"yyyy-MM-dd hh:mm:ss")); // 订单时间
			        	params.append('ticketCode', ticketCode); // 取票码为手机后4位+随机的4位数			
			        	console.log('ot', util.formatDate.format(new Date(),"yyyy-MM-dd hh:mm:ss"));
			        	console.log('tc',JSON.parse(sessionStorage.getItem('userInfo')).name.slice(-4) + Math.floor(1000 + Math.random() * 9000));
			        	EditOrder(params).then(res => {
			        		console.log('editp', res);
			        	});

			        	// 发送取票码给用户
			        	let ticketParams = new URLSearchParams();
			        	ticketParams.append("phone", this.phone);
			        	ticketParams.append("ticketCode", ticketCode);
			        	ticketParams.append("userName", JSON.parse(sessionStorage.getItem('userInfo')).alias);

			        	SendTicketNum(ticketParams).then(res => {
			        		// 发送信息给用户
			        	});

			        	// 修改钱包信息
			        	let walletParams = new URLSearchParams();
			        	walletParams.append("uid", JSON.parse(sessionStorage.getItem('userInfo')).id);
			        	console.log(this.walletData.balance, this.orderData.price);
			        	let rest = this.walletData.balance - this.orderData.price;
			        	console.log('rest', rest);
			        	walletParams.append("balance", this.orderData.price);
			        	walletParams.append("integration", Math.floor(this.orderData.price / 2));
			        	EditWallet1(walletParams).then(res => {
			        		if(res.data.data){
			        			this.payText = '支付中成功！';
					        	this.restTime == '00:00';
					        	this.text == '已支付';					        	
					        	clearInterval(this.timer);
					        	//this.getOrderData();
					        	this.$router.push({path: '/'}); // 跳到首页	        			
			        		}
			        	});

			        	
							},1000);
	        	}
	        	
	        		          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消支付'
	          });          
	        });
					
				}
			}
			
		},

		components: {
			HeaderBar
		},


		mounted() {
			var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			if(userInfo){
				/*this.phone = userInfo.name;
				this.phone1 = this.phone;*/

				this.getOrderData();	
				this.sendWalletData();			
			}
			
		},


	}

</script>