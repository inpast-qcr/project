<template>
    <div class="home">
        <!-- 顶部 -->
        <div class="title">
            <div class="titleLogo">资产类型</div>
            <div class="titleBack">
                <el-button class="backMenuButton" @click="backMenu" icon="el-icon-arrow-left">返回应用中心</el-button>
            </div>
        </div>
        <!-- 搜索栏 -->
        <div class="searchTab">
            <el-form :inline="true"  class="demo-form-inline">
                <!-- 搜索框1 -->
                <el-form-item>
                    <el-input placeholder="请输入资产类型名称" v-model="searchValue" clearable></el-input>
                </el-form-item>
                <!-- 搜索框2 -->
                <el-form-item>
                    <el-select 
                    v-model="deviceType"
                    placeholder="请选择资产类型"
                    clearable
                    filterable
                    >
                    <el-option
                        v-for="(item,index) in userTypeList"
                        :key="index"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                </el-form-item>
                <!-- 查询按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 按钮 -->
        <div class="btns">
            <el-button type="primary"  icon="el-icon-plus">
                <label>添加</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-edit">
                <label>编辑</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-delete">
                <label>删除</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-unlock">
                <label>启用</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-lock">
                <label>停用</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-download">
                <label>下载模板</label>
            </el-button>

        </div>

        <!-- 数据 -->
        <div class="searchDatas">
            <el-table
                ref="multipleTable"
                :data="tableData"
                :pagination="pagination"
                style="width: 100%"
                :header-cell-style="{background:'#F7F7FA',color:'#606266'}"
                @selection-change="handleSelectionChange"
                @select="select"
                :key="keys"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                >   
                <!-- 一级表格 -->
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                

                <el-table-column label="序号" prop="xh">
                    <template slot-scope="{ row }">
                    <label v-if="row.childCount > 0" class="xhButtonzhankai"> {{ row.xh }} </label>
                    <label v-else class="xhButton">{{row.xh}}</label>                   
                    </template>
                </el-table-column>
                <el-table-column label="资产类别" prop="type"></el-table-column>
                <el-table-column label="类型代码" prop="code"></el-table-column>
                <el-table-column label="类型名称" prop="name"></el-table-column>
                <el-table-column label="状态" prop="isActive">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isActive == '启用'">
                            <span style="color: #07b578">{{ scope.row.isActive }}</span>
                        </span>
                        <span v-else>
                            <span style="color: #fa5151 ">{{ scope.row.isActive }}</span>
                        </span>
                        </template>
                </el-table-column>
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
    </div>
</template>
  
<script>
import * as API from '@/api/equipment.js'
import { nbi } from 'jsencrypt/lib/lib/jsbn/jsbn'
  export default{
    data(){
        return {
            keys:Math.random(),
            visible: false,
            searchValue: null,
            deviceType: undefined,           
            templateSelection: '',
            // templateRadio: null,
            userInfo: this.$store.getters.userInfo,
            multipleSelection: [],
            tableData: [],
            tableChildData:[],
            userTypeList:[
                    {
                        label:"设备",
                        value:"1",
                    },
                    {
                        label:"耗材",
                        value:"2",
                    }
            ],
            pagination:{
                total: 0,
                current: 1,
                pageSize: 10, 
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
            },
        }
    },
    
    async mounted(){
      this.searchData()
    },
    methods: {
        async searchData() {
            let params = {
                schoolCode: this.userInfo.xxdm,
                name: this.searchValue,
                pageNum: this.pagination.current,
                pageSize: this.pagination.pageSize,
                type: this.deviceType,
            }
            let res = await API.getEquipmentList({...params})
            if(res.status == 200){
                this.tableData = res.data.value.list.map((item,index)=>{
                    let arr = {}
                    arr ={
                        type: item.type == '1' ? '设备' : '耗材',
                        isActive: item.isActive == '1' ? '启用' : '停用',
                        name:item.name,
                        code:item.code,
                        xh: (this.pagination.current - 1) * this.pagination.pageSize + (index + 1),
                        childCount: item.childCount
                    }

                    return {
                        ...item,
                        ...arr,   
                        visible: false,
                        key: index + '_parent_',
                    }
                })
                this.pagination.total = res.data.value.total
            }
            this.searchChildData()
            this.keys = Math.random()
        },
        async searchChildData(){
            for(let i = 0;i<this.tableData.length; i++){
                let res = await API.getEquipmentList({
                    schoolCode: this.userInfo.xxdm,
                    superCode: this.tableData[i].code,
                })


                if(res.status == 200){
                this.tableData[i].children = res.data.value.list.map((item,index)=>{
                        let arr = {}
                        arr = {
                            type: item.type == '1' ? '设备' : '耗材',
                            isActive: item.isActive == '1' ? '启用' : '停用',
                            name:item.name,
                            code:item.code,
                            xh: index+1
                        }
                        
                        return{
                            ...item,
                            ...arr,
                            key: index + '_child_' + item.code,
                        }
                    })
                }
                this.keys = Math.random()

            }
            // console.log(this.tableData,'this.tableData');

            
        },
        backMenu(){
            this.$router.push({name:'menucenter'})
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
        },
        handleCurrentChange(current) {
            this.pagination.current = current;
        },
        select(selection, row){
            this.bill_id = row.id;
            // 清除 所有勾选项
            this.$refs.multipleTable.clearSelection()
            // 当表格数据都没有被勾选的时候 就返回
            // 主要用于将当前勾选的表格状态清除
            if(selection.length == 0) return 
            this.$refs.multipleTable.toggleRowSelection(row, true);
        },
        
    }
  }

</script>
  
<style lang="less" scoped>
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

    // .backMenuButton{
    //     flex: 1;
    //     background-color: rgb(54, 98, 236);
    //     color: #fff;
    //     height: 38px;
    //     float: left;
    // }
}
.home{
    .el-button{
        flex: 1;
        background-color: rgb(54, 98, 236);
        color: #fff;
        height: 38px;
        float: left;
    }
    .xhButton{
        padding-left:26px;
    }
    .xhButtonjian{
        background-color: #fff;
        color: blue;
        padding: 0;
        width: 15px;
        height: 15px;
        margin: 4px 10px 0 0;
    }
    .xhButtonText{
        margin-left: 24px;
    }
    .el-pagination{
        font-size: 16px;
    }
    /deep/ .el-radio__inner{
        margin-left: 20px;
    }
    /deep/.el-table__header-wrapper  .el-checkbox{
        display:none
    }
    
/*     // 修改展开前的图标
    /deep/ .el-table__expand-icon .el-icon-arrow-right:before {
        content: "\e6d9";
    }
    // 去掉小图标的旋转效果
    /deep/ [class*="el-table__row--level"] .el-table__expand-icon {
        transform: rotate(0);
    }
    // 修改展开之后的图标
    /deep/ .el-table__expand-icon--expanded .el-icon-arrow-right:before {
        content: "\e6d8";
    } */


}
.searchTab{
    display: flex;
    width: 95%;
    height: 60px;;
    margin: 20px 0 0 0;

    /deep/ el-form{
        margin-bottom: 10px;
    }
    /deep/ .el-form-item{
        height: 45px;
        margin: 0 20px 0 0;
    }

  }
  .btns{
    // background-color: aquamarine;
    width: 100%;
    height: 45px;
  }
  .searchDatas{
    padding-top: 20px;
  }

</style>