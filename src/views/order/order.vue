<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar v-bind:msg='parentMsg'></header-bar>
		<div class="content w" v-show="userInfo != null">
			<div class="top-nav clearfix">				
				<a class="item" v-for='(item,index) in navData' @click="select(index)" :class="{'active': inx === index}">{{item}}</a>
			</div>
			<div class="orderListBar">
				<div class="header">
					<div class="movie">电影</div>
					<div class="cinema">影院</div>
					<div class="num">数量</div>
					<div class="total">总价</div>
					<div class="status">状态</div>
				</div>
				<div class="orderList" v-for="item in completedOrderData" v-show='completedOrderData.length > 0 && inx == 0'>
					<div class="movie">
						<p class="movieName">{{item.mname}}</p>
						<p class='movieDate font-shadow'>{{item.pieceTime.split('-')[0]}}年{{item.pieceTime.split('-')[1]}}月{{item.pieceTime.split('-')[2]}}日</p>
						<p class='movieTime'>{{item.startTime.slice(0,5)}}</p>
					</div>
					<div class="cinema">
						<p class="cinemaName">{{item.cname}}</p>
						<p class="cinemaZone font-shadow">{{item.rname}}</p>
						<ul class="seat" v-for="item in item.seat.split(',')">
							<li>
								<i></i>
								{{item}}
								<em></em>
							</li>
						</ul>						
					</div>
					<div class="num">{{item.seat.split(',').length}}张</div>
					<div class="total">¥{{item.price}}</div>
					<div class="status">已支付<el-button type='primary' style='margin-left: 10px;' @click='cancelPay(item.pieceTime,item.startTime,item.orderNum,item.sessionId,item.seat, item.price, item.mname)' v-show="new Date().getTime() + 5 * 60 * 1000 <= new Date(item.pieceTime+' '+item.startTime).getTime()">取消订单</el-button></div>					
				</div>
				<div class="orderList center f12" v-if="completedOrderData.length == 0 && inx == 0">{{msg}}</div>
				<div class="orderList" v-for="item in uncompletedOrderData" v-show='uncompletedOrderData.length > 0 && inx == 1'>
					<div class="movie">
						<p class="movieName">{{item.mname}}</p>
						<p class='movieDate font-shadow'>{{item.pieceTime.split('-')[0]}}年{{item.pieceTime.split('-')[1]}}月{{item.pieceTime.split('-')[2]}}日</p>
						<p class='movieTime'>{{item.startTime.slice(0,5)}}</p>
					</div>
					<div class="cinema">
						<p class="cinemaName">{{item.cname}}</p>
						<p class="cinemaZone font-shadow">{{item.rname}}</p>
						<ul class="seat" v-for="item in item.seat.split(',')">
							<li>
								<i></i>
								{{item}}
								<em></em>
							</li>
						</ul>						
					</div>
					<div class="num">{{item.seat.split(',').length}}张</div>
					<div class="total">¥{{item.price}}</div>
					<div class="status" v-show='item.payCode == 1'>代付款<el-button type='primary' style='margin-left: 10px;' @click='goPay(item.orderNum)'>去付款</el-button></div>					
					<div class="status" v-show='item.payCode == 2'>已取消</div>
					<div class="status" v-show='item.payCode == 6'>已退款</div>
				</div>
				<div class="orderList center f12" v-if="uncompletedOrderData.length == 0 && inx == 1">{{msg}}</div>
			</div>
			<div class="page">
				<el-pagination
					background
    			layout="pager"
    			@current-change="handleCurrentChange"
    			:page-size="4"
      		:current-page.sync="currentPage"
    			v-if="total > 4"
    			:total="total">
  			</el-pagination>
			</div>
		</div>
		<div class="content w center f20" v-show="userInfo == null">
			你还没有登录，去&nbsp;&nbsp;<router-link class="login blue" to="/userlogin">登录</router-link>	
		</div>
	</el-scrollbar>
</template>

