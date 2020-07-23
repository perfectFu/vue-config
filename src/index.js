// console.log('hello webpack')

import './assets/less/index.less'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VeLine from 'v-charts/lib/line.common'

Vue.component('VeLine', VeLine)

new Vue({
    el: '#app',
    router,
    render(h) {
        return h(App)
    }
})

