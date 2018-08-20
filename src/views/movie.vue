<template>
	<el-scrollbar class="main" ref='main'>
		<header-bar></header-bar>
		<div class="movieContent w">
			<div class="movie-topnav clearfix">	
				<el-menu mode="horizontal" :default-active="activeIndex">
					<el-menu-item index='1'><router-link :to="{path:'/movie',query:{type:'hot'}}" class='item' @click="this.class='active'">热映影片</router-link></el-menu-item>
					<el-menu-item index='2'><router-link :to="{path:'/movie',query:{type:'new'}}" class='item'>即将上映</router-link></el-menu-item>	
					<el-menu-item index='3'><router-link :to="{path:'/movie',query:{type:'lib'}}" class='item'>影片库</router-link></el-menu-item>		
				</el-menu>			
										
			</div>
			<el-container>
				<!-- <el-main class='movieContentLeft' v-if="activeIndex == '1'">					
					<div class="movieList">
						<div class="movieItem" v-for='item in hotData'>
							<h6 class='time nuomi-red'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}号 {{item.week}}</h6>
							<div class="movieContent clearfix">
								<div class="movieInfo">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt=""><span class='tag tag-pre' v-show="item.btnText == '预售选座'">预售</span></router-link>
									<div class="movieDetail">
										<router-link :to="{path:'/moviedetail',query:{id: item.id}}"><p class='movieName'>{{item.name}}<span>{{item.playType}}</span></p></router-link>
										<div class="score">
											<span class="star">
												<em :style="'width: '+ item.rate / 10 * 105 +'px'"></em>
											</span>
											<span class='num nuomi-red'>{{item.rate}}</span>
										</div>
										<p class='font-shadow f16'>{{item.shortDesc}}</p>
										<ul class="info">
											<li>类型：{{item.type}}</li>
											<li>时长：{{item.time}}分钟</li>
											<li>上映时间：{{item.screenTime}}</li>
										</ul>
									</div>
								</div>
								<div class="btns fr">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='btn tg'>{{item.btnText}}</router-link>
								</div>
							</div>
							
						</div>
					</div>
					<el-pagination
						v-show="total > pageSize"					  
					  background
					  layout="prev, pager, next"
					  @current-change="handleCurrentChange"
						      	:current-page.sync="currentPage"
					  :page-size="pageSize"
					  :total="total">
					</el-pagination>
				</el-main>
				<el-main class='movieContentLeft' v-if="activeIndex == '2'">
					<div class="movieList">
						<div class="movieItem" v-for='(item,index) in willData'>
							<h6 class='time nuomi-red'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}号 {{item.week}}</h6>
							<div class="movieContent clearfix">
								<div class="movieInfo">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt=""><span class='tag tag-pre' v-show="item.btnText == '预售选座'">预售</span></router-link>
									<div class="movieDetail">
										<router-link :to="{path:'/moviedetail',query:{id:item.id}}"><p class='movieName'>{{item.name}}</p></router-link>
										<div class="score">
											<span class="star">
												<em :style="'width: '+ item.rate / 10 * 105 +'px'"></em>
											</span>
											<span class='num nuomi-red'>{{item.rate}}</span>
										</div>
										<p class='font-shadow f16'>{{item.shortDesc}}</p>
										<ul class="info">
											<li>类型：{{item.type}}</li>
											<li>时长：{{item.time}}分钟</li>
											<li>上映时间：{{item.screenTime}}</li>
										</ul>
									</div>
								</div>
								<div class="btns fr">
									<router-link :to="{path:'/moviedetail',query:{id:'1'}}" class='btn tg' v-show="item.btnText != ''">{{item.btnText}}</router-link>
									<a href="javascript:;" class='btn mark' @click='wantSee(item.id,index)'>
										<em ref='mark' :class="markText[index] == '已标记想看' ? 'isWanted' : ''"></em>
										<span ref='text'>{{markText[index]}}</span>
									</a>
								</div>
							</div>
							
						</div>
					</div>
					<el-pagination
						v-show="total1 > pageSize1"					  
					  background
					  layout="prev, pager, next"
					  @current-change="handleCurrentChange1"
						      	:current-page.sync="currentPage1"
						      	:page-size="pageSize1"
					  :total="total1">
					</el-pagination>
				</el-main>
				<el-main class='movieContentLeft' v-if="activeIndex == '3'">
					<div class="movieList">
						<div class="movieItem" v-for='(item,index) in willData'>
							<h6 class='time nuomi-red'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}号 {{item.week}}</h6>
							<div class="movieContent clearfix">
								<div class="movieInfo">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt=""><span class='tag tag-pre' v-show="item.btnText == '预售选座'">预售</span></router-link>
									<div class="movieDetail">
										<router-link :to="{path:'/moviedetail',query:{id:item.id}}"><p class='movieName'>{{item.name}}</p></router-link>
										<div class="score">
											<span class="star">
												<em :style="'width: '+ item.rate / 10 * 105 +'px'"></em>
											</span>
											<span class='num nuomi-red'>{{item.rate}}</span>
										</div>
										<p class='font-shadow f16'>{{item.shortDesc}}</p>
										<ul class="info">
											<li>类型：{{item.type}}</li>
											<li>时长：{{item.time}}分钟</li>
											<li>上映时间：{{item.screenTime}}</li>
										</ul>
									</div>
								</div>
								<div class="btns fr">
									<router-link :to="{path:'/moviedetail',query:{id:'1'}}" class='btn tg' v-show="item.btnText != ''">{{item.btnText}}</router-link>
									<a href="javascript:;" class='btn mark' @click='wantSee(item.id,index)'>
										<em ref='mark' :class="markText[index] == '已标记想看' ? 'isWanted' : ''"></em>
										<span ref='text'>{{markText[index]}}</span>
									</a>
								</div>
							</div>
							
						</div>
					</div>
					<el-pagination
						v-show="total1 > pageSize1"					  
					  background
					  layout="prev, pager, next"
					  @current-change="handleCurrentChange1"
						      	:current-page.sync="currentPage1"
						      	:page-size="pageSize1"
					  :total="total1">
					</el-pagination>
				</el-main> -->
				<el-main class='movieContentLeft'>					
					<div class="movieList">
						<div class="movieItem" v-for='item in hotData' v-if="activeIndex == '1'">
							<h6 class='time nuomi-red'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}号 {{item.week}}</h6>
							<div class="movieContent clearfix">
								<div class="movieInfo">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt=""><span class='tag tag-pre' v-show="item.btnText == '预售选座'">预售</span></router-link>
									<div class="movieDetail">
										<router-link :to="{path:'/moviedetail',query:{id: item.id}}"><p class='movieName'>{{item.name}}<span>{{item.playType}}</span></p></router-link>
										<div class="score">
											<span class="star">
												<em :style="'width: '+ item.rate / 10 * 105 +'px'"></em>
											</span>
											<span class='num nuomi-red'>{{item.rate}}</span>
										</div>
										<p class='font-shadow f16'>{{item.shortDesc}}</p>
										<ul class="info">
											<li>类型：{{item.type}}</li>
											<li>时长：{{item.time}}分钟</li>
											<li>上映时间：{{item.screenTime}}</li>
										</ul>
									</div>
								</div>
								<div class="btns fr">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='btn tg'>{{item.btnText}}</router-link>
								</div>
							</div>
						</div>						
						<div class="movieItem" v-for='(item,index) in willData' v-if="activeIndex == '2'">
							<h6 class='time nuomi-red'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}号 {{item.week}}</h6>
							<div class="movieContent clearfix">
								<div class="movieInfo">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt=""><span class='tag tag-pre' v-show="item.btnText == '预售选座'">预售</span></router-link>
									<div class="movieDetail">
										<router-link :to="{path:'/moviedetail',query:{id:item.id}}"><p class='movieName'>{{item.name}}</p></router-link>
										<div class="score">
											<span class="star">
												<em :style="'width: '+ item.rate / 10 * 105 +'px'"></em>
											</span>
											<span class='num nuomi-red'>{{item.rate}}</span>
										</div>
										<p class='font-shadow f16'>{{item.shortDesc}}</p>
										<ul class="info">
											<li>类型：{{item.type}}</li>
											<li>时长：{{item.time}}分钟</li>
											<li>上映时间：{{item.screenTime}}</li>
										</ul>
									</div>
								</div>
								<div class="btns fr">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='btn tg' v-show="item.btnText != ''">{{item.btnText}}</router-link>
									<a href="javascript:;" class='btn mark' @click='wantSee(item.id,index)'>
										<em ref='mark' :class="markText[index] == '已标记想看' ? 'isWanted' : ''"></em>
										<span ref='text'>{{markText[index]}}</span>
									</a>
								</div>
							</div>
							
						</div>
						<div class="movieItem" v-for='item in libData' v-if="activeIndex == '3'">
							<h6 class='time nuomi-red'>{{item.screenTime.split('-')[1]}}月{{item.screenTime.split('-')[2]}}号 {{item.week}}</h6>
							<div class="movieContent clearfix">
								<div class="movieInfo">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='moviePic'><img :src="'http://localhost:8080/test/img/' + item.pic" alt=""></router-link>
									<div class="movieDetail">
										<router-link :to="{path:'/moviedetail',query:{id: item.id}}"><p class='movieName'>{{item.name}}<span>{{item.playType}}</span></p></router-link>
										<div class="score">
											<span class="star">
												<em :style="'width: '+ item.rate / 10 * 105 +'px'"></em>
											</span>
											<span class='num nuomi-red'>{{item.rate}}</span>
										</div>
										<p class='font-shadow f16'>{{item.shortDesc}}</p>
										<ul class="info">
											<li>类型：{{item.type}}</li>
											<li>时长：{{item.time}}分钟</li>
											<li>上映时间：{{item.screenTime}}</li>
										</ul>
									</div>
								</div>
								<div class="btns fr">
									<router-link :to="{path:'/moviedetail',query:{id: item.id}}" class='btn tg'>查看详情</router-link>
								</div>
							</div>
						</div>
					</div>			
					
					<el-pagination
						v-show="total > pageSize && activeIndex != ''"					  
					  background
					  layout="prev, pager, next"
					  @current-change="handleCurrentChange(activeIndex)"
		      	:current-page.sync="currentPage"
					  :page-size="pageSize"
					  :total="total">
					</el-pagination>
				</el-main>
				<el-aside style="width: 225px" class='contentRight'>
					<rank-list></rank-list>
				</el-aside>
			</el-container>			
		</div>
		<go-top v-bind:scrollRoot='scrollEle' v-if='scrollFlag'></go-top>
	</el-scrollbar>
