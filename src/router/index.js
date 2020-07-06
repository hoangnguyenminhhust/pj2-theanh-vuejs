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
    mode: 'history',
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
        {
            path: '/homepage',
            name: 'homepage',
            meta: { layout: 'userpages' },
            component: () => import('../views/homepage/homepage.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            meta: { layout: 'userpages' },
            component: () => import('../views/signup/signup.vue'),
        },
        {
            path: '/signin',
            name: 'signin',
            meta: { layout: 'userpages' },
            component: () => import('../views/signin/signin.vue'),
        },
        {
            path: '/studentInfo/:studentId',
            name: 'Student Info',
            meta: { layout: 'userpages' },
            component: () => import('../views/studentInfo/studentInfo.vue'),
        },
        
    ]
})