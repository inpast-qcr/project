<template>
    <div class="menu">      
        <div class="menuTitle">微服务中心</div>
        <div clas="menu-nav">
            <el-menu :default-active="activeIndex.toString()" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                <el-menu-item v-for="(item,index) in menuList" :key="item.id + '_nav'" :index="index.toString()" @click="changeNav(item,index)">
                    {{ item.categoryName }}
                </el-menu-item>      
            </el-menu>
        </div>
        <div class="menu_box">
            <div v-if="childList && childList.length > 0">
                <div class="child" v-for="item in childList" :key="item.id + '_child'" @click="toSys(item)">
                    <div class="child_content">
                        <div class="child_logo" :style="{ background: item.iconColor ? item.iconColor : '#168dff1a', }">
                            <img :src="item.icon" @error="defaultLogo" alt="">
                        </div>
                        <label class="child_title">{{ item.name }}</label>
                    </div>
                </div>
            </div>
            <div class="emptyData" v-if="childList.length == 0">暂无数据</div>
            
        </div>
    </div>
</template>

<script>
import * as API from '@/api/center.js'
    export default{
        name:'menucenter',
        data(){
            return{
                index:0,
                activeIndex: 0,
                menuList: [],
                childList: [],
            }
        },
        created(){
            this.getMenuParentData()
        },
        methods: {
            defaultLogo(e){
            let img = e.srcElement
            img.src = require('../../assets/images/serviceIcon/icon1.png')
            img.onerror = null
            },
            async getMenuParentData(){
                let res = await API.queryAppCategoryInCenterList({
                    categoryType: 1,
                    orgId:this.$store.getters.userInfo.orgId,
                })                
                this.menuList = res.data.value

                if(this.menuList && this.menuList.length > 0){
                    
                    this.changeNav(this.menuList[this.activeIndex],this.activeIndex)

                }
            },

            changeNav(item,index){
                this.activeIndex = index
                this.loadinng = true
                this.getChildData(item)
            },

            async getChildData(item){
                let res = await API.queryAppInCenterList({
                    appType:1,
                    categoryId: item.id,
                    orgId: this.$store.getters.userInfo.orgId
                })
                if(res.status == 200){
                    this.childList = res.data.value  
                        // console.log(res.data.value ,'res.data.value ');

                }
            },

            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            toSys(item){
            let sourcepath = item.sourcePath.substring(7)
            this.$router.push({path: sourcepath})
        },
        },
    }

</script>

<style lang="less" scoped>
.menu{
    width: 100%;
    height: 100%;
}
.menu_box{
    flex: 1;
    height: calc(100% - 100px);
    width: 100%;
    overflow-y: auto;
    padding: 20px 10px 10px 10px;
    position: relative;
}
.child{
    float: left;
    width: 20%;
    height: 80px;
    padding: 0 10px 5px 5px;
    margin-bottom: 23px;

    .child_content{
        height: 100%;
        width: 100%;
        padding: 0 17px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
    }
    .child_logo{
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 13px;
        display: block;
        background: rgb(22, 141, 255);
        min-width: 50px;
        padding: 10px;
        img{
                width: 100%;
                height: 100%;
                display: block;
            }
    }
    .child_title{
        font-size: 16px;
        line-height: 21px;
        color: #000;
        font-weight: 700;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
.emptyData{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}
.menuTitle{
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>