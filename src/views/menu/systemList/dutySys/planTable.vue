<template>
    <div class="home">
        <!-- header -->
        <div class="title">
            <div class="titleLogo">值日排班设置</div>
            <div class="titleBack">
                <el-button class="backMenuButton" style="margin-right: 30px;" type="primary" @click="backMenu" icon="el-icon-arrow-left">返回应用中心</el-button>
            </div>
        </div>

        <div class="planTable"></div>
    </div>
</template>
  
<script>
  
  export default{
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
    }
}
</style>