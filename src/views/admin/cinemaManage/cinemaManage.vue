<template>
	<section class="ciname-manage">
		<div class="cinema-header">
			<h4>影院列表</h4>
			<div class="divider"></div>
		</div>
		<div class="cinema-content">
			<div class="search-form">
				<el-form :model='queryForm'>
					<el-row>
						<el-col :span='perm == 0 ? 15 : 18'>
							<el-form-item>
								<el-button type='primary' icon='el-icon-plus' size='small' @click='cinemaAddDialogVisible = true'>添加</el-button>
								<el-button type='primary' icon='el-icon-edit' size='small' @click='edit'>修改</el-button>
								<el-button type='primary' icon='el-icon-delete' size='small' @click='deleteCinema'>删除</el-button>
								<el-button type='primary' icon='el-icon-search' size='small' @click='searchCinema'>搜索</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="3" v-show='perm == 0'>
							<el-form-item>								
								<el-select size="small" v-model="queryForm.uid"  filterable placeholder="请选择负责人" @change='searchCinema'>
									<el-option value=''>请选择</el-option>
							    <el-option
							      v-for="item in userOptions"
							      :key="item.id"
							      :label="item.name"
							      :value="item.id">
							    </el-option>
					  	</el-select>										
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item>								
								<el-input size='small' v-model="queryForm.name" placeholder='请输入影院名称' @keyup.enter.native="searchCinema"></el-input>														
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item>								
								<el-input size='small' v-model="queryForm.address" placeholder='请输入影院地址' @keyup.enter.native="searchCinema"></el-input>														
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="cinema-info">
				<el-table :data='cinemaInfoListData' ref='multipleTable' border @selection-change="handleSelectionChange"  style='width: 100%' :max-height="maxHeight">
					<el-table-column type='selection' width='55' align='center'></el-table-column>
					<el-table-column label='影院名称' prop='name' sortable width='280'></el-table-column>
					<el-table-column label='影院评分' prop='rate' sortable width='120' align='center'></el-table-column>
					<el-table-column label='影院地址' prop='address' show-overflow-tooltip width='280'></el-table-column>
					<el-table-column label='联系电话' prop='tel' width='130'></el-table-column>
					<el-table-column label='简介' prop='desc' show-overflow-tooltip></el-table-column>
					<el-table-column label='负责人' prop='uname' width='120'></el-table-column>					
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

		<!-- 添加影院对话框 -->
		<el-dialog title='新增影院' :visible.sync="cinemaAddDialogVisible" :close-on-click-modal="false" width='40%'  @close='closeAdd'>
			<el-form :model='cinemaAddForm' :rules='rules' ref='cinemaAddForm' label-width='80px'>
				<el-row>
					<el-col :span='24'>
						<el-form-item label='影院名称' prop='name'>
							<el-input v-model.trim='cinemaAddForm.name' auto-complete="off" size='small'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影院地址' prop='address'>
							<el-input v-model.trim='cinemaAddForm.address' auto-complete="off" size='small'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='12'>
						<el-form-item label='联系方式' prop='tel'>
							<el-input v-model.trim='cinemaAddForm.tel' auto-complete="off" size='small'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='12'>
						<el-form-item label='负责人' prop='uid'>
							<el-select size="small" v-model="cinemaAddForm.uid" :disabled='disable' filterable placeholder="请选择负责人">
						    <el-option
						      v-for="item in userOptions"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
					  	</el-select>
						</el-form-item>	
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影院简述' prop='desc'>
							<el-input v-model.trim='cinemaAddForm.desc' auto-complete="off" size='small' type="textarea"></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影院详情' prop='detail'>
							<el-input v-model.trim='cinemaAddForm.detail' auto-complete="off" size='small' type="textarea" :rows='4'></el-input>
						</el-form-item>	
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='addCinema'>确定</el-button>
				<el-button @click='cinemaAddDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>

		<!-- 编辑影院对话框 -->
		<el-dialog title='编辑影院' :visible.sync="cinemaEditDialogVisible" :close-on-click-modal="false" width='40%'  @close='closeEdit'>
			<el-form :model='cinemaEditForm' :rules='rules' ref='cinemaEditForm' label-width='80px'>
				<el-row>
					<el-col :span='24'>
						<el-form-item label='影院名称' prop='name'>
							<el-input v-model.trim='cinemaEditForm.name' auto-complete="off" size='small'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影院地址' prop='address'>
							<el-input v-model.trim='cinemaEditForm.address' auto-complete="off" size='small'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='12'>
						<el-form-item label='联系方式' prop='tel'>
							<el-input v-model.trim='cinemaEditForm.tel' auto-complete="off" size='small'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='12'>
						<el-form-item label='负责人' prop='uid'>
							<el-select size="small" v-model="cinemaEditForm.uid" :disabled='disable' filterable placeholder="请选择负责人">
						    <el-option
						      v-for="item in userOptions"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
					  	</el-select>
						</el-form-item>	
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影院简述' prop='desc'>
							<el-input v-model.trim='cinemaEditForm.desc' auto-complete="off" size='small' type="textarea"></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='24'>
						<el-form-item label='影院详情' prop='detail'>
							<el-input v-model.trim='cinemaEditForm.detail' auto-complete="off" size='small' type="textarea" :rows='4'></el-input>
						</el-form-item>	
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='editCinema'>确定</el-button>
				<el-button @click='cinemaEditDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<style lang='scss'>
	.ciname-manage{
		.cinema-info{
			padding: 15px;
		}
		.el-table__body-wrapper{
			overflow: hidden;
		}
	}	
