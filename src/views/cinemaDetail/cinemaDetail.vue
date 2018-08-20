<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar></header-bar>
		<div class='cinemaDetailContent w'>
			<div class="cinemaDetailIntro">
				<div style='padding-left: 20px;'>
					<h2 class="title">
					{{cinemaData.name}}
						<em class='star'>
							<i class='star-in' :style="'width: '+cinemaData.rate * 10+'%'"></i>
						</em>
						<em class="record f12 nuomi-red">{{cinemaData.rate}}</em>
					</h2>
					<p class="addr font-gray">{{cinemaData.address}}<em class='line'></em>0791-88866676</p>
					<div class="icons clearfix">
						<span v-for='item in icon' :class="['service', 'service-'+item]"></span>
						<!-- <span class='service service-5'></span>
						<span class='service service-3'></span>
						<span class='service service-2'></span>
						<span class='service service-1'></span> -->
					</div>
				</div>				
				<div class="act nuomi-red f12">{{cinemaData.desc}}</div>
			</div>
			<el-container>
				<el-main class='contentLeft'>
					<div class="detailNav">
						<router-link :to="fullPath + '#cinemaMovieList'" @click.native='go(1)' class='anchor'  :class="active ? 'active' : ''">影讯购票</router-link>
						<router-link :to="fullPath + '#cinemaComment'" @click.native='go(3)' class='anchor' :class="active2 ? 'active' : ''">影院评论</router-link>
						<router-link :to="fullPath + '#cinemaDetail'" @click.native='go(2)' class='anchor' :class="active1 ? 'active' : ''">影院详情</router-link>
					</div>
					<div id='cinemaMovieList' ref='cinemaMovieList'>
						<div class="img-bg" id="sliderBg"></div>
						<div class="flexslider" id="flexslider">
							<div class="detail" id="movieDetail">
								<h2 class="movieDetail clearfix" v-for="(item,index) in movieData" :class="{'show': inx === index}">
								 <em>{{item.name}}</em>
								 <em class="star">
								 	<i class="star-in" :style="'width:'+ item.rate / 10 * 80 + 'px'"></i>
								 </em>
								 <em class="record f12 nuomi-red">{{item.rate}}</em>
							  </h2>
							</div>
							<div class="flex-viewport" style='overflow: hidden; position: relative;'>
								<ul class="sliders clearfix" style='width: 1800%' id='slider' ref='slider'>
									<li class='item' v-for='(item,index) in 
									movieData' @click='select(index,item.id)' :class="{'selected': inx === index}">
										<div class="img">											
											<img :src="'http://localhost:8080/test/img/'+item.pic" alt="">
										</div>	
										<div class="info">
											<p class="name f14">{{item.name}}</p>
											<span class='score fr'>{{item.rate}}</span>
											<span class='intro'>{{item.shortDesc}}</span>
											<router-link :to="{path:'/moviedetail',query:{id: item.id}}"><em class="more">详情></em></router-link>
										</div>									
									</li>									
								</ul>								
							</div>
							<ul class="flex-direction-nav">
								<li class="flex-nav-prev">
									<a class="flex-prev" @click='prevGo' v-show='len > 5'></a>
								</li>
								<li class="flex-nav-next">
									<a class="flex-next" @click='nextGo' v-show='len > 5'></a>
								</li>
							</ul>
						</div>
						<div class="line"></div>
					</div>
					<div id="dateList" ref='dateList'>
						<div class="dateBar">
							<div class="date">								
								<span class="text" v-for='(item,index) in date' @click='selectDate(index,$event)' :class="{'active': dateIndex === index}" :data-time='item.pieceTime'>{{item.pieceTime.split('-')[1]}}月{{item.pieceTime.split('-')[2]}}日</span>
							</div>
							<div class="sessionList">
								<ul>
									<li class="clearfix" v-for="item in sessionData">
										<div class="time fl">
											<p class="start">{{item.startTime.slice(0,5)}}</p>
											<p class='end'>{{item.endTime.slice(0,5)}}散场</p>
										</div>
										<div class="type fl f14">{{item.type}}</div>
										<div class="hall fl f14">{{item.rName}}</div>
										<div class="price fl">
											<p>
												<span class='dollar nuomi-red'>¥</span>
												<span class='num nuomi-red'>{{item.discountPrice}}</span>
												<del class='font-shadow'>{{item.originPrice}}</del>
											</p>
										</div>
										<div class="seat fl">余位{{item.restSeat}}%</div>
										<button  v-show='item.restSeat != 0' class='buy fr nuomi-red' :class="(date0 == pieceTime0 && ((item.startTime.slice(0,2) * 60 + item.startTime.slice(3,5) * 1 - new Date().getHours() * 60 - new Date().getMinutes()) <= 15)) ? 'timeout' : ''" @click='goSeat(item.movieId,item.cinemaId,item.id,item.pieceTime,$event)' :disabled="(date0 == pieceTime0 && ((item.startTime.slice(0,2) * 60 + item.startTime.slice(3,5) * 1 - new Date().getHours() * 60 - new Date().getMinutes()) <= 15))">{{(date0 == pieceTime0 && ((item.startTime.slice(0,2) * 60 + item.startTime.slice(3,5) * 1 - new Date().getHours() * 60 - new Date().getMinutes()) <= 15)) ? '停止购票' : '选座购票'}}</button>		
										<button class='buy fr timeout' v-show='item.restSeat == 0'>票已售空</button>							
									</li>
									<li v-show='sessionData.length == 0' style='text-align: center'>暂无场次！</li>									
								</ul>
							</div>
						</div>
					</div>
					<cinema-comment v-bind:comment="commentType" :cinemaid='cinemaId' ref='cinemaComment'></cinema-comment>
					<div class="cinemaDetail" ref='cinemaDetail'>
						<h2 class="title">影院详情</h2>
						<div class='intro f14 '></div>
						<div class="serviceList">
							<ul class="list clearfix">
								<li class='feature' v-for='(item,index) in cDetail'>
									<span :class="['name','service-'+icon[index]]">{{item.split('->')[0]}}</span>
									<span class="des">{{item.split('->')[1]}}</span>
								</li>								
							</ul>
						</div>
					</div>
				</el-main>
				<el-aside style="width: 225px" class='contentRight'>
					<will-list></will-list>
				</el-aside>
			</el-container>
		</div>	
		<go-top v-bind:scrollRoot='scrollEle' v-if='scrollFlag'></go-top>	
	</el-scrollbar>
