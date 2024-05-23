<template>
    <div class="home">
        <!-- header -->
        <div class="title">
            <div class="titleLogo">值日排班设置</div>
            <div class="titleBack">
                <el-button class="backMenuButton" style="margin-right: 30px;" type="primary" @click="backMenu" icon="el-icon-arrow-left">返回应用中心</el-button>
            </div>
        </div>

        <div class="planTable">

            <div class="planTableBtn">
                <el-button class="elbutton" @click="down_visible = true">
                    <label class="iconfont icon-xiazai"></label>
                    <label class="btnText">下载模板</label> 
                </el-button>
            </div>

            <div class="noWeekNumTip" v-if="!currentWeekNum">
                <el-empty description="不在本学期内或者未设置当前学期"></el-empty>
            </div>
            <div class="WeekNumTip" v-if="currentWeekNum && weekTeacherList.length > 0">

            </div>
        </div>

        <!-- cancel是父子组件的监听事件，cancels是父组件的方法 -->
        <downTem :visible="down_visible" @cancel="canceld"/>    
    </div>
</template>
  
<script>
import downTem from './downTemplate.vue'
export default{
    name:'planTable',
    components:{
        downTem
    },
    data(){
        return{
            currentWeekNum:null,
            down_visible:false,
        }
    },
    methods:{
        backMenu(){
            this.$router.push({name:'menucenter'})
        },
        canceld(val){
            this.down_visible = val
        },
    }
}

</script>
  
<style lang="less" scoped>
.home{
    .title{
        display: flex;
        width: 100%;
        height: 40px;
        
        .titleLogo{
            flex: 1;
            text-align: left;
            font-size: 20px;
            font-weight: bold;
            height: 38px;
            
        }
        .backMenuButton{
            background-color: #3662EC;
        }
    }

    .planTable{
        .planTableBtn{
            .elbutton{
                background-color: #3662EC;
                margin-top: 20px;
            }
            .btnText{
                color: #fff;
                cursor: pointer;
            }
            .icon-xiazai{
                color: #fff;
                margin-right: 5px;
                cursor: pointer;
            }
        }
    }
}
</style>