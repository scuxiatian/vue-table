import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Echarts from 'vue-echarts'
import 'echarts'

import axios from 'axios'

Vue.use(Element)

Vue.component('chart', Echarts)

axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$ajax = axios
