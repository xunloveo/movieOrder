<template>
	<section class='user-manage'>
		<div class="user-header">
			<h4>用户列表</h4>
			<div class="divider"></div>
		</div>
		<div class="user-content">
			<div class="search-form">
				<el-form :model='queryForm'>
					<el-row>
						<el-col :span='18'>
							<el-form-item>
								<el-button type='primary' icon='el-icon-plus' size='small' @click='userAddDialogVisible = true'>添加</el-button>
								<el-button type='primary' icon='el-icon-edit' size='small' @click='edit'>修改</el-button>
								<el-button type='primary' icon='el-icon-delete' size='small' @click='deleteUser'>删除</el-button>
								<el-button type='primary' icon='el-icon-search' size='small' @click='searchAdmin'>搜索</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item>								
								<el-input size='small' v-model="queryForm.account" placeholder='请输入账号' @keyup.enter.native="searchAdmin"></el-input>														
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<el-form-item>								
								<el-select size="small" v-model="queryForm.permission" filterable placeholder="请选择角色" @change='searchAdmin'>
									<el-option value=''>请选择角色</el-option>
							    <el-option
							      v-for="item in roleOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
								</el-select>											
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="user-info">
				<el-table :data='userInfoListData' ref='multipleTable' border @selection-change="handleSelectionChange" :max-height="maxHeight">
					<el-table-column type='selection' width='55' align='center'></el-table-column>
					<el-table-column label='登录账号' prop='account' sortable></el-table-column>
					<el-table-column label='姓名' prop='name' sortable></el-table-column>
					<el-table-column label='权限' prop='permission'></el-table-column>
					<el-table-column label='手机' prop='tel'></el-table-column>
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

		<!-- 用户添加对话框 -->
		<el-dialog title='新增用户' :visible.sync="userAddDialogVisible" :close-on-click-modal="false" width='40%'  @close='closeAdd'>
			<el-form :model="userAddForm" :rules="userAddFormRules" ref="userAddForm" label-width="80px">
				<el-row>
					<el-col :span='12'>
						<el-form-item label='登录账号' prop='account'>
							<el-input v-model.trim='userAddForm.account' auto-complete="off" @blur='checkAccount' size='small' ref='account'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='姓名' prop='name'>
							<el-input v-model.trim='userAddForm.name' auto-complete="off" size='small'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='密码' prop='password'>
							<el-input v-model='userAddForm.password' auto-complete="off" size='small' type='password'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='手机号码' prop='tel'>
							<el-input v-model='userAddForm.tel' auto-complete="off" size='small'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='性别' prop='sex'>
							<el-select size="small" v-model="userAddForm.sex" filterable placeholder="请选择性别">
						    <el-option
						      v-for="item in sexOptions"
						      :key="item.value"						      
						      :value="item.value">
						    </el-option>
					  	</el-select>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='角色' prop='permission'>
							<el-select size="small" v-model="userAddForm.permission" filterable placeholder="请选择角色">								
						    <el-option
						      v-for="item in roleOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  	</el-select>
						</el-form-item>						
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='addUser'>确定</el-button>
				<el-button @click='userAddDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>
	
		<!-- 编辑用户对话框 -->
		<el-dialog title='修改用户' :visible.sync="userEditDialogVisible" :close-on-click-modal="false" @close='closeEdit'>
			<el-form :model="userEditForm" :rules="userAddFormRules" ref="userEditForm" label-width="80px">
				<el-row>
					<el-col :span='12'>
						<el-form-item label='登录账号' prop='account'>
							<el-input v-model.trim='userEditForm.account' auto-complete="off" @blur='checkAccount1' size='small' ref='account1'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='姓名' prop='name'>
							<el-input v-model.trim='userEditForm.name' auto-complete="off" size='small'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='密码' prop='password'>
							<el-input v-model='userEditForm.password' auto-complete="off" size='small' type='password'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='手机号码' prop='tel'>
							<el-input v-model='userEditForm.tel' auto-complete="off" size='small'></el-input>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='性别' prop='sex'>
							<el-select size="small" v-model="userEditForm.sex" filterable placeholder="请选择性别">
						    <el-option
						      v-for="item in sexOptions"
						      :key="item.value"						      
						      :value="item.value">
						    </el-option>
					  	</el-select>
						</el-form-item>						
					</el-col>
					<el-col :span='12'>
						<el-form-item label='角色' prop='permission'>
							<el-select size="small" v-model="userEditForm.permission" filterable placeholder="请选择角色">
						    <el-option
						      v-for="item in roleOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  	</el-select>
						</el-form-item>						
					</el-col>
				</el-row>
			</el-form>
			<div slot='footer'>
				<el-button type='primary' @click='editUser'>确定</el-button>
				<el-button @click='userEditDialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<style lang='scss'>
	.user-manage{
		.user-header{
			/* h4{
				width: 85px;
					    height: 45px;
					    color: #0880f9;
					    line-height: 45px;
					    font-size: 16px;
					    margin-left: 15px;
					    border-bottom: solid 3px #579FE9;
			}
			.divider{
				margin: 0 15px;
			    		border-bottom: solid 1px #579FE9;
			} */
		}
		.user-content{
			.search-form{
				margin: 5px 0px;
				.el-form{
					padding: 0 15px;
					.el-form-item{
						margin-bottom: 0;
					}
					.el-col{
						padding-right: 20px;
					}
				}
			}
			.user-info{
				padding: 15px;				
			}		
			/* .block{
				padding: 0 15px;
				position: absolute;
				bottom: 20px;
			}	 */
		}
		.el-select{
			width: 100%;
		}
		.el-table__body-wrapper{
			overflow: hidden;
		}
	}
	

