<template>
    <div class="home">
        <el-dialog
            :title="title"
            :visible.sync="visible"
            @cancel="closed"
            class="dialogs"
            width="60%">
            <div class="dialogContext">
                <div class="step">
                    <el-steps direction="vertical" :active="active" space="120px"  finish-status="success">
                        <el-step title="下载值日模板">
                            <template slot="description">
                                <div class="temp">
                                <el-button class="tempButton">下载周次值日模版</el-button>
                                <el-button class="tempButton">下载学期值日模版</el-button>
                                <el-button class="tempButton">已有模版</el-button>
                            </div>
                            </template>
                        </el-step>
                        <el-step title="上传文件"></el-step>
                        <el-step title="33333"></el-step>
                    </el-steps>
                </div>
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="closed">取 消</el-button>
                <el-button type="primary" @click="closed">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
  
export default{
    props:{
        visible:{},
    },
    data(){
        return{
            title: '',
            active: 0
        }

    },
    methods:{
        closed(){
            this.$emit('cancel',false)    /* closed是子组件方法，cancel是父组件监听事件 */
        },
        next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
}

</script>
  
<style lang="less" scoped>
    .dialogs{
        .dialogContext{
            height: 390px;
            overflow: auto;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
        }
        /deep/ .el-dialog{
            height: 500px;
        }
        /deep/.el-dialog__header{
            height: 50px;
        }
        /deep/ .el-dialog__body{
            padding: 0;

        }
        /deep/ .el-dialog__footer{
            height: auto;
            float: right;
        }
        /deep/ .el-form{
            margin-top: 16px;
        }

        /deep/ .el-form-item{
            width: 85%;
            margin-left: 20px;
        }
    }

    .step{
        height: 300px;
        margin: 30px 0 0 30px;
        .tempButton{
            margin-top: 10px;
            background-color: #3662EC;
            color: #fff;
            border-radius: 5px;
        }
        //已完成
        /deep/ .el-step__head.is-success .el-step__icon {
            background-color: #fff ;
            color: #3662EC;
            border-color: #3662EC;
        }
        /deep/ .el-step__head.is-success .el-step__line {  
            background-color: #3662EC ;
            margin: 30px 0 10px 0;
        }
        /deep/ .el-step__title.is-success {
            color: #333 ;
        }
        /deep/ .el-step__head.is-success{
            color: #3662EC;
            border-color: #3662EC;
        }
        //激活中
        /deep/ .el-step__head.is-process .el-step__icon {
            background-color: #3662EC ;
            color: #fff;
            border-color: #fff;
        }
        /deep/ .el-step__head.is-process .el-step__line {    
            background-color: #C0C4CC ;
            margin: 30px 0 10px 0;
        }
        /deep/ .el-step__title.is-process {
            color: #333 ;
        }
        //未激活
        /deep/ .el-step__head.is-wait .el-step__line {    
            background-color: #C0C4CC ;
            margin: 30px 0 10px 0;
        }



    }
</style>