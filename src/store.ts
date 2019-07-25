import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './stores/tasks';
import alerts from './stores/alerts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tasks,
        alerts
    }
});