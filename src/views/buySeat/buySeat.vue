<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar></header-bar>
		<div class="content w">
			<div class="steps">
				<el-steps :active="1" finish-status="success" simple>
				  <el-step title="1.选择影片场次" ></el-step>
				  <el-step title="2.选座并填手机号" ></el-step>
				  <el-step title="3.提交并支付订单" ></el-step>
				  <el-step title="4.影院终端取票" ></el-step>
				</el-steps>
			</div>
			<el-container class='buySeat'>
				<el-main>
					<div class="choseSeat">
						<div class="seatArea" v-show='seatData.length != 0'>
							<div class="screenInfo" id="screenInfo">
								<p class="f14 font-grey" id="theaterName">{{sessionData.rName}}</p>
							</div>
							<div class="rows">
								<ul>									
									<li v-for="n in totalX">{{n}}</li>
								</ul>
							</div>
							<div class="seats" :style="{'width': '100%', 'height': (seatData.length + 1 ) * 44 +'px'}">
								<div class="seatsScroll"  :style="{'width': wLen * 42 + 'px', 'top': 0, 'left': '50%', 'margin-left': (-(wLen * 42 / 2)) + 'px'}">
									<div class="center f14 font-grey centerPos">银幕中央</div>
									<div class="centerLine" :style="{'left': '50%' , 'margin-left': '-7px', 'height': seatData.length  * 44 -5 +'px'}"></div>
									<ul id="seatList" class="seatList" :style="{ 'height': (seatData.length + 1 ) * 44 +'px'}">
										<li class="rowItem clearfix" v-for="(item,index) in seatData">
											<span  v-for="(item1,index1) in item" @click='chooseSeat(item1.id,$event)' :class="[{'seat': item1.seatY !=0},{'seatSold': item1.isSold == 1}]" :data-id="item1.seatY !=0 ? item1.seatY : ''" :data-row="item1.seatY !=0 ? item1.seatX : ''"></span>
											<!-- <span v-for='n in maxLen' :class="[(n <= item.length  && item[n-1].seatY) ? 'seat' : '', (n <= item.length  && item[n-1].seatY && item[n-1].isSold == 1) ? 'seatSold' : '']" @click="(n <= item.length  && item[n-1].seatY) ? chooseSeat(item[n-1].id,$event) : ''" :data-id="(n <= item.length  && item[n-1].seatY) ? item[n-1].seatY : ''" :data-row="(n <= item.length  && item[n-1].seatY) ? item[n-1].seatX : ''" ></span> -->
										</li>							
									</ul>
								</div>
							</div>							
						</div>
						<ul class="iconList f14 clearfix">
								<li>可选座位</li>
								<li>已选座位</li>
								<li>已售座位</li>
								<li>情侣座</li>
						</ul>
						<div class="tips">
							<h3 class="f12">使用说明:</h3>
							<p>1、每笔订单最多可选购5张电影票，情侣座不单卖；</p>
							<p>2、选座时，请尽量选择相邻座位，不要留下单个座位；</p>
							<p>3、点击"完成选座"后，请在15分钟内完成支付，超时系统将释放你选定的座位；</p>
							<p>4、选座购票为特殊商品，出票成功后，如无无法使用问题，不得退换；</p>
							<p>5、付款后若没有出票成功，我们将自动为您退款。出票成功后，请牢记取票密码，若没有收到取票短信，请到订单中心查询，或拨打客服电话4006-099-866；</p>
						</div>
					</div>
				</el-main>
				<el-aside style="width: 287px">
					<div class="buyInfo">
						<div class="area movie clearfix">
							<div class="img fl">
								<img :src="pic" alt="">
							</div>
							<div class="intro fr">
								<p class='name f16'>{{movieData.name}}</p>
								<p class="info font-shadow">版本: {{movieData.language}} {{movieData.playType}}</p>
								<p class="info font-shadow">片长: {{movieData.time}}分钟</p>
							</div>							
						</div>
						<div class="area cinema f14">
							<p>
								<span class='font-shadow'>影院：</span>{{cinemaName}}
							</p>
							<p>
								<span class='font-shadow'>影厅：</span>{{!show ? sessionData.rName : ''}}
							</p>
							<p>
								<span class='font-shadow'>场次：</span>{{!show ? pieceTime : ''}} {{!show ? week : ''}} {{!show ? time : ''}}
								
							</p>
						</div>
						<div class="area seat">
							<p class='font-shadow f14'>座位：</p>
							<ul id="selectedInfo" class='seatList clearfix'>
								<li class='empty' v-show="choseSeatData.length == 0">未选择座位</li>
								<li v-for="item in choseSeatData"><p>{{item}}</p></li>
							</ul>
						</div>
						<div class="area price">
							<p class="num f14 font-shadow">票数：<span class="nuomi-red" id="totalNum">{{choseSeatData.length}}张</span></p>
							<p class='f14 font-shadow' id='totalPrice'>总价：<span class="num nuomi-red">{{totalPrice}}元</span></p>
						</div>
						<el-button id="confirmSubmit" class="area submit" :disabled="choseSeatData.length == 0" @click='confirm'>确认提交</el-button>
					</div>
				</el-aside>
			</el-container>
		</div>

		<!-- 确认订单信息 -->
		<el-dialog>
			
		</el-dialog>
	</el-scrollbar>
