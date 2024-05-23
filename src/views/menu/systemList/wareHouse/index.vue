<template>
    <div class="home">
        <!-- 顶部 -->
        <div class="title">
            <div class="titleLogo">耗材入库登记</div>
            <div class="titleBack">
                <el-button class="backMenuButton" style="margin-right: 30px;" type="primary" @click="backMenu" icon="el-icon-arrow-left">返回应用中心</el-button>
            </div>
        </div>
        <!-- 搜索栏 -->
        <div class="searchTab">
            <el-form :inline="true"  class="demo-form-inline">
                <!-- 搜索框1 -->
                <el-form-item>
                    <el-input placeholder="请输入耗材名称" v-model="searchValue" clearable></el-input>
                </el-form-item>
                <!-- 搜索框2 -->
                <el-form-item>
                    <!-- <el-select class="main-select-tree" ref="selectTree" v-model="equipmentType" clearable >
                        <el-option  style="height: 100%; padding: 0" value="">
                            <el-tree 
                                class="main--el-tree"
                                ref="selectelTreeselect"
                                :data="selectData"
                                :props="treeProps"
                                node-key="id"
                                @node-expand="nodeExpand"
                                @node-click="handNodeClick"
                                />
                        </el-option>
                    </el-select> -->
                    <el-cascader
                        v-model="equipmentType"
                        :options="selectData"
                        :props="cascaderProps"
                        placeholder="请选择资产类型"
                        clearable>
                    </el-cascader>
                </el-form-item>

                <!-- 查询按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 按钮 -->
        <div class="btns">
            <el-button type="primary"  icon="el-icon-plus" @click="dialogConfig('add')">
                <label class="btnsLabel">添加</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-edit" :disabled="dis()" @click="dialogConfig('edit')">
                <label class="btnsLabel">编辑</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-delete" :disabled="dis()" @click="del">
                <label class="btnsLabel">删除</label>
            </el-button>
            <el-button type="primary"  icon="el-icon-download">
                <label class="btnsLabel">下载模板</label>
            </el-button>

        </div>
        <!-- 添加弹窗 -->
        <!-- <div class="dialogs"> -->
            <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="60%"
                class="dialogs">
                <div class="addContext">
                    <el-form :rules="rules" :model="addForm" ref="addRuleForm" label-width="120px">
                        <el-form-item label="耗材名称" prop="name">
                            <el-input v-model="addForm.name" :disabled="diaglogType == 'edit'" placeholder="请输入耗材名称"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌" prop="model">
                            <el-input v-model="addForm.model" placeholder="请输入品牌"></el-input>
                        </el-form-item>
                        <el-form-item label="资产类型" prop="deviceTypeCode">
                            <!-- <el-select class="main-select-tree" ref="selectTree" v-model="equipmentType" clearable placeholder="请选择资产类型" style="width:100%" v-if="diaglogType == 'add'">
                                <el-option  style="height: 100%; padding: 0" value=""  placeholder="请选择资产类型">
                                    <el-tree 
                                        class="main--el-tree"
                                        ref="selectelTreeselect"
                                        :data="selectData"
                                        :props="treeProps"
                                        node-key="id"
                                        @node-expand="nodeExpand"
                                        @node-click="handNodeClick"
                                        
                                        />
                                </el-option>
                            </el-select> -->
                            <el-cascader
                                v-model="equipmentType"
                                :options="selectData"
                                placeholder="请选择资产类型"
                                style="width:100%"
                                :props="cascaderProps"
                                v-if="diaglogType == 'add'"
                                clearable>
                            </el-cascader>
                            <el-select v-model="addForm.deviceTypeCode" placeholder="请选择资产类型" v-if="diaglogType == 'edit'" :disabled="diaglogType == 'edit'" style="width:100%">
                                <el-option :value="this.info.deviceTypeCode" >
                                    {{this.info.deviceTypeName}}
                                </el-option>
                            </el-select>
                            <!-- <el-input v-model="addForm.deviceTypeCode" placeholder="请选择资产类型"></el-input> -->
                        </el-form-item>
                        <el-form-item label="入库日期" prop="indate" v-if="diaglogType == 'add'">
                            <el-date-picker v-model="addForm.indate"  type="date" placeholder="请选择入库日期" value-format="yyyy-MM-dd" style="width:100%"></el-date-picker>
                            <!-- <el-input v-model="addForm.indate" placeholder="请选择入库日期"></el-input> -->
                        </el-form-item>
                        <el-form-item label="供应商/维保商" prop="maintenancerId">
                            <el-select v-model="addForm.maintenancerId" placeholder="请选择供应商/维保商" style="width:100%">
                            <el-option
                                v-for="(item,index) in provideList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                            </el-select>
                            <!-- <el-input v-model="addForm.maintenancerId" placeholder="请选择供应商/维保商"></el-input> -->
                        </el-form-item>
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model="addForm.unit" placeholder="请输入单位"></el-input>
                        </el-form-item>
                        <el-form-item label="批次编码" prop="batch">
                            <el-input v-model="addForm.batch" placeholder="请输入批次编码"></el-input>
                        </el-form-item>
                        <el-form-item label="单价" prop="price" v-if="diaglogType == 'add'">
                            <el-input v-model="addForm.price" placeholder="请输入单价"></el-input>
                        </el-form-item>
                        <el-form-item label="入库数量" prop="initCount" v-if="diaglogType == 'add'">
                            <el-input v-model="addForm.initCount" placeholder="请输入入库数量"></el-input>
                        </el-form-item>
                        <el-form-item label="金额" prop="amount" v-if="diaglogType == 'add'">
                            <el-input v-model="addForm.amount" placeholder="请输入金额"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </div>
            </el-dialog>
        <!-- </div> -->
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
                >   
                <!-- 一级表格 -->

                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    
                     <!-- <el-table-column label="序号" prop="xh">
                     <template slot-scope="{ row, $index }">
                        <label class="xhButtonText">{{ row.xh }}</label>                     
                     </template>
                    </el-table-column> -->
                    <el-table-column label="序号" prop="xh"></el-table-column>
                    <el-table-column label="耗材名称" prop="name"></el-table-column>
                    <el-table-column label="供应商/维保商" prop="supplier"></el-table-column>
                    <el-table-column label="资产类型" prop="deviceTypeName"></el-table-column>
                    <el-table-column label="库存数量" prop="leftMc"></el-table-column>
                    <el-table-column label="单位" prop="unit"></el-table-column>
                    <el-table-column label="批次编码" prop="batch"></el-table-column>
                    <el-table-column label="操作" prop="zt">
                        <template slot="zt" slot-scope="record">
                            <el-button class="baseSmallBtn" type="primary" @click="viewRecord(record)">
                                <label class="baseBtnText">出入库记录</label>
                            </el-button>
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
import * as API from '@/api/wareHouse.js'
import {getMaintenancerData} from '@/api/provider.js'
import {getEquipmentData,getEquipmentList} from '@/api/equipment.js'
  export default{
    data(){
        return {
            // equipmentType:'',
            title:'',
            diaglogType:'',
            bill_id:"",
            currentNode:[],
            options:[],
            infos:[],
            info:{},
            treeProps:{
                children:'children',
                label:'label'
            },
            cascaderProps: {
                expandTrigger: 'hover',
                value: 'value',
                label: 'label',
                children: 'children',
            },
            selectData:[],
            // selectData:[
            //     {
            //         id:1,
            //         label:'北京',
            //         children:[
            //             {
            //                 id:1-1,
            //                 label:'市区'
            //             },
            //             {
            //                 id:1-2,
            //                 label:'郊区'
            //             },
            //         ]
            //     }
            // ],
            dialogVisible: false,
            searchValue: null,
            equipmentType: undefined,   
            userInfo: this.$store.getters.userInfo,        
            templateSelection: '',
            tableData: [],
            provideList: [],
            pagination:{
                total: 0,
                current: 1,
                pageSize: 10, 
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
            },
            multipleSelection:[],
            addForm:{},
            rules: {                
                name: [
                { required: true, message: "请输入耗材名称", trigger: "change" },
                ],
                // deviceTypeCode: [
                // { required: true, message: "请选择设备类型", trigger: "change" },
                // ],
                unit: [
                { required: true, message: "请输入单位", trigger: "change" },
                ],
                initCount: [
                { required: true, message: "请输入入库数量", trigger: "change" },
                ],
            },
            equipmentTypeValue:null
        }
    },
    async mounted(){
      this.init()
      this.getProvideData()
      this.getEquipmentFdata()
    //   this.getEquipmentCdata()
    },
    watch:{
        dialogVisible(){
            if(this.dialogVisible){
                this.initForm()
                this.title = this.diaglogType == 'edit' ? '编辑耗材' : '添加耗材'
                if(this.diaglogType == 'edit'){
                    this.$nextTick(()=>{
                        this.addForm = {
                            name: this.info.name,
                            model: this.info.model,
                            deviceTypeCode: this.info.deviceTypeCode,
                            unit: this.info.unit,
                            initCount: this.info.initCount,
                            indate: this.info.indate,
                            maintenancerId: this.info.maintenancerId,
                            price: this.info.price,
                            amount: this.info.amount,
                            batch: this.info.batch
                            // leftCount: this.info.leftCount,
                        }
                    })
                    // console.log(this.addForm,'this.addForm');
                }
            }
        }
    },
    methods: {
        initForm(){
            this.addForm = {
                name: null,
                model: null,
                deviceTypeCode: undefined,
                unit: null,
                initCount: null,
                indate: null,
                maintenancerId: undefined,
                price: null,
                amount: null,
                batch: null
            }
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

        async getProvideData(){
            let res = await getMaintenancerData()
            this.provideList = res.data.value
        },
        // 主表格查找
        async searchData() {
            let params = {
                name: this.searchValue,
                pageNum: this.pagination.current,
                pageSize: this.pagination.pageSize,
                deviceTypeCode: _.isEmpty(this.equipmentType) ? '' : this.equipmentType[1],
            }
            // console.log(params,'params');
            let res = await API.getConsumeList({...params})
            // console.log(res,'res');
            if(res.status == 200){
                this.tableData = res.data.value.list.map((item,index)=>{
                    let arr = {}
                    // console.log((this.pagination.current - 1) * this.pagination.pageSize + (index + 1),'1111')
                    arr ={
                        initMc: item.initCount,
                        leftMc: item.leftCount,
                        xh: (this.pagination.current - 1) * this.pagination.pageSize + (index + 1),
                    }

                    return {
                        ...item,
                        ...arr,   
                    }
                })
                this.pagination.total = res.data.value.total
                // console.log(res,'6666')
            }

        },
        //更新
        async update() {
            let params = {
                name: '',
                pageNum: this.pagination.current,
                pageSize: this.pagination.pageSize,
                deviceTypeCode: '',
            }
            // console.log(params,'params');
            let res = await API.getConsumeList({...params})
            // console.log(res,'res');
            if(res.status == 200){
                this.tableData = res.data.value.list.map((item,index)=>{
                    let arr = {}
                    // console.log((this.pagination.current - 1) * this.pagination.pageSize + (index + 1),'1111')
                    arr ={
                        initMc: item.initCount,
                        leftMc: item.leftCount,
                        xh: (this.pagination.current - 1) * this.pagination.pageSize + (index + 1),
                    }

                    return {
                        ...item,
                        ...arr,   
                    }
                })
                this.pagination.total = res.data.value.total
                // console.log(res,'6666')
            }

        },
        //获取查询框一级菜单
        async getEquipmentFdata(){
            let res = await getEquipmentList({
                schoolCode: this.userInfo.xxdm,
                type:2,
            })
            // console.log(res,'getEquipmentFdata');
            if(res.status == 200){
                this.selectData = res.data.value.list.filter(item=>item.childCount > 0).map((item,index)=>{
                    let arr = {}
                    arr = {
                        label: item.name,
                        value: item.code

                    }
                    
                    return{
                        ...item,
                        ...arr,
                        key: index + item.code,
                        leaf:true,
                        children:[],
                    }
                })
            }
            // console.log(this.selectData,'selectData')
            this.getEquipmentCdata()
        },
        nodeExpand(node){
            // // this.currentNode = this.$refs.selectelTreeselect.getCurrentNode()
            // console.log(node,'node');
            // console.log( this.$refs.selectelTreeselect.getCurrentNode(),'currentNode');
        },
        //获取查询框二级菜单
        async getEquipmentCdata(){
            for(var i = 0;i<this.selectData.length; i++){
            let res = await getEquipmentList({
                schoolCode: this.userInfo.xxdm,
                superCode: this.selectData[i].code,
                isActive:'1'
            })
            // console.log(res,'getEquipmentCdata');
            if(res.status == 200){
                this.selectData[i].children = res.data.value.list.map((item,index)=>{
                    let arr = {}
                    arr = {
                        label: item.name,
                        value: item.code

                    }
                    
                    return{
                        ...item,
                        ...arr,
                        key: index + '_child_' + item.code,
                    }
                })
            }}
        },

        dialogConfig(diaglogType){
            this.diaglogType = diaglogType
            if(diaglogType == 'edit'){
                var infos = this.$refs.multipleTable.selection
                this.info = infos[0]
                // console.log(infos,'infos' )
                // console.log(this.info,'this.info' )
            }
            this.dialogVisible = true

        },
        backMenu(){
            this.$router.push({name:'menucenter'})
        },

        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
            this.searchData()
        },
        handleCurrentChange(current) {
            // console.log(current,'cc')
            this.pagination.current = current;
            this.searchData()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection,'this.multipleSelection');
        },
        handleChange(value) {
            console.log(value,'handleChange');
        },
        handleEchange(value) {
            console.log(value,'handleEchange');
        },
        // 树形选择器
        // handNodeClick(node){
        
        //     this.equipmentType = node.label
        //     this.equipmentTypeValue = node.value
        //     this.$refs.selectTree.blur()
        //     // console.log(node,'node')


        //     // console.log(this.equipmentType,'equipmentType')
        // },



        dis(){
            let selectedRow = this.multipleSelection
            // console.log(selectedRow,'se')
            if(selectedRow.length > 0){
                return false
            }
            else  return true
        },
        //增删改查
        init(){
            this.pagination.current = 1
            this.tableData = undefined
            this.update()
        },

        save(){
            this.$refs.addRuleForm.validate(valid => {
                if(valid){
                    let api = null
                    if(this.diaglogType == 'add'){
                        console.log(this.addForm,'this.addForm')
                        console.log(this.equipmentType,'this.equipmentType')

                        let params = {
                            ...this.addForm,
                            deviceTypeCode: _.isEmpty(this.equipmentType) ? '' : this.equipmentType[1],
                            maintenancerId: this.addForm.maintenancerId || '',
                            supplier: '',
                            schoolCode: this.userInfo.xxdm
                        }
                        api = API.addConsume(params)
                    }else{
                        let inf = {}
                        inf = this.provideList.find(item => item.id === this.addForm.maintenancerId)
                        // console.log(inf,'inf')
                        // console.log(this.provideList,'this.provideList')
                        // console.log(this.addForm,'this.addForm')
                        // console.log(this.addForm.maintenancerId,'this.addForm.maintenancerId')

                        if(inf){
                            var suppliers = inf.name
                        }else{
                            var suppliers = ''
                        }
                        // this.addForm = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection[0]));

                        // console.log(this.addForm,'this.addForm');
                        let editParams = {
                            ...this.addForm,
                            indate: this.addForm.indate ? moment(this.form.indate).format('YYYY-MM-DD') : '',
                            id: this.diaglogType == 'edit' ? this.info.id : '',
                            supplier: suppliers,
                            schoolCode: this.userInfo.xxdm,
                        }
                        // console.log(editParams,'editParams');
                        api = API.editConsume(editParams)
                    }
                    
                    api.then(res=>{
                        if(res.status == 200){
                            this.$message.success('保存成功')
                            this.dialogVisible = false
                            this.init()
                            
                        }
                    })
                }
            })
            
        },

        edit(){

        },

        del(){
            this.$confirm('您确定要删除选中的耗材?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    // console.log(this.multipleSelection,'this.multipleSelection1')
                    let ids = this.multipleSelection.map(item=>item.id)
                    // console.log(ids,'ids')
                    let res = await API.delConsume({id: ids.join(',')})
                    if(res.status == 200){
                        this.$message.success('删除成功！');
                        this.init()
                    }     
                }).catch(() => {
                         
            });
           
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
        // background-color: rgb(54, 98, 236);
        // color: #fff;
        height: 38px;
        float: left;
    }
    .xhButton{
        background-color: #fff;
        color: blue;
        padding: 0;
        width: 15px;
        height: 15px;
        margin: 4px 10px 0 0;
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
}
.searchTab{
    display: flex;
    width: 100%;
    height: 50px;;
    padding: 5px 0 ;
    // background-color: antiquewhite;

    /deep/ el-form{
        flex: 1;
        margin-bottom: 10px;
    }
    /deep/ .el-form-item{
        // height: 45px;
        margin: 0 20px 0 0;
    }

  }
  .btns{
    // background-color: aquamarine;
    width: 100%;
    height: 50px;
    padding: 5px 0 ;
    margin-top: 5px;
  }
  .searchDatas{
    padding-top: 20px;
  }

  .el-button:disabled {
    color: #fff;
    background-color: #dce0ea;
    border: none;
    cursor: not-allowed;
    }
    .addContext{
        height: 390px;
        overflow: auto;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
    }
    .dialogs{
        /deep/ .el-dialog{
            height: 500px;
        }
        /deep/.el-dialog__header{
            height: 50px;
        }
        /deep/ .el-dialog__body{
            padding: 0;

        }
        // /deep/ .el-dialog__title{
        //     float: left;
        // } 
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

</style>