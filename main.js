import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import cuCustomNofixed from './colorui/components/cu-custom-nofixed.vue'
Vue.component('cu-custom-nofixed',cuCustomNofixed)
Vue.config.productionTip = false

App.mpType = 'app'
// Vue.prototype.$Url = 'http://47.102.121.70:9999/api';
Vue.prototype.$Url = 'http://localhost:9999';
Vue.prototype.$Color = uni.getStorageSync('color') ? uni.getStorageSync('color') : 'bg-green';
Vue.prototype.$BarColor = uni.getStorageSync('bar-color') ? uni.getStorageSync('bar-color') : 'text-green';
const app = new Vue({
    ...App
})
app.$mount()

 



