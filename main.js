import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$Url = 'http://47.102.121.70:9999/api';

const app = new Vue({
    ...App
})
app.$mount()

 



