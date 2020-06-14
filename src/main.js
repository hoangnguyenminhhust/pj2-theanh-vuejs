import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import SweetAlert from 'vue-sweetalert2'
import BootstrapVue from "bootstrap-vue"
import axios from './axios';

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(SweetAlert);
Vue.use(axios)

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);
Vue.prototype.$axios = axios;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});