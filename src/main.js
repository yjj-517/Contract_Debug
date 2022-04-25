import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

Vue.use(ElementUi);

// 引入样式重置表
import "../src/assets/css/reset.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
