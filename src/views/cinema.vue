<template>
	<el-scrollbar class="main">
		<header-bar></header-bar>
		<div class="cinemaContent w">
			<el-container>
				<el-main class='cinemaContentLeft'>
					<div class="cinemaList">
						<ul>
							<li class='clearfix' v-for='item in cinemaData' :key='item.id'>
								<div class="info fl">
									<p class='title'><router-link :to="{path:'/cinemadetail',query:{id: item.id}}" class='name'>{{ item.name }}</router-link></p>
									<p class='addr clearfix'><span class='fl text'>{{ item.address }}</span></p>
								</div>
								<div class="btns fr">
									<p class='clearfix'>
										<router-link :to="{path:'/cinemadetail',query:{id: item.id }}"  class='btn fr'>选座购票</router-link>
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
				</el-main>
				<el-aside style="width: 225px" class='contentRight'>
					<rank-list></rank-list>
				</el-aside>
			</el-container>
		</div>
	</el-scrollbar>
	
</template>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height: 100vh;
		.el-scrollbar__wrap{
			overflow-x: auto;
		}	
		.cinemaContent{
			.cinemaContentLeft{
				padding: 0;
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
		}	
	}
</style>

<script>
	import HeaderBar from "@/views/header"
	import RankList from '@/views/RankList/rankList'
	import {queryCinema}  from '@/api/api'
	export default{
		data() {
			return {
				cinemaData: [],
				pageNum: 1,
				pageSize: 4,
				more: false
			}
		},

		components:{
			HeaderBar,
			RankList
		},

		methods: {
			/**
			 * 获取电影院信息
			 * [getCinemaList description]
			 * @return {[type]} [description]
			 */
			getCinemaList() {				
				let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',4);
				this.axios.post('http://localhost:8080/test/querycinemaone',params).then((res) => {
					console.log('r',res);
					if(res.data.totalNum > 4){
						this.more = true;
					}					
					this.cinemaData = res.data.data;
					
				})
			},

			searchMore() {
				this.pageSize++;				
				let params = new URLSearchParams();
				params.append('pageNum',1);
				params.append('pageSize',this.pageSize * 4);
				this.axios.post('http://localhost:8080/test/querycinemaone',params).then((res) => {
					console.log('r',res);
					this.cinemaData = res.data.data;	
					if(this.pageSize * 4 >= res.data.totalNum){
						this.more = false;
					}
				})
			}			

			
		},

		mounted() {
			this.getCinemaList();					
		}
	}
</script>