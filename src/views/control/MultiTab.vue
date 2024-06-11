<template>
    <div class="home">
      <el-tabs 
      closable 
      stretch
      @tab-click="handleTabClick"
      >
        <el-tab-pane
        v-for="(item, index) in pages"
        :key="index"
        :label="item.meta.title"
        :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
  
<script>
  
export default{
    name:'',
    props:{
      addPage:{}
    },
    data(){
        return{
          fullPathList: [],
          pages: [],
          page: [],
        }
    },
    created () {
      this.init()
      this.page = this.deepCopy(this.addPage);
    },
    watch:{
      addPage:{
        handler(newVal) {
          let page = []
          let count = this.pages.length
          this.page = this.deepCopy(newVal);
          // this.page = JSON.parse(JSON.stringify(newVal));
          if(this.page.length>0){
            for(let i = 0;i<this.pages.length;i++){
              if(this.pages[i].name == this.page[0].name){
                count++
              }
            }
            if(count == this.pages.length){
              this.pages = [...this.pages, ...this.page]
            }
            
          }
          // console.log(this.page,'this.page');
          // console.log(this.pages,'this.addpages');
        }
      }
    },
    methods:{
      //自定义深拷贝
      deepCopy(obj, seen = new WeakMap()) {
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }

        if (typeof obj === 'symbol') {
          return obj;
        }

        if (seen.has(obj)) {
          return seen.get(obj);
        }

        const copy = Array.isArray(obj) ? [] : {};
        seen.set(obj, copy);

        Reflect.ownKeys(obj).forEach(key => {
          copy[key] = this.deepCopy(obj[key], seen);
        });

        return copy;
      },

      init(){
        this.pages.push(this.$route)
        this.fullPathList.push(this.$route.fullPath)
        // console.log(this.pages,'this.pages');
        // console.log(this.fullPathList,'this.fullPathList');
      },
      handleTabClick(tab){
        console.log(tab.name);
        this.$router.push({name: tab.name});
      },


      
    }
}

</script>
  
<style lang="less" scoped>
.home{
  display: flex;

  /deep/ .el-tabs{
    align-content: center;
  }

  /deep/ .el-tabs__header {
    border: none;
    margin: 0;
    
  }
  /deep/ .el-tabs__active-bar.is-top {
    border: none;
    margin: 0;

  }

  /deep/ .el-tabs__header.is-top{
    margin: 0;
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }

  /deep/ .el-tabs__active-bar {
    display: none;
  }

  /deep/ .el-tabs__item {
    display: flex;
    align-items: center;
    justify-content: center; /* 水平居中对齐 */
    text-align: center;
    height: 30px;
    margin-right: 10px;
    border: 1px solid #DDDFE6;
    border-radius: 4px;
    background-color: #fff;
    font-size: 12px;
  }

  /deep/ .el-tabs__item.is-top{
    padding: 0 10px;
  }

  /deep/ .el-tabs__item.is-active{
    padding: 0;
    margin: 0 10px;
    border: 1px solid #3662EC;
    border-radius: 4px;
    background-color: #fff;
    font: #3662EC
  }


}
</style>