<template>
    <div class="home">
        <div class="title">
            <div class="titleLogo">值日消息设置</div>
            <div class="titleBack">
                <el-button class="backMenuButton" style="margin-right: 30px;" type="primary" @click="backMenu" icon="el-icon-arrow-left">返回应用中心</el-button>
            </div>
        </div>

        <div class="btns">
            <el-button class='elbutton'>
                <label class="el-icon-plus icons"></label>
                <label class="btnText">添加</label>
            </el-button>
            <el-button class='elbutton'>
                <label class="el-icon-edit icons"></label>
                <label class="btnText">编辑</label>
            </el-button>
            <el-button class='elbutton'>
                <label class="el-icon-delete icons"></label>
                <label class="btnText">删除</label>
            </el-button>
            <el-button class='elbutton'>
                <label class="el-icon-unlock icons"></label>
                <label class="btnText">开启</label>
            </el-button>
            <el-button class='elbutton'>
                <label class="el-icon-lock icons"></label>
                <label class="btnText">停止</label>
            </el-button>
        </div>
    </div>
</template>
  
<script>
import { getMsgPage,openTask,stopTask,addMsg,modifyMsg,removeMsg } from '@/api/msg.js'
export default{
    name:'',
    data(){
        return{

        }
    },
    methods:{

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

    .btns{
        .elbutton{
            background-color: #3662EC;
            margin-top: 20px;
        }
        .btnText{
            color: #fff;
            cursor: pointer;
        }
        .icons{
            color: #fff;
            margin-right: 5px;
            cursor: pointer;
        }
    }
}
</style>