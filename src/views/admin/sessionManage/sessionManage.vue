<template>
	<section class="session-manage">
		<div class="session-header">
			<h4>排片列表</h4>
			<div class="divider"></div>
		</div>
		<div class="session-content">
			<div class="search-form">
				<el-form :model='queryForm' label-position="right" ref='queryForm'>
					<el-row>
						<el-col :span='7'>
							<el-form-item>
								<el-button type='primary' icon='el-icon-plus' size='small' @click='sessionAddDialogVisible = true'>添加</el-button>
								<el-button type='primary' icon='el-icon-edit' size='small' @click='edit'>修改</el-button>
								<el-button type='primary' icon='el-icon-delete' size='small' @click='deleteSession'>删除</el-button>
								<el-button type='primary' icon='el-icon-search' size='small' @click='searchSession'>搜索</el-button>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='电影院：' prop='cid' label-width="100px">
								<el-select size='small' v-model='queryForm.cid' @change='searchSession' style="width: 100%;" clearable filterable placeholder="请选择">
									<el-option value="">请选择</el-option>
									<el-option v-for='item in cData' :label='item.name' :value='item.id' :key='item.id'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='电影：' prop='mid' label-width="100px">
								<el-select size='small' v-model='queryForm.mid' @change='searchSession' style="width: 100%;" clearable filterable placeholder="请选择">
									<el-option value="">请选择</el-option>
									<el-option v-for='item in mData' :label='item.name' :value='item.id' :key='item.id'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='5'>
							<el-form-item label='排片日期：' prop='date' label-width="100px">
								<el-date-picker
						      v-model="queryForm.date"
						      type="date"
						      size='small'
						      style='width: 100%'
						      @change="searchSession"
						      placeholder="选择日期">
    						</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="session-info">
				<el-table :data='sessionInfoListData'  ref='multipleTable'  @selection-change="handleSelectionChange" :max-height="maxHeight">
					<el-table-column type='selection' width='55' align='center'></el-table-column>					
					<el-table-column label='影院' prop='cname' sortable width='250' show-overflow-tooltip></el-table-column>
					<el-table-column label='影名' prop='mname'  show-overflow-tooltip></el-table-column>
					<el-table-column label='影厅' prop='rName'  width='120' show-overflow-tooltip ></el-table-column>
					<el-table-column label='放映日期' prop='pieceTime'  width='150'></el-table-column>
					<el-table-column label='开始时间	' prop='startTime'  width='150'></el-table-column>
					<el-table-column label='结束时间	' prop='endTime'  width='150'></el-table-column>
					<el-table-column label='原价	' prop='originPrice'  width='100'></el-table-column>
					<el-table-column label='会员价	' prop='discountPrice'  width='100'></el-table-column>
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

		<el-dialog title='新增场次' :visible.sync="sessionAddDialogVisible" :close-on-click-modal="false"  width='50%' @close='closeAdd'>
			<el-form :model='addSessionForm' :rules='rules' ref='addSessionForm' label-width="80px">
				<el-row>
					<el-col :span='12'>
						<el-form-item label='电影院' prop='cid'>
							<el-select size='small' placeholder='请输入电影院' v-model='addSessionForm.cid' filterable @change='getRomeData(addSessionForm.cid)' style='width: 100%'>
								<el-option v-for='item in cData' :label='item.name' :value='item.id' :key='item.id'></el-option>
							</el-select>							
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='电影' prop='mid'>
							<el-select size='small' placeholder='请输入电影' v-model='addSessionForm.mid' filterable style='width: 100%' @change='getMoviePlayTime(addSessionForm.mid)'>
								<el-option v-for='item in hotMData' :label='item.name' :value='item.id' :key='item.id'></el-option>
							</el-select>							
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='影厅' prop='rid'>
							<el-select size='small' placeholder='请输入影厅' v-model='addSessionForm.rid' filterable style='width: 100%'>
								<el-option v-for='item in rData' :label='item.name' :value='item.id' :key='item.id'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='放映日期' prop='pieceTime'>
							<!-- <el-input placeholder='请输入放映日期' v-model:trim='addSessionForm.pieceTime' auto-complete="off" size='small'></el-input> -->
							<el-date-picker
						      v-model="addSessionForm.pieceTime"
						      type="date"
						      size='small'
						      style='width: 100%'						     
						      placeholder="选择放映日期">
    						</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='开始时间' prop='startTime'>
							<!-- <el-input placeholder='请输入开始时间' v-model:trim='addSessionForm.startTime' auto-complete="off" size='small'></el-input> -->
							<el-time-picker						   
						    v-model="addSessionForm.startTime"	
						    size='small'	
						    style='width: 100%'						    
						    @change='getEndTime(addSessionForm.startTime)'			    
						    placeholder="请输入开始时间">
						  </el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='结束时间' prop='endTime'>
							<el-input  v-model:trim='addSessionForm.endTime' auto-complete="off" size='small' :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='原价' prop='originPrice'>
							<el-input placeholder='请输入原价' v-model.number='addSessionForm.originPrice' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span='12'>
						<el-form-item label='会员价' prop='discountPrice'>
							<el-input placeholder='请输入会员价' v-model.number='addSessionForm.discountPrice' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span='12'>
						<el-form-item label='播放类型' prop='playType'>
							<!-- <el-input placeholder='请输入影片播放类型' v-model:trim='addSessionForm.playType' auto-complete="off" size='small' ></el-input> -->
							<el-radio-group v-model="addSessionForm.playType">
					      <el-radio label="2D"></el-radio>
					      <el-radio label="3D"></el-radio>
					      <el-radio label="4D"></el-radio>
					      <el-radio label="IMAX"></el-radio>
					    </el-radio-group>
						</el-form-item>						
					</el-col>					
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='addSession'>确定</el-button>
				<el-button @click='sessionAddDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>

		<el-dialog title='编辑场次' :visible.sync="sessionEditDialogVisible" :close-on-click-modal="false"  width='50%' @close='closeEdit'>
			<el-form :model='editSessionForm' :rules='rules1' ref='editSessionForm' label-width="80px">
				<el-row>
					<el-col :span='12'>
						<el-form-item label='电影院' prop='cinemaId'>
							<el-select size='small' placeholder='请输入电影院' v-model='editSessionForm.cinemaId' filterable @change='getRomeData(editSessionForm.cinemaId)' style='width: 100%'>
								<el-option v-for='item in cData' :label='item.name' :value='item.id' :key='item.id'></el-option>
							</el-select>							
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='电影' prop='movieId'>
							<el-select size='small' placeholder='请输入电影' v-model='editSessionForm.movieId' filterable style='width: 100%' @change='getMoviePlayTime1(editSessionForm.movieId)'>
								<el-option v-for='item in hotMData' :label='item.name' :value='item.id' :key='item.id'></el-option>
							</el-select>							
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='影厅' prop='roomId'>
							<el-select size='small' placeholder='请输入影厅' v-model='editSessionForm.roomId' filterable style='width: 100%'>
								<el-option v-for='item in rData' :label='item.name' :value='item.id' :key='item.id'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='放映日期' prop='pieceTime'>
							<!-- <el-input placeholder='请输入放映日期' v-model:trim='addSessionForm.pieceTime' auto-complete="off" size='small'></el-input> -->
							<el-date-picker
						      v-model="editSessionForm.pieceTime"
						      type="date"
						      size='small'
						      style='width: 100%'						     
						      placeholder="选择放映日期">
    						</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='开始时间' prop='startTime'>
							<!-- <el-input placeholder='请输入开始时间' v-model:trim='addSessionForm.startTime' auto-complete="off" size='small'></el-input> -->
							<el-time-picker						   
						    v-model="editSessionForm.startTime"	
						    size='small'	
						    style='width: 100%'						    
						    @change='getEndTime1(editSessionForm.startTime)'			    
						    placeholder="请输入开始时间">
						  </el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='结束时间' prop='endTime'>
							<el-input  v-model:trim='editSessionForm.endTime' auto-complete="off" size='small' :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label='原价' prop='originPrice'>
							<el-input placeholder='请输入原价' v-model.number='editSessionForm.originPrice' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span='12'>
						<el-form-item label='会员价' prop='discountPrice'>
							<el-input placeholder='请输入会员价' v-model.number='editSessionForm.discountPrice' auto-complete="off" size='small'></el-input>
						</el-form-item>
					</el-col>					
					<el-col :span='12'>
						<el-form-item label='播放类型' prop='type'>
							<!-- <el-input placeholder='请输入影片播放类型' v-model:trim='addSessionForm.playType' auto-complete="off" size='small' ></el-input> -->
							<el-radio-group v-model="editSessionForm.type">
					      <el-radio label="2D"></el-radio>
					      <el-radio label="3D"></el-radio>
					      <el-radio label="4D"></el-radio>
					      <el-radio label="IMAX"></el-radio>
					    </el-radio-group>
						</el-form-item>						
					</el-col>					
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='editSession'>确定</el-button>
				<el-button @click='sessionEditDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<style lang='scss'>
	.session-manage{
		.session-content{
			.search-form{
				.el-form{
					padding: 0 15px;
				}				
			}
			.session-info{
				padding: 15px;
				.el-table{
					overflow-y: auto;
				}				
			}
			.el-table__body-wrapper{
				overflow-y: auto;
			}
		}
	}