</style>

<script>
	import {checkAdminAccount, addAdmin, findAllAdmin, findAdminById, editAdmin, deleteAdmin, queryAdmin} from '../../../api/api'
	export default {
		data() {
			return {		
				queryForm: {
					account: '',
					permission: ''
				},	
				userInfoListData: [],
				currentPage: 1,
				total: 0,
				userAddDialogVisible: false,
				userEditDialogVisible: false,				
				userAddForm: {
					account: '',
					name: '',
					password: '',
					tel: '',
					sex: '',
					permission: '管理员'
				},
				userEditForm: {},
				sexOptions: [
					{
						value: '男'
					},
					{
						value: '女'
					}
				],
				roleOptions: [
					{
						value: 0,
						label: '超级管理员'
					},
					{
						value: 1,
						label: '管理员'
					}
				],
				userAddFormRules: {
					account: [
						{required: true, message: '请输入账号', trigger: 'blur'},
						{pattern: /^[a-zA-Z0-9]{2,8}$/, message: '请输入2-8位字母，数字组成的数', trigger: 'blur'}
					],
					name: [
						{required: true, message: '请输入姓名', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入密码',trigger: 'blur'},
						{pattern: /^[a-zA-Z0-9]{4,12}$/, message: '请输入4-12位字母，数字组成的数', trigger: 'blur'}
					],
					tel: [
						{pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
					]
				},
				multipleSelection: [],
				pageSize: 9,
				maxHeight: 0
			}
		},

		methods: {
			/**
			 * [handleSelectionChange description] 当复选框变化的时候,用于编辑，删除
			 * @return {[type]} [description]
			 */
			handleSelectionChange(val) {
				this.multipleSelection = val;							
			},

			/**
			 * [getUserInfoList description] 获取用户列表
			 * @return {[type]} [description]
			 */
			/*getUserInfoList() {	
				let params = new URLSearchParams();	
				params.append('account',"");
				params.append('permission',-1);	
				params.append('pageNum',this.currentPage);
				params.append('pageSize', this.pageSize);				
				findAllAdmin(params).then((res) => {							
					if(res.status == 200){
						this.total = res.data.totalNum;
						res.data.data.forEach((val,index) => {
							if(val.permission == 0){
								val.permission = '超级管理员';
							}else{
								val.permission = '管理员';
							}
						});
						this.userInfoListData = res.data.data;
					}					
				})
				queryAdmin(params).then((res) =>{
					if(res.status == 200){
						this.total = res.data.totalNum;
						res.data.data.forEach((val,index) => {
							if(val.permission == 0){
								val.permission = '超级管理员';
							}else{
								val.permission = '管理员';
							}
						});
						this.userInfoListData = res.data.data;
					}
				})
			},*/

			/**
			 * [searchAdmin description] 根据相应条件查找
			 * @return {[type]} [description]
			 */
			searchAdmin() {		
				console.log(this.queryForm);	
				let p = -1;
				if(this.queryForm.permission !== ""){
					p = this.queryForm.permission;
				}
				let params = new URLSearchParams();
				params.append('account',this.queryForm.account);
				params.append("permission",p);
				params.append('pageNum',this.currentPage);
				params.append('pageSize',this.pageSize);
				console.log('p',params);
				console.log(p);
				queryAdmin(params).then((res) => {
					console.log('r',res);
					res.data.data.forEach((val,index) => {
						if(val.permission == 0){
							val.permission = '超级管理员';
						}else{
							val.permission = '管理员';
						}
					});
					this.userInfoListData = res.data.data;
					this.total = res.data.totalNum;
				})
			},

			/**
			 * [handleSizeChange description] 每页数量改变时会触发
			 * @return {[type]} [description]
			 */
			handleSizeChange() {

			},

			/**
			 * [handleCurrentChange description] 翻页改变时会触发
			 * @return {[type]} [description]
			 */
			handleCurrentChange() {
				//this.getUserInfoList();
				this.searchAdmin();
			},
			
			/**
			 * [openAdd description] 关闭添加对话框之前重置表单
			 * @return {[type]} [description]
			 */
			closeAdd() {
				this.$refs.userAddForm.resetFields();
			},

			/**
			 * [addUser description] 添加用户
			 */
			addUser() {
				if(this.userAddForm.permission == '管理员'){
					this.userAddForm.permission = 1;
				}
				this.$refs.userAddForm.validate((valid) => {
					if(valid){
						let params = new URLSearchParams();
        		params.append('account',this.userAddForm.account);
        		params.append('password',this.userAddForm.password);
        		params.append('name',this.userAddForm.name);
        		params.append('tel',this.userAddForm.tel);
        		params.append('sex',this.userAddForm.sex);
        		params.append('permission',this.userAddForm.permission);        		
						addAdmin(params).then((res) => {							
							if(res.data == '添加成功'){
								this.$message({
						      type: 'success',
						      message: res.data,
						      duration: 1000
      					}); 
      					//this.getUserInfoList();
      					this.searchAdmin();
								this.userAddDialogVisible = false;
								this.$refs.userAddForm.resetFields();
							}else{
								this.$message({
						      type: 'error',
						      message: res.data,
						      duration: 1000
      					});
							}
							
						})
					}else{
						return false;
					}
				})
				console.log(this.userAddForm);
			},			

			/**
			 * [checkAccount description] 检查该用户是否存在
			 * @return {[type]} [description]
			 */
			checkAccount() {				
				let params = new URLSearchParams();
        params.append('account',this.userAddForm.account);
        checkAdminAccount(params).then((res) => {
        	if(res.data.data){
        		this.$message({
				      type: 'error',
				      message: '该角色名称已存在,请重新填写',
				      duration: 1000
      			});      			
      			this.$refs.account.focus();
      			this.userAddForm.account = '';
        	}
        });
			},

			/**
			 * [edit description] 点击编辑的时候
			 * @return {[type]} [description]
			 */
			edit() {
				if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'error',
            message: '请选择一条数据进行修改'
          }); 
          // 取消选择
          this.$refs.multipleTable.clearSelection();
        }else{
        	this.userEditDialogVisible = true;  
        	let params = new URLSearchParams();      	
        	params.append('id',this.multipleSelection[0].id);
        	findAdminById(params).then((res) => {    
        		if(res.status == 200){
        			if(res.data.data.permission == 0){
		      			res.data.data.permission = '超级管理员';
		      		}else{
		      			res.data.data.permission = '管理员';
		      		}
		      		this.userEditForm = Object.assign({}, res.data.data);
        		}        		
        	})    	
        }				
			},

			/**
			 * [editUser description] 确认编辑用户操作
			 * @return {[type]} [description]
			 */
			editUser(){
				this.$refs.userEditForm.validate((valid) => {					
					if(valid){
						let params = new URLSearchParams();						
						let p = 0;

						if(this.userEditForm.permission == '管理员'){
							p = 1;
						}
						params.append('id',this.multipleSelection[0].id);
        		params.append('account',this.userEditForm.account);
        		params.append('password',this.userEditForm.password);
        		params.append('name',this.userEditForm.name);
        		params.append('tel',this.userEditForm.tel);
        		params.append('sex',this.userEditForm.sex);
        		params.append('permission',p);

        		console.log('p',p);
        		console.log('e',this.userEditForm);
        		editAdmin(params).then((res) => {
        			this.$message({
					      type: 'success',
					      message: res.data.msg,
					      duration: 1000
      				});
        			this.searchAdmin();
        			console.log('r',res);
        			this.userEditDialogVisible = false;
        		})
					}else{
						return false;
					}
				});
			},

			closeEdit() {
				this.$refs.userEditForm.resetFields();
			},

			checkAccount1() {				
				let params = new URLSearchParams();		
				if(this.multipleSelection[0].account != this.userEditForm.account)	{
					params.append('account',this.userEditForm.account);
	        checkAdminAccount(params).then((res) => {
	        	if(res.data.data){
	        		this.$message({
					      type: 'error',
					      message: '该角色名称已存在,请重新填写',
					      duration: 1000
	      			});      			
	      			this.$refs.account1.focus();
	      			this.userEditForm.account = '';
	        	}
	        });
				}	        
			},

			/**
			 * [deleteUser description] 删除用户
			 * @return {[type]} [description]
			 */
			deleteUser() {
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
	        	console.log('ids',ids);
        		console.log('ids',typeof ids);
	        	let params = new URLSearchParams();
	        	params.append('ids',ids); 
	        	console.log(1);      	
		        deleteAdmin(params).then((res) => {
		        	console.log('r',res);
		        	if(res.data.msg == "删除成功！"){
		        		this.$message({
			            type: 'success',
			            message: res.data.msg,
			            duration: 1000
			          });
		        	}
		        	//this.getUserInfoList();
		        	this.searchAdmin();
	        	});

	        }).catch(() =>{
	        	this.$message({
	            type: 'info',
	            message: '已取消删除',
	            duration: 1000
	          });
	        })
				}
				
			}

			
		},

		mounted() {
			//this.getUserInfoList();
			this.searchAdmin();
			this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
			window.onresize = function() {
				console.log(1);
				this.maxHeight = document.getElementsByClassName("main")[0].offsetHeight - 240;
				console.log(this.maxHeight);
			}			
		}
	}
</script>