<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar ref="header"></header-bar>
		<div class="movieDetailContent w">
			<div class='contentTop'>
				<div class="movieDetailIntro">
					<div class="introBar clearfix">
						<div class="fl poster">
							<img :src="imgSrc" alt="">
						</div>
						<div class="info fl">
							<h4 class='subtitle'>{{movieData.name}}</h4>
							<div class="record clearfix">
								<p class="star fl">
									<span class="star-in fl" :style="'width:'+ movieData.rate * 10 +'%'"></span>
								</p>
								<span class='nuomi-orange f16 f1 num'>{{movieData.rate}}</span>
							</div>
							<div class="content">
								<p class="des">{{movieData.shortDesc}}</p>
								<p>导演：{{movieData.director}} &nbsp;&nbsp;&nbsp;&nbsp;主演：{{movieData.mainActor}}</p>
								<p>{{movieData.region}} | {{movieData.time}}分钟 &nbsp;&nbsp;&nbsp;&nbsp;{{movieData.screenTime}} 上映</p>
								<p class='intro'>{{movieData.detailDesc}}</p>	
								<span class='more-btn' @click='dialogVisible = true'></span>							
							</div>
							<p class="collect" @click='wantSee(movieData.id)'>
								<em  :class="wantedText == '已标记想看' ? 'isWanted' : ''">{{wantedText}}</em>
							</p>
						</div>
					</div>
				</div>
			</div>
			<el-container>
				<el-main class='pageCinema' id='#pageCinema' ref='page'>
					<div class="cinemaContent">
						<div id="cinemaFilter" ref='cinemaFilter'>
							<h3 class='subtitle'>选座购票</h3>
							<div class="container">
								<div class="date clearfix">
									<div class="name fl" v-show='date.length != 0'>日期</div>
									<div class="list fl">
										<!-- <el-menu mode="horizontal" :default-active="activeIndex" @select='handleSelect'>
											<el-menu-item index='1'><span>周四1月4日</span></el-menu-item>
											<el-menu-item index='2'><span>周五1月25日</span></el-menu-item>
											
											<el-menu-item :index="item.id+''" v-for='(item,index) in time' :key='item.id'><span>{{item.pieceTime.split("-")[1]}}月{{item.pieceTime.split("-")[2]}}日</span></el-menu-item>											
										</el-menu> -->
										<span class="text" v-for='(item,index) in date' @click='selectDate(index,$event)' :class="{'active': dateIndex === index}" :data-time='item.pieceTime'>{{item.pieceTime.split('-')[1]}}月{{item.pieceTime.split('-')[2]}}日</span>
									</div>
									<div class="list fl" v-show='date.length == 0' style='text-align: center; font-size: 12px;'>
										暂无影片排期
									</div>
								</div>
							</div>
						</div>
						<div class="cinemaList">
							<ul>
								<li class='clearfix' v-for='item in cinemaData' :key='item.id'>
									<div class="info fl">
										<p class='title'><router-link :to="{path:'/cinemadetail',query:{id: item.cid}}" class='name'>{{ item.cname }}</router-link></p>
										<p class='addr clearfix'><span class='fl text'>{{ item.address }}</span></p>
									</div>
									<div class="btns fr">
										<p class='clearfix'>
											<router-link :to="{path:'/cinemadetail',query:{id: item.cid,movieId: movieId}}"  class='btn fr'>选座购票</router-link>
										</p>
									</div>
									<div class="price fr">
										<em class="dollar">¥</em>
										<em class="num">{{ item.lowPrice }}</em>
										起
									</div>
								</li>
							</ul>	
							<div class="more" @click='searchMore' v-show='more'>点击查看更多影院&nbsp;&nbsp;></div>
						</div>
						<!-- <div class="pageBlock">
							<el-pagination
								v-show="cinemaData.length > 5"
							  small
							  background
							  layout="prev, pager, next"
							  :pageSize='5'
							  :total="10">
							</el-pagination>
						</div> -->
					</div>
					<!-- <some-info :movieid='movieId'></some-info> -->
					<movie-comment v-bind:comment="commentType" :movieid='movieId'></movie-comment>
					
				</el-main>
				<el-aside style="width: 225px" class='contentRight'>
					<rank-list></rank-list>
				</el-aside>
			</el-container>
			
			
		</div>
		
		<go-top v-bind:scrollRoot='scrollEle' v-if='scrollFlag'></go-top>
		<!-- 电影详情对话框 -->
		<el-dialog :visible.sync='dialogVisible' width='35%'>
			<div class="infoDialog">
				<h4 class='subtitle clearfix'>
					<div class='fl'>{{movieData.name}}</div>
					<div class='record fl clearfix'>
						<p class="star fl">
							<span class="star-in fl" :style="'width:'+ movieData.rate * 10 +'%'"></span>
						</p>
						<span class="nuomi-orange f16 fl num">{{movieData.rate}}</span>
					</div>				
				</h4>
				<div class="content">
					<p class="des">{{movieData.shortDesc}}</p>
					<p><span>导演：</span> {{movieData.director}}</p>
					<p><span>主演：</span> {{movieData.mainActor}}</p>
					<p><span>剧情：</span> {{movieData.detailDesc}}</p>
					<p><span>地区：</span> {{movieData.region}}</p>
					<p><span>片长：</span> {{movieData.time}}分钟</p>
					<p><span>上映时间：</span> {{movieData.screenTime}}上映</p>
				</div>
				<!-- <a class="choseCinema" @click='goBuy'>选座购票</a> -->
				<router-link class="choseCinema" @click.native='goBuy' :to="fullPath + '#cinemaFilter'">选座购票</router-link>
			</div>
		</el-dialog>
	</el-scrollbar>

	
