<template>
	<!-- 用户评论 -->
	<div class="customer-comment">
		<h3 class="subtitle">用户评论</h3>
		<div class="add-comment">
			<div class="comment-content">
				<div class="rate clearfix">
					<em class='star fl' ref='star' @mousemove='star($event)' @mouseout='out($event)' @click='starRate' @mouseover='star($event)'>
						<i class='star-in fl' :style="starWidth"></i>
					</em>
					<span class='fl'>{{starText}}</span>
				</div>
				<div class='add-content' contenteditable="true" ref='content'></div>
			</div>							
			<div class="commit">
				<el-button type="success" @click='addCinemaComment'>提交评论</el-button>
			</div>
		</div>
		<div class="comment-list">
			<div class="comment-list-item" v-for="item in commentListData">
				<h4 class='alias clearfix'>
					<em class='fl'>{{item.uname}}</em>
					<em class='star fl'>
						<i class='star-in fl' :style="'width:' + item.rate * 10+ '%'"></i>
					</em>
				</h4>
				<p class='comment-content'>{{item.content}}</p>
				<p class='time'><time>{{item.time}}</time></p>
			</div>	
			<div v-show='commentListData.length==0' style='text-align: center; margin: 20px 0;'>暂无评论！</div>		
		</div>		
		<div class="more" @click='searchMore' v-show='more'>点击查看更多评论&nbsp;&nbsp;></div>

	</div>
</template>

<style lang="scss" scoped>
	.customer-comment{
		width: 945px;
		margin-top: 40px;
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
		.subtitle{
			font-size: 20px;
	    color: #333;
	    font-weight: 400;	    
		}
		.add-comment{
			margin-top: 10px;			
			.comment-content{
				border: 1px solid #ddd;
				border-radius: 10px;
				.rate{
					padding: 10px 0;
					font-size: 14px;
					color: #999;
					border-bottom: 1px solid #ddd;	
					.star{
						cursor: pointer;
					}			
				}
				.add-content{
					min-height: 40px;
					padding: 10px;
					&:focus{
						outline: none;
					}
				}
			}			
			.commit{
				text-align: right;
				margin-top: 10px;
			}
		}
		.comment-list{
			.comment-list-item{
				padding: 30px 0;
				border-bottom: 1px solid #f3f3f3;
				color: #333;
				.alias{
					font-weight: normal;						
					height: 20px;
					margin-bottom: 10px;
					line-height: 20px;
				}
				.comment-content{
					line-height: 30px;
					font-size: 14px;
				}
				.time{
					text-align: right;
					color: #999;
					font-size: 14px;
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
	    margin-bottom: 20px;
		}
	}
</style>

<script>
	import {QueryWebCinemaComment, AddCinemaComment} from "@/api/api"
	import util from '@/common/util'
	export default {
		props: ['comment','cinemaid'],
		data() {
			return {
				starWidth: '',
				starWidth1: '',
				starText: '请评分',
				rate: 0,
				more: false,
				commentListData: [],
				cid: '',
				pageSize: 1,
				noComment: false
			}
		},

		methods: {
			/**
			 * [star description] 鼠标移上去 选中星星
			 * @return {[type]} [description]
			 */
			star(e) {
				var e = e || window.event;
				var x = 0,y=0;
				x = e.pageX || e.clientX + document.documentElement.scrollLeft || document.body.scrollLeft; // 获取鼠标移动的坐标

				var starX = this.$refs.star.offsetLeft; // 获取star 相对body的位置		

				this.starWidth = "width: " + (x - starX) + 'px';
				
			},

			/**
			 * [out description] 当鼠标移开的时候
			 * @return {[type]} [description]
			 */
			out(e) {	
				this.starWidth = "width: 0";
				if(this.starWidth1 !== ''){
					this.starWidth = this.starWidth1;
				}				
			},

			/**
			 * [starRate description] 当点击的时候评分
			 * @return {[type]} [description]
			 */
			starRate() {
				this.starWidth = this.starWidth;
				this.starWidth1 = this.starWidth;				
				let w = parseFloat(this.starWidth1.split(':')[1]);
				this.rate = (w / this.$refs.star.offsetWidth) * 10;				
				if(this.rate.toFixed(1) <= 0.3){
					this.rate = 0;
				}else if(this.rate.toFixed(1) >= 9.8){
					this.rate = 10;
				}else if((this.rate.toString()).indexOf('.') == -1){					
					this.rate = this.rate;
				}else {					
					this.rate = this.rate.toFixed(1);
				}
				this.starText = this.rate + '分';
			},

			/**
			 * [getCommentList description] 获取评论列表
			 * @return {[type]} [description]
			 */
			getCommentList() {			
				let params = new URLSearchParams();
				params.append("cid", this.cid);				
				params.append("pageNum", 1);
				params.append("pageSize",4);

				QueryWebCinemaComment(params).then((res) => {
					this.commentListData = res.data.data;
					if(this.commentListData.length == 0 || res.data.totalNum <= 4){
						this.more = false;
					}else{
						this.more = true;
					}			
				})
			},

			/**
			 * [searchMore description] 查看更多的影评
			 * @return {[type]} [description]
			 */
			searchMore() {
				this.pageSize++;				
				let params = new URLSearchParams();
				params.append("cid", this.cid);
				params.append('pageNum',1);
				params.append('pageSize',this.pageSize * 4);
				
				QueryWebCinemaComment(params).then((res) => {
					this.commentListData = res.data.data;
					if(this.pageSize * 4 >= res.data.totalNum){
						this.more = false;
					}else{
						this.more = true;
					}
				})				
			},

			/**
			 * [addCinemaComment description] 添加影评
			 */
			addCinemaComment() {
				var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
				if(!userInfo){
					this.$confirm('你还没有登陆, 是否登录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          this.$router.push('/userlogin');
	        }).catch(() => {
	                   
	        });
				}else{
					console.log('userInfo',userInfo);
					console.log('c',this.$refs.content.innerText);
					console.log('r',this.rate);
					console.log('t',util.formatDate.format(new Date(),"yyyy-MM-dd hh:mm:ss"));
					let params = new URLSearchParams();
					params.append("cid", this.cid);
					params.append("uid", userInfo.id);
					params.append("content", this.$refs.content.innerText);
					params.append("rate", this.rate);
					params.append("time", util.formatDate.format(new Date(),"yyyy-MM-dd hh:mm:ss"));
					if(!this.$refs.content.innerText || this.$refs.content.innerText == ''){
						this.$message({
		          showClose: true,
		          message: '内容不能为空',
		          type: 'warning'
		        });
					}else{
						AddCinemaComment(params).then((res) => {
							if(res.data.data){
								this.$message({
									type: 'success',
									message: res.data.msg,
									duration: 1000
								});
								this.getCommentList();
								// 清空
								this.$refs.content.innerText = "";
								this.starText = "请评分";
								this.rate = 0;
								this.starWidth = '';
							}
							console.log(res);
					});
					}
					

				}
				
				
			},

			// 路由发生变化
			routeChange() {
				// 重置数据
				this.starWidth = '';
				this.starWidth1 = '';
				this.starText = '请评分';
				this.rate = 0;
				this.more = false;
				this.commentListData = [];
				this.cid = this.$route.query.id;
				this.pageSize = 1;
				this.noComment = false;

				this.getCommentList();
			}

			
		},

		watch: {
			// 如果路由变化  重新执行
			//'$route': 'routeChange'			
			'$route.query.id': 'routeChange'
		},

		mounted() {
			//this.cid = this.cinemaid;
			this.cid = this.$route.query.id;
			this.getCommentList();			
		}
	}
</script>