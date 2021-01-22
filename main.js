import Vue from 'vue'
import App from './App'
import api from './common/api'
import store from './store'
import axios from 'axios'
import service from './request/index.js'
import { myRequest } from './request/wp_request'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$axios = service
Vue.prototype.$myRequest = myRequest

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
