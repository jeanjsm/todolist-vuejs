import Vue from 'vue';
import TaskService from '../service/TaskService';
import { emit } from 'cluster';

export default Vue.component("form-task", {

    template:
    /* html */
    `
    <form>
        <v-container grid-list-md>
        <h2>{{ indexEdit != null ? 'Editar Tarefa' : 'Nova Tarefa'}}</h2>
            <v-layout row wrap>
                <v-flex xs12 sm4>
                    <v-text-field 
                        :loading="loading"
                        :disabled="loading"
                        type="text" 
                        name="title" 
                        label="Título da tarefa" 
                        v-model="task.title" 
                        filled
                        v-validate="'required'" 
                        :error-messages="errors.collect('title')"
                        ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                    <v-text-field 
                        type="text"
                        :loading="loading"
                        :disabled="loading"
                        name="description"
                        label="Descrição da tarefa" v
                        v-model="task.description" 
                        filled
                        v-validate="'required'"
                        :error-messages="errors.collect('description')"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                <v-menu 
                    v-model="datepicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field 
                            type="date" 
                            name="data"
                            :loading="loading"
                            :disabled="loading"
                            readonly
                            label="Prazo de conclusão" 
                            v-model="task.limit_date" 
                            filled
                            v-validate="'required'"
                            :error-messages="errors.collect('data')"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker 
                        v-model="task.limit_date"
                        @input="datepicker = false"
                    ></v-date-picker>
                </v-menu>
                </v-flex>
            </v-layout>
            <v-layout justify-end>
                <v-btn color="success" :loading="loading" @click="save">Salvar</v-btn>
                <v-btn color="danger" :disabled="loading" text @click="cancelar">Cancelar</v-btn>
            </v-layout>
        </v-container>
    </form>
    `,
    data() {
        return {
            datepicker: false,
            loading: false
        }
    },
    methods: {
        async save() {
            this.loading = true;
            if (await this.$validator.validate()) {
                this.$store.dispatch('tasks/saveTask', this.task);
                this.$store.dispatch('alerts/showSuccessSnackbar', 'Tarefa salva com sucesso!' );
                this.cancelar();
                
            } else {
                this.$store.dispatch('alerts/showErrorSnackbar', 'Preencha todos os campos obrigatórios!' );
                this.loading = false;
            }
        },
        cancelar() {
            this.task = {};
            this.loading = false;
            this.$store.dispatch('tasks/cleanEdit');
            this.$emit('voltar');
        }
    },
    computed: {
        indexEdit() {
            return this.$store.state.tasks.indexEdit;
        },
        task: {
            get() {
                return this.$store.getters['tasks/getEditTask'];
            },
            set() {

            }
        }
    }

});