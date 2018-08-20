<template>
	<section class="movie-manage">
		<div class="movie-header">
			<h4>电影列表</h4>
			<div class="divider"></div>
		</div>
		<div class="movie-content">
			<div class="search-form">
				<el-form :model='queryForm'>
					<el-row>
						<el-col :span='14'>
							<el-form-item>
								<el-button type='primary' icon='el-icon-plus' size='small' @click='movieAddDialogVisible = true'>添加</el-button>
								<el-button type='primary' icon='el-icon-edit' size='small' @click='edit'>修改</el-button>
								<el-button type='primary' icon='el-icon-delete' size='small' @click='deleteMovie'>删除</el-button>
								<el-button type='primary' icon='el-icon-search' size='small' @click='searchMovie'>搜索</el-button>
							</el-form-item>
						</el-col>
						<el-col :span='3'>
							<el-form-item>								
								<el-input size='small' v-model="queryForm.name" placeholder='请输入电影名称' @keyup.enter.native="searchMovie"></el-input>														
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item>
								 <el-date-picker
								 	size='small'
						      v-model="queryForm.date"
						      type="daterange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      value-format='yyyy-MM-dd'
						      @change='searchMovie'>
						    </el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="movie-info">
				<el-table :data='movieInfoListData' ref='multipleTable'  @selection-change="handleSelectionChange" :max-height="maxHeight">
					<el-table-column type='selection' width='55' align='center'></el-table-column>s
					 <el-table-column type="expand">
			      <template slot-scope="props">
			      	<el-scrollbar >
			      		<el-form label-position="left" inline class="table-expand" >
				        	<el-row>
				        		<el-col :span='6'>
				        			<el-form-item label="时长">
				            		<span>{{ props.row.time }}分钟</span>
				          		</el-form-item>
				        		</el-col>
				        		<el-col :span='6'>
				        			<el-form-item label="地区">
				            		<span>{{ props.row.region }}</span>
				          		</el-form-item>
				        		</el-col>
				        		<el-col :span='6'>
				        			<el-form-item label="类型">
				            		<span>{{ props.row.type }}</span>
				          		</el-form-item>
				        		</el-col>
				        		<el-col :span='6'>
				        			<el-form-item label="播放类型">
				            		<span>{{ props.row.playType }}</span>
				          		</el-form-item>
				        		</el-col>
				        		<el-col :span='12'>
				        			<el-form-item label="简述">
				            		<span>{{ props.row.shortDesc }}</span>
				          		</el-form-item>
				        		</el-col>
				        		<el-col :span='6'>
				        			<el-form-item label="状态">
				            		<span>{{ statusData[props.row.status] }}</span>
				          		</el-form-item>
				        		</el-col>
				        		<el-col :span='6'>
				        			<el-form-item label="语言">
				            		<span>{{ props.row.language }}</span>
				          		</el-form-item>
				        		</el-col>
										<el-col :span='18'>
											<el-form-item label="详情">
				            		<span>{{ props.row.detailDesc }}</span>
				          		</el-form-item>
										</el-col>
										<el-col :span='6'>
											<el-form-item label="图片">
				            		<img :src="'http://localhost:8080/test/img/'+ props.row.pic" alt="" width="183" height="250">
				          		</el-form-item>
										</el-col>
				        	</el-row>
			        	</el-form>
			      	</el-scrollbar>
			        
			      </template>
    			</el-table-column>
					<el-table-column label='电影名' prop='name' sortable width='200' show-overflow-tooltip></el-table-column>
					<el-table-column label='导演' prop='director' width='180' show-overflow-tooltip></el-table-column>
					<el-table-column label='主演' prop='mainActor'  show-overflow-tooltip align='center'></el-table-column>
					<el-table-column label='上映时间' prop='screenTime' sortable width='120'></el-table-column>
					<el-table-column label='评分' prop='rate' sortable width='100' align='center'></el-table-column>
				</el-table>
			</div>
			<div class="block" v-if="total > pageSize">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="pageSize"
		      background
		      layout="total, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
			</div>
		</div>
		
		<!-- 添加电影对话框 -->
		<el-dialog title='新增电影' :visible.sync="movieAddDialogVisible" :close-on-click-modal="false"  width='80%' @close='closeAdd'>
			<el-form :model='addMovieForm' :rules='rules' ref='addMovieForm' label-width="80px">
				<el-row>
					<el-col :span='6'>
						<el-form-item label='电影名称' prop='name'>
							<el-input placeholder='请输入电影名称' v-model:trim='addMovieForm.name' auto-complete="off" @blur='checkName' size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='导演' prop='director'>
							<el-input placeholder='请输入电影导演' v-model:trim='addMovieForm.director' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='地区' prop='region'>
							<el-input placeholder='请输入地区' v-model:trim='addMovieForm.region' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='时长' prop='time'>
							<el-input placeholder='请输入时长' v-model:trim='addMovieForm.time' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='18'>
						<el-form-item label='主演' prop='mainActor'>
							<el-input placeholder='请输入电影主演' v-model:trim='addMovieForm.mainActor' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='语言' prop='language'>
							<el-input placeholder='请输入语言' v-model:trim='addMovieForm.language' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='上映时间' prop='screenTime'>
							<el-input placeholder='请输入上映时间' v-model:trim='addMovieForm.screenTime' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='影片简述' prop='shortDesc'>
							<el-input placeholder='请输入影片简述' v-model:trim='addMovieForm.shortDesc' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span='6'>
						<el-form-item label='播放类型' prop='playType'>
							<el-input placeholder='请输入播放类型' v-model:trim='addMovieForm.playType' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影片类型' prop='type'>
							<el-checkbox-group v-model="addMovieForm.type">
					      <el-checkbox v-for='(item,index) in label' :label="item" name="type" :key='index'></el-checkbox>	
    					</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影片剧情' prop='detailDesc'>
							<el-input placeholder='请输入影片剧情' v-model:trim='addMovieForm.detailDesc' auto-complete="off" size='small' type='textarea' autosize></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='图片上传' prop='pic'>
							<el-upload ref='upload' action='http://localhost:8080/test/uploadfile' :on-change="handlePreview" :on-success='success' :show-file-list='false'	:file-list="fileList">
								<el-button type='primary' style='vertical-align: top; margin-right: 20px'>选取文件</el-button>
								<img :src="imgSrc0" alt="" height="250" width="183">
							</el-upload>							
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='状态' prop='status'>
							<el-radio-group v-model="addMovieForm.status">
					      <el-radio label="正在热映"></el-radio>
					      <el-radio label="即将上映"></el-radio>
    					</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='addMovie'>确定</el-button>
				<el-button @click='movieAddDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>
		
		<!-- 修改电影对话框 -->
		<el-dialog title='修改电影' :visible.sync="movieEditDialogVisible" :close-on-click-modal="false"  width='80%' @close='closeEdit'>
			<el-form :model='editMovieForm' :rules='rules' ref='editMovieForm' label-width="80px">
				<el-row>
					<el-col :span='6'>
						<el-form-item label='电影名称' prop='name'>
							<el-input placeholder='请输入电影名称' v-model:trim='editMovieForm.name' auto-complete="off" @blur='checkName' size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='导演' prop='director'>
							<el-input placeholder='请输入电影导演' v-model:trim='editMovieForm.director' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='地区' prop='region'>
							<el-input placeholder='请输入地区' v-model:trim='editMovieForm.region' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='时长' prop='time'>
							<el-input placeholder='请输入时长' v-model:trim='editMovieForm.time' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='18'>
						<el-form-item label='主演' prop='mainActor'>
							<el-input placeholder='请输入电影主演' v-model:trim='editMovieForm.mainActor' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='语言' prop='language'>
							<el-input placeholder='请输入语言' v-model:trim='editMovieForm.language' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='6'>
						<el-form-item label='上映时间' prop='screenTime'>
							<el-input placeholder='请输入上映时间' v-model:trim='editMovieForm.screenTime' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='影片简述' prop='shortDesc'>
							<el-input placeholder='请输入影片简述' v-model:trim='editMovieForm.shortDesc' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span='6'>
						<el-form-item label='播放类型' prop='playType'>
							<el-input placeholder='请输入播放类型' v-model:trim='editMovieForm.playType' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影片类型' prop='type'>
							<el-checkbox-group v-model="editMovieForm.type">
					      <el-checkbox v-for='(item,index) in label' :label="item" name="type" :key='index'></el-checkbox>	
    					</el-checkbox-group> 
						</el-form-item>
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影片剧情' prop='detailDesc'>
							<el-input placeholder='请输入影片剧情' v-model:trim='editMovieForm.detailDesc' auto-complete="off" size='small' type='textarea' autosize></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='影片图片' prop='pic'>
							<el-upload
								ref='upload' 
								action='http://localhost:8080/test/uploadfile'
								:show-file-list='false'						
								:on-success='success1'
							>
								<!-- <el-button type='primary' style='vertical-align: top; margin-right: 20px'>点击上传</el-button> -->
								<img :src="imgSrc" alt="" height="250" width="183">
							</el-upload>
						<!-- 	 -->
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='状态' prop='status'>
							<el-radio-group v-model="editMovieForm.status">
					      <el-radio label="正在热映"></el-radio>
					      <el-radio label="即将上映"></el-radio>
    					</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='editMovie'>确定</el-button>
				<el-button @click='movieEditDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<style lang='scss'>
	.movie-manage{
		.movie-info{
			padding: 15px;
			/* .el-table{
				max-height: calc(100vh - 240px);
				overflow-y: auto;
			} */
					
			.table-expand{
				label {
			    width: 70px;
			    color: #99a9bf;
			    padding-right: 0;
			  }		
			  img{
			  	margin-top: 52px;
			  }				  					
			}
		}
	}
