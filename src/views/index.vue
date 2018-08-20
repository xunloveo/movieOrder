<template>
	<el-scrollbar class="main">		
		<header-bar></header-bar>
		<div class="mainContent w">	
			<el-carousel :interval="4000" type="card" height="400px">
		    <el-carousel-item v-for="(item,index) in picInf" :key="item.id">
		      <h3><router-link :to="{path:'/moviedetail',query:{id: item.id}}"><img :src="item.pic" alt=""></router-link></h3>
		    </el-carousel-item>
		  </el-carousel>
			<el-container>
				<el-main class='contentLeft'>
					<div class='hotPlayingList'>
						<h3 class='subtitle'>正在热映<span class='pager f14'>{{hotIndex}}/{{hotTotal}}</span></h3>
						<div class='movieList flexSlider'>
							<div class="flex-viewport" style="overflow: hidden; position: relative; height: 297px;" v-loading="loading">
								<ul class="sliders clearfix" style="width: 3800%" id='slider'>
									<li class="item" v-for='item in hotData'>
										<router-link :to="{path:'/moviedetail',query:{id: item.id}}">
											<div class="img">												
												<img :src="'http://localhost:8080/test/img/' + item.pic" alt="">
											</div>
										</router-link>
										<p class='text f14'>{{item.name}}</p>
										<p>
											<span class='rate'>{{item.rate}}</span>
											<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='buy'>选座购票</router-link>
										</p>
									</li>									
								</ul>
							</div>
							<ul class="flex-direction-nav" v-show='hotLen > 6'>
								<li class="flex-nav-prev">
									<a class="flex-prev" @click='prevGo'></a>
								</li>
								<li class="flex-nav-next">
									<a class="flex-next" @click='nextGo'></a>
								</li>
							</ul>											
						</div>
					</div>
					<div class="willPlayingList">
						<h3 class='subtitle'>即将上映<span class='pager f14'>{{willIndex}}/{{willTotal}}</span></h3>
						<div class='movieList flexSlider'>
							<div class="flex-viewport" style="overflow: hidden; position: relative; height: 297px;" v-loading="loading1">
								<ul class="sliders clearfix" style="width: 3800%" id='slider1'>
									<li class="item" v-for='item in willData'>
										<router-link :to="{path:'/moviedetail',query:{id: item.id}}">
											<div class="img">
												<!-- <img src="http://localhost:8080/test/img/xqdz.jpg" alt=""> -->
												<img :src="'http://localhost:8080/test/img/' + item.pic" alt="">
											</div>
										</router-link>
										<p class='text f14'>{{item.name}}</p>
										<p>										
											<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='detail'>查看详情</router-link>
										</p>
									</li>									
								</ul>
							</div>
							<ul class="flex-direction-nav" v-show='willLen > 6'>
								<li class="flex-nav-prev">
									<a class="flex-prev" @click='prevGo1'></a>
								</li>
								<li class="flex-nav-next">
									<a class="flex-next" @click='nextGo1'></a>
								</li>
							</ul>											
						</div>
					</div>
				</el-main>
				<el-aside style="width: 225px" class='contentRight'>
					<div class="hotCinemaList">
						<h3 class='subtitle'>热门影院<router-link to="/cinema" class='allCinema'>全部&nbsp;>></router-link></h3>
						<div class="cinemaList">
							<ul>
								<li v-for='(item,index) in hotCinemaData'>
									<h4><router-link :to="{path:'/cinemadetail',query:{id: item.id}}" class='title f14'>{{item.name}}</router-link></h4>
									<p class='addr font-shadow'>{{item.address}}</p>
									<p class='font-shadow'>
										<span class='price'>{{item.lowPrice}}</span>起
									</p>
								</li>													
							</ul>
						</div>
					</div>
					<rank-list></rank-list>
				</el-aside>
			</el-container>			
		</div>		
	</el-scrollbar>	
</template>

