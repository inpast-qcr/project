<template>
    <div class="home">
        <el-dialog
            title="下载模板"
            :visible.sync="visible"
            @cancel="closed"
            class="dialogs"
            width="60%">
            <div class="dialogContext">
                <div class="step">
                    <el-steps direction="vertical" :active="current" space="120px"  finish-status="success">
                        <el-step title="下载值日模板">
                            <div class="temp" slot="description">
                                <el-button class="tempButton" @click="down(1)">下载周次值日模版</el-button>
                                <el-button class="tempButton" @click="down(2)">下载学期值日模版</el-button>
                                <el-button class="tempButton" @click="current = 1">已有模版</el-button>
                            </div>
                            
                        </el-step>
                        <el-step title="上传文件">
                            <div class="temp" slot="description">
                                <div class="dialogRadio">
                                    <el-radio v-model="radio" label="1">学期</el-radio>
                                    <el-radio v-model="radio" label="2">周次</el-radio>
                                </div>
                                <el-button class="tempButton" :disabled="current == 0">上 传</el-button>
                                <div class="redNotice">注：若值日老师姓名不存在或者重名，请手动维护</div>
                            </div>
                            
                        </el-step>
                    </el-steps>
                </div>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="closed" class="dialogCloseBtn">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import {downloadTemplate,downloadTemplateForWholeTerm,queryCurSchoolYear} from '@/api/duty.js'
import {downFile} from '@/config/common.js'
export default{
    props:{
        visible:{},
    },
    data(){
        return{
            radio: '1',
            current: 0,
            userInfo: this.$store.getters.userInfo,
            currentYear:null,
        }

    },
    methods:{
        closed(){
            this.$emit('cancel',false)    /* closed是子组件方法，cancel是父组件监听事件 */
            this.current = 0
        },
        down(type){
            let api = null
            if(type == 1){
                api = downloadTemplate({schoolCode: this.userInfo.xxdm})
            }else{
                api = downloadTemplateForWholeTerm({schoolCode: this.userInfo.xxdm, schoolYear: this.currentYear})
            }
            api.then(res=>{
                // console.log(res,'res');
                downFile(res.data,type == 1 ? '周次值日模版.xls' : '学期值日模版.xls')
                this.current = 1
            })
        },
        async getCurrentYear(){
            let res = await queryCurSchoolYear({
                schoolCode: this.userInfo.xxdm
            })
            if(res.status == 200){
                this.currentYear = res.data.value
            }
        },
    },
    watch:{
        visible(){
            if(this.visible){
                this.getCurrentYear()
            }
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
        .dialogCloseBtn{
            background-color: rgba(54, 98, 236, 0.14);
            color: #3662EC; 
            border-color: rgba(54, 98, 236, 0.14);
            border-radius: 8px;
        }
        .dialogRadio{
            margin: 10px 0;
        }
        .redNotice{
            color: red;
            margin-top: 10px;
        }
        .el-button:disabled {
            color: #fff;
            background-color: #dce0ea;
            border: none;
            cursor: not-allowed;
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