</template>

<style lang="scss" scoped>
	.el-scrollbar__wrap{
		overflow-x: auto;
	}
	.main{
		width: 100%;
		height: 100vh;				
		/* .el-scrollbar__wrap{
			overflow-x: auto;
		} */
		.movieContent{
			.movie-topnav{
				margin-bottom: 30px;
				.el-menu{
					background-color: transparent;
					.el-menu-item{						
						height: auto;
						line-height: 25px;
						padding: 0;
						margin-right: 36px;						
						&.is-active{
							border-color: #ff318c;
							background-color: transparent;
    					.item{
    						color: #ff318c;
    					}
						}
					}	
					.el-menu-item:hover{
						background-color: transparent;
						border-color: #ff318c !important;
						.item{
							color: #ff318c;
						}
					}				
				}
				.el-menu--horizontal{
					border-bottom: none;
				}
				.item{
					float: left;    			
    			padding-bottom: 10px;    			
    			font-size: 18px;
    			color: #333;    			   			
				}				
			}
			.movieContentLeft{
				padding: 0;
				.movieList{
					width: 945px;					
					.movieItem{
						.time{
							font-size: 16px;    					
    					margin-bottom: 15px;
						}
						.movieContent{
							margin-bottom: 30px;
    					color: #333;
							.movieInfo{
								display: inline-block;
								.movieDetail{
									display: inline-block;
    							vertical-align: top;
    							.movieName{
    								margin-bottom: 16px;
    								cursor: pointer;
    								font-size: 20px;
    								color: #333;
    								span{
											display: inline-block;
									    margin-left: 10px;
									    padding: 0 4px;
									    font-size: 12px;
									    vertical-align: 4px;
									    color: #fff;
									    border-radius: 3px;
									    background-color: #2c9eff;
    								}	
    							}
    							.score{
    								margin-bottom: 38px;
    								.star{
    									display: inline-block;
									    width: 105px;
									    height: 16px;
									    margin-right: 4px;
									    vertical-align: middle;
									    background: url(~img/star-gray.png) 0 0 repeat-x;
									    em{
									    	display: inline-block;
    										height: 100%;
    										background: url(~img/star-red.png) 0 0 repeat-x;
									    }
    								}
    								.num{
    									font-size: 16px;
    									vertical-align: middle;
    								}    								
    							}
    							.info{
  									margin-top: 16px;
  									font-size: 16px;
  									li{
  										display: inline-block;
  										margin-right: 3em;
  									}
    							}
    							.f16{
    								font-size: 16px;
    							}
								}
								.moviePic{
									position: relative;
    							display: inline-block;
    							margin-right: 20px;
    							overflow: hidden;
    							vertical-align: top;
									img{
									  width: 120px;
	    							height: 176px
									}
									.tag{
										position: absolute;
								    top: 10px;
								    left: -19px;
								    width: 77px;
								    height: 21px;
								    font-size: 14px;
								    color: #fff;
								    transform: rotate(-45deg);
								    background-color: #ff318c;
								    text-align: center;
    								line-height: 21px
									}
									.tag-pre{
										background-color: #56b2fd;
									}
								}								
							}
							.btns{
									width: 140px;
									.btn{
										display: inline-block;
								    width: 128px;
								    height: 35px;
								    margin-bottom: 20px;
								    font-size: 14px;
								    line-height: 35px;
								    text-align: center;
								    border-radius: 3px;
								    &.tg{
								    	border: 1px solid #ff318c;
    									color: #ff318c;
								    }
								    &:focus{
								    	outline: none;
								    }
									}
									.mark{
										border: 1px solid #ff9c38;
    								color: #ff9c38;
    								em{
    									display: inline-block;
									    width: 18px;
									    height: 21px;
									    margin-right: 6px;
									    vertical-align: -6px;
									    background: url(~img/star-love.png) 3px 3px no-repeat;
									    &.isWanted{
    										background-position: 3px -18px;
    									}
    								}

									}
								}
						}
						
					}
				}
				.el-pagination{
					text-align: center;
					margin-bottom: 30px;								
				}
			}
		}
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import GoTop from '@/views/goTop/goTop'
	import RankList from '@/views/RankList/rankList'
	import jq from 'jquery'
	import util from '@/common/util'
	import {EditMovieStatus, QueryWanted, AddWanted, EditWanted, QueryLibMovie} from '@/api/api'

	export default{
		data() {
			return {
				activeIndex: '1',
				routeQuery: null,
				hotData: [],
				willData: [],
				libData: [],
				currentPage: 1,
				pageSize: 10,	
				pageSize1: 10,			
				currentPage1: 1,				
				total: 0,
				total1: 0,
				markText: [],
				scrollEle: null,
				scrollFlag: false,  // 为了让子组件获得异步数据
				weekText: '日一二三四五六',
				userInfo: null
			}
		},

		components:{
			HeaderBar,
			RankList,
			GoTop
		},

		methods: {
			
			/**
			 * [getHotDataList description] 获取热映影片
			 * @return {[type]} [description]
			 */
			getHotDataList() {				
				let params = new URLSearchParams();
				params.append('pageNum',this.currentPage);
				params.append('pageSize',this.pageSize);
				this.axios.post('http://localhost:8080/test/queryhotmovie',params).then((res) => {
					this.hotData = res.data.data;	
					this.hotData.forEach((val,index) => {
						val.week = '周' + this.weekText.charAt(new Date(val.screenTime).getDay());
						if(new Date().getTime() >= new Date(val.screenTime).getTime()){
							val.btnText = '选座购票';
						}else{
							val.btnText = '预售选座';							
						}						
					});
					console.log('ht', this.hotData);				
					this.total = res.data.totalNum;			
					console.log('to', this.total)	;		
				})
			},

			/**
			 * 获取即将上映的电影
			 * @return {[type]} [description]
			 */
			getWillDataList() {
				var uid = '';
				if(this.userInfo){
					uid = this.userInfo.id;
				}
				let params = new URLSearchParams();
				params.append('pageNum',this.currentPage);
				params.append('pageSize',this.pageSize);
				params.append('uid', uid);
				this.axios.post('http://localhost:8080/test/querywillmovie',params).then((res) => {
					this.willData = res.data.data;	
					//this.total1 = res.data.totalNum;	
					this.total = res.data.totalNum;
					this.willData.forEach((val,index) => { 
						val.week = '周' + this.weekText.charAt(new Date(val.screenTime).getDay());
						if(new Date().getTime() < new Date(val.screenTime).getTime() && val.status == 0){
							val.btnText = '预售选座';
						}else{
							val.btnText = '';
						}
						if(val.isWanted == 0){
							// 未标记想看
							this.markText[index]='想看';
						}else{
							// 已标记想看
							this.markText[index]='已标记想看';
						}
					});
					console.log('r',res);			
					console.log(this.total1);
					/*if(!this.userInfo){
						for(let i = 0; i < this.willData.length; i++){
							this.markText.push('想看');
						}	
					}*/
									
				})
			},

			/**
			 * [getLibData description] 获取影片库
			 * @return {[type]} [description]
			 */
			getLibData() {
				let params = new URLSearchParams();
				console.log('pn', this.currentPage);
				console.log('ps', this.pageSize);
				params.append('pageNum',this.currentPage);
				params.append('pageSize',this.pageSize);
				QueryLibMovie(params).then(res => {
					this.libData = res.data.data;
					this.total = res.data.totalNum;
				})
			},

			/**
			 * 路由变化时的操作
			 * [routeChange description]
			 * @return {[type]} [description]
			 */
			routeChange() {				
				this.routeQuery = this.$route.query;
				console.log(this.$route);
				if(this.$route.fullPath == '/movie?type=hot'){
					this.activeIndex = '1';	
					this.currentPage = 1;	
					this.total = 0;
					this.getHotDataList();			
				}else if(this.$route.fullPath == '/movie?type=new'){
					this.activeIndex = '2';
					this.currentPage = 1;	
					this.total = 0;
					this.getWillDataList();
				}else if(this.$route.fullPath == '/movie?type=lib'){
					this.activeIndex = '3';
					this.total = 0;
					this.currentPage = 1;	
					this.getLibData();
				}else{
					this.activeIndex = '';
				}		
												
			},

			handleCurrentChange(inx) {
				if(inx == 1){
					this.getHotDataList();					
				}else if(inx == 2){
					this.getWillDataList();					
				}else{					
					this.getLibData();
				}			
			},

			handleCurrentChange1() {
				this.getWillDataList();
				console.log('qq');
			},

			wantSee(mid,index) {
				if(this.userInfo){
					if(this.markText[index] == '想看'){
						let params = new URLSearchParams();
						params.append('uid', this.userInfo.id);
						params.append('movieId', mid);
						params.append('isWanted', 1);
						EditWanted(params).then(res => {
							console.log('ed', res);
						})
						this.markText[index] = '已标记想看';
						this.$refs.text[index].innerText = this.markText[index];				
						this.$refs.mark[index].style.backgroundPosition = '3px -18px';
					}else{
						let params = new URLSearchParams();
						params.append('uid', this.userInfo.id);
						params.append('movieId', mid);
						params.append('isWanted', 0);
						EditWanted(params).then(res => {
							console.log('ed', res);
						})
						this.markText[index] = '想看';
						this.$refs.text[index].innerText = this.markText[index];
						this.$refs.mark[index].style.backgroundPosition = '3px 3px';
					}			
					for(let i = 0; i < this.markText.length; i++){
						this.$refs.text[i].innerText = this.markText[i];
					}	
				}else{
					this.$alert('你还没有登录', {
						confirmButtonText: '确定'
					})
				}
				
			}
		},		

		mounted() {			
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			/*if(this.userInfo){
				let params = new URLSearchParams();
				params.append("uid", this.userInfo.id);							
				QueryWanted(params).then( res => {
					console.log('want', res);
					if(!res.data.data){
						// 如果不存在 就加进去
						params.append("isWanted", 0);
						AddWanted(params).then(res => {
							console.log('add', res);
						})
					}else{
						// 如果存在
						// this.markText.push('想看');
					}
				})
			}*/
			EditMovieStatus().then(res => {				
				//this.getHotDataList();
				//this.getWillDataList();	
			})
				
			this.routeChange();	
			this.scrollEle = this.$refs.main.wrap;			
			this.scrollFlag = true; // 设置这个标志是为了 让子组件 能正确获取数据	
		},

		watch: {
			// 如果路由变化  重新执行
			'$route': 'routeChange'
		}
	}
</script>