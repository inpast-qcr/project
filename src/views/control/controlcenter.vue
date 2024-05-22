<template>
    <div class="home">
        <el-container style="height: 100%; border: 1px solid #eee">
        <!-- 侧边栏 -->
        <div  style="background-color: #0e1652">
            
            <el-menu background-color="#0e1652" text-color="#fff" 
                    class="el-menu-vertical-demo"
                    :default-active="$route.path" 
                    router 
                    :collapse="isCollapse"
                    :default-openeds="['2']"
            >
                <el-submenu index="1" class="title">
                    <template slot="title">
                        <span class="logo" @click="$router.push({name: 'menucenter'})">智慧校园微应用</span>
                    </template>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">管理</span>
                    </template>
                    <!-- 侧边栏内容 -->
                    <el-menu-item  v-for="item in menuList" :index="'/controlcenter' + item.path" :key="item.path">
                        <label @click="addTab(editableTabsValue)">{{ item.title }}</label>  <!-- 添加标签页 -->
                    </el-menu-item>                    
                    <!-- <el-menu-item index="/controlcenter/controlrole">
                        <label @click="addTab(editableTabsValue)">角色</label>
                    </el-menu-item> -->

                </el-submenu>
            </el-menu>
        </div>
        <!-- header -->
        <el-container>
            <el-header height="110px">
                <div class="headerTitle">
                    <div class="open">
                        <span v-if="!isCollapse" class="el-icon-s-fold" @click="changeMenu"></span>    <!-- 左 -->
                        <span v-else class="el-icon-s-unfold" @click="changeMenu"></span>  <!-- 右 -->
                        
                    </div>
                    <el-dropdown >
                        <i class="el-icon-arrow-down el-icon-user" style="color: rgb(51, 51, 51); cursor: pointer; font-size:20px; margin-left: 20px;">{{ userInfo.name }}</i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><label @click="loginOut">退出</label></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- 标签页 -->
                <div class="menuTab">
                    menuTab
                </div>
            </el-header>
            <!-- 主体 -->
            <el-main>

                <div class="serviceBox">
                    <router-view />
                </div>
                
            </el-main>
        </el-container>
    </el-container>
    </div>

</template>

<style lang="less" scoped>
    .home{
        width: 100%;
        height: 100%;
        .el-menu{
            border: none;
            /deep/ .is-active{
                background:linear-gradient(to right, rgba(57, 100, 249, 0.6), rgba(57, 100, 249, 0)) !important;
                color:#fff;

            }
            /deep/ .el-menu-item{
                &:hover{
                    background: linear-gradient(to right, rgba(57, 100, 249, 0.3), rgba(57, 100, 249, 0));
                }
            }

        }
        /deep/ .el-card-body{
                padding: 0px;
            }
        /deep/ .el-main{
            width: 100%;
            height: 100%;
            padding: 0px;
            display: flex;
        }
        /deep/ .el-header {
            height: 110px;
            // display: flex;
            background-color: #fff;
            color: rgb(51, 51, 51);
            line-height: 64px;
            text-align: right; 
            font-size: 20px;
        }
    }
    .logo{
        width: 210px;
        height: 70px;
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        padding-left: 14px;
    }

    
    .el-aside {
      color: #333;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;
    }
    .submenu{
        width: 100%;
    }
    .open{    
            color: #000000;
            text-align: left !important;
            width: 50px;
            height: 50px;
            font-size: 21px;
            cursor: pointer;
    }
    .el-icon-setting{
        color: #fff;
        font-size: 16px;
    }
    .title{
        /deep/ .el-icon-arrow-down{
            display: none;
        }
    }
    .menuTab{
        width: 100%;
        height: 50px;
        background-color: #fff;
        color: #333;
        text-align: left;
    }
    .headerTitle{
        width: 100%;
        height: 60px;
        display: flex;
        border-bottom: solid #e8e8e8 1px;
        justify-content: space-between;
    }
    .serviceBox{
        display: flex;
        width: 100%;
        height: 100%;
        background: #F1F4FD;
        flex: 1;
    }
</style>
  
<script>
import * as API from '@/api/menu.js'
export default {
    data(){
        return{
            userInfo: this.$store.getters.userInfo,
            isCollapse: false,
            menuList: []
        }
    },
    created(){
        this.getMenuRouter()
    },
    methods:{
        loginOut(){
            this.$router.push('/login')
            this.$store.commit('logout') 
        },
        changeMenu(){
            this.isCollapse = !this.isCollapse
            console.log(isCollapse,'isCollapse');
        },        
        async getMenuRouter(){
            let res = await API.getMenuRouter()
            let menuListRes = res.data.value[0].children[0].children
            console.log(menuListRes,'res-menuList')
            this.menuList = menuListRes

        }
    }
};
</script>