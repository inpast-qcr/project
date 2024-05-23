<template>
  <div class="login">
    <el-card class="box-card">
      <div class="logo">
        <div class="loginTitle">登录</div>
      </div>
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  label-width="70px" class="login-from">
          <el-form-item label-width="0px" prop="user">
              <el-input class='login-input' v-model="ruleForm.user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label-width="0px" prop="pwd">
              <el-input class='login-input' type="password" v-model="ruleForm.pwd" placeholder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-button class="login-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <!--
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <router-link to="/register">
              <el-button style="margin-left:10px">注册</el-button>
              </router-link>
          -->
           
      </el-row>
      </div>
    </el-card>
  </div>

</template>

<script>


import {getEncryptCode} from '@/config/common'
import axios from "axios";
import store from '@/store'
// import * as API from '@/api/login/.js'
export default {
  name: 'Login',

  data() {
    return {  
      ruleForm: {
        user: "",
        pwd: "",
      },
      rules: {
        user: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],
      },
      loading: false, // 是否显示加载动画
    };
  },
  methods: {
    submitForm(formName) {
    const formData = this.$refs.ruleForm.validate()
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {         
          this.$store.commit('setUsername',this.ruleForm.user) 
          const rsaPwd = getEncryptCode(this.ruleForm.pwd)
          // console.log(rsaPwd);
          this.$store.commit('setPassword',rsaPwd) 
          axios({
            method: 'post',
            url: '/api/appPlatform/login',
            params: {
              username: this.ruleForm.user,
              password: rsaPwd
            }
          }).then(res=>{
            // console.log(res,'res')
            this.$store.commit('setToken',res.data.value.token) 
            this.$store.commit('setUserinfo',res.data.value.user) 
            // console.log(this.$store,'store')
            // console.log(this.$store.getters.userInfo,'userinfo')
            //  if(this.$store.getters.username === res.data.value.user.username&&res.data.value.user.password === 'it \'s a secret')
            if(res.status == 200) 
            {
              this.$router.push({name: 'menucenter'})
             }else{
              alert('账号密码错误')
             }
            
          }).catch(err => {
            if (err.response && err.response.status == 500) {
                this.error_tip = err.response.data.resultMessage
                alert(this.error_tip)
            } 
      });

        } 
      });
    },
  
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>


.login{
    width: 100%;
    height: 100%;
    background: url(@/assets/images/bg.png) no-repeat;
    background-size: cover;
    background-position: center;


    .box-card{
        width: 4.5rem;
        height: 5.5rem;
        background-color: rgba(24,131,241,0.29);
        border-radius: .2rem;
        position: fixed;
        right: 50%;
        top: 50%;
        transform: translate(50%,-50%);
        border: none;
      }

    .logo {
      margin: 0.55rem auto 0.5rem auto;
      
    }
    .loginTitle{
        display: block;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        font-weight: bold;
    }

    :deep(.el-input__inner){
         width:100%;
         height: 0.56rem;
         color: #fff;
         background-color: transparent !important;
         border: none;
         border-bottom: 1px solid rgba(255, 255, 255, 0.2);
         font-size: 0.17rem;
         text-align: center;

         &::placeholder {
            color: #fff;
          }
      }
      
    :deep(.el-form-item__error){
      font-size: 0.17rem;
      color: red;
      position: absolute;
    }

    :deep(.el-form-item__label){
      padding: 0px;
      margin:0px;
      width:0px;
    }
      :deep(.login-button){
        margin: 0.46rem auto 0 auto;
        width: 100%;
        height: 0.56rem;
        line-height: 0.56rem;
        text-align: center;
        border-radius: 0.15rem;
        color: #fff;
        font-size: 0.2rem;
        background-color: rgba(21, 141, 255, 0.5);
        padding: 0;
        &.active,
        &:hover {
            cursor: pointer;    
            background-color: #279bff7a;
        }
      }


}

.login-from {
  margin: 0.5rem auto 0 auto;
} 
</style>