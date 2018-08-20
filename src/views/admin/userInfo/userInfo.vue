<template>
	<section class='personal'>
		<div class="personal-header">
			<h4>个人信息</h4>
			<div class="divider"></div>
		</div>
		<div class="personal-content">
			<el-form :model='personalForm' ref='personalForm' :rules='rules' label-width="80px">
				<el-row>
					<el-col :span='6'>
						<el-form-item label='登录账号' prop='account'>
							<el-input v-model.trim='personalForm.account' auto-complete="off" @blur='checkAccount'  ref='account' :disabled='disabled'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='6' :offset="3">
						<el-form-item label='姓名' prop='name'>
							<el-input v-model.trim='personalForm.name' auto-complete="off" :disabled='disabled'></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span='6' :offset="3">
						<el-form-item label='密码' prop='password'>
							<el-input v-model.trim='personalForm.password' auto-complete="off" :disabled='disabled'></el-input>
						</el-form-item>	
					</el-col>					
				</el-row>
				<el-row>
					<el-col :span='6'>
						<el-form-item label='性别' prop='sex'>
							<el-select  v-model="personalForm.sex" filterable placeholder="请选择性别" :disabled='disabled'>
						    <el-option
						      v-for="item in sexOptions"
						      :key="item.value"						      
						      :value="item.value">
						    </el-option>
					  	</el-select>
						</el-form-item>	
					</el-col>
					<el-col :span='6' :offset="3">
						<el-form-item label='角色' prop='permission'>
							<el-select  v-model="personalForm.permission" filterable placeholder="请选择角色" :disabled='disabled1'>
						    <el-option
						      v-for="item in roleOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  	</el-select>
						</el-form-item>	
					</el-col>
					<el-col :span='6' :offset="3">
						<el-form-item label='联系方式' prop='tel'>
							<el-input v-model.trim='personalForm.tel' auto-complete="off" :disabled='disabled'></el-input>
						</el-form-item>	
					</el-col>					
				</el-row>
				<el-row style='margin-top: 40px;'>
					<el-col :span='2' :offset='20'>
						<el-button @click='reset'>重置</el-button>
					</el-col>
					<el-col :span='2' align='right'>
						<el-button type='primary' @click='toggleEdit'>{{text}}</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</section>
</template>

<style lang='scss'>
	.personal{
		.personal-content{
			padding: 15px;
			.el-form{
				margin-top: 20px;
				padding: 40px 20px;
				border: 1px solid rgb(209, 219, 229);
				box-shadow:  rgba(0, 0, 0, 0.12) 0px 2px 4px 0px, rgba(0, 0, 0, 0.04) 0px 0px 6px 0px;
				.el-row{
					margin-bottom: 20px;
				}
			}
		}
		.el-select{
			width: 100%;
		}
	}
</style>

<script>
	import {checkAdminAccount, editAdmin, findAdminById} from '../../../api/api'	
	export default {
		data() {
			return {
				personalForm: {},		
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
				disabled: true,
				disabled1: true,
				text: '修改',
				rules: {
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
				info: {}
			}
		},

		methods: {
			/**
			 * [checkAccount1 description] 查看账号是否已经存在
			 * @return {[type]} [description]
			 */
			checkAccount() {
				let params = new URLSearchParams();		
				if(JSON.parse(sessionStorage.getItem('adminUserInfo')).account != this.personalForm.account)	{
					params.append('account',this.personalForm.account);
	        checkAdminAccount(params).then((res) => {
	        	if(res.data.data){
	        		this.$message({
					      type: 'error',
					      message: '该角色名称已存在,请重新填写',
					      duration: 1000
	      			});      			
	      			this.$refs.account.focus();
	      			this.personalForm.account = '';
	        	}
	        });
				}	     
			},

			/**
			 * [edit description] 编辑操作
			 * @return {[type]} [description]
			 */
			toggleEdit() {
				if(this.text == '修改'){
					this.text = '确认修改';
					this.disabled = false;
				}else{
					this.text = '修改';
					this.disabled = true;
					this.$refs.personalForm.validate((valid) => {
						if(valid) {
							let params = new URLSearchParams();	
							params.append('id',JSON.parse(sessionStorage.getItem('adminUserInfo')).id);
	        		params.append('account',this.personalForm.account);
	        		params.append('password',this.personalForm.password);
	        		params.append('name',this.personalForm.name);
	        		params.append('tel',this.personalForm.tel);
	        		params.append('sex',this.personalForm.sex);
	        		params.append('permission',this.personalForm.permission);
	        		editAdmin(params).then((res) => {
        				console.log('r',res);  
        				this.$message({
						      type: 'success',
						      message: res.data.msg,
						      duration: 1000
	      				}); 
	      				let params1 = new URLSearchParams();
	      				params1.append('id',JSON.parse(sessionStorage.getItem('adminUserInfo')).id);
	      				findAdminById(params1).then((res) => {
	      					var data = res.data.data;
                	// 对密码进行加密
                	data.password = this.compileStr(res.data.data.password);
	      					sessionStorage.setItem('adminUserInfo',JSON.stringify(data)); // 保存用户信息

	      					// 让顶部的信息跟着变
	      					let p = this.$parent.$parent.$parent.$parent.$parent;
	      					let pi = JSON.parse(sessionStorage.getItem('adminUserInfo'));
	      					pi.password = this.uncompileStr(pi.password);
	      					p.adminUserInfo = pi;
	      				});   			
        			})
								
						}else {
							return false;
						}
					});
				}
				
			},

			// 重置
			reset() {
				this.disabled = true;
				this.text = '修改';
				this.$refs.personalForm.resetFields();
				this.info = JSON.parse(sessionStorage.getItem('adminUserInfo'));
				this.info.password = this.uncompileStr(this.info.password);
				this.personalForm = this.info;	
					
			},

			compileStr(code){ //对字符串进行加密         
        var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
        for(var i=1;i<code.length;i++) {                
          c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
        }     
        return escape(c);  
      },

			uncompileStr(code){   // 对字符串进行解密     
        code=unescape(code);        
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
        for(var i=1;i<code.length;i++)  
        {        
         c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
        }        
        return c;   
      }
		},

		mounted() {
			this.info = JSON.parse(sessionStorage.getItem('adminUserInfo'));
			this.info.password = this.uncompileStr(this.info.password);
			this.personalForm = this.info;
		}					
	}
</script>