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
            <div class="WeekNumTip" v-if="currentWeekNum ">
                <el-select v-model="weekNum" placeholder="请选择周次" @change="weekChange">
                    <el-option
                        v-for="item in weeks"
                        :key="item.id"
                        :label="item.weekName"
                        :value="item.weekNum">
                    </el-option>
                </el-select>

                <table class="tableTree">
                    <thead>
                        <th>星期</th>
                        <th v-for="(item,index) in headList" :key="index + '_table_head'">{{ item.dutyName }}</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>111111</td>
                            <td>22222222222</td>
                            <td>33333333333</td>
                            <td>4444</td>
                            <td>555555</td>
                        </tr>
                        <tr v-for="(item1,index1) in weekTeacherList" :key="index1"></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- cancel是父子组件的监听事件，canceld是父组件的方法 -->
        <downTem :visible="down_visible" @cancel="canceld" :weeks="weeks" :currentWeekNum="currentWeekNum"/>    
    </div>
</template>
  
<script>
import downTem from './downTemplate.vue'
import {timestamp,getTotalDays} from '@/config/common'
import {queryCurSchoolYear,queryWeekList,queryWeekPlanListWithinOneweek,updateWeekPlan,queryTeacherList,queryGradeList,checkIfSummarized} from '@/api/duty.js'
export default{
    name:'planTable',
    components:{
        downTem
    },
    data(){
        return{
            currentWeekNum:null,
            down_visible:false,
            weeks:[],
            userInfo: this.$store.getters.userInfo,
            currentYear: null,
            headList:[],
            weekTeacherList:[],
            activeIndex: 0,
        }
    },
    async mounted(){
        this.getCurrentYear()
        this.getGradeList()
        this.log()
    },
    methods:{
        log(){
            console.log(this.userInfo,'this.userInfo');
        },
        backMenu(){
            this.$router.back()
        },
        canceld(val){
            this.down_visible = val
        },
        async getCurrentYear(){
            let res = await queryCurSchoolYear({
                schoolCode: this.userInfo.xxdm
            })
            if(res.status == 200){
                this.currentYear = res.data.value
                this.getWeeks(res.data.value)
            }
        },
        async getWeeks(schoolYear){
            let res = await queryWeekList({
                schoolCode: this.userInfo.xxdm,
                schoolYear
            })
            if(res.status == 200){
                this.weeks = res.data.value
                this.getCurrentWeekNum()
                
            }
        },
        getCurrentWeekNum(){
            // timestamp(null,2)函数，传入当前日期，date 为 null，则使用当前日期；否则，使用传入的日期
            // 1: 返回 YYYY-MM-DD
            // 2: 返回 YYYY-MM-DD HH:mm:ss
            let currentDay = timestamp(null,2)
            let timest = new Date(currentDay).getTime()     //时间字符串 -->  时间戳
            let current = this.weeks.filter(item=> (new Date(item.startDay).getTime() <= timest) && (timest <=  new Date(item.endDay).getTime()))
            if(current && current.length > 0){
                this.currentWeekNum = current[0].weekNum
                this.weekNum = this.currentWeekNum
                this.weekChange(this.currentWeekNum)
            }else{
                this.error = '不在本学期内'
            }
        },
        weekChange(e){
            this.activeIndex = this.weeks.findIndex(item=>item.weekNum == e)
            this.getTeacher()
        },
        async getGradeList(){
            let res = await queryGradeList({
                schoolCode: this.userInfo.xxdm
            })
            if(res.status == 200){
                res.data.value = res.data.value.map(item=>{
                    return{
                        ...item,
                        dutyName:item.gradeName
                    }
                })
            }
            this.headList = [
                {
                    dutyName: '总值日教师',
                    ifLeader:"1",
                    teacherName: null,
                    id:'0',
                    gradeNum: 0,
                },
                ...res.data.value
            ]
        },
        async getTeacher(){

        }
    }
}

</script>
  
<style lang="less" scoped>
.home{
    overflow: auto;
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
    .WeekNumTip{
        margin-top: 30px;
        .el-select{
            width: 100px;
            border-radius: 8px;
        }
    }
    table{
        margin-top: 15px;
        border-collapse: collapse;
        border: 1px solid rgb(232, 232, 232);
        width: 100%;
    }

    th{
        border: 1px solid rgb(232, 232, 232);
        background-color: #f7f7fa;
        color: #9ca2b0;
        height: 60px;
        width: 20%;
        font-size: 16px;
    }
    td{
        border: 1px solid rgb(232, 232, 232);
        text-align: center;
        height: 50px;
        width: 20%;
        font-size: 14px;
        color: rgb(153, 153, 153);
    }
    td:nth-child(1){
        color: rgb(44, 62, 80);
    }
}
</style>