<style lang='scss'>	
	.content{
		.login{
			font-size: 24px;
		}
		.top-nav{
			margin: 30px 0;
			.item{
				float: left;
		    margin-right: 36px;
		    padding-bottom: 10px;
		    border-bottom: 2px solid transparent;
		    font-size: 18px;
		    color: #333;
		    &:hover{
		    	border-color: #ff318c;
    			color: #ff318c;
		    }
		    &.active{
		    	border-color: #ff318c;
    			color: #ff318c;
		    }
			}
		}
		.orderListBar{
			border-bottom: 1px solid #f5f5f5;
			.movie{
	    	width: 226px;
		    margin-right: 34px;
		    text-align: left;
		  }
	    .cinema{
	    	width: 414px;
  			margin-right: 40px;
	    }
	    .num{
	    	width: 70px;
		    margin-right: 50px;
		    text-align: left;		    
	    }
	    .total{
	    	width: 114px;
    		text-align: left;
	    }
	    .status{
	    	width: 190px;
  			font-size: 14px;
	    }
			.header{
				width: 1168px;
				&>div{
					display: inline-block;
				}
				padding: 12px 20px 16px;
		    font-size: 14px;
		    color: #666;
		    background-color: #f5f5f5;
		    text-align: center;		    
			}
			.orderList{
				padding: 26px 20px 30px;    
				&.center{
					text-align: center;
				}		
				& > div{
					display: inline-block;
					min-height: 90px;
    			border-right: 1px solid #f5f5f5;
    			vertical-align: top;
				}
				.movieName{
					margin-bottom: 14px;
    			font-size: 16px;
    			color: #333;
				}
				.movieDate{
					margin-bottom: 10px;
					font-size: 14px;
				}
				.movieTime{
					font-size: 14px;
				}
				.cinemaName{
					margin-bottom: 14px;
			    font-size: 16px;
			    color: #757575;
				}
				.cinemaZone{
					margin-bottom: 5px;
    			font-size: 14px;
				}
				.seat{
					li{
						position: relative;
						float: left;
				    display: inline-block;
				    margin: 5px 5px 0 0;
				    padding: 4px 12px;
				    border: 1px solid #d5d5d5;
				    color: #333;
					  font-size: 12px;
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
				.num,.total,.status{
					line-height: 90px;
					color: #333;
					font-size: 14px;
				}		
				.status{
					text-align: center;
					border-right: none;
				}		
			}
		}
		.page{
			padding: 30px 0;
			text-align: center;
		}		
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import util from '@/common/util'
	import {QueryOrder, EditOrderPayCode, EditSeat, EditWallet, EditWallet1, EditWallet2, SendCancelOrder} from '@/api/api'

	export default {
		data() {
			return {
				navData: ['已完成订单','未支付的订单'],
				inx: 0,				
				msg: '暂时没有订单',
				userInfo: null,
				total: 0,
				currentPage: 1,
				completedOrderData: [],
				uncompletedOrderData: [],
				parentMsg: 'hh'			
			}
		},		

		methods: {
			/**
			 * 选择哪个给特定样式 并显示不同内容
			 * [select description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			select(index){
				this.inx = index;
				console.log(index);
				if(index == 0){
					this.getCompletedOrder();
				}else if(index == 1){
					this.getUncompleteOrder();
				}				
			},

			/**
			 * [getCompletedOrder description] 获取已完成的订单
			 * @return {[type]} [description]
			 */
			getCompletedOrder() {
				let params = new URLSearchParams();
				params.append('uid', this.userInfo.id);
				params.append('payCode', 3);
				params.append('pageNum', this.currentPage);
				params.append('pageSize', 4);

				QueryOrder(params).then(res => {
					console.log('q', res);
					this.total = res.data.totalNum;
					this.completedOrderData = res.data.data;					
				})
			},

			/**
			 * 获取未支付的订单
			 * [getUncompleteOrder description]
			 * @return {[type]} [description]
			 */
			getUncompleteOrder() {
				let params = new URLSearchParams();
				params.append('uid', this.userInfo.id);
				params.append('payCode', -1);
				params.append('pageNum', this.currentPage);
				params.append('pageSize', 4);

				QueryOrder(params).then(res => {
					console.log('q1', res);
					this.total = res.data.totalNum;
					this.uncompletedOrderData = res.data.data;					
				})
			},

			/**
			 * [handleCurrentChange description] 翻页
			 * @return {[type]} [description]
			 */
			handleCurrentChange() {
				if(this.inx == 0 ){
					this.getCompletedOrder();
				}else{
					this.getUncompleteOrder();
				}
			},

			/**
			 * [goPay description] 去支付
			 * @return {[type]} [description]
			 */
			goPay(orderNum) {				
				this.$router.push({path: '/buy/orderconfirm?orderNum='+orderNum});
			},

			/**
			 * [cancelPay description] 取消订单 开始前五分钟之内 可以取消
			 * @param  {[type]} orderNum [description]
			 * @return {[type]}          [description]
			 */
			cancelPay(pieceTime,startTime,orderNum,sessionId,seat,price,mname) {
				console.log(pieceTime,startTime,orderNum);
				console.log(new Date().getTime());
				console.log(new Date(pieceTime+" "+startTime).getTime());
				if(new Date().getTime() + 5 * 60 * 1000 <= new Date(pieceTime+" "+startTime).getTime()){
					// 可以取消订单
					this.$confirm('是否取消订单?', '提示', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		      	// 将支付状态码 变为 已退款 6
		        let params = new URLSearchParams();
	        	params.append('orderNum', orderNum);
	        	params.append("payCode",6);
	        	params.append('orderTime', "");
	        	EditOrderPayCode(params).then(res => {
	        		console.log('editp', res);
	        		if(res.data.data){
	        			this.$message({
				          type: 'info',
				          message: '已成功取消订单'
				        }); 

				        // 给用户发送短信
				        let cancelParams = new URLSearchParams();
				        cancelParams.append("phone", this.userInfo.name);
				        cancelParams.append("userName", this.userInfo.alias);
				        cancelParams.append("mname", mname);
				        let ftime = util.formatDate.format(new Date(pieceTime + " " + startTime),"yyyy年MM月dd日hh时mm分ss秒");
				        cancelParams.append("time", ftime);
				        SendCancelOrder(cancelParams).then(res => {

				        });

	        			// 修改钱包信息
	        			let walletParam = new URLSearchParams();
	        			walletParam.append("uid", this.userInfo.id);
	        			walletParam.append("balance", price);
	        			walletParam.append("integration", Math.floor(price / 2));
	        			EditWallet2(walletParam).then( res => {
	        				if(res.data.data){
	        					this.getCompletedOrder(); // 重新获取
						        // 将座位表变为未支付状态
						        var seatData = seat.split(',');
						        seatData.forEach((val,index) => {
						        	let params1 = new URLSearchParams();
							        let seatX = val.toString().split('排')[0];
											let seatY = parseInt(val.toString().split('排')[1]);
											console.log('ss',sessionId+" "+seatX+" "+seatY);
							        params1.append('sessionId', sessionId);
											params1.append('seatX', seatX);
											params1.append('seatY', seatY);
											params1.append('isSold', 0);
											EditSeat(params1).then(res => {
												if(res.data.data){
													window.location.reload();													
												}
											})
						        })	
	        				}
	        			});

				        			        
	        		}
	        	});

	        	
	        	
		      }).catch(() => {
		        this.$message({
		          type: 'info',
		          message: '已取消取消订单'
		        });          
		      });
				}else{
					this.$message({
	          type: 'error',
	          message: '已过取消订单的时间',
	          duration: 1000
	        });

				}
			}
		},

		components: {
			HeaderBar
		},

		mounted() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			if(this.userInfo){
				this.getCompletedOrder();				
			}
		},

		created() {
			this.parentMsg = 'aa';
		}

	}
</script>