</template>

<style lang='scss'>
	.cinemaDetailContent{
		.cinemaDetailIntro{			
			margin-bottom: 30px;
			.title{
				height: 29px;
		    font-size: 20px;
		    line-height: 29px;
		    color: #333;
		    font-weight: 400;
		    .star{
		    	display: inline-block;
			    width: 80px;
			    height: 29px;
			    margin: 0 12px 0 4px;
			    background: url(~img/star_ci.gif) repeat-x left 14px transparent;
			    font-style: normal;
			    .star-in{
			    	display: inline-block;
				    height: 29px;
				    background: url(~img/star_ci.gif) repeat-x left -13px transparent;
				    font-style: normal;
			    }
		    }
		    .record{
		    	position: relative;
			    top: -3px;
			    display: inline-block;
			    height: 29px;
			    line-height: 29px;
			    font-style: normal;
		    }
			}
			.addr{
				height: 14px;
		    margin: 13px 0 18px;
		    line-height: 14px;
		    font-size: 12px;
		    .line{
					position: relative;
			    top: 3px;
			    display: inline-block;
			    width: 2px;
			    height: 14px;
			    margin: 0 9px;
			    background-color: #ccc;
		    }
			}
			.icons{
				.service{
					float: left;
			    padding-right: 5px;
			    width: 19px;
			    height: 19px;
			    background: url(~img/feature.png) no-repeat left top transparent;
			    background-size: 19px auto;			    
				}
				.service-8{
					display: block;
    			background-position: 0 -64px;
				}
				.service-5{
					display: block;
    			background-position: 0 -78px;
				}
				.service-3{
					display: block;
    			background-position: 0 -39px;
				}
				.service-2{
					display: block;
    			background-position: 0 -19px;
				}
				.service-1{
					display: block;
    			background-position: 0 0;
				}
			}
			.act{
				height: 38px;
		    padding-left: 43px;
		    margin-top: 20px;
		    line-height: 38px;
		    background: url(~img/act.gif) no-repeat 20px -24px #ffedf3;
			}
		}
		.contentLeft{
			padding: 0;
			width: 945px;
			.detailNav{
				width: 945px;
				margin: 0 0 15px -10px;
				.anchor{
					padding: 0 11px;
			    border-left: 1px solid #ccc;
			    font-size: 16px;
			    color: #333;
				}
				.anchor.active{
					color: #fc4984;
				}				
			}
			#cinemaMovieList{
				width: 945px;
				padding-top: 316px;
				position: relative;
				overflow: hidden;
				.img-bg{
					background: url(~img/movie-bg.jpg) no-repeat center top transparent;
					background-size: 100% auto;
					position: absolute;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 246px;
				}
				.flexslider{
					position: absolute;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 209px;
			    padding: 19px 18px;
			    border: 0;
			    background-color: transparent;
			    .detail{
			    	position: absolute;
				    bottom: -51px;
				    left: 0;
				    .movieDetail{
				    	display: none;
				    	height: 20px;
					    font-size: 20px;
					    line-height: 20px;
					    font-weight: 700;
					    color: #333;
					    &.show{
					    	display: block;
					    }
					    em{
					    	font-style: normal;
					    	font-weight: 400;
					    	float: left;
					    }
					    .star{
					    	display: inline-block;
						    width: 80px;
						    height: 20px;
						    margin: 0 13px;
						    background: url(~img/star_ci.gif) repeat-x left 2px transparent;
						    .star-in{
						    	display: inline-block;
							    height: 20px;
							    background: url(~img/star_ci.gif) repeat-x left -25px transparent;
						    }
					    }
				    }
			    }
			    .sliders{
			    	li{
			    		width: 140px;
					    margin-right: 18px;
					    float: left;
					    display: block;
					    position: relative;
					    border: 2px solid transparent;					    
					    height: 205px;
					    overflow: hidden;
					    &:hover{
					    	.info{
					    		display: block;
					    	}
					    }					    
			    	}
			    	.selected{
					   	border: 2px solid #fc328b;					    	
					  }
			    	.img{
			    		position: absolute;
					    top: 0;
					    left: 0;
					    width: 140px;
					    height: 205px;
					    img{
					    	width: 100%;
    						height: 205px;
					    }
			    	}
			    	.info{
			    		display: none;
					    position: absolute;
					    bottom: 0;
					    left: 0;
					    padding: 6px 4px;
					    width: 132px;
					    background-color: rgba(0,0,0,.7);
					    .name{
					    	width: 100px;
						    display: block;
						    position: relative;
						    margin-right: 23px;
						    height: 16px;
						    line-height: 16px;
						    overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						    font-size: 14px;
						    color: #fff;
					    }
					    .score{
					    	position: absolute;
						    right: 4px;
						    top: 5px;
						    color: #fff;
						    font-size: 14px;
					    }
					    .intro{
					    	position: relative;
						    margin-right: 34px;
						    padding-top: 2px;
						    height: 14px;
						    line-height: 14px;
						    overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						    font-size: 12px;
						    display: block;
						    color: #999;
					    }
					    .more{
					    	position: absolute;
						    right: 4px;
						    bottom: 5px;
						    cursor: pointer;
						    color: #999;
						    font-style: normal;
						    font-size: 12px;
					    }					    
			    	}
			    }
			    #slider{
			    	transition: all .6s ease-in-out;
			    }
			    .flex-direction-nav{
						li{
							width: 42px;
		    		  height: 42px;
		    			position: absolute;
		    			top: 86px;
						}
						a{
							text-decoration: none;
		    			display: block;
		    			background-color: #f00;
		    			width: 42px;
		    			height: 42px;
		    			opacity: 0;
		    			background: url(/static/img/arrow.png) no-repeat; 
		    			transition: all .5s; 			
						}
						.flex-next{
							background-position: -47px 0;
						}
						.flex-nav-prev{
							left: 0;
						}
						.flex-nav-next{					
							left: 905px; 
							/* right: 0; */
						}
					}
					&:hover{						
						.flex-direction-nav{
							a{
								opacity: 1;
								transform: translateX(10px);
							}
							.flex-next{
								transform: translateX(-10px);
							}
						}
					}					
				}
				.line{
					position: relative;
			    height: 1px;
			    background-color: #e2e2e2;
				}
			}
			#dateList{				
				width: 945px;
				.dateBar{
					.date{
						padding: 20px 0 30px;	
						.text{
							display: inline-block;
					    cursor: pointer;
					    height: 18px;
					    margin-right: 12px;
					    padding: 0 6px;
					    line-height: 18px;
					    font-size: 12px;
					    &.active{
					    	cursor: default;
						    color: #fff;
						    background-color: #fc4984;					    	
					    }
						}	
					}		
					.sessionList{
						li{
							height: 40px;
							padding-bottom: 44px;
						}
						color: #333;
						.time{
							width: 58px;
					    padding-right: 65px;
					    text-align: center;
					    font-size: 12px;
					    .start{
					    	font-size: 20px;
					    }
					   	.end{
					   		color: #111;
					   	}
						}
						.type{
							width: 115px;
					    height: 40px;
					    padding-right: 8px;
					    line-height: 40px;
						}
						.hall{
							width: 112px;
					    height: 40px;
					    padding-right: 10px;
					    line-height: 40px;
						}
						.price{
							width: 156px;
    					padding-right: 10px;
    					.dollar{
    						margin-left: -2px;
    						font-size: 20px;    						
    					}
    					.num{
    						padding-right: 7px;
    						font-size: 20px;
    					}
						}
						.seat{
							width: 218px;
					    height: 40px;
					    padding-left: 21px;
					    font-size: 12px;
					    line-height: 40px;
					    background: url(~img/session.gif) no-repeat left center transparent;
						}
						.buy{
					    width: 108px;
					    height: 38px;
					    line-height: 38px;
					    text-align: center;
					    border: 1px solid #fc4984;
					    font-size: 16px;
					    background-color: transparent;
					    :focus{
					    	outline: none;
					    }
						}
						button{
							outline: none;
						}
						.timeout{
							color: #fff;
					    border: 1px solid #aaa;
					    background-color: #aaa;					    
						}
					}						
				}
			}
			.cinemaDetail{
				width: 945px;
				margin-bottom: 45px;
				.title{
					padding: 48px 0 14px;
					border-bottom: 1px solid #e3e3e3;
					font-weight: 400;
					color: #666;
					font-size: 18px;
				}
				.intro{
					margin: 15px 0 25px;
					line-height: 26px;
					color: #000;
				}
				.serviceList{
					overflow: hidden;
					.list{
						width: 1000px;	
					}
					li{
						float: left;
				    width: 477px;
				    height: 24px;
				    margin: 0 3px 2px 0;
				    padding: 19px 0 19px 20px;
				    font-size: 14px;
				    line-height: 24px;
				    color: #000;
				    background-color: #fafafa;
				    span{
				    	float: left;
				    }
				    .service-8{
							display: block;
		    			background-position: 0 -64px;
						}
				    .service-5{					
    					background-position: 0 -88px;
						}
						.service-3{							
		    			background-position: 0 -43px;
						}
						.service-2{						
		    			background-position: 0 -21px;
						}
						.service-1{						
		    			background-position: 0 2px;
						}
					}
					.name{
						width: 64px;
				    margin-right: 15px;
				    padding-left: 30px;
				    border-right: 1px solid #dfdfdf;
				    background: url(~img/feature.png) no-repeat 0 2px transparent;
				    background-size: 22px;
					}
					.des{
						overflow: hidden;
				    width: 329px;
				    white-space: nowrap;
				    text-overflow: ellipsis;
					}
				}
			}
		}		
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import WillList from '@/views/willList/willList' 
	import CinemaComment from '@/views/customerComment/cinemaComment'
	import jq from 'jquery'
	import GoTop from '@/views/goTop/goTop'
	import util from '@/common/util'
	import {findCinemaById, QueryPieceMovieByIds, QuerySession} from '@/api/api'
	export default{
		data() {
			return {
				commentType: 'cinema',
				cinemaId: '',
				movieId: '',
				scrollEle: null,
				scrollFlag: false,  // 为了让子组件获得异步数据
				fullPath: '',
				flag: true,
				active: true,
				active1: false,
				active2: false,
				fullPath: '',
				movieData: [],
				inx: 0,
				wth: '',
				total: 0,
				len: 1,
				index: 1,
				date: [],
				dateIndex: 0,
				cinemaData: {},
				mid: 1,
				pieceTime: '',
				sessionData: [],
				stopBuyTime: '',
				timeOut: false,
				pieceTime0: '',
				date0: '',
				cDetail: [],
				icon: []
			}
		},

		methods: {

			/**
			 * 路由变化
			 * [routeChange description]
			 * @return {[type]} [description]
			 */
			routeChange (){
				/*if(!this.$route.query.id){	
					setTimeout(() => {
						this.$router.push({path: '/cinemaDetail?id=1'});
					},200);								
				}*/

				console.log('change');
				// 重置数据				
				this.movieId = '';			
				this.flag = true;
				this.active = true;
				this.active1 = false;
				this.active2 = false;				
				this.movieData = [];
				this.inx = 0;
				this.wth = '';
				this.total = 0;
				this.len = 1;
				this.index = 1;
				this.date = [];
				this.dateIndex = 0;
				this.cinemaData = {};
				this.mid = 1;
				this.pieceTime = '';
				this.sessionData = [];
				this.stopBuyTime = '';
				this.timeOut = false;
				this.pieceTime0 = '';
				this.date0 = '';
				this.cDetail = [];
				this.icon = [];

				this.cinemaId = this.$route.query.id;				
				this.getMovieData();
				this.getCinemaData();	
			},

			/**
			 * 
			 * 锚链接跳转
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			go(index) {	
				var url = this.fullPath;
				console.log('u',url);							
				if(index == 1){				
					this.active = true;	
					this.active1 = false;	
					this.active2 = false;						
					this.$refs.main.wrap.scrollTop = this.$refs.cinemaMovieList.offsetTop;			
				}else if(index == 2){
					this.active = false;	
					this.active1 = true;	
					this.active2 = false;			
					this.$refs.main.wrap.scrollTop = this.$refs.dateList.offsetTop;	
				}else{
					this.active = false;	
					this.active1 = false;
					this.active2 = true;					
					this.$refs.main.wrap.scrollTop = this.$refs.cinemaComment.$el.offsetTop;
				}			
			},

			/**
			 * 获取电影信息
			 * [getMovieData description]
			 * @return {[type]} [description]
			 */
			getMovieData() {
				/*var _this = this;				
				let params = new URLSearchParams();
				params.append('pageNum',0);
				params.append('pageSize',0);
				this.axios.post('http://localhost:8080/test/queryhotmovie',params).then((res) => {
					this.movieData = res.data.data;	
					this.len = _this.movieData.length;
					this.total = Math.ceil(this.len / 5);
				})*/
				let params = new URLSearchParams();
				params.append("cid", this.$route.query.id);
				params.append("mid", "");
				this.axios.post("http://localhost:8080/test/querypiece",params).then((res) => {
					console.log('date1',res);
					if(res.data.data.length != 0){
						this.mid = res.data.data[0].mid;
						/*if(this.$route.query.movieId){
							this.mid = this.$route.query.movieId;							
						}else{
							this.mid = res.data.data[0].mid;
						}		*/				
					}					
					this.getDate();
					let ids = [];
					res.data.data.forEach((val,index) => {
						ids.push(val.mid);
					})
					if(res.data.data.length == 1){
						ids =ids.toString();
					}else if(res.data.data.length > 1){
						ids = ids.toString().split(',').join(',');
					}	
					let params = new URLSearchParams();
					params.append("ids",ids);
					QueryPieceMovieByIds(params).then((res) => {
						console.log('mm',res);
						this.movieData = res.data.data;

						if(this.movieId != ''){
							this.movieData.forEach((val,index) => {
								if(val.id == this.movieId){
									this.inx = index;
								}
							})
						}
						this.len = this.movieData.length;
						this.total = Math.ceil(this.len / 5);
					})

					if(res.data.data.length != 0){
						this.pieceTime = res.data.data[0].pieceTime;
					}	
					//this.getSession();
				});
			},

			/**
			 * [getCinemaData description] 获取影院信息
			 * @return {[type]} [description]
			 */
			getCinemaData() {
				let params = new URLSearchParams();
				params.append("id", this.$route.query.id);
				findCinemaById(params).then((res) => {					
					this.cinemaData = res.data.data;
					this.stopBuyTime = this.cinemaData.desc;
					this.cDetail = res.data.data.detail.split('|');
					this.cDetail.forEach((val,index) => {
						if(val.split("->")[0] == '儿童票'){
							this.icon.push('5');
						}else if(val.split("->")[0] == '3D眼镜'){
							this.icon.push('3');
						}else if(val.split("->")[0] == '停车'){
							this.icon.push('2');
						}else if(val.split("->")[0] == 'IMAX'){
							this.icon.push('1');
						}else if(val.split("->")[0] == '情侣座'){
							this.icon.push('8');
						}
					})
					console.log('aa',this.cinemaData);
					console.log('ttt',this.stopBuyTime.replace(/[^0-9]/ig,''));
			
				})
			},

			/**
			 * [getDate description] 获取排片日期
			 * @return {[type]} [description]
			 */
			getDate() {
				let params = new URLSearchParams();
				params.append("cid", this.$route.query.id);
				params.append("mid", this.mid);
				console.log('mid',this.mid);
				this.axios.post("http://localhost:8080/test/querypiece",params).then((res) => {
					console.log('date',res);
					this.date = res.data.data;
					if(res.data.data.length != 0){						
						this.pieceTime = res.data.data[0].pieceTime;	
						this.pieceTime0 = util.formatDate.format(new Date(),"yyyy-MM-dd");
						this.date0 = res.data.data[0].pieceTime;
						this.getSession();
					}					
					//this.getSession();				
				})
			},

			/**
			 * [getSession description] 获取场次信息
			 * @return {[type]} [description]
			 */
			getSession() {
				let params = new URLSearchParams();
				params.append("cid",this.$route.query.id);
				params.append("mid",this.mid);
				params.append("pieceTime", this.pieceTime);
				console.log("mmid",this.mid);
				console.log('id', this.$route.query.id);
				console.log("pt",this.pieceTime);
				QuerySession(params).then((res) => {
					console.log('session',res);
					this.sessionData = res.data.data;
					if(this.sessionData.length == 0){
						// 如果没有场次 
					}
					this.sessionData.forEach((val,index) => {
						if(val.type == 'IMAX'){							
							val.type = 'IMAX 3D';
						}
					})				
				})
			},

			/**
			 * 点击改变边框颜色
			 * [select description]
			 * @return {[type]} [description]
			 */
			select(index, mid) {
				this.inx = index;	
				this.mid = mid;				
				console.log('mid',this.mid);
				this.getDate();			
			},

			/**
			 * 点击不同时间
			 * [selectDate description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			selectDate(index,$event) {
				this.dateIndex = index;
				console.log('$event',$event.target.getAttribute('data-time'));		
				this.pieceTime = 	$event.target.getAttribute('data-time');
				//console.log('this', this.pieceTime);
				this.date0 = this.pieceTime;
				this.getSession();
			},

			/**
			 * 前一页
			 * [prevGo description]
			 * @return {[type]} [description]
			 */
			prevGo() {
				this.index--;	
				// 如果到了最前面				
				if(this.index < 1){
					// 到最后去
					this.index = this.total;
					if(this.len % 5 != 0){
						var a = (-((this.index - 2) * 5 + this.len % 5) * 162)+ 'px';
						console.log(a);
						//jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
						console.log('q',this.$refs.slider.style);
						this.$refs.slider.style.transform = "translate3d("+a+",0,0)";
					}else{
						// 当是最后一页 并且是刚好 满的时候
						a = (-(this.index -1) * 864) + 'px';
						console.log(a);
						jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
					}						
				}else{
					var a = (-(this.index -1) * 800) + 'px';
					console.log(a);
					jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
				}	
			},

			/**
			 * 后一页
			 * [nextGo description]
			 * @return {[type]} [description]
			 */
			nextGo() {
				this.index++;
				console.log(this.total)
				// 如果到了末尾 移到第一个去
				if(this.index > this.total){
					this.index = 1;
					//jq("#slider").css({'transform':"translate3d(0,0,0)"});	
					this.$refs.slider.style.transform = "translate3d(0,0,0)";
				}else if(this.index == this.total){
					// 当是最后一页 并且不是刚好 满的时候
					if(this.len % 5 != 0){
						var a = (-((this.index - 2) * 5 + this.len % 5) * 162)+ 'px';
						console.log(a);
						//jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
						this.$refs.slider.style.transform = "translate3d("+a+",0,0)";	
					}else{
						// 当是最后一页 并且是刚好 满的时候
						a = (-(this.index -1) * 864) + 'px';
						//jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
						this.$refs.slider.style.transform = "translate3d("+a+",0,0)";
					}									
				}else{
					// 不是末尾的时候
					var a = (-(this.index -1) * 800) + 'px';
					console.log('r',a);
					//jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
					this.$refs.slider.style.transform = "translate3d("+a+",0,0)";
				}
			},

			hashChange() {
				window.location.reload();		
			},

			/**
			 * [goSeat description] 跳转到选座页面
			 * @return {[type]} [description]
			 */
			goSeat(mid,cid,id,time,e) {
				//this.hashChange();
				this.$router.push({path: '/buy/seat?movieId='+mid+'&cinemaId='+cid+'&seqNo='+id+'&date='+time
			});				
			}
		},

		mounted() {			
			this.scrollEle = this.$refs.main.wrap;			
			this.scrollFlag = true; // 设置这个标志是为了 让子组件 能正确获取数据
			this.routeChange();
			console.log('full',this.fullPath);
			this.fullPath = this.$route.fullPath.split('#')[0];
			this.getMovieData();
			this.getCinemaData();			
			//this.getDate();		
			//this.getSession();
			//url变化监听器  
			/*if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {  
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
			}	*/

			for(let i = 0; i < jq(".link").length; i++){
				console.log('ha',jq(".link").eq(i).attr("href"));
				if(jq(".link").eq(i).attr("href") == "#/cinema"){
					jq(".link").eq(i).addClass("active");
				}
			}	
			
		},

		components:{
			HeaderBar,
			WillList,
			CinemaComment,
			GoTop
		},

		watch: {
			// 如果路由变化  重新执行
			//'$route': 'routeChange'
			'$route.query.id': 'routeChange'
		},

		created() {			
			/*if(!this.$route.query.id){				
				this.$router.push({path: '/cinemaDetail?id=1'});	
				window.location.reload();			
			}*/
			this.cinemaId = this.$route.query.id;			
			if(this.$route.query.movieId){
				this.movieId = this.$route.query.movieId;			
			}			
		}
		
	}
</script>