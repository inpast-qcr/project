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

        <div class="searchDatas">
            <el-table
                ref="multipleTable"
                :data="tableData"
                :pagination="pagination"
                style="width: 100%"
                :header-cell-style="{background:'#F7F7FA',color:'#606266'}"
                @selection-change="handleSelectionChange"
                @select="select"
                >   
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>

                    <el-table-column label="序号" prop="xh"></el-table-column>
                    <el-table-column label="消息标题" prop="title"></el-table-column>
                    <el-table-column label="消息状态" prop="taskStatus">
                        <template slot-scope="scope">
                            <span v-if="scope.row.taskStatus == '启用'">
                                <span style="color: #07b578">{{ scope.row.taskStatus }}</span>
                            </span>
                            <span v-else>
                                <span style="color: #fa5151 ">{{ scope.row.taskStatus }}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="消息内容" prop="content">
                        <template  slot-scope="scope">
                            <label class="color-active" @click="viewMsg(scope)">查看消息内容</label>
                        </template>
                    </el-table-column>
                    <el-table-column label="提醒周期" prop="dayNumsMc"></el-table-column>
                    
            </el-table>
                <!-- 分页 -->
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.current"
                    :page-sizes="pagination.pageSizeOptions"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
                </el-pagination>
            </div>
        </div>

        <!-- 消息内容弹框 -->
        <el-dialog
            :title="viewTitle"
            :visible.sync="view_visible"
            class="dialogs">
            <div class="dialogContext">
                <div class="msgInfo" v-html="msgInfo"></div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogCloseBtn" @click="view_visible = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
  
<script>
import { getMsgPage,openTask,stopTask,addMsg,modifyMsg,removeMsg } from '@/api/msg.js'
export default{
    name:'',
    data(){
        return{
            tableData:[],
            pagination:{
                total: 0,
                current: 1,
                pageSize: 10, 
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
            },
            multipleSelection:[],
            userInfo: this.$store.getters.userInfo,
            view_visible:false,
            msgInfo: null,
            viewTitle:''
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        backMenu(){
            this.$router.back()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //多选变单选
        select(selection, row){
            this.bill_id = row.id;
            // 清除 所有勾选项
            this.$refs.multipleTable.clearSelection()
            // 当表格数据都没有被勾选的时候 就返回
            // 主要用于将当前勾选的表格状态清除
            if(selection.length == 0) return 
            this.$refs.multipleTable.toggleRowSelection(row, true);
        },
        //  pagination设置
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
            this.searchData()
        },
        handleCurrentChange(current) {
            this.pagination.current = current;
            this.searchData()
        },
        viewMsg(item){
            this.view_visible = true
            this.msgInfo = item.row.content
            this.viewTitle = '查看【' +item.row.title+ '】消息内容' 
        },

        init(){
            this.pagination.current = 1
            this.tableData = undefined
            this.search()
        },

        async  search(){
            let res = await getMsgPage({
                pageNum: this.pagination.current,
                pageSize: this.pagination.pageSize,
                schoolCode: this.userInfo.xxdm
            })
            this.tableData = res.data.value.records.map((item,index)=>{
                let dayNumsMc = []
                let d = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                
                //将7123456转为1234567
                let days = item.dayNums.split(',').map(e=>{
                    let time = e
                    if(Number(time) == 7) time = 1
                    else time = Number(time) + 1
                    return time
                })
                
                //修改1为周一
                dayNumsMc= days.map(num => d[(num === 7 ? 0 : num)])

                return{
                    ...item,
                    xh: (this.pagination.current - 1) * this.pagination.pageSize + (index + 1),
                    taskStatus: item.taskStatus == '1' ? '启用' : '停用',
                    dayNumsMc:dayNumsMc.join('、'),
                    dayNums:days.join()
                }
            })
        }
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

    .searchDatas{
        margin-top: 20px;

        // 表格首行选框
        /deep/.el-table__header-wrapper  .el-checkbox{
        display:none
    }
    }

    .dialogs{
        // display: flex;
        
        .dialogCloseBtn{
            background-color: rgba(54, 98, 236, 0.14);
            color: #3662EC; 
            border-color: rgba(54, 98, 236, 0.14);
            border-radius: 8px;
        }
        .el-button:disabled {
            color: #fff;
            background-color: #dce0ea;
            border: none;
            cursor: not-allowed;
        }
        /deep/ .el-dialog{
            height: auto;
            max-height: 74vh;
            overflow: hidden;
            width: 60%;
            display: flex;
            flex-direction: column;
        }
        /deep/.el-dialog__header{
            border-bottom: 1px solid #E8E8E8;
            padding-top: 10px;
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 40px;
        }
        
        /deep/ .el-dialog__body{
            padding: 24px;
            max-height: calc(100%-105px);
            overflow-y: auto;
            flex: 1;
        }
        /deep/ .el-dialog__footer{
            border-top: 1px solid #E8E8E8;
            padding-bottom: 10px;
            flex-shrink: 0
        }
        /deep/ .el-dialog__headerbtn{
            margin-left: 30px;
        }
}
}
</style>