</style>

<script>
  import utilTool from '@/common/util'
	import {QueryCinemaAll, QueryDisplayMovie, QueryAllSession, FindHotMovie, QueryRoom, FindPlayTime, AddSession, CheckSession, FindMaxEndTime, FindMaxPieceTime, EditSession, DeleteSession, CheckSessionTime, CheckSessionTimeOne} from "@/api/api"
	export default{
		data() {
			return {
				queryForm: {
					cid: '',
					mid: '',
					date: ''
				},
				sessionAddDialogVisible: false,
				sessionEditDialogVisible: false,
				cData: [],
				mData: [],
				rData: [],
				hotMData: [],
				sessionInfoListData: [],
				multipleSelection: [],
				personInfo: null,
				total: 0,
				pageSize: 9,
				currentPage: 1,
				addSessionForm: {
					cid: '',
					mid: '',
					rid: '',
					pieceTime: '',
					startTime: '',
					endTime: '',
					originPrice: '',
					discountPrice: '',
					playType: ''
				},
				editSessionForm: {},				
				rules:{
					cid: [{required: true, message: '请输入电影院' , trigger: 'change'}],
					mid: [{required: true, message: '请输入电影' , trigger: 'change'}],
					rid: [{required: true, message: '请输入影厅' , trigger: 'change'}],
					pieceTime: [{required: true, message: '请输入放映日期' , trigger: 'change'}],
					startTime: [{required: true, message: '请输入放映日期' , trigger: 'change'}],
					originPrice: [{required: true, message: '请输入原价' },
												{type: 'number',message: '请输入数字'}],
					discountPrice: [{required: true, message: '请输入会员价'},
													{type: 'number',message: '请输入数字'}],
					playType: [{required: true, message: '请输入播放类型' , trigger: 'change'}],
				},
				rules1:{
					cinemaId: [{required: true, message: '请输入电影院' , trigger: 'change'}],
					movieId: [{required: true, message: '请输入电影' , trigger: 'change'}],
					roomId: [{required: true, message: '请输入影厅' , trigger: 'change'}],
					pieceTime: [{required: true, message: '请输入放映日期' , trigger: 'change'}],
					startTime: [{required: true, message: '请输入放映日期' , trigger: 'change'}],
					originPrice: [{required: true, message: '请输入原价' },
												{type: 'number',message: '请输入数字'}],
					discountPrice: [{required: true, message: '请输入会员价'},
													{type: 'number',message: '请输入数字'}],
					type: [{required: true, message: '请输入播放类型' , trigger: 'change'}],
				},
				time: 0,
				startTimeTemp: '',
				endTimeTemp: '',
				maxHeight: 0
			}
		},

		methods: {
			/**
			 * [searchSession description] 查询 场次
			 * @return {[type]} [description]
			 */
			searchSession() {
				let params = new URLSearchParams();
				params.append("cid", this.queryForm.cid);
				params.append("mid", this.queryForm.mid);
				let pieceTime = "";
				if(this.queryForm.date != '' && this.queryForm.date){
					pieceTime = utilTool.formatDate.format(new Date(this.queryForm.date),"yyyy-MM-dd")
				}else{
					pieceTime = '';
				}			
				params.append("date", pieceTime);
				params.append("pageNum", this.currentPage);
				params.append("pageSize", this.pageSize);
				params.append('uid', this.personInfo.id);
				params.append('permission', this.personInfo.permission);
				QueryAllSession(params).then(res => {				
					this.total = res.data.totalNum;
					this.sessionInfoListData = res.data.data;
				})
			},


			/**
			 * [getCinemaData description] 获取电影院
			 * @return {[type]} [description]
			 */
			getCinemaData() {
				let params = new URLSearchParams();			
				params.append("uid", this.personInfo.id);
				params.append("permission", this.personInfo.permission);
				QueryCinemaAll(params).then(res => {					
					this.cData = res.data.data;
				})
			},

			/**
			 * [getMovieData description] 获取 排片电影信息
			 * @return {[type]} [description]
			 */
			getMovieData() {
				QueryDisplayMovie().then(res => {
					console.log('md', res);
					this.mData = res.data.data;
				})
			},

			/**
			 * [getRomeData description] 获取 影厅信息
			 * @return {[type]} [description]
			 */
			getRomeData(val) {
				let params = new URLSearchParams();
				params.append("cid", val);
				QueryRoom(params).then(res => {
					console.log('r', res);
					this.rData = res.data.data;
				})
				console.log('v', val);
			},

			/**
			 * [getAllMovieData description] 获取 正在热映的电影
			 * @return {[type]} [description]
			 */
			getHotMovieData() {
				FindHotMovie().then(res => {
					console.log('hm', res);
					this.hotMData = res.data.data;
				})
			},

			/**
			 * [getMoviePlayTime description] 获取影片的播放时长
			 * @return {[type]} [description]
			 */
			getMoviePlayTime(mid) {
				console.log('md', mid);
				let params = new URLSearchParams();
				params.append("id", mid);
				FindPlayTime(params).then(res => {					
					this.time = res.data.data;	
					if(this.addSessionForm.startTime != ''){
						this.getEndTime(this.addSessionForm.startTime);
					}
				})
			},

			getMoviePlayTime1(mid) {
				console.log('md', mid);
				let params = new URLSearchParams();
				params.append("id", mid);
				FindPlayTime(params).then(res => {					
					this.time = res.data.data;	
					if(this.editSessionForm.startTime != ''){
						this.getEndTime1(this.editSessionForm.startTime);
					}
				})
			},

			/**
			 * [getEndTime description] 结束时间根据开始时间变化
			 * @return {[type]} [description]
			 */
			getEndTime(val) {
				if(this.addSessionForm.cid != '' && this.addSessionForm.rid != '' && this.addSessionForm.pieceTime != ''){					
					let params = new URLSearchParams();
					params.append("cid", this.addSessionForm.cid);      
	        params.append("rid", this.addSessionForm.rid);
	        let pieceTime = '';	        
	        pieceTime = utilTool.formatDate.format(new Date(this.addSessionForm.pieceTime),"yyyy-MM-dd"); 
	        params.append("pieceTime", pieceTime);
	        params.append("time", this.time);
	        params.append('startTime', utilTool.formatDate.format(new Date(val),"hh:mm:ss"));	        
	        CheckSessionTimeOne(params).then(res => {		        	
		        	if(!res.data.data){
		        		// 不能排片
		        		this.$message({
	        				type: 'error',
	        				message: '此时间段已经有排片',
	        				duration: 1500
	        			})	 
	        			this.addSessionForm.startTime = '';
	        			this.addSessionForm.endTime = '';       			
		        	}else{
		        		// 可以排片
		        		if(this.time != 0){
		        			let st1 = new Date(val).getTime();
		        			var et1 = st1 + this.time * 60 * 1000;
									this.addSessionForm.endTime = utilTool.formatDate.format(new Date(et1),"hh:mm:ss");
		        		}
		        	}
		        })
				}	
			},

			getEndTime1(val) {				
				if(this.editSessionForm.cinemaId != '' && this.editSessionForm.roomId != '' && this.editSessionForm.pieceTime != ''){
					if(this.startTimeTemp.getTime() !== val.getTime())	{						
						let params = new URLSearchParams();
						params.append("cid", this.editSessionForm.cinemaId);      
		        params.append("rid", this.editSessionForm.roomId);
		        let pieceTime = '';
		        
		        pieceTime = utilTool.formatDate.format(new Date(this.editSessionForm.pieceTime),"yyyy-MM-dd");        	
		       
		        params.append("pieceTime", pieceTime);
		        params.append("time", this.time);
		        params.append('startTime', utilTool.formatDate.format(new Date(val),"hh:mm:ss"));
		        params.append('tempTime', utilTool.formatDate.format(new Date(this.startTimeTemp),"hh:mm:ss"));
		        console.log('time', this.time);
		        console.log('stime', utilTool.formatDate.format(new Date(val),"hh:mm:ss"));
		        
		        console.log('stm', this.startTimeTemp);
		        CheckSessionTime(params).then(res => {
		        	console.log('res',  res);
		        	if(!res.data.data){
		        		// 不能排片
		        		this.$message({
	        				type: 'error',
	        				message: '此时间段已经有排片',
	        				duration: 1500
	        			})
	        			this.editSessionForm.startTime = this.startTimeTemp; // 回到原来的时间
	        			this.editSessionForm.endTime = this.endTimeTemp;
		        	}else{
		        		// 可以排片
		        		if(this.time != 0){
		        			let st1 = new Date(val).getTime();
		        			var et1 = st1 + this.time * 60 * 1000;
									this.editSessionForm.endTime = utilTool.formatDate.format(new Date(et1),"hh:mm:ss");
		        		}
		        	}
		        })
					}	else{											
						this.editSessionForm.endTime = this.endTimeTemp;
					}	
					
				}
				
				
			},

			/**
			 * [addSession description] 添加 场次
			 */
			addSession() {
				this.$refs.addSessionForm.validate((valid) => {
          if (valid) {          	
            console.log('af',this.addSessionForm);
            this.getEndTime(this.addSessionForm.startTime);
            let params = new URLSearchParams();
            params.append("cid", this.addSessionForm.cid);
            params.append("mid", this.addSessionForm.mid);
            params.append("rid", this.addSessionForm.rid);            
            let pieceTime = utilTool.formatDate.format(new Date(this.addSessionForm.pieceTime),"yyyy-MM-dd");
            params.append("pieceTime", pieceTime);
            let startTime = utilTool.formatDate.format(new Date(this.addSessionForm.startTime),"hh:mm:ss");
            params.append("startTime", startTime);
            params.append("endTime", this.addSessionForm.endTime);
            params.append("originPrice", this.addSessionForm.originPrice);
           	params.append("discountPrice", this.addSessionForm.discountPrice);
            params.append("playType", this.addSessionForm.playType);
            console.log('pt', pieceTime);
            console.log('st', startTime);
            CheckSession(params).then(res => {
            	console.log('r', res);
            	if(!res.data.data){
            		AddSession(params).then(res => {
		            	console.log('add', res);
		            	if(res.data.data){
		            		this.$message({
		            			type: 'success',
		            			message: res.data.msg,
		            			duration: 1500
		            		});
		            		this.sessionAddDialogVisible = false;
		            		this.searchSession();
		            	}else{
		            		this.$message({
		            			type: 'error',
		            			message: res.data.msg,
		            			duration: 1500
		            		});
		            	}
		            })		            
		          }else{
		          	this.$message({
		          		type: 'error',
		          		message: '此场次已存在',
		          		duration: 1500
		          	})
		          }
            })
          }else {
            console.log('error submit!!');
            return false;
          }
            
          
        });
			},

			/**
			 * [deleteSession description] 删除 场次
			 * @return {[type]} [description]
			 */
			deleteSession() {
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
		        DeleteSession(params).then((res) => {		        	
		        	if(res.data.data){
		        		this.$message({
			            type: 'success',
			            message: "删除成功！",
			            duration: 1000
			          });
			          this.searchSession();
		        	}
		        	
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

			/**
			 * [edit description] 编辑 场次
			 * @return {[type]} [description]
			 */
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
					this.sessionEditDialogVisible = true;
					let params = new URLSearchParams();
					params.append('id',this.multipleSelection[0].id);
					this.axios.post('http://localhost:8080/test/findsessionbyid',params).then((res) => {
						this.editSessionForm = Object.assign({}, res.data.data);
						console.log('e', this.editSessionForm);
						this.getMoviePlayTime1(this.editSessionForm.movieId);
						this.editSessionForm.startTime = new Date(this.editSessionForm.pieceTime + " " + this.editSessionForm.startTime);
						this.startTimeTemp = this.editSessionForm.startTime;
						this.endTimeTemp = this.editSessionForm.endTime;
						this.getRomeData(this.editSessionForm.cinemaId);								
					})
				}
			},

			/**
			 * [editSession description] 编辑
			 * @return {[type]} [description]
			 */
			editSession() {
				this.$refs.editSessionForm.validate((valid) => {
					if(valid){
						this.getEndTime1(this.editSessionForm.startTime);
            let params = new URLSearchParams();
            params.append("id", this.multipleSelection[0].id);
            params.append("cid", this.editSessionForm.cinemaId);
            params.append("mid", this.editSessionForm.movieId);
            params.append("rid", this.editSessionForm.roomId);            
            let pieceTime = utilTool.formatDate.format(new Date(this.editSessionForm.pieceTime),"yyyy-MM-dd");
            params.append("pieceTime", pieceTime);
            let startTime = utilTool.formatDate.format(new Date(this.editSessionForm.startTime),"hh:mm:ss");
            params.append("startTime", startTime);
            params.append("endTime", this.editSessionForm.endTime);
            params.append("originPrice", this.editSessionForm.originPrice);
           	params.append("discountPrice", this.editSessionForm.discountPrice);
            params.append("playType", this.editSessionForm.type);

            CheckSession(params).then(res => {
            	console.log('r', res);
            	if(!res.data.data || res.data.data != this.multipleSelection[0].id){
            		// 如果不存在
            		EditSession(params).then(res => {
		            	console.log('edit', res);
		            	if(res.data.data){
		            		this.$message({
		            			type: 'success',
		            			message: res.data.msg,
		            			duration: 1500
		            		});
		            		this.sessionEditDialogVisible = false;
		            		this.searchSession();
		            	}else{
		            		this.$message({
		            			type: 'error',
		            			message: res.data.msg,
		            			duration: 1500
		            		});
		            	}
		            })		            
		          }else{
		          	this.$message({
		          		type: 'error',
		          		message: '此场次已存在',
		          		duration: 1500
		          	})
		          }
            })

					}else{
						return false;
					}
				});
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			handleCurrentChange() {
				this.searchSession();
			},

			closeAdd() {
				this.$refs.addSessionForm.resetFields();
				this.time = 0; // 给time 还原
			},

			closeEdit() {
				this.$refs.editSessionForm.resetFields();
				this.time = 0; // 给time 还原
			}
		},

		mounted() {
			this.personInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'));
			if(this.personInfo){				
				this.getCinemaData();
				this.getMovieData();
				this.getHotMovieData();
				this.searchSession();
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