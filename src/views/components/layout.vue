<template>
    <div class="indexCenter flex">
        <div class="header flex">
            <el-row type="flex" justify="space-between">
                <el-col :span="4" ><span class="logo">微应用</span></el-col>
                <el-col :span="4" >
                    <label class="controlLogo" @click="$router.push({name: 'controlcenter'})">控制台</label> 
                    <el-dropdown>
                        <i class="el-icon-user" style="color: #fff; cursor: pointer; font-size:20px; margin-left: 20px;">{{ userInfo.name }}</i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><label @click="loginOut">退出</label></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>

        <div class="content flex">
            <div class="menuBox flex">
                <div class="menuBoxcenter flex"> <router-view /></div>
                
            </div>
            
        </div>
    </div>
  </template>
  
<script>

import * as API from '@/api/center.js'

  export default {
    name: 'layout',
    data(){
        return{
            userInfo: this.$store.getters.userInfo
        }
    },
    methods: {
        loginOut(){
            this.$router.push('/login')
            this.$store.commit('logout') 
        }
    }
  };
  </script>
  
<style lang='less' scoped>
  .indexCenter{
    width: 100%;
    height: 100%;
    background: #ecf2ff;
    background-image: linear-gradient(to bottom,#648afa 0,#77c5fc 10%,#ecf2ff);
    flex-direction: column;

    .logo{
        font-size: 24px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        margin-left: 0.5rem;
        float: left;
    }

    .controlLogo{
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        float: left;
    }

    .router-link-active {
    text-decoration: none;
    }

    .header{
        width: 100%;
        height: 70px;
        padding-top: 23px;

        :deep(.el-row){
            margin: 0;
            padding: 0;
            height: 65px;
        }

        :deep(.el-col){
            margin: 0px;
            padding: 0;
            float: left;
        }

        /deep/ .el-dropdown{
            float: left;
            margin-top: 5px;
        }
    }

    .content{
        width: 100%;
        height: calc(100% - 70px);
        overflow: auto;
    }

    .menuBox{
        width: 1440px;
        height: 90%;
        margin: 30px auto;
        border-radius: 10px;
        background: #fff;
        padding: 30px 40px;
        flex-direction: column;
    }



    .menuBoxcenter{
        overflow: auto;
        width: 100%;
        height: calc(100% - 30px);
        background: #fff;
    }
  }
</style>