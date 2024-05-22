<template>
    <div class="home">
        <!-- 顶部 -->
        <div class="title">
            <div class="titleLogo">设备统计</div>
            <div class="titleBack">
                <el-button class="backMenuButton" @click="backMenu">返回应用中心</el-button>
            </div>
        </div>
        <!-- echarts图 -->
        <div class="equipmentEchart">
            <div id="equipmentDetail"></div>
            <div id="equipmentRepair"></div>
        </div>
        <!-- 数据表格 -->
        <div class="equipmentTotalData"></div>
    </div>
</template>
  
<script>
import {statisticByDevicetype,statisticByStatus,statisticRepair,getDeviceList,getEquipmentData,getEquipmentList} from '@/api/equipment.js'
  export default{
    data(){
        return{
            color:['#42d600', '#fdb628', '#eb6f49', '#00e9db', '#3594ff', '#2ECACE', '#6F81DA'],
            detailLegend:[],
            repairs:[]
        }
    },
    mounted(){
        this.drawEquipmentDetail()
        this.drawEquipmentRepair()
    },
    methods: {
        async drawEquipmentDetail(){
            let total = 0
            let status = {
                "1": "待使用",
                "2": "使用中",
                "8": "报修中",
                "9": "已报废"
            }
            let res = await statisticByDevicetype()     //设备类型
            res.data.value = res.data.value.map(item=>{     //将key赋值name并不允许name长度超过5
                return{
                    ...item,
                    name: item.key && item.key.length > 5 ? (item.key.substr(0 ,5) + '...') : item.key
                }
            })
            let statusData = await statisticByStatus()      //设备使用状态
            this.detailLegend = res.data.value.map((item,index)=>{return item.name})     //获取图例value
            let legend = statusData.data.value.map(item=>{
                return status[item.key]
            })
            let outsideData = res.data.value.map(item=>{    //外圈data
                total = total + Number(item.value)
                return{
                    name: item.name,
                    value:[item.value],
                    key: item.key
                }
            })
            let status_list = statusData.data.value.map(item=>{     //内圈data
                return{
                    name: status[item.key],
                    value:[item.value],
                    key: status[item.key]
                }
            })
            

            // console.log(res,'res');

            // 基于准备好的dom，初始化echarts实例
            let detailChart = this.$echarts.init(document.getElementById('equipmentDetail'))
            // 绘制图表
            detailChart.setOption({
                title: {   //标题
                    text: '设备详情',
                    textStyle: {
                        color: '#333'
                    },
                    left:'10px',
                    top:'10px'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    height: '215',
                    right: 10,
                    top: 100,
                    textStyle:{
                                color:'#333',
                                fontSize:12
                            },
                    data: [
                        ...this.detailLegend,
                        ...legend
                    ]
                },
                series: [
                {
                        name: 'Access ',
                        type: 'pie',
                        center: ['35%', '50%'],
                        radius: ['40%', '55%'],
                        color: this.color,
                        label: {
                            color:'#333',
                            fontSize:12,
                            lineHeight:15,
                            formatter:function(params){     
                                let percent = total === 0 ? 0 :(Number(params.value[0]) / total * 100)
                                if(percent%1 != 0) percent = percent.toFixed(2) 
                                return params.name + '' + '('+percent + '%)'
                            },
                        },
                        labelLine:{         //标签的视觉引导线配置
                            length:10,
                            length2: 5,
                        },
                        data: outsideData,
                    },
                    {
                        name: 'Access',
                        type: 'pie',
                        center: ['35%', '50%'],
                        radius: [0, '30%'],
                        color: this.color,
                        label: {
                            position: 'inner',
                            fontSize: 12,
                            color:'white'
                        },
                        labelLine: {
                            show: false
                        },
                        data: status_list,
                    }
                ],

            })
        },
        async drawEquipmentRepair(){

            let res = await statisticRepair()       //报修设备详情
            res.data.value = res.data.value.map(item=>{
                return{
                    ...item,
                    name: item.key && item.key.length > 5 ? (item.key.substr(0 ,5) + '...') : item.key
                }
            })
            this.repairs = res.data.value.map(item=>{
                return{
                    name: item.name,
                    value: [item.value],
                    key: item.key
                }
            })
            let repairx = res.data.value.map(item=>{return item.name})
            let repairy = res.data.value.map(item=>{return item.value})
            console.log(res,'res');

            let repairChart = this.$echarts.init(document.getElementById('equipmentRepair'))
            repairChart.setOption({
                title: {   
                    text: '设备报修',
                    textStyle: {
                        color: '#333'
                    },
                    left:'10px',
                    top:'10px'
                },
                tooltip:{
                    trigger: 'axis',
                    axisPointer: {type: 'shadow'},
                    formatter: '{b}: {c}'

                },
                grid:{
                    left:'5%',
                    top:"15%",
                    right:'3%',
                    bottom: this.repairs && this.repairs.length > 10 ? '30%' : '20%'
                },
                xAxis: {
                    type: 'category',
                    axisTick: { show: false },      //x坐标轴刻度是否展示
                    axisLine: { show: true,lineStyle: { color: '#ebeef2' } },       //x坐标轴线样式
                    axisLabel: {        //坐标轴刻度标签设置
                        show: true,
                        rotate: '45',
                        margin: 15,
                        textStyle: {
                            color: '#333',
                            fontSize: 12
                        }
                    },
                    data: repairx
                },
                yAxis: {
                    type: 'value',
                    nameGap: 30,
                    axisTick: { show: false },
                    axisLine: { show: true,lineStyle: { color: '#ebeef2' } },
                    splitLine: { show: false, lineStyle: { color: '#ebeef2' } },
                    nameTextStyle: { align: 'left' },
                    axisLabel: {
                        show: true,
                        margin: 15,
                        textStyle: {
                            color: '#333',
                            fontSize: 12
                        }
                    },
                    data: []
                },
                dataZoom: [     //数据放大缩小
                    {
                        type: 'slider',
                        realtime: true,
                        start: 0,
                        end: 30,
                        height:10,
                        textStyle:{
                            color:'#333',
                            fontSize:12
                        },
                        brushSelect:false
                    }
                ],
                series: [
                    {
                        data: repairy,
                        type: 'bar',
                        barWidth: "15%",
                        itemStyle:{
                            normal: {
                                barBorderRadius: 10,
                                color: (item) => {
                                    return this.color[item.dataIndex]
                                },
                            },
                        },
                        showBackground: false,
                        label:{
                            show:true,
                            color: '#333',
                            fontSize:12,
                            position:'top'
                        }
                    }
                ],
            })
        },
        backMenu(){
            this.$router.push({name:'menucenter'})
        }
    }
    }

</script>
  
<style lang="less" scoped>
.home{
    overflow: auto;
}
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
        flex: 1;
        background-color: rgb(54, 98, 236);
        color: #fff;
        height: 38px;
        float: left;
    }
}

.equipmentEchart{
    // background-color: aquamarine;
    width: 100%;
    height: 400px;
    margin-top: 15px;
    display: flex;

    #equipmentDetail{
        // background-color: antiquewhite;
        width: 38%;
        height: 100%;
        margin-right: 15px;
        box-shadow: 1px 0 5px #eee;
        border-radius: 10px;
        border: 1px solid #eee;
    }
    #equipmentRepair{
        // background-color: rgb(196, 164, 123);
        height: 100%;
        flex-grow: 1;
        float: left;
        box-shadow: 1px 0 5px #eee;
        border-radius: 10px;
        border: 1px solid #eee;
    }
}

</style>