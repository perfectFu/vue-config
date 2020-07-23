import VueRouter from 'vue-router'
import Vue from 'vue'
// import Home from '@/views/Home.vue'
// import About from '@/views/About.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
        },
        {
            path: '/about',
            component: () => import(/* webpackChunkName: "home" */ '@/views/About.vue')
        }
    ]
})

export default router