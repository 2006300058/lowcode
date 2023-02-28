//插入各种东西
import { createApp } from 'vue'
import Vue from 'vue';
import App from './App.vue'
import axios from 'axios'
//import ElementUI from 'element-ui'
import ElementPlus from 'element-plus'
import ECharts  from 'echarts'
import { use } from 'echarts'
//import 'element-ui/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import './style/common.less'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import _ from 'lodash'
import VideoPlayer from 'vue-video-player'

import router from './router'
import store from './store'
import IconFont from './components/iconFont.vue'
import {
    BarChart,
    LineChart,
    PieChart,
    FunnelChart,
    SankeyChart,
    RadarChart,
} from 'echarts/charts';
import {
    CanvasRenderer,
} from 'echarts/renderers';
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
  } from 'echarts/components';

use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent,
    LineChart,
    TitleComponent,
    PieChart,
    LegendComponent,
    FunnelChart,
    SankeyChart,
    RadarChart,
]);
//VUE2的写法
// Vue.component('icon-font', IconFont);  //全局添加组件
// Vue.component('v-chart', ECharts);
// Vue.prototype._ = _;
// Vue.prototype.$axios = axios;// 挂载到vue的全局(原型上),在每个组件都可以使用 ,prototype是固定的,$axios是自定义的
// Vue.config.productionTip = false;
// Vue.use(ElementPlus);  //使用其他插件在 Vue.use(obj) 时，会自动调用该 install 函数，并传入 Vue构造器
// Vue.use(VideoPlayer);

//vue3的写法
const app = createApp(App);
app.component('icon-font', IconFont);
app.component('v-chart', ECharts);
app.config.globalProperties._ = _;
app.config.globalProperties.$axios = axios;
app.config.productionTip = false;
app.use(ElementPlus);
app.use(VideoPlayer);
app.use(router).use(store).mount('#app')