<style lang="scss">
	.main{
		width: 100%;
		height: 100vh;
		.el-scrollbar__wrap{
			overflow-x: auto;
		}		
	}
	.mainContent{
		.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 300px;
	    margin: 0;	    
	    img{
	    	width:  100%;
	    	height: 400px;
	    }
	  }

	  .el-carousel__item:nth-child(2n){
			background-color: #99a9bf;
	  }
	  .el-carousel__item:nth-child(2n + 1){
			background-color: #99a9bf;
	  }
	  
	  /* .el-carousel__item:nth-child(4n) {
	    background-color: #99a9bf;
	    background: url(~img/test.jpg)  center no-repeat ;	    
	    background-size: cover;
	  }
	  
	  .el-carousel__item:nth-child(4n+1) {
	    background-color: #d3dce6;
	    background: url(~img/tyjj1.jpg)  center no-repeat ;
	    background-size: cover;
	    	}
	  
	    	.el-carousel__item:nth-child(4n+2){
	    		background-color: #d3dce6;
	  			background: url(~img/lm3.jpg)  center no-repeat ;
	    background-size: cover;
	    	}
	    	.el-carousel__item:nth-child(4n+3){
	    		background-color: #d3dce6;
	  			background: url(~img/lm3.jpg)  center no-repeat ;
	    background-size: cover;
	    	} */

		.subtitle{
			font-size: 20px;
			line-height: 30px;
			color: #333;
			padding-left: 15px;
			.pager{
				float: right;
				color: #666;
				margin-right: 15px;
			}
		}
		.contentLeft{
			padding: 0;
			overflow: visible;
			.hotPlayingList{
				margin: 4px 0 0 -15px;
	    	width: 982px;
			}
			.willPlayingList{
				margin: 4px 0 0 -15px;
	    	width: 982px;
	    	.detail{
	    		display: inline-block;
   				width: 68px;
   				height: 25px;
   				line-height: 25px;
   				border: 1px solid #e3e3e3;
   				border-radius: 2px;
   				text-align: center;
   				color: #333;
   				font-size: 12px;
	    	}
			}
			.flexSlider{
				border: 4px solid #fff;
				position: relative;
				margin-bottom: 36px;
				#slider{
					transition: all .6s ease-in-out;
				}		
				#slider1{
					transition: all .6s ease-in-out;
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
						right: 0;
					}

				}
			}
			.sliders{
				.item{
					width: 140px;				
					float: left;
					padding: 10px;
					border: 1px solid #fff;
					list-style: none;
					&:hover{
						border: 1px solid #ff318c;
					}
					.img{
						width: 100%;
	    			height: 206px;
	    			overflow: hidden;
	    			img{
	    				display: block;
	    				width: 100%;
	    				position: relative;
	    				cursor: pointer;
	    				height: 206px;
	    			}    			
					}
					.text{
	    			height: 16px;
	    			line-height: 16px;
	    			overflow: hidden;
	    			text-overflow: ellipsis;
	    			white-space: nowrap;
	    			margin: 13px 0;
	    		}
	    		.rate{
						float: right;
						color: #fd8e51;
						padding-top: 6px;
						padding-left: 5px;
						font-size: 12px;    		
					}
					.buy{
						display: inline-block;
	    			width: 68px;
	    			height: 25px;
	    			line-height: 25px;
	    			border: 1px solid #ff318c;
	    			color: #ff318c;
	    			border-radius: 2px;
	    			text-align: center;
	    			font-size: 12px;
	    			&:hover{
	    				background-color: #ff318c;
	    				color: #fff;
	    			}
					}
				}
			}
		}
		.contentRight{
			margin-top: 4px;
			.subtitle{
				padding-bottom: 13px;
				padding-left: 0;
				font-weight: 400;
			}
			.allCinema{
				font-size: 12px;
				float: right;				
				color: #666;
			}
			.hotCinemaList{
				margin-bottom: 37px;
			}
			.cinemaList{
				border-top: 1px solid #f1f1f1;
				h4{
					margin: 15px 0 14px;
					font-weight: 400;
    			height: 16px;
    			line-height: 16px;
    			overflow: hidden;
				}
				.title{
					color: #333;					
				}
				p{
					height: 14px;
    			line-height: 14px;
    			overflow: hidden;
    			text-overflow: ellipsis;
    			white-space: nowrap;
				}
				.addr{
					margin-bottom: 14px;	
					font-size: 12px;				
				}
				.price{
					font-size: 16px;
    			color: #ff318c;
    			padding-right: 5px;
				}
			}
		}
	}	
</style>

