<template>
    <el-tabs v-model="activeTabName" type="card" @tab-remove="removeTab">
      <!-- 遍历 tabs 数组，为每个 tab 创建一个 el-tab-pane -->
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.title"
        :name="tab.name"
        :closable="true"
      >
        <!-- 动态路由视图，key 属性确保视图刷新 -->
        <router-view :key="tab.name"></router-view>
      </el-tab-pane>
    </el-tabs>
  </template>
  
  <script>
  export default {
    props: {
      initialTabs: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        tabs: [...this.initialTabs],  // 初始化标签页
        activeTabName: this.initialTabs.length ? this.initialTabs[0].name : '',  // 默认激活的标签页
      };
    },
    methods: {
      // 添加标签页
      addTab(tab) {
        const tabExists = this.tabs.find(t => t.name === tab.name);
        if (!tabExists) {
          this.tabs.push(tab);
        }
        this.activeTabName = tab.name;
      },
      // 移除标签页
      removeTab(targetName) {
        this.tabs = this.tabs.filter(tab => tab.name !== targetName);
        if (this.activeTabName === targetName) {
          this.activeTabName = this.tabs.length ? this.tabs[0].name : '';
          if (this.activeTabName) {
            this.$router.push(`/controlcenter/${this.activeTabName}`);
          } else {
            this.$router.push('/');
          }
        }
      },
    },
    watch: {
      // 监控 activeTabName 变化，切换路由
      activeTabName(newName) {
        this.$router.push(`/controlcenter/${newName}`);
      },
    },
  };
  </script>
  