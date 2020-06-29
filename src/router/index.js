import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    routes: [

        // Dashboards
        {
            path: '/',
            name: 'room',
            component: () => import('../views/room/room.vue'),
        },
        {
            path: '/room/:id',
            name: 'room-detail',
            component: () => import('../views/room/room-detail.vue'),
        },
        {
            path: '/student',
            name: 'student',
            component: () => import('../views/student/student.vue'),
        },

        {
            path: '/fee',
            name: 'fee',
            component: () => import('../views/fee/fee.vue'),
        },


    ]
})