<script>
	import HeaderBar from "@/views/header"
	import RankList from '@/views/RankList/rankList'	
	import jq from 'jquery'

	export default{		
		data() {			
			return{
				picInf: [
					{	
						id: 32,
						/*pic: 'http://localhost:8080/test/img/neg.jpg'*/
						pic: 'static/img/jjzd.jpg'
					},
					{
						id: 33,
						/*pic: 'http://localhost:8080/test/img/trjta.jpg'*/
						pic: 'static/img/csktj.jpg'
					},
					{
						id: 27,
						/*pic: 'http://localhost:8080/test/img/hhxd.jpg'*/
						pic: 'static/img/lm3.jpg'
					},
					{	
						id: 37,
						/*pic: 'http://localhost:8080/test/img/zyj.jpg'*/
						pic: 'static/img/mysd.jpg'
					},
				],
				hotData: [],
				willData: [],
				loading: true,
				loading1: true,
				hotLen: 0,
				hotIndex: 1,
				hotTotal: 1	,
				willLen: 0,
				willIndex: 1,
				willTotal: 1,
				hotCinemaData: []						
			}
		},

		components:{
			HeaderBar,
			RankList
		},

		methods: {

			/**
			 * [getHotData description] 获取正在热映的电影
			 * @return {[type]} [description]
			 */
			getHotDataList() {				
				let params = new URLSearchParams();
				params.append('pageNum',0);
				params.append('pageSize',0);
				this.axios.post('http://localhost:8080/test/queryhotmovie',params).then((res) => {
					this.hotData = res.data.data;
					this.loading = false;
					this.$nextTick(function(){
						this.hotLen = jq('#slider').children().length;
						this.hotTotal = Math.ceil(this.hotLen / 6);							
					})
				})
			},

			/**
			 * 获取即将上映的电影
			 * @return {[type]} [description]
			 */
			getWillDataList() {				
				let params = new URLSearchParams();
				var uid = '';
				if(this.userInfo){
					uid = this.userInfo.id;
				}
				params.append('pageNum',1);
				params.append('pageSize',10);
				params.append('uid', uid);
				this.axios.post('http://localhost:8080/test/querywillmovie',params).then((res) => {
					this.willData = res.data.data;	
					console.log('rr',res);
					this.loading1 = false;	
					this.$nextTick(function(){							
						this.willLen = jq('#slider1').children().length;
						this.willTotal = Math.ceil(this.willLen / 6);
					})			
				})
			},

			getHotCinema() {
				let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',4);
				this.axios.post('http://localhost:8080/test/querycinemaone',params).then((res) => {
					this.hotCinemaData = res.data.data;
					console.log('s',this.hotCinemaData)
				})
			},			

			// 向前移
			prevGo() {					
				this.hotIndex--;	
				// 如果到了最前面				
				if(this.hotIndex < 1){
					// 到最后去
					this.hotIndex = this.hotTotal;
					if(this.hotLen % 6 != 0){
						var a = (-((this.hotIndex - 2) * 6 + this.hotLen % 6) * 162)+ 'px';						
						jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
					}else{
						// 当是最后一页 并且是刚好 满的时候
						a = (-(this.hotIndex -1) * 972) + 'px';						
						jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
					}						
				}else{
					var a = (-(this.hotIndex -1) * 972) + 'px';					
					jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
				}	
			},

			// 向后移
			nextGo() {
				this.hotIndex++;
				// 如果到了末尾 移到第一个去
				if(this.hotIndex > this.hotTotal){
					this.hotIndex = 1;
					jq("#slider").css({'transform':"translate3d(0,0,0)"});	
				}else if(this.hotIndex == this.hotTotal){
					// 当是最后一页 并且不是刚好 满的时候
					if(this.hotLen % 6 != 0){
						var a = (-((this.hotIndex - 2) * 6 + this.hotLen % 6) * 162)+ 'px';						
						jq("#slider").css({'transform':"translate3d("+a+",0,0)"});	
					}else{
						// 当是最后一页 并且是刚好 满的时候
						a = (-(this.hotIndex -1) * 972) + 'px';
						jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
					}									
				}else{
					// 不是末尾的时候
					var a = (-(this.hotIndex -1) * 972) + 'px';
					jq("#slider").css({'transform':"translate3d("+a+",0,0)"});
				}
			},

			// 向前移
			prevGo1() {
				console.log(this.willLen);	
				this.willIndex--;	
				// 如果到了最前面				
				if(this.willIndex < 1){
					// 到最后去
					this.willIndex = this.willTotal;
					if(this.willLen % 6 != 0){
						var a = (-((this.willIndex - 2) * 6 + this.willLen % 6) * 162)+ 'px';
						console.log(a);
						jq("#slider1").css({'transform':"translate3d("+a+",0,0)"});	
					}else{
						// 当是最后一页 并且是刚好 满的时候
						a = (-(this.willIndex -1) * 972) + 'px';
						console.log(a);
						jq("#slider1").css({'transform':"translate3d("+a+",0,0)"});
					}						
				}else{
					var a = (-(this.willIndex -1) * 972) + 'px';
					console.log(a);
					jq("#slider1").css({'transform':"translate3d("+a+",0,0)"});
				}	
			},

			// 向后移
			nextGo1() {
				this.willIndex++;
				// 如果到了末尾 移到第一个去
				if(this.willIndex > this.willTotal){
					this.willIndex = 1;
					jq("#slider1").css({'transform':"translate3d(0,0,0)"});	
				}else if(this.willIndex == this.willTotal){
					// 当是最后一页 并且不是刚好 满的时候
					if(this.willLen % 6 != 0){
						var a = (-((this.willIndex - 2) * 6 + this.willLen % 6) * 162)+ 'px';
						console.log(a);
						jq("#slider1").css({'transform':"translate3d("+a+",0,0)"});	
					}else{
						// 当是最后一页 并且是刚好 满的时候
						a = (-(this.willIndex -1) * 972) + 'px';
						jq("#slider1").css({'transform':"translate3d("+a+",0,0)"});
					}									
				}else{
					// 不是末尾的时候
					var a = (-(this.willIndex -1) * 972) + 'px';
					jq("#slider1").css({'transform':"translate3d("+a+",0,0)"});
				}
			}
		},		

		mounted() {
			this.getHotDataList();
			this.getWillDataList();
			this.getHotCinema();
			/*this.hotLen = jq('#slider').children().length;
			this.hotTotal = Math.ceil(this.hotLen / 6);
			this.willLen = jq('#slider1').children().length;
			this.willTotal = Math.ceil(this.willLen / 6);*/			
		},

		created() {
			
		}
		
	}
</script>