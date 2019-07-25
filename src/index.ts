import Vue from 'vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import './plugins/vee-validate';

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    computed: {
        snackbar() {
            return store.state.alerts.snackbar;
        }
    }
})