<template>
    <div class="home">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closed">取 消</el-button>
                <el-button type="primary" @click="closed">确 定</el-button>
            </span>
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
            dialogVisible: this.visible
        }

    },
    watch: {
    // 监听visible属性的变化
    visible(newValue) {
      this.dialogVisible = newValue; // 当visible属性变化时，更新本地数据属性
    }
  },
    methods:{
        closed(){
            this.$emit('cancel',false)    /* closed是子组件方法，cancel是父组件监听事件 */
        }

    }
}

</script>
  
<style lang="less" scoped>
  
</style>