</style>

<script>
	import {QueryMovie, AddMovie, EditMovie, DeleteMovie} from '../../../api/api'
	export default {
		data() {
			return {
				queryForm: {
					name: '',
					date: ''
				},
				movieAddDialogVisible: false,	
				movieEditDialogVisible: false,				
				pageSize: 9,
				currentPage: 1,
				total: 0,
				movieInfoListData: [],
				multipleSelection: [],
				addMovieForm: {
					name: '',
					director: '',
					mainActor: '',
					language: '',
					region: '',
					time: '',
					screenTime: '',
					type: [],
					playType: '',
					shortDesc: '',
					detailDesc: '',
					pic:'',
					status: '正在热映'
				},
				filename: '',
				editMovieForm: {},
				rules: {
					name: [{required: true, message: '请输入电影名称', trigger: 'blur'}],
					director: [{required: true, message: '请输入导演', trigger: 'blur'}],
					mainActor: [{required: true, message: '请输入主演', trigger: 'blur'}],
					time: [{required: true, message: '请输入时长', trigger: 'blur'}],
					region: [{required: true, message: '请输入地区', trigger: 'blur'}],
					screenTime: [{required: true, message: '请输入上映时间', trigger: 'blur'}],
					shortDesc: [{required: true, message: '请输入影片简述', trigger: 'blur'}],
					type: [{required: true, message: '请输入影片类型', trigger: 'blur'}],
					detailDesc: [{required: true, message: '请输入影片剧情', trigger: 'blur'}],
				},
				label: [
					'动作',
					'冒险',
					'喜剧',
					'爱情',
					'战争',
					'恐怖',
					'犯罪',
					'悬疑',
					'惊悚',
					'武侠',
					'科幻',
					'音乐',
					'动画',
					'奇幻',
					'家庭',
					'剧情',
					'伦理',
					'记录',
					'历史',
					'青春',
					'励志'
				],
				fileList: [],
				imgSrc: '',
				imgSrc0: '',
				status: 0,
				statusData: {
					0: '正在热映',
					1: '即将上映',
					2: '结束放映'
				},
				maxHeight: 0
			}
		},

		methods: {
			/**
			 * [searchCinema description] 查找电影
			 * @return {[type]} [description]
			 */
			searchMovie() {
				let start = "";
				let end = "";
				if(this.queryForm.date instanceof Array){
					start = this.queryForm.date[0];
					end = this.queryForm.date[1];
				}	
				let params = new URLSearchParams();	
				params.append('name', this.queryForm.name);
				params.append('start', start);
				params.append('end', end);
				params.append('pageNum', this.currentPage);		
				params.append('pageSize', this.pageSize);

				QueryMovie(params).then((res) => {
					console.log('r',res);
					this.movieInfoListData = res.data.data;	
					/*this.movieInfoListData.forEach((val,index) => {
						val.status = this.statusData[val.status];
					})		*/							
					this.total = res.data.totalNum;
				});
			},

			closeAdd() {
				this.$refs.addMovieForm.resetFields();
				this.fileList = [];
				this.imgSrc0 = '';
			},			

			closeEdit() {
				this.$refs.editMovieForm.resetFields();
			},

			/**
			 * [checkName description] 查看电影名是否存在
			 * @return {[type]} [description]
			 */
			checkName() {
				let params = new URLSearchParams();
				params.append('name', this.addMovieForm.name);

				this.axios.post('http://localhost:8080/test/checkmoviebyname',params).then((res) => {
					if(res.data.data){
						this.$message({
							type: 'error',
							message: "该电影已经存在",
							duration: 1000
						})
					}
				})
			},

			/**
			 * [addMovie description] 添加电影
			 */
			addMovie() {
				/*console.log('a',this.addMovieForm);
				this.$refs.upload.submit();*/
				this.$refs.addMovieForm.validate((valid) => {
					if(valid){		
						if(this.addMovieForm.status == '正在热映'){
							this.status = 0;
						}else{
							this.status = 1;
						}				
						let params = new  URLSearchParams();
						params.append('name', this.addMovieForm.name);
						params.append('director', this.addMovieForm.director);
						params.append('mainActor', this.addMovieForm.mainActor);
						params.append('language', this.addMovieForm.language);
						params.append('region', this.addMovieForm.region);
						params.append('time', this.addMovieForm.time);
						params.append('screenTime', this.addMovieForm.screenTime);
						params.append('type', this.addMovieForm.type.join(','));
						params.append('playType', this.addMovieForm.playType);
						params.append('shortDesc', this.addMovieForm.shortDesc);
						params.append('detailDesc', this.addMovieForm.detailDesc);
						params.append('pic', this.addMovieForm.pic);
						params.append('status', this.status);
						AddMovie(params).then((res) => {
							if(res.data.data){
								this.$message({
									type: 'success',
									message: res.data.msg,
									duration: 1000
								})
								this.searchMovie();
								this.movieAddDialogVisible = false;
							}
						})
					}else{
						return false;
					}
				});
			},

			edit() {
				if(this.multipleSelection.length !== 1){
					this.$message({
            type: 'error',
            message: '请选择一条数据进行修改',
            duration: 1000
          });
          //取消选择
          this.$refs.multipleTable.clearSelection();
				}else{
					this.movieEditDialogVisible = true;
					let params = new URLSearchParams();
					params.append('id',this.multipleSelection[0].id);
					this.axios.post('http://localhost:8080/test/findmoviebyId',params).then((res) => {
						this.editMovieForm = Object.assign({}, res.data.data);
						this.editMovieForm.type = this.editMovieForm.type.split(',');
						if(this.editMovieForm.status == 0){
							this.editMovieForm.status = '正在热映';
						}else{
							this.editMovieForm.status = '即将上映';
						}
						this.imgSrc = 'http://localhost:8080/test/img/'+ this.editMovieForm.pic;						
					})
				}
			},

			/**
			 * [editMovie description] 编辑
			 * @return {[type]} [description]
			 */
			editMovie() {
				this.$refs.editMovieForm.validate((valid) => {
					if(valid) {
						let params = new  URLSearchParams();
						let eStatus = 0;						
						if(this.editMovieForm.status == '正在热映'){
							eStatus = 0;
						}else{
							eStatus = 1;
						}	
						params.append('id', this.multipleSelection[0].id);
						params.append('name', this.editMovieForm.name);
						params.append('director', this.editMovieForm.director);
						params.append('mainActor', this.editMovieForm.mainActor);
						params.append('region', this.editMovieForm.region);
						params.append('time', this.editMovieForm.time);
						params.append('screenTime', this.editMovieForm.screenTime);
						params.append('type', this.editMovieForm.type.join(','));
						params.append('playType', this.editMovieForm.playType);
						params.append('shortDesc', this.editMovieForm.shortDesc);
						params.append('detailDesc', this.editMovieForm.detailDesc);
						params.append('pic', this.editMovieForm.pic);
						params.append('status', eStatus);
						
						EditMovie(params).then((res) => {
							console.log('rr',res);
							if(res.data.data){
								this.movieEditDialogVisible = false;
								this.searchMovie();
								this.$message({
									type: 'success',
									message: res.data.msg,
									duration: 1000
								})
							}
						})
					}else{
						return false;
					}
				})
			},

			/**
			 * [deleteMovie description] 删除电影
			 * @return {[type]} [description]
			 */
			deleteMovie(){
				if(this.multipleSelection.length === 0){
					this.$message({
            type: 'error',
            message: '请至少选择一条数据进行删除',
            duration: 1000
          }); 
				}else{
					let ids = [];
        	if(this.multipleSelection.length > 1){
        		for(let i = 0; i < this.multipleSelection.length; i++){
        			ids.push(this.multipleSelection[i].id);
        		}
        		ids = ids.toString().split(',').join(',');	        		
        	}else{
        		ids = this.multipleSelection[0].id.toString();
        	}

        	this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() =>{
	        	let params = new URLSearchParams();
	        	params.append('ids',ids); 	        	 	
		        DeleteMovie(params).then((res) => {		        	
		        	if(res.data.data){
		        		this.$message({
			            type: 'success',
			            message: res.data.msg,
			            duration: 1000
			          });
		        	}
		        	this.searchMovie();
	        	});
	        }).catch(() =>{
	        	this.$message({
	            type: 'info',
	            message: '已取消删除',
	            duration: 1000
	          });
	        })
				}
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			/**
			 * 翻页时触发
			 * @return {[type]} [description]
			 */
			handleCurrentChange() {
				this.searchMovie();
			},

			handleSizeChange() {
				
			},

			handlePreview(file,fileList) {
					this.fileList = fileList.slice(-1);
			},

			success(response, file, fileList) {
				console.log('r',response);
				this.addMovieForm.pic = response.filename;
				this.imgSrc0 = 'http://localhost:8080/test/img/'+ this.addMovieForm.pic;
				console.log('p',this.addMovieForm.pic);
			},

			success1(response, file, fileList){
				this.editMovieForm.pic = response.filename;
				this.imgSrc = 'http://localhost:8080/test/img/'+ this.editMovieForm.pic;
				console.log('p',this.editMovieForm.pic);
			}

		},

		mounted() {
			this.searchMovie();
			this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
			window.onresize = function() {
				console.log(1);
				this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
				console.log(this.maxHeight);
			}			
		}
	}
</script>