</template>

<style lang='scss'>
	.buySeat{
		padding-top: 50px;
		.el-main{
			padding: 0;
		}
		.choseSeat{
			width: 902px;
			padding-top: 23px;
    	background-color: #fafafa;
    	.seatArea{
    		position: relative;
    		margin: 32px 104px 40px 117px;
    		border-bottom: 1px solid #f0f0f0;
    		.screenInfo{
    			position: relative;
			    height: 16px;
			    margin: 0 0 28px;
			    padding-top: 40px;
			    background: url(~img/seat.png) no-repeat center top transparent;
			    p{
			    	text-align: center;
			    }
    		}
    		.rows{
    			position: absolute;
			    top: 79px;
			    left: -82px;
			    width: 24px;
			    padding: 42px 0;
			    border-radius: 12px;
			    background-color: #969696;
			    li{
			    	height: 44px;
				    line-height: 44px;
				    text-align: center;
				    color: #fff;
				    font-size: 12px;
			    }
    		}
    		.seats{
    			position: relative;
			    overflow-x: auto;
			    overflow-y: hidden;
			    padding-bottom: 58px;
			    .seatsScroll{
			    	position: absolute;
			    	.centerPos{
			    		padding: 5px 0 20px;
			    	}
			    }
			    .centerLine{
						position: absolute;
				    top: 35px;
				    left: 50%;
				    width: 0;
				    height: 100px;
				    border-left: 1px dotted #b6b6b6;
			    }
			    .seatList{
						.rowItem{
							height: 28px;
					    margin-bottom: 16px;
					    line-height: 28px;
					    span{
					    	position: relative;
						    float: left;
						    width: 28px;
						    height: 28px;
						    margin-right: 14px;
						    /* &:last-child{
						    	margin-right: 0;
						    } */
					    }					    
					    .seat{
					    	background: url(~img/seat1.png) 0 0 no-repeat;
						    background-position: left -1px;
						    cursor: pointer;
					    }
					    .seatSold{
					    	background-position: left -66px;
    						cursor: default;
					    }
					    .seatSelect{
					    	background-position: left -33px;
					    	cursor: pointer;
					    }
						}
			    }
    		}
    	}
    	.iconList{
    		margin: 40px 0 40px 112px;
    		color: #333;
    		background: url(~img/seat.png) no-repeat left -58px transparent;
    		li{
    			float: left;
			    width: 87px;
			    height: 22px;
			    padding-left: 30px;
			    line-height: 22px;
			    text-align: left;
    		}
    	}
    	.tips{
    		margin: 0 28px;
		    padding: 34px 7px 46px;
		    border-top: 1px solid #f0f0f0;
		    line-height: 26px;
		    color: #333;
		    h3{
		    	font-weight: normal;
		    }
		    p{
		    	color: #666;
		    	font-size: 12px;
		    }
    	}
		}
		.buyInfo{
			.area{
				margin-bottom: 35px;
			}
			.movie{
				.img{
					width: 64px;
    			height: 86px;
    			img{
    				display: block;
    				width: 100%;
    			}
				}
				.intro{
					width: 212px;
					.info{
						overflow: hidden;
				    height: 16px;
				    line-height: 16px;
				    white-space: nowrap;
				    text-overflow: ellipsis;
					}
				}
			}
			.cinema{
				color: #333;
				p{
					line-height: 26px;
				}
				span{
					font-size: 14px;
				}
			}
			.seat{
				.seatList{
					margin: 10px 0 0 -5px;
					li{
						float: left;
				    height: 23px;
				    margin: 0 0 10px 5px;
				    border-top: 1px solid #ccc;
				    border-bottom: 1px solid #ccc;
				    line-height: 23px;
				    font-size: 12px;
				    text-align: center;
				    background: url(~img/bg.gif) no-repeat -1px -1px transparent;
					}
					p{
						margin-right: -4px;
				    padding: 0 16px 0 12px;
				    background: url(~img/bg.gif) no-repeat right -30px transparent;
					}
					.empty{
						margin: 0 0 0 5px;
				    padding: 0;
				    border: 0;
				    background: 0 0;
					}
				}
			}
			.price{
				.num{
					margin-bottom: 12px;
				}
				p{
					height: 16px;
					line-height: 16px;
				}
			}
			.submit{
				  display: block;
			    width: 100%;
			    height: 40px;
			    font-size: 18px;			   
			    text-align: center;
			    color: #fff;
			    background-color: #ff318c;
			    border: none;
			}
			.is-disabled{
				background-color: #b7b7b7;
			}

		}
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import util from '@/common/util'
	import {QuerySeat, EditSeat, QueryPieceMovieByIds, findCinemaById, QuerySessionById, AddOrder} from '@/api/api'

	export default{
		data() {
			return {				
				inx: -1,
				totalX: 0,
				pic: '',
				seatData: [],
				choseSeatData: [],
				movieData: {},
				cinemaData: {},
				sessionData: {},
				sid: -1,
				mid: ''	,
				cid: -1,
				show: false,				
				timer: null,
				wLen: 0,
				weekText: '日一二三四五六',
			}
		},

		computed: {
			pieceTime: function() {
				if(this.sessionData.pieceTime)
					return this.sessionData.pieceTime.split('-')[1]+'月'+this.sessionData.pieceTime.split('-')[2]+'日';
			},

			time: function() {
				if(this.sessionData.startTime)
					return this.sessionData.startTime.slice(0,5)
			},

			totalPrice: function() {
				return this.choseSeatData.length * this.sessionData.discountPrice;
			},

			cinemaName: function() {
				return this.cinemaData ? this.cinemaData.name : ''
			},

			week: function() {
				return '周' + this.weekText.charAt(new Date(this.$route.query.date).getDay())
			}
		},

		methods: {

			/**
			 * [getSeatDataList description] 获取座位信息
			 * @return {[type]} [description]
			 */
			getSeatDataList() {
				let params = new URLSearchParams();				
				//params.append("sessionId", this.$route.query.seqNo);
				params.append("sessionId", this.sid);
				QuerySeat(params).then(res => {					
					this.seatData = res.data.data;
					if(this.seatData.length > 0){
						this.wLen = this.seatData[0].length;						
					}					
					/*var lenData = [];
					this.seatData.forEach((val,ele) =>{
						lenData.push(val.length)
					});
					this.maxLen = Math.max(...lenData);	*/				
					this.totalX = res.data.totalX;	
					if(this.seatData.length == 0){
						clearInterval(this.timer);
					}				
				})
			},
			
			/**
			 * [confirm description] 跳到确认订单页面
			 * @return {[type]} [description]
			 */
			confirm() {
				if(JSON.parse(sessionStorage.getItem('userInfo')) === null){
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
					// 把相关信息存储 添加到订单表
					let params = new URLSearchParams(); 
					params.append('uid', JSON.parse(sessionStorage.getItem('userInfo')).id);
					params.append('sessionId', this.$route.query.seqNo);
					params.append('phone', JSON.parse(sessionStorage.getItem('userInfo')).name);
					params.append('seat',this.choseSeatData.join(','));				
					params.append('payCode', 1);
					/*params.append('ticketCode', JSON.parse(sessionStorage.getItem('userInfo')).name.slice(-4) + Math.floor(1000 + Math.random() * 9000)); // 取票码为手机后4位+随机的4位数				*/
					params.append('ticketCode',''); // 点了支付才有取票码
					params.append('orderTime', util.formatDate.format(new Date(),"yyyy-MM-dd hh:mm:ss"));
					params.append('price', this.totalPrice);	
					var orderNum = 	new Date().getTime()+JSON.parse(sessionStorage.getItem('userInfo')).name.slice(-4)+Math.floor(1000 + Math.random() * 9000);
					params.append('orderNum', orderNum); // 订单号为时间戳+手机号后4位
					console.log('seat',this.choseSeatData.join(','));
					console.log('time', util.formatDate.format(new Date(),"yyyy-MM-dd hh:mm:ss"));
					console.log('price',this.totalPrice);					
					console.log('on', orderNum);

					AddOrder(params).then(res => {
						console.log('rr',res);
						if(res.data.data){
							this.choseSeatData.forEach((val,index) => {
								let sid = this.$route.query.seqNo;
								let seatX = val.toString().split('排')[0];
								let seatY = parseInt(val.toString().split('排')[1]);
								console.log('x', seatX);
								console.log('y', seatY);
								let params = new URLSearchParams();
								params.append('sessionId', sid);
								params.append('seatX', seatX);
								params.append('seatY', seatY);
								params.append('isSold', 1);

								EditSeat(params).then(res => {
									console.log('edit', res);
								})
							})
							this.$router.push({path: '/buy/orderconfirm?orderNum='+orderNum});
							//this.$router.push({name: 'orderconfirm'});
						}
					}) 

					//this.$router.push({name: 'orderconfirm'});
				}				
			},

			/**
			 * [chooseSeat description] 进行选座
			 * @return {[type]} [description]
			 */
			chooseSeat(index,e) {
				// 点击之前先查查 登录没有
				if(JSON.parse(sessionStorage.getItem('userInfo')) === null){
					this.$alert('你还没有登录',{
						confirmButtonText: '确定',						
						type: 'warning'
					})
				}else{
					/*this.getSeatDataList();
					console.log('tt', this.getSeatDataList());*/
					//if(this.getSeatDataList()){
						
						// 如果不是已经卖了的并且选座不超过5个			
						if(!e.currentTarget.className.includes('seatSold')){			

							var no = e.currentTarget.getAttribute('data-id');
							var row = e.currentTarget.getAttribute('data-row');
							var col = no;					
							var seat = row + '排' + col + '座';
							this.inx = index;									
							if(!e.currentTarget.className.includes('seatSelect')){
								e.currentTarget.className = 'seat seatSelect';
								this.choseSeatData.push(seat);
							}else{							
								e.currentTarget.className = 'seat';
								this.removeByValue(this.choseSeatData,seat);
							}	
							if(this.choseSeatData.length > 5){
								e.currentTarget.className = 'seat';
								this.removeByValue(this.choseSeatData,seat);
								/*this.$message({ // 弹出警告
		            	message: "最多只能选5个",
		            	type: 'error'
		          	});*/
		          	this.$alert('最多只能选5个','警告',{confirmButtonText: '确定'})
							}									
						}/*else{
							// 弹出 说此座位 已被人选了
							this.$message({
								type: 'error',
								message: '此座位已被人选了,请选择其它',
								duration: 1500
							});
						}*/
					//}
				}
				
				
				
			},

			/**
			 * [removeByValue description] 数组删除特定的元素
			 * @param  {[type]} arr [description]
			 * @param  {[type]} val [description]
			 * @return {[type]}     [description]
			 */
			removeByValue(arr,val){
				for(var i=0; i<arr.length; i++) {
			    if(arr[i] == val) {
			      arr.splice(i, 1);
			      break;
			    }
			  }
			},

			hashChange() {
				window.location.reload();		
			},

			/**
			 * [getMovieData description] 获取电影信息
			 * @return {[type]} [description]
			 */
			getMovieData() {		
				let params = new URLSearchParams();
				//params.append("ids", this.$route.query.movieId)	
				params.append("ids", this.mid);	
				QueryPieceMovieByIds(params).then(res => {			
				if(res.data.data.length != 0){
					this.movieData = res.data.data[0];	
					this.pic = 'http://localhost:8080/test/img/'+this.movieData.pic;	
				}
				console.log('m',this.movieData);		
				})
			},

			/**
			 * [getCinemaData description] 获取影院信息
			 * @return {[type]} [description]
			 */
			getCinemaData() {
				let params = new URLSearchParams();
				//params.append("id", this.$route.query.cinemaId);
				params.append("id", this.cid);
				findCinemaById(params).then(res => {
					this.cinemaData = res.data.data;
					console.log('c',this.cinemaData);
				})
			},

			/**
			 * [getSessionData description] 获取场次信息
			 * @return {[type]} [description]
			 */
			getSessionData() {
				let params = new URLSearchParams();
				params.append('id', this.$route.query.seqNo);
				params.append('cid', this.$route.query.cinemaId);
				params.append('mid', this.$route.query.movieId);
				params.append('pieceTime', this.$route.query.date);
				QuerySessionById(params).then(res => {
					console.log('s', res);
					this.sessionData = res.data.data;
					this.sid = res.data.data.id;
					console.log('this.sid',this.sid);
					if(this.sessionData.startTime){		
						this.show = (this.sessionData.startTime.slice(0,2) * 60 + this.sessionData.startTime.slice(3,5) * 1 - new Date().getHours() * 60 - new Date().getMinutes()) <= 15 && this.$route.query.date == util.formatDate.format(new Date(),"yyyy-MM-dd");							
						if(!this.show){
							this.getSeatDataList();
							this.timer = setInterval(() => {
								this.getSeatDataList();
								if(this.seatData.length == 0){
									clearInterval(this.timer);
								}	
							},1000);							
							this.cid = res.data.data.cinemaId;
							this.getCinemaData();
						}	
					}
									
					this.mid = res.data.data.movieId;
					this.getMovieData();
				/*	this.cid = res.data.data.cinemaId;
					this.getCinemaData();*/
				})
			}


		},

		components: {
			HeaderBar
		},

		mounted() {			
			//this.getSeatDataList();
			//this.getMovieData();
			//this.getCinemaData();
			this.getSessionData();		
			//url变化监听器  
			if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {  
			    // 浏览器支持onhashchange事件  
			    window.onhashchange = this.hashChange;  // TODO，对应新的hash执行的操作函数  
			} else {  
			    // 不支持则用定时器检测的办法  
			    setInterval(function() {  
			        // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意  
			        var ischanged = isHashChanged();  
			        if(ischanged) {  
			            hashChange();  // TODO，对应新的hash执行的操作函数  
			        }  
			    }, 150);  
			} 
		},

		destroyed(){
			clearInterval(this.timer);
		}
	}
</script>