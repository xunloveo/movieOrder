<template>
	<div class="admin-login">
		<div class="login-content">
			<h2 class="title">电影票订购管理系统</h2>
			<el-form :model='loginForm' :rules="rules" ref="loginForm" label-position="left" class="login-form">
				<el-form-item prop="logincode">
          <el-input type="text" v-model="loginForm.logincode" auto-complete="off" placeholder="请输入用户名" @keyup.enter.native="loginSubmit" name="logincode">
            <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="accountPwd">
          <el-input type="password" v-model="loginForm.accountPwd" @keyup.enter.native="loginSubmit"  auto-complete="off" placeholder="请输入密码" name="password">
            <template slot="prepend"><i class="fa fa-lock" aria-hidden="true" ></i></template>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.state" @change.native.prevent="changeCookie(loginForm)" class="remember">记住用户名</el-checkbox>
        <el-form-item>
          <el-button class="loginBtn" @click.native.prevent="loginSubmit" :loading="logining" type="primary">登&nbsp;&nbsp;录</el-button>
          <el-button @click="resetForm" class="fr">重&nbsp;&nbsp;置</el-button>
        </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style lang='scss' scoped>
.admin-login{
	height: calc(75vh);
	background: url(~img/movie-bg.jpg) no-repeat center;
	background-size: 100% auto;	
	padding-top: 25vh;
	.login-content{		
		width: 25%;		
		background-color: #555;		
		box-shadow: 0 6px 12px 0 rgba(0,0,0,.2);
		margin: 0 auto;		
		.title{
			text-align: center;
			font-size: 24px;
			color: #fff;
			letter-spacing: 5px;
			padding: 20px;
		}		
		.login-form{
			width: 70%;
			margin: 0 auto;
			padding-bottom: 20px;
			.fa-user,
			.fa-lock{
				font-size: 24px;
			}	
			.remember{
      	color: #346b97;
      	margin-bottom: 20px;
    	}		
    	.el-form-item{
        margin-bottom: 35px;         
        &:last-child{
        	margin-bottom: 0;
        }
      }      
		}
	}	
}
</style>

<script>
	import {getAdminUser} from '../../../api/api'

	export default {
		data() {
			return {
				loginForm: {
          logincode: '',
          accountPwd: '',
          state: true
        },
        logining: false,
        rules: {
          logincode: [
            { required: true, message: '请输入用户名', trigger: 'blur' }          
          ],
          accountPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }           
          ]
        }
			}
		},

		methods: {			
			/**
			 * [loginSubmit description] 登录提交
			 * @return {[type]} [description]
			 */
			loginSubmit() {
				var _this = this;
				this.$refs.loginForm.validate(function(valid) { //表单验证          
          if (valid) {
            _this.logining = true;                       
            let paramData = {
              logincode: _this.loginForm.logincode,
              password: _this.loginForm.accountPwd
            };
            var params = new URLSearchParams();
            params.append('account', _this.loginForm.logincode);
            params.append('password', _this.loginForm.accountPwd);

            // 登录请求
            getAdminUser(params).then((res) => {              
              if(res.data.code == 200){                
                if (_this.loginForm.state) { //登录成功存入用户名、密码(checkbox=true)
                  _this.setCookie('adminAccount',_this.compileStr(_this.loginForm.logincode));
                  _this.setCookie('adminPwd',_this.compileStr(_this.loginForm.accountPwd));
                } 
                // 进行加密处理
                var data = res.data.data;
                // 对密码进行加密
                data.password = _this.compileStr(res.data.data.password);
                sessionStorage.setItem('adminUserInfo',JSON.stringify(data)); // 保存用户信息
                _this.$router.push({ path: '/admin/main'}); //登录成功跳转主页面   
              }else{
                _this.logining = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',                  
                  center: true
                });  // 弹出错误消息
              }              
            })           
          } else {
            return false;
          }
        });
			},

			setCookie(key, val, time) { //设置cookie
        var date = new Date(); //获取当前时间
        var expiresDays = time;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays*24*3600*1000); //格式化为cookie识别的时间
        document.cookie = key + '=' + val +';expires=' + date.toGMTString();  //设置cookie
      },

      getCookie(key) { //获取cookie
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g,'');  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(';')  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for(var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
          var arr = arrCookie[i].split('=');   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
          if(key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
            tips = arr[1];   //将cookie的值赋给变量tips
            break;   //终止for循环遍历
          }    
        }
        return tips;   
      },

      delete(key) { //删除cookie
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + '=v; expires =' + date.toGMTString();//设置cookie
      },

      changeCookie(loginForm) { //监听checkbox是否选中
        if (!loginForm.state) {
          this.delete('adminAccount');
          this.delete('adminPwd');
        }
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
      },

			/**
			 * [resetForm description] 重置表单
			 * @return {[type]} [description]
			 */
			resetForm() {
				this.$refs.loginForm.resetFields();
        this.logining = false;
			}
		},

		mounted() {
			if (this.getCookie('adminAccount')) { //从缓存中取出用户名
        this.loginForm.logincode = this.uncompileStr(this.getCookie('adminAccount'));
      } 
      if (this.getCookie('adminPwd')) { //从缓存中取出用户密码
        this.loginForm.accountPwd = this.uncompileStr(this.getCookie('adminPwd'));
      }  
		}
	}
</script>