<template>
    <div class="home">
        <el-dialog
            :title="titles"
            :visible="visible"
            @close="closed"
            class="dialogs"
            width="60%">
            <div class="dialogContext">
                <el-form label-position="right" ref="form" :rules="rules" class="baseForm" :model="form" label-width="15%">
                    <el-form-item label="消息标题：" prop="title">
                        <el-input v-model="form.title" placeholder="请输入消息标题" ></el-input>
                    </el-form-item>
                    <el-form-item label="消息描述：" prop="description">
                        <el-input type="textarea" v-model="form.description" placeholder="请输入消息描述" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item label="消息内容：" prop="content">
                        <quill-editor
                            v-model="form.content"
                            ref="myQuillEditor"
                            :options="editorOptions"
                        ></quill-editor>
                    </el-form-item>
                    <el-form-item label="提醒周期：" prop="dayNums" >
                        <div class="dayArea">
                            <div class="dayArea-item" :class="{'active': item.checked}" v-for="(item,index) in weekLists" :key="index" @click="checkDay(item,index)">{{item.label}}</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="" >
                        <div class="color-red">* 消息会提前一天发送</div>
                    </el-form-item>
                </el-form>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="closed" class="dialogCloseBtn">关 闭</el-button>
                <el-button @click="save" class="dialogSaveBtn">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import {modifyMsg,addMsg} from '@/api/msg.js'
export default{
    name:'',
    props:{
        visible:{},
        info:{},
        titles:{},
        weekList:{},
        types:{},
        taskType:{}
    },
    data(){
        return{
            form:{},
            weekLists:[],
            userInfo: this.$store.getters.userInfo,
            rules:{
                title: [{required: true, message:'请输入消息标题',trigger:'change'}],
                content: [{required: true, message:'请输入消息内容',trigger:'change'}],
                dayNums: [{required: true, message:'请选择提醒周期',trigger:'change'}],
            },
            editorOptions: {
                theme: 'snow', // or 'bubble'
                placeholder: '请输入消息内容',
                modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // 粗体，斜体，下划线，中间线
                    ['blockquote'],                                   // 引用
                    [{ 'header': 1 }, { 'header': 2 }],               // h1,h2
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 顺序列表，无序列表
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // 向前，向后
                    [{ 'direction': 'rtl' }],                         // 文字从左或右输入
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
                    [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
                    [{ 'align': [] }],                                // 文字对齐方式
                    ['clean']                                         // 清除样式
                ]
                }
            }
        }
    },
    watch:{
        visible(){
            if(this.visible){
                this.init()
                if(this.types == 'edit'){
                    this.weekLists = this.weekList
                    let dayNums = this.info.dayNums.split(',')
                    this.weekLists = this.weekLists.map(item=>{
                        return{
                            ...item,
                            checked: dayNums.includes(item.value)
                        }
                    })
                    this.$nextTick(()=>{
                        this.form = {
                            ...this.form,
                            title: this.info.title,
                            content: this.info.content,
                            dayNums,
                            description: this.info.description,
                        }
                    })
                }
            }
        }
    },
    methods:{
        init(){
            this.form = {
                dayNums:[],
                title:'',
                content: null,
                description: null,
                msgType: 'link',
                url: 'http://115.227.36.98:1818/ddLogin?corpId=${corpId}&appKey=${appKey}&&url=msg',
                picUrl: 'https://i01.lw.aliimg.com/media/lADPDfmVQafoVxrMyMzI_200_200.jpg',
            }
        },
        async save(){
            if(this.info.taskStatus == "启用"){
                this.$message.error('任务正在进行，无法修改（需先停止任务）')
            }else{
                this.$refs.form.validate(valid => {
                    if(valid){
                        let api = null
                        let dayNumsMc = []
                        let days = this.form.dayNums.map(item=>{
                            let time = Number(item)
                            time = time - 1
                            return time === 0 ? 7 : time
                        })
                        days.forEach(e=>{
                            let week = this.weekLists.find(r=>r.value == String(e))
                            if(!_.isEmpty(week)) dayNumsMc.push(week.label)
                        })
                        let params = {
                            ...this.form,
                            dayNums: days.join(),
                            dayNumsMc:dayNumsMc.join('、'),
                            schoolCode: this.userInfo.xxdm,
                            type: 1,
                            
                        }
                        if(this.types == 'add'){
                            api = addMsg(params)
                        }else{
                            params = {
                                ...params,
                                id: this.info.id || ''
                            }
                            api = modifyMsg(params)
                        }
                        api.then(res=>{
                            if(res.status == 200){
                                this.$message.success('保存成功')
                                this.init()
                                this.$emit('cancel',false) 
                            }
                        })

                    }else{
                        this.$message.error('表单错误')
                    }
                })
            }
        },
        checkDay(item,index){
            this.weekLists[index].checked = !item.checked
            if(this.weekLists[index].checked){
                let index = this.form.dayNums.findIndex(e=>e == item.value)
                if(index == -1) this.form.dayNums.push(item.value)
            }else{
                this.form.dayNums = this.form.dayNums.filter(e=>e != item.value)
            }
        },
        closed(){
            this.$emit('cancel',false)    /* closed是子组件方法，cancel是父组件监听事件 */
        }
    }
}

</script>
  
<style lang="less" scoped>
.home{
    .dialogs{
        
        .dialogCloseBtn{
            background-color: rgba(54, 98, 236, 0.14);
            color: #3662EC; 
            border-color: rgba(54, 98, 236, 0.14);
            border-radius: 8px;
        }
        .dialogSaveBtn{
            background-color: #3662EC;
            color: #fff; 
            border-radius: 8px;
        }
        .el-button:disabled {
            color: #fff;
            background-color: #dce0ea;
            border: none;
            cursor: not-allowed;
        }
        /deep/ .el-dialog {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0px !important;
        }
        /deep/.el-dialog__header{
            border-bottom: 1px solid #E8E8E8;
            padding-top: 10px;
        }
        
        /deep/ .el-dialog__body{
            padding: 24px;
            height: 500px;
            overflow-y: auto;
        }
        /deep/ .el-dialog__footer{
            border-top: 1px solid #E8E8E8;
            padding-bottom: 10px;
        }
        /deep/ .el-dialog__headerbtn{
            top: 10px;
        }
    }

    .dialogContext{
        padding: 0 0 80px 0;
        /deep/ .ql-editor.ql-blank::before {
            color: #CCCFD6;          /* 设置占位符文本颜色 */
            font-style: normal;  /* 设置占位符文本样式 */
            font-size: 16px;     /* 设置占位符文本大小 */
        }

        /deep/ .ql-editor {
            height: 300px;  /* 设置编辑器的高度 */
            margin-bottom: 20px; /* 增加下边距，避免与下方内容挤占 */
        }

        /deep/ .ql-editor .ql-container {
            height: 100%; /* 确保容器高度占满父元素 */
        }

    }
    .dayArea{
        .dayArea-item{
            display: inline-block;
            border: 1px solid #3662EC;
            color: #3662EC;
            border-radius: 6px;
            padding: 0 15px;
            line-height: 30px;
            margin-right: 10px;
            cursor: pointer;
            &.active{
                background: #3662EC;
                color: #fff;
            }
        }
    }
}
</style>