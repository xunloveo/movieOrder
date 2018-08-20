<template>
	<section class="movie-comment">
		<div class="comment-header">
			<h4>影院评论</h4>
			<div class="divider"></div>
			<div class="comment-content">
				<div class="search-form">
					<el-form :model='queryForm'>
						<el-row>
							<el-col :span='4'>
								<el-form-item>
									<el-input size='small' v-model="queryForm.cname" placeholder='请输入影院名称' @keyup.enter.native="searchComment"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span='4'>
								<el-form-item>
									<el-input size='small' v-model="queryForm.uname" placeholder='请输入用户名' @keyup.enter.native="searchComment"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span='4'>
								<el-form-item>
									<el-input size='small' v-model="queryForm.minRate" placeholder='请输入最低评分' @keyup.enter.native="searchComment"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span='4'>
								<el-form-item>
									<el-button type='primary' icon='el-icon-search' size='small' @click='searchComment'>搜索</el-button>
								</el-form-item>	
							</el-col>
													
						</el-row>
					</el-form>
				</div>
				<div class="comment-info">
					<el-table :data="commentListData" ref='singleTable' stripe :max-height="maxHeight">
						<el-table-column
				      type="index"
				      width="50">
    				</el-table-column>
    				<el-table-column label='用户名' prop='uname' sortable width='200' show-overflow-tooltip></el-table-column>
    				<el-table-column label='影院名' prop='cname' sortable width='200' show-overflow-tooltip></el-table-column>
    				<el-table-column label='评论内容' prop='content' show-overflow-tooltip></el-table-column>
    				<el-table-column label='评论时间' prop='time' width='200' sortable show-overflow-tooltip></el-table-column>
    				<el-table-column label='评分' prop='rate' width='120'sortable show-overflow-tooltip></el-table-column>
					</el-table>
				</div>
				<div class="block" v-if="total > pageSize">
			    <el-pagination			      
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage"
			      :page-size="pageSize"
			      background
			      layout="total, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
				</div>
			</div>			
		</div>
	</section>
</template>

<style lang='scss'>
	.comment-info{
		padding: 15px;
	}
</style>

<script>
	import {QueryCinemaComment} from "@/api/api"

	export default {
		data() {
			return {
				queryForm: {
					cname: '',
					uname: '',
					minRate: ''
				},
				commentListData: [],
				currentPage: 1,
				total: 1,
				pageSize: 9,
				userInfo: null,
				maxHeight: 0
			}
		},

		methods: {
			/**
			 * [searchComment description] 查询评论列表
			 * @return {[type]} [description]
			 */
			searchComment() {				
				let params = new URLSearchParams();
				params.append("uname", this.queryForm.uname);
				params.append("cname", this.queryForm.cname);
				params.append("rate", this.queryForm.minRate);
				params.append("uid", this.userInfo.id);
				params.append("permission", this.userInfo.permission);
				params.append("pageNum", this.currentPage);
				params.append("pageSize",this.pageSize);

				QueryCinemaComment(params).then((res) => {					
					this.total = res.data.totalNum;
					this.commentListData = res.data.data;
				})
			},

			handleCurrentChange() {

				this.searchComment();
			}
		},

		mounted() {
			this.userInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'));
			if(this.userInfo){
				this.searchComment();
			}		

			this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
			window.onresize = function() {
				console.log(1);
				this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
				console.log(this.maxHeight);
			}				
		}
	}
</script>