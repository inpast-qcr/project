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

//修改浏览器标签
Vue.directive('title', {
	inserted: function (el, binding) {
	  document.title = el.dataset.title
	}
  })
  

 //引入quill-editor编辑器
 import VueQuillEditor from 'vue-quill-editor'
 import 'quill/dist/quill.core.css'
 import 'quill/dist/quill.snow.css'
 import 'quill/dist/quill.bubble.css'
 Vue.use(VueQuillEditor)
 
/*  //实现quill-editor编辑器拖拽上传图片
 import * as Quill from 'quill'
 import { ImageDrop } from 'quill-image-drop-module'
 Quill.register('modules/imageDrop', ImageDrop)
 
 //实现quill-editor编辑器调整图片尺寸
 import ImageResize from 'quill-image-resize-module'
 Quill.register('modules/imageResize', ImageResize) */


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