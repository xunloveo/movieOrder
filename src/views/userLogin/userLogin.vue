<template>
  <div class="login">
    <div class="loginContent">
      <el-row>
        <el-col :span="24">
          <div class="content">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
              <div class="login-logo">电影票订购登录</div>
              <el-form-item prop="logincode">
                <el-input type="text" v-model="loginForm.logincode" auto-complete="off" placeholder="请输入手机号" @keyup.enter.native="loginSubmit" name="logincode">
                  <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="accountPwd">
                <el-input type="password" v-model="loginForm.accountPwd" @keyup.enter.native="loginSubmit"  auto-complete="off" placeholder="请输入密码" name="password">
                  <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
                </el-input>
              </el-form-item>
              <el-checkbox v-model="loginForm.state" @change.native.prevent="changeCookie(loginForm)" class="remember">记住密码</el-checkbox>
              <el-form-item>
                <el-button class="loginBtn" @click.native.prevent="loginSubmit" :loading="logining">登&nbsp;&nbsp;录</el-button>
              </el-form-item>
              <div style='text-align:right;'>还没有账号，去&nbsp;<router-link to='/rigist' style='font-size: 16px;'>注册</router-link></div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>   
  </div>
</template>

<style lang="scss" scoped>
  .loginContent{
    .login-logo{    
      text-align: center;
      font-size: 20px;
      height: 35px;
      margin-bottom: 20px;      
    }

    .content{
      width: 100%;
      height: calc(100vh);  
      background-color: #000;
      opacity: .7;    
      position: relative;
      .el-form-item{
        margin-bottom: 35px;
      }
      a{
        color: #2772DB;
        float: right;
        font-size: 15px;
      }
      .login-container{
        width: 20%;
        height: 370px;
        background: #fff;
        padding: 20px;
        opacity: 0.95;
        border: solid 1px #eaeaea;
        position: absolute;
        top: 17%;
        left: 50%;
        margin-left: -10%;
      } 
      .remember{
        color: #346b97;
        margin-bottom: 10px;
      }
      .loginBtn{
        width: 100%;
        color: #fff;
        background: #579FE9;
        margin-top: 15px;
        font-weight: bold;
        font-size: 17px;
      } 
      .fa-user{
        color: #2f7ab9;
        font-size: 20px;
      }
      .fa-lock{
        color: #2f7ab9;
        font-size: 20px;
      }                  
    }
  } 
  
  .el-message{
    min-width: 380px;
    left: 51.15%;       
  }
  /*根据UI界面调整布局*/
  .loginContent{
    .el-input-group{
      margin-left: -9px;
    }
    .el-input-group__prepend{
      border-radius: 0;
      border: none; 
      padding: 0 10px;  
      background-color: #fbfdff;  
    }
    .el-form-item__error{
      left: 33px;
    }
  }
</style>

<script>
  import { getUser } from '../../api/api';
  import jquery from 'jquery';
  import util from '../../common/security';
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          logincode: '',
          accountPwd: '',
          state: true
        },        
        rules: {
          logincode: [
            { required: true, message: '请输入手机号', trigger: 'blur' }            
          ],
          accountPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }           
          ]
        }
      };
    },

    methods: {
      loginSubmit() { //登录提交
        var _this = this;       
        this.$refs.loginForm.validate(function(valid) { //表单验证
          console.log(11);
          if (valid) {
            _this.logining = true;
            console.log(22);            
            let paramData = {
              logincode: _this.loginForm.logincode,
              password: _this.loginForm.accountPwd
            };
            var params = new URLSearchParams();
            params.append('logincode', _this.loginForm.logincode);
            params.append('password', _this.loginForm.accountPwd);
            console.log(JSON.stringify(paramData));

            // 登录请求
            getUser(params).then((res) => {
              console.log("res:",res);
              // 加密处理
              //console.log('pwd:',RSAUtils.encryptedString('8NONwyJtHesysWpM',_this.loginForm.accountPwd));
              console.log("pwd:",_this.compileStr(_this.loginForm.accountPwd));
              if(res.data.code == 200){                
                if (_this.loginForm.state) { //登录成功存入用户名、密码(checkbox=true)
                  _this.setCookie('username',_this.compileStr(_this.loginForm.logincode));
                  _this.setCookie('password',_this.compileStr(_this.loginForm.accountPwd));
                } 
                // 进行加密处理
               
                console.log('a', _this.compileStr(res.data.data.password)); 
                var data = res.data.data;
                // 对密码进行加密
                data.password = _this.compileStr(res.data.data.password);
                sessionStorage.setItem('userInfo',JSON.stringify(data)); // 保存用户信息
                _this.$router.push({ path: '/index'}); //登录成功跳转主页面   
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
          this.delete('username');
          this.delete('password');
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
      } 
    },
    
    mounted() {
      if (this.getCookie('username')) { //从缓存中取出用户名
        this.loginForm.logincode = this.uncompileStr(this.getCookie('username'));
      } 
      if (this.getCookie('password')) { //从缓存中取出用户密码
        this.loginForm.accountPwd = this.uncompileStr(this.getCookie('password'));
      }      
    }
  }
</script>