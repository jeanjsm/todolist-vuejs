import Vue from 'vue';
import TableTasks from '../components/TableTasks';
import FormTask from '../components/FormTask';

export default Vue.component('home', {
    template: 
    /* html */`
        <v-container fluid>
            <v-layout row wrap justify-space-between class="ma-5">
                <h1>{{ title }}</h1>
                <v-btn fab dark large color="primary" @click="showForm = !showForm">
                    <v-icon>{{ showForm ? 'mdi-arrow-left' : 'mdi-plus' }}</v-icon>
                </v-btn>
            </v-layout>
            
            <form-task @voltar="showForm = false" v-if="showForm"></form-task>
            <table-tasks @edit="showForm = true" v-else></table-tasks>
        </v-container>
    `,
    components: {
        FormTask,
        TableTasks
    },
    data() {
        return {
            title: 'VueJs',
            showForm: false
        }
    },
    computed: {
        buttonTitle: function() {
            return this.showForm ? 'Voltar' : 'Nova Tarefa';
        }
    }
});