<template>
    <div class="home">
      <el-tabs 
      stretch
      @tab-click="handleTabClick"
      @tab-remove="removeTab"
      v-model="activeTab"
      
      >
        <el-tab-pane
        v-for="item in pages"
        :key="item.name"
        :label="item.meta.title"
        :name="item.name"
        :closable="pages.length > 1"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
  
<script>
  
export default{
    name:'',
    props:{
      addPage:{},
      menuSelectIndex:{}
    },
    data(){
        return{
          fullPathList: [],
          currentPath: null,
          pages: [],
          page: [],
          activeTab: 'user'
        }
    },
    created () {
      this.init()
      this.page = this.deepCopy(this.addPage);
    },
    watch:{
      addPage: {
        handler(newVal) {
          if (!newVal || newVal.length === 0) return;

          const newPageName = newVal[0].name;
          const isPageExists = this.pages.some(page => page.name === newPageName);

          if (!isPageExists) {
            this.pages = [...this.pages, ...newVal];
          }
        },
        deep: true // 深度监听
      },
      menuSelectIndex:{
        handler(newVal) {
          this.activeTab = newVal
        },
        immediate: true
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
        this.currentPath = this.$route.fullPath.replace("/controlcenter/","")
        this.activeTab = this.currentPath
        // console.log(this.pages,'this.pages');
        // console.log(this.fullPathList,'this.fullPathList');
        // console.log(this.currentPath,'this.currentPath');
      },
      handleTabClick(tab){
        this.$nextTick(() => {
          if (tab.name) {
            this.$router.push({ name: tab.name }).catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.error(err);
              }
            });
          }
        });
      },


      removeTab(targetName) {
        if (this.pages.length === 1) {
          return; // 保证至少保留一个标签页
        }

        const pages = this.pages; // 引用 pages 属性
        let activeTab = this.activeTab;

        // 如果删除的是当前激活的标签页，找到其左侧的标签页
        if (activeTab === targetName) {
          pages.forEach((page, index) => {
            if (page.name === targetName) {
              const newActiveTab = pages[index - 1] || pages[index + 1];
              if (newActiveTab) {
                activeTab = newActiveTab.name;
              }
            }
          });
        }

        this.activeTab = activeTab;
        this.pages = pages.filter(page => page.name !== targetName);
      }
      
      
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
    background-color: #F7F8FB;
    font-size: 14px;
  }

  /deep/ .el-tabs__item.is-top{
    padding: 0 10px;
  }

  /deep/ .el-tabs__item.is-active{   
    width: inherit;
    padding-left: 10px;
    border: 1px solid #3662EC;
    border-radius: 4px;
    background-color: #F7F8FB;
    color: #3662EC;
    font-weight: bold;
  }



}
</style>