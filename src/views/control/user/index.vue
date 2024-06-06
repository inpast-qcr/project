<template>
  <div class="home">
  <!-- 搜索栏 -->
    <div class="searchtab">
      <el-form :inline="true"  class="demo-form-inline">
        <div class="tab1">
          <el-form-item>
            <el-input placeholder="请输入姓名/手机号码" v-model="userValue" clearable></el-input>
          </el-form-item>
        </div>  
        
        <div class="tab2">
          <el-form-item>
            <el-select 
              v-model="userType"
              placeholder="请选择用户身份"
              clearable
              filterable

            >
            <!-- @blur="selectBlur"
              @clear="selectClear"
              @change="selectChange" -->
              <el-option
                v-for="(item,index) in userTypeList"
                :key="index"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </div>

        <div class="tabButton">
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
  </div>

  <!-- 表格 -->
  <div class="tableContent">
    <!-- 表格总宽1346px -->
    <el-table :data="userData" :pagination="pagination" style="width: 100%" height="100%" :header-cell-style="{background:'#F7F7FA',color:'#606266'}">   <!-- v-fit-columns -->
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="login_username" label="登录账号" width="350px"> </el-table-column>
      <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="orgName" label="组织机构" ></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column prop="identity" label="用户身份"></el-table-column>
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
import * as API from '@/api/user.js'
// import Vue from 'vue';
// import Plugin from 'v-fit-columns';
// Vue.use(Plugin);
  export default{
    data(){
      return{
        userData:[],
        userTypeList:[
                    {
                        label:"家长",
                        value:"家长",
                    },
                    {
                        label:"教师",
                        value:"教师",
                    },
                    {
                        label:"学生",
                        value:"学生",
                    }
        ],
        pagination:{
                total: 0,
                current: 1,
                pageSize: 10, //每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100], //每页中显示的数据
                //showTotal: total => `共有 ${total} 条数据`, //分页中显示总的数据
            },

        userInfo: this.$store.getters.userInfo,
        userValue: null,//姓名/手机号码
        userType: undefined,

      }
    },
    async mounted(){
      this.userSearch()
    },
    methods:{
      async userSearch(){
        let params = {
          userRoleId: 1,//角色id
					orgId: this.userInfo.orgId ? this.userInfo.orgId : '',//组织机构id
					searchValue: this.userValue,
					pageNum: this.pagination.current,
					pageSize: this.pagination.pageSize,
          // isFreezed: 0,
          identity: this.userType
        } 
        let res = await API.queryUserPagedList({...params})
        if(res.status == 200){
          // console.log(res,'res');
          this.userData = res.data.value.list.map(item=>{
            let arr = {}
            if(item.user){
              let identity = '-'
              if(item.user.identity) identity = item.user.identity.split(',').filter(item=> item).join(',')
              arr = {
                  username: item.user.name,
                  mobile: item.user.mobile || '',
                  email: item.user.email || '',
                  userType: item.user.userType,
                  isFreezed: item.user.isFreezed,
                  userId: item.user.id,
                  sex: item.user.sex,
                  dingId: item.user.dingId,
                  identity,
                  login_username: item.user.username
              }
            }
            return {
              ...item,
              ...arr,
              roleName: !_.isEmpty(item.role) ? item.role.roleName : ''
              // roleName: item.role.roleName
            }
          })
          this.pagination.total = res.data.value.total
        }else{
          console.log('res错误');
        }
        
      },
      searchData(){
        this.userSearch()
      },
      // change() {
      //   this.userSearch()
      // },
      handleSizeChange(pageSize) {
        this.pagination.pageSize = pageSize;
        this.userSearch()
      },
      handleCurrentChange(current) {
        this.pagination.current = current;
        this.userSearch()
      }

    }
  }

</script>
  
<style lang="less" scoped>
.home{
  overflow:hidden;
  .el-pagination{
        font-size: 16px;
    }
}
  .searchtab{
    width: 95%;
    height: 60px;
    // background: blue;
    padding: 20px ;
    margin: 20px 20px 20px 10px;
    

    /deep/ .el-form{
      width: 95%;
      height: 100%;
    }
    /deep/ .el-input__inner{
      width:170px;
      height: 38px;
      padding-right: 20px;
    }
    /deep/ .el-form-item{
      width:170px;
      height: 38px;
      margin-right: 40px;
    }
    .tab1{
      display: inline;

    }
    .tab2{
      display: inline;

    }
    .tabButton{
      display: inline;

    }
  }
  .tableContent{
    // display: flex;
    flex: 1;
    width: 95%;
    height: 430px;
    // max-height: 85%;
    // min-height: 0%;
    margin: 0 30px;
    /deep/ .el-pagination{
      height: 40px;
      padding: 10px;
      background-color: #fff;
    }
    /deep/ .el-table{
      max-height: 100%;
      min-height: 0%;
    }
  }
</style>