</template>

<style lang='scss' scoped>
	.movieDetailContent{
		.contentTop{
			background: url(~img/movie-bg.jpg) no-repeat center top;
			background-size: 100% auto;
			.movieDetailIntro{
				background: rgba(0,0,0,.3);
				.introBar{
					padding: 20px;
					margin-left: 183px;
					.poster{
						img{
							display: block;
					    width: 183px;
					    height: 252px;
					    margin-left: -183px;
						}
					}
					.info{
						width: 897px;
						padding: 0 70px 0 18px;
	    			color: #fff;
						.subtitle{
							font-size: 20px;
							font-weight: normal;
							letter-spacing: 3px;
						}
						.record{
							height: 20px;
    					margin: 0 0 13px 4px;
    					.star{
    						width: 94px;
						    height: 16px;
						    margin-right: 10px;
						    background: url(~img/icons_star.png) repeat-x left bottom transparent;
						    background-position: 0 -18px;
    					}
    					.star-in{
    						height: 100%;
    						background: url(~img/icons_star.png) repeat-x left top transparent;
    						background-position: 0 3px;
    					}
						}
						.content{		
							position: relative;				
							.des{
								margin-bottom: 18px;
							}
							p{
								overflow: hidden;
						    height: 18px;
						    margin-bottom: 13px;
						    font-size: 14px;
						    white-space: nowrap;
						    text-overflow: ellipsis;
							}
							.more-btn{
								position: absolute;
						    right: -25px;
						    bottom: 1px;
						    width: 17px;
						    height: 10px;
						    background: url(~img/arrow.png) no-repeat center top transparent;
						    cursor: pointer;
							}
						}
						.collect{
							position: relative;
					    width: 164px;
					    height: 30px;
					    border: 1px solid #fff;
					    border: 1px solid rgba(255,255,255,.5);
					    text-align: center;
					    border-radius: 2px;
					    background-color: #fff;
					    background-color: rgba(255,255,255,.2);
					    cursor: pointer;
					    line-height: 30px;
					    em{
					    	height: 30px;
						    padding-left: 24px;
						    line-height: 30px;
						    background: url(~img/icons_star.png) no-repeat left top transparent;
						    background-position: 0 -44px;
						    font-size: 12px;
						    font-style: normal;
						    &.isWanted{
						    	background-position: 0 -62px;
						    }
					    }
						}
					}
				}
			}
		}		
		.pageCinema{
			padding: 0;
			padding-top: 50px;
			.cinemaContent{
				width: 945px;
				#cinemaFilter{
					margin-bottom: 30px;
				}
				.subtitle{
					font-size: 20px;
					color: #333;
					font-weight: 400;
				}
				.container{
					margin-top: 15px;
			    padding: 20px 20px 13px 0;
			    border: 1px solid #f3f3f3;
			    .date{
			    	margin-left: 44px;
			    	.name{
			    		width: 44px;
					    margin-left: -44px;
					    padding-left: 25px;
					    font-size: 14px;
					    text-align: left;
					    color: #333;
			    	}
			    	.list{
			    		position: relative;
    					width: 845px;
    					.el-menu{
    						overflow: hidden;
    						max-height: 52px;
    						background-color: transparent;
    						.el-menu-item{
    							overflow: hidden;
							    width: 87px;
							    height: 26px;
							    padding-bottom: 9px;
    							line-height: 17px;
    							padding-left: 0;
							    padding-right: 10px;
							    white-space: nowrap;
							    text-overflow: ellipsis;
							    color: #333;
							    border-bottom: none;
							    &:hover{
							    	background-color: transparent;
							    }
							    span{
							    	display: inline-block;
								    height: 17px;
								    padding: 0 4px;
								    font-size: 12px;
								    line-height: 17px;
								    text-align: center;
							    }
    						}
    					}
    					.el-menu--horizontal{
    						border-bottom: none;
    						.el-menu-item.is-active{
    							border-bottom: none;
    							span{
    								color: #fff;
    								background-color: #ff318c;
    							}
    						}
    					}
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
			    }
				}
				.cinemaList{
					width: 945px;
					li{
						padding: 30px 0;
    				border-bottom: 1px solid #f3f3f3;
    				.info{
    					width: 402px;
    					padding-right: 10px;
    					.name{
    						height: 21px;
    						line-height: 21px;
    						cursor: pointer;
    						padding-right: 8px;
    						font-size: 16px;
    						color: #333;
    					}
    					.addr{
    						position: relative;
						    display: inline-block;
						    overflow: hidden;
						    height: 14px;
						    margin: 12px 0 18px;
						    font-size: 14px;
						    line-height: 14px;
						    text-overflow: ellipsis;
						    color: #666;
						    .text{
						    	overflow: hidden;
							    max-width: 378px;
							    height: 14px;
							    white-space: nowrap;
							    text-overflow: ellipsis;
						    }
    					}
    				}
    				.btns{
    				  width: 234px;
    					padding-right: 10px;
    					p{
    						margin-top: 32px;
    						position: relative;
    						margin-bottom: 18px;
    					}
    					.btn{
    						display: block;
						    width: 87px;
						    height: 25px;
						    line-height: 25px;
						    text-align: center;
						    text-decoration: none;
						    color: #fff;
						    background-color: #fd8e51;
						    font-size: 12px;
    					}
    				}
    				.price{
    					width: 88px;
    					margin-top: 28px;
    					font-size: 12px;
    					.dollar{
    						font-size: 18px;
						    font-weight: 400;
						    font-style: normal;
						    color: #fd8e51;
    					}
    					.num{
    						padding: 0 4px 0 0;
						    font-size: 20px;
						    font-weight: 400;
						    font-style: normal;
						    color: #fd8e51;
    					}
    				}
					}
				}
				.pageBlock{
					text-align: center;
					margin: 20px 0;
				}
				.more{
						height: 34px;
				    border: 1px solid #f3f3f3;
				    border-left: 0;
				    line-height: 34px;
				    text-align: center;
				    color: #767676;
				    background-color: #f9f9f9;
				    font-size: 13px;
					}
			}			
		}
		.contentRight{
			padding-top: 50px;
		}
	}
	.infoDialog{
		padding-bottom: 12px;
		color: #333;
		.subtitle{
			font-size: 20px;
			.record{
				padding: 2px 0 0 10px;
				height: 20px;
  			margin: 0 0 13px 4px;
  			.star{
  				width: 94px;
			    height: 16px;
			    margin-right: 10px;
			    background: url(~img/icons_star.png) repeat-x left bottom transparent;
			    background-position: 0 -18px;
			    .star-in{
						height: 100%;
						background: url(~img/icons_star.png) repeat-x left top transparent;
						background-position: 0 3px;
    			}
  			}
			}
		}
		.content{
			.des{
				margin-bottom: 18px;
			}
			p{
				margin-bottom: 13px;
				font-size: 14px;
				overflow: visible;	
				span{
					color: #999;
				}			
			}
		}
		.choseCinema{
		  display: inline-block;
	    height: 42px;
	    margin-top: 15px;
	    padding: 0 44px;
	    font-size: 18px;
	    line-height: 42px;
	    text-align: center;
	    color: #fff;
	    background-color: #ff318c;
		}
		p{
			line-height: 20px;
		}
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import RankList from '@/views/RankList/rankList' 	
	import MovieComment from '@/views/customerComment/movieComment'
	import GoTop from '@/views/goTop/goTop'
	import SomeInfo from '@/views/someInfo/someInfo'
	import {QueryPieceCinema, EditWanted} from '@/api/api'
	import jq from 'jquery'

	export default{		
		data() {			
			return {							
				dialogVisible: false,
				activeIndex: '1',
				cinemaData: [],
				date: [],
				fullPath: '',
				commentType: 'movie',
				scrollEle: null,
				scrollFlag: false,  // 为了让子组件获得异步数据
				movieData: {},
				imgSrc: '',
				pageNum: 1,
				pageSize: 1,
				more: false,
				movieId: '',
				dateIndex: 0,
				pieceTime: '',
				wantedText: '',
				userInfo: null		
			}
		},

		components:{
			HeaderBar,
			RankList,
			MovieComment,
			GoTop,
			SomeInfo
		},

		methods: {

			/**
			 * [getMovieData description] 获取电影信息
			 * @return {[type]} [description]
			 */
			getMovieData() {
				var uid = '';
				if(this.userInfo){
					uid = this.userInfo.id;
				}
				console.log('uid', uid);
				let params = new URLSearchParams();
				params.append('id',this.$route.query.id);
				params.append('uid', uid);
				console.log('mid', this.$route.query.id);
				this.axios.post('http://localhost:8080/test/findmoviebyidone',params).then((res) => {
					console.log('r',res);
					this.movieData = res.data.data;

					if(res.data.data.isWanted == 0){
						//this.movieData.isWanted = '想看';
						this.wantedText = '想看';
					}else{
						//this.movieData.isWanted = '已标记想看';
						this.wantedText = '已标记想看';
					}
					this.imgSrc = 'http://localhost:8080/test/img/' + this.movieData.pic;					
				})
			},

			/**
			 * [wantSee description] 点击想看
			 * @param  {[type]} mid [description]
			 * @return {[type]}     [description]
			 */
			wantSee(mid){
				if(this.userInfo){
					if(this.wantedText == '想看'){
						let params = new URLSearchParams();
						params.append('uid', this.userInfo.id);
						params.append('movieId', mid);
						params.append('isWanted', 1);
						EditWanted(params).then(res => {
							console.log('ed', res);
						})
						this.wantedText  = '已标记想看';										
						//this.$refs.mark.style.backgroundPosition = '3px -18px';
					}else{
						let params = new URLSearchParams();
						params.append('uid', this.userInfo.id);
						params.append('movieId', mid);
						params.append('isWanted', 0);
						EditWanted(params).then(res => {
							console.log('ed', res);
						})
						this.wantedText = '想看';						
						//this.$refs.mark[index].style.backgroundPosition = '3px 3px';
					}
				}else{
					this.$alert('你还没有登录', {
						confirmButtonText: '确定'
					})
				}
			},

			searchMore() {
				this.pageSize++;				
				let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',this.pageSize * 4);	
				params.append("mid", this.movieId);
				params.append("pieceTime", this.pieceTime);		
				/*this.axios.post('http://localhost:8080/test/querycinemaone',params).then((res) => {
					console.log('r',res);
					this.cinemaData = res.data.data;
					if(this.pageSize * 4 >= res.data.totalNum){
						this.more = false;
					}
				})*/
				QueryPieceCinema(params).then((res) => {
					console.log('more',res);
					this.cinemaData = res.data.data;
					if(this.pageSize * 4 >= res.data.totalNum){
						this.more = false;
					}else{
						this.more = true;
					}
				})
			},

			// 路由发生变化
			routeChange(){
				//this.aa = this.$route.query.id;
				// 当地址没变时 一直在那个位置
				/*if(this.$route.hash == '#cinemaFilter'){					
					this.$nextTick(function() {
						this.$refs.main.wrap.scrollTop = 422;						
					})					
				}	*/
				/*if(!this.$route.query.id){
					setTimeout(() =>{
						this.$router.push({path: '/moviedetail?id=1'});
					},200);	
				}		*/			

				this.movieId = this.$route.query.id;
				// 清空数据
				this.movieData = {};
				this.imgSrc ='';
				this.pageNum = 1;
				this.pageSize = 1;
				this.more =  false;
				this.activeIndex = '1';
				this.cinemaData = [];
				this.date = [];
				this.dateIndex = 0;
				this.pieceTime = '';
				this.wantedText = '';
				this.dialogVisible = false;

				this.getMovieData();	
				this.getTime();
			},

			/**
			 * 跳到选座购票
			 * [goBuy description]
			 * @return {[type]} [description]
			 */
			goBuy() {				
				this.dialogVisible = false;								
				this.$refs.main.wrap.scrollTop = this.$refs.page.$el.offsetTop;
			},

			/**
			 * 获取电影院信息
			 * [getCinemaList description]
			 * @return {[type]} [description]
			 */
			getCinemaList() {				
				/*let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',4);
				this.axios.post('http://localhost:8080/test/querycinemaone',params).then((res) => {
					console.log('r',res);
					this.cinemaData = res.data.data;
					if(4 >= res.data.totalNum){
						this.more = false;
					}					
				})*/
				let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',4);
				params.append("mid", this.movieId);
				params.append("pieceTime", this.pieceTime);

				QueryPieceCinema(params).then((res) => {
					console.log('rrrrr',res);
					this.cinemaData = res.data.data;
					if(4 >= res.data.totalNum){
						this.more = false;
					}else{
						this.more = true;
					}
				})

			},

			/**
			 * 获取时间
			 * [getTime description]
			 * @return {[type]} [description]
			 */
			getTime() {				
				let params = new URLSearchParams();
				params.append("cid", "");
				params.append("mid", this.$route.query.id);
				this.axios.post("http://localhost:8080/test/querypiece",params).then((res) => {
					console.log('date',res);	
					this.date = res.data.data;	
					if(this.date.length > 0){
						this.pieceTime = res.data.data[0].pieceTime;	
					}					
					this.getCinemaList();		
				})
			},			

			/**
			 * 点击不同时间
			 * [selectDate description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			selectDate(index,$event) {
				this.dateIndex = index;
				this.pieceTime = $event.target.getAttribute('data-time');	
				this.getCinemaList();		
			},

			hashChange() {
				window.location.reload();		
			}

		},

		mounted() {	
			this.getMovieData();		
			this.routeChange();				
			this.getTime();
			//this.getCinemaList();
			this.fullPath = this.$route.fullPath.split('#')[0];
			this.scrollEle = this.$refs.main.wrap;			
			this.scrollFlag = true; // 设置这个标志是为了 让子组件 能正确获取数据
			this.movieId = this.$route.query.id;

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
			} */

			
			for(let i = 0; i < jq(".link").length; i++){
				console.log('ha',jq(".link").eq(i).attr("href"));
				if(jq(".link").eq(i).attr("href") == "#/movie?type=hot"){
					jq(".link").eq(i).addClass("active");
				}
			}
		},

		watch: {
			// 如果路由变化  重新执行
			//'$route': 'routeChange'			
			'$route.query.id': 'routeChange'
		},

		created() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			this.movieId = this.$route.query.id;
			/*if(!this.$route.query.id){				
				this.$router.push({path: '/moviedetail?id=1'});	
				//window.location.reload();			
			}		*/	


		}
		
	}
</script>