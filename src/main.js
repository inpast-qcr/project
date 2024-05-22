import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/main.less'

import Vuex from 'vuex'
import axios from "axios"
import VueAxios from 'vue-axios'
Vue.use(Vuex)
Vue.use(VueAxios, axios)

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

//阿里巴巴icon矢量库
import "@/assets/font/iconfont.css"

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$axios = axios;
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//监听浏览器变化
window.onresize = function() {
	setAppScale();
};
// 大屏页面使用rem做适配
function setAppScale() {
	var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
	var wW = window.innerWidth; // 当前窗口的宽度
	var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
	document.documentElement.style.fontSize = rem + 'px'
}

setAppScale();