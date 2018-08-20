<template>
  <div class="login">
    <div class="rigistContent">
      <el-row>
        <el-col :span="24">
          <div class="content">
            <el-form :model="rigistForm" :rules="rules" ref="rigistForm" label-position="left" label-width="0px" class="login-container">
              <div class="login-logo">电影票订购注册</div>
              <el-form-item prop="logincode">
                <el-input type="text" v-model="rigistForm.logincode" auto-complete="off" placeholder="请输入手机号" @keyup.enter.native="loginSubmit('rigistForm')" name="logincode" @blur='checkP' ref='logincode'>
                  <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="alias">
                <el-input type="text" v-model="rigistForm.alias" auto-complete="off" placeholder="请输入昵称" @keyup.enter.native="loginSubmit('rigistForm')" name="logincode" @blur = 'checkA' ref='alias'>
                  <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="accountPwd">
                <el-input type="password" v-model="rigistForm.accountPwd" @keyup.enter.native="loginSubmit('rigistForm')"  auto-complete="off" placeholder="请输入密码" name="password">
                  <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="raccountPwd">
                <el-input type="password" v-model="rigistForm.raccountPwd" @keyup.enter.native="loginSubmit('rigistForm')"  auto-complete="off" placeholder="请再次输入密码" name="password">
                  <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item label='上传头像' label-width='100px' prop='img' class='upload-pic'>
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8080/test/uploadfile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              
             <!--  <el-checkbox v-model="rigistForm.state" @change.native.prevent="changeCookie(rigistForm)" class="remember">记住密码</el-checkbox> -->
              <el-form-item>
                <el-button class="loginBtn" @click="loginSubmit('rigistForm')" :loading="logining">注&nbsp;&nbsp;册</el-button>
              </el-form-item>
              <div style='text-align:right;'>已有账号，去&nbsp;<router-link to='/userlogin' style='font-size: 16px;'>登录</router-link></div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>   
  </div>
</template>

