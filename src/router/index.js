import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        // Dashboards
        {
            path: '/',
            name: 'room',
            component: () => import('../views/phong/phong.vue'),
        },
        {
            path: '/manager',
            name: 'manager',
            component: () => import('../views/manager/manager.vue'),
        },
        {
            path: '/yeucau',
            name: 'yeucau',
            component: () => import('../views/yeucau/yeucau.vue'),
        },
        {
            path: '/chiphi',
            name: 'chiphi',
            component: () => import('../views/chiphi/chiphi.vue'),
        },
        

    ]
})