</style>

<script>
	import {queryCinema, getAllUser, AddCinema, findCinemaById, EditCinema, DeleteCinema} from '../../../api/api'
	export default {
		data() {
			return {
				cinemaAddDialogVisible: false,
				cinemaEditDialogVisible: false,
				cinemaInfoListData: [],
				multipleSelection: [],
				queryForm: {
					uid: '',
					name: '',
					address: ''
				},
				total: 2,
				currentPage: 1,
				pageSize: 9,
				cinemaAddDialogVisible: false,
				cinemaAddForm: {
					name: '',
					address: '',
					tel: '',
					uid: '',
					desc: '',
					detail: ''
				},
				rules: {
					name: [
						{required: true, message: '请输入影院名称', trigger: 'blur'}
					],
					uid: [
						{required: true, message: '请选择负责人', trigger: 'blur'}
					]
				},
				userOptions:[],
				cinemaEditForm: {},
				adminUserInfo: null,
				disable: false,				
				perm: 0,
				maxHeight: 0
			}
		},

		methods: {
			/**
			 * [handleSelectionChange description] 当复选框发生变化的时候
			 * @param  {[type]} val [description]
			 * @return {[type]}     [description]
			 */
			handleSelectionChange(val) {
				this.multipleSelection = val; 
			},

			handleSizeChange() {

			},

			handleCurrentChange() {
				this.searchCinema();
			},

			edit() {
				if(this.multipleSelection.length !== 1){
					this.$message({
            type: 'error',
            message: '请选择一条数据进行修改'
          });
          //取消选择
          this.$refs.multipleTable.clearSelection();
				}else{
					this.cinemaEditDialogVisible = true;					
					let params = new URLSearchParams();
					params.append('id',this.multipleSelection[0].id);
					findCinemaById(params).then((res) => {						
						this.cinemaEditForm = Object.assign({}, res.data.data);						
					})
				}
			},

			/**
			 * [editCinema description] 编辑影院
			 * @return {[type]} [description]
			 */
			editCinema() {
				this.$refs.cinemaEditForm.validate((valid) => {
					if(valid) {						
						let params = new URLSearchParams();
						params.append('id', this.multipleSelection[0].id);
						params.append('uid', this.cinemaEditForm.uid);
						params.append('name', this.cinemaEditForm.name);
						params.append('address', this.cinemaEditForm.address);
						params.append('tel', this.cinemaEditForm.tel);
						params.append('desc', this.cinemaEditForm.desc);
						params.append('detail', this.cinemaEditForm.detail);
						EditCinema(params).then((res) => {							
							if(res.data.data){
								this.$message({
									type: 'success',
									message: '修改成功',
									duration: 1500
								});
								this.cinemaEditDialogVisible = false;
								this.searchCinema();								
							}
						});
					}else {
						return false;
					}
				})
			},

			closeEdit() {
				this.$refs.cinemaEditForm.resetFields();
			},

			/**
			 * [deleteCinema description] 删除影院
			 * @return {[type]} [description]
			 */
			deleteCinema() {
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
		        DeleteCinema(params).then((res) => {		        	
		        	if(res.data.data){
		        		this.$message({
			            type: 'success',
			            message: res.data.msg,
			            duration: 1000
			          });
		        	}
		        	this.searchCinema();
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
			 * [getCinameList description] 获取影院信息
			 * @return {[type]} [description]
			 */
			/*getCinameList() {
				let params = new URLSearchParams();
				params.append('name','');
				params.append('address','');
				params.append('pageNum',this.currentPage);
				params.append('pageSize', this.pageSize);	
				queryCinema(params).then((res) => {
					console.log('res',res);
					this.total = res.data.totalNum;
					this.cinemaInfoListData = res.data.data;
				});
			},*/

			/**
			 * [searchCinema description] 查找影院
			 * @return {[type]} [description]
			 */
			searchCinema() {
				let params = new URLSearchParams();
				params.append('uuid', this.queryForm.uid);
				params.append('name',this.queryForm.name);
				params.append('address',this.queryForm.address);
				params.append('pageNum',this.currentPage);
				params.append('pageSize', this.pageSize);	
				params.append('permission', this.adminUserInfo.permission);
				params.append('uid', this.adminUserInfo.id);
				console.log('par',this.queryForm.uid);
				queryCinema(params).then((res) => {
					console.log('res',res);
					this.total = res.data.totalNum;
					this.cinemaInfoListData = res.data.data;
				});				
			},

			/**
			 * [getUserOption description] 获取不是超级管理员的用户
			 * @return {[type]} [description]
			 */
			getUserOption() {
				getAllUser().then((res) => {
					if(this.adminUserInfo.permission == 0){
						this.userOptions = res.data.data;
					}else{
						this.userOptions[0] = this.adminUserInfo;
						this.cinemaAddForm.uid = this.adminUserInfo.id;						
					}
				})
			},

			/**添加一个影院
			 * [addCinema description]
			 */
			addCinema() {
				console.log('a',this.cinemaAddForm);
				this.$refs.cinemaAddForm.validate((valid) => {
					if(valid){
						let params = new URLSearchParams();
						params.append('name',this.cinemaAddForm.name);
						params.append('address',this.cinemaAddForm.address);
						params.append('tel',this.cinemaAddForm.tel);
						params.append('uid',this.cinemaAddForm.uid);
						params.append('desc',this.cinemaAddForm.desc);
						params.append('detail', this.cinemaAddForm.detail);
						AddCinema(params).then((res) => {
							console.log('aa',res);
							if(res.data.data){
								this.$message({
						      type: 'success',
						      message: '添加成功！',
						      duration: 1000
      					});
      					this.searchCinema();
      					this.cinemaAddDialogVisible = false;
							}else{
								this.$message({
						      type: 'error',
						      message: '添加失败！',
						      duration: 1000
      					});
							}						
						})
					}else{
						return false;
					}
				})
				
			},

			closeAdd() {
				this.$refs.cinemaAddForm.resetFields();
			}
		},

		mounted() {
			this.adminUserInfo = JSON.parse(sessionStorage.getItem('adminUserInfo'));
			if(this.adminUserInfo){
				this.perm = this.adminUserInfo.permission;
				this.searchCinema();
				this.getUserOption();
				if(this.adminUserInfo.permission != 0){
					this.disable = true;					
				}
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