<style lang="scss">
  .rigistContent{
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
        /* height: 370px; */
        background: #fff;
        padding: 20px;
        opacity: 0.95;
        border: solid 1px #eaeaea;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -10%;
        margin-top: -300px;
      } 
      .upload-pic{
        .el-form-item__content{
          line-height: 0;
        }
        .el-form-item__label{
          line-height: 50px;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .avatar {
        width: 50px;
        height: 50px;
        display: block;
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

      .el-input__inner{
        border-radius: 0;
        border-top: none;
        border-left: none;
        border-right: none;
      }             
    }
  } 
  
  .el-message{
    min-width: 380px;
    left: 51.15%;       
  }
  /*根据UI界面调整布局*/
  .rigistContent{
    .el-input-group{
      margin-left: -9px;
    }
    .el-input-group__prepend{
      border-radius: 0;
      border: none; 
      padding: 0 10px;  
      background-color: #fbfdff;  
    }
    .fa-user{
      color: #579FE9;
      font-size: 31px;
    }
    .fa-lock{
      color: #579FE9;
      font-size: 31px;
    }
    .el-input__inner{
      border-radius: 0;
      border-top: none;
      border-left: none;
      border-right: none;
    }
    .el-form-item__error{
      left: 33px;      
    }
  }
</style>

<script>
  import { checkUser, addUser, checkUserAlias, AddWanted, getUser, AddWallet } from '../../api/api';
  import jquery from 'jquery';
  import util from '../../common/security';
  export default {
    data() {
      var checkAccount = (rule,value,callback) => {
        if(!value) {
          callback(new Error('手机号不能为空'))
        }
        else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
          return callback(new Error('请输入正确格式'))
        }else{
          callback();
        }
      };

      var checkAlias = (rule,value,callback) => {
        // 输入2-7个汉子或者4-14个字符(数字或字母)
        var isOK = (str) => {
          var ta=str.split(""),str_l=0;
          var str_fa=Number(ta[0].charCodeAt());
          if((str_fa>=48&&str_fa<=57) ||(str_fa>=65&&str_fa<=90)||(str_fa>=97&&str_fa<=122)||(str_fa>255))
          {
            for(var i=0;i<=ta.length-1;i++)
            {
              str_l++;
              if(Number(ta[i].charCodeAt())>255){str_l++;}
            }            
            if(str_l>=4&&str_l<=16){return true;}
          }
          return false;
        }
        if(value == ''){
          callback(new Error('请输入昵称'));
        }/*else if(!(/^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/).test(value)){
          callback(new Error('请输入2-16位由字母，数字，汉字组成的'));
        }*/else if(!isOK(value)){
          callback(new Error('输入2-7个汉子或者4-14个字符(数字或字母)'));
        }else{
          callback();
        }
      };

      var checkPwd = (rule,value,callback) => {
        if(value === ''){
          callback(new Error('请输入密码'));
        }else if(!(/^[a-zA-Z0-9_]{6,16}$/).test(value)){
          callback(new Error('请输入6-16位由字母，数字，_组成的'));
        }else{
          callback();
        }
      };

      var checkRPwd = (rule,value,callback) => {
        if(value === ''){
          callback(new Error('请再次输入密码'));
        }else if(value !== this.rigistForm.accountPwd){
          callback(new Error('两次输入的密码不一致'));
        }else{
          callback();
        }
      };
      return {
        logining: false,
        rigistForm: {
          logincode: '',
          alias: '',
          accountPwd: '',
          raccountPwd: '',
          img: ''
        },        
        rules: {
          logincode: [
            /*{ required: true, message: '请输入手机号', trigger: 'blur' } */   
            { validator: checkAccount, trigger: 'blur' }        
          ],
          alias: [
            /*{ required: true, message: '请输入昵称', trigger: 'blur' }*/
            { validator: checkAlias, trigger: 'blur' } 
          ],
          accountPwd: [
            /*{ required: true, message: '请输入密码', trigger: 'blur' }*/ 
            { validator: checkPwd, trigger: 'blur' }           
          ],
          raccountPwd: [
            { validator: checkRPwd, trigger: 'blur' } 
          ]

        },
        imageUrl: ''
      };
    },

    methods: {
      loginSubmit(forName) { //注册提交
        var _this = this;       
        this.$refs[forName].validate((valid) => { //表单验证
          console.log(11);
          if (valid) {
            console.log(22);
            _this.logining = true;
            /*let paramData = {
              logincode: _this.rigistForm.logincode,
              password: _this.rigistForm.accountPwd,
              alias: _this.rigistForm.alias
            };*/
            var params = new URLSearchParams();
            params.append('logincode', _this.rigistForm.logincode);
            params.append('password', _this.rigistForm.accountPwd);
            params.append('alias', _this.rigistForm.alias);  
            params.append("img", _this.rigistForm.img);  
            
            // 添加用户
            addUser(params).then((res) => {
              if(res.data.data == '注册成功'){
                // 添加成功的话
                _this.logining = false;
                _this.$message({
                  message: '注册成功',
                  type: 'success',                  
                  center: true
                });
                
                // 重置表单
                _this.$refs.rigistForm.resetFields();
                this.imageUrl = "";
                /*setTimeOut(function(){
                   _this.$router.push({ path: '/userlogin'}); //登录成功跳转主页面
                },1000);*/
                // 查出 uid
                let uparams = new URLSearchParams();                
                params.append('logincode', _this.rigistForm.logincode);
                params.append('password', _this.rigistForm.accountPwd);
                getUser(params).then(res => {
                  console.log('u', res);
                  if(res.data.code == 200){                    
                    let uid = res.data.data.id;
                    console.log('uid', uid);
                    let wantedParams = new URLSearchParams();
                    wantedParams.append('uid', uid);
                    AddWanted(wantedParams).then(res => {
                      // 在想看表 添加数据                      
                    });

                    // 在钱包表里添加
                    let walletParams =  new URLSearchParams();
                    walletParams.append("uid", uid);
                    walletParams.append("balance", 0);
                    walletParams.append("integration", 100);

                    AddWallet(walletParams).then(res => {
                      console.log("AddWallet:", res.data.data);
                    })
                  }
                  
                })
                
                
              }else{
                // 如果添加失败的话
                _this.logining = false;
                _this.$message({
                  message: '注册失败',
                  type: 'error',                  
                  center: true
                });  
              }
            })
               
          } else {
            console.log('error');
            return false;
          }
        });               
        
      },
      
      /**
       * [checkP description] 检查该用户是否存在
       * @return {[type]} [description]
       */
      checkP() {
        // 检查用户是否存在
        var _this = this;
        console.log(this.rigistForm.logincode); 
        if((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.rigistForm.logincode))){
          var params = new URLSearchParams();
          params.append('logincode', this.rigistForm.logincode);
          checkUser(params).then((res) => {
            console.log("res:",res);                  
            if(res.data){ 
              _this.logining = false;                 
              _this.$message({
                message: '该用户已存在',
                type: 'error',                  
                center: true
              });  
              this.rigistForm.logincode = "";   
              this.$refs.logincode.focus();     
            }else{
               
            }              
          }) 
        }
      },

      /**
       * [checkA description] 检查该昵称是否存在
       * @return {[type]} [description]
       */
      checkA() {
        // 检查用户是否存在
        var _this = this;
        console.log(this.rigistForm.alias);
        if((/^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/).test(this.rigistForm.alias)){
          var params = new URLSearchParams();
          params.append('alias', this.rigistForm.alias);
          checkUserAlias(params).then((res) => {
            console.log("res:",res);                  
            if(res.data){ 
              _this.logining = false;                 
              _this.$message({
                message: '该昵称已存在',
                type: 'error',                  
                center: true
              });  
              this.rigistForm.alias = "";   
              this.$refs.alias.focus();             
            }else{
               
            }              
          })      
        }        
      },

      /**
       * [handleAvatarSuccess description] 头像上传成功
       * @return {[type]} [description] 
       */
      handleAvatarSuccess(response, file, fileList) {
        console.log('r',response);  
        this.rigistForm.img =  response.filename;     
        this.imageUrl = 'http://localhost:8080/test/img/'+ response.filename;
      },

      /**
       * [beforeAvatarUpload description] 上传之前
       * @return {[type]} [description]
       */
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    
    mounted() {
      
    }
  }
</script>