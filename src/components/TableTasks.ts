import Vue from 'vue'
import TaskService from '../service/TaskService';
import Task from '../model/Task';
import FormatterUtil from '../util/FormatterUtil';

export default Vue.component("table-tasks", {
    template: 
    /* html */`
    <v-simple-table>
        <thead>
            <tr>
                <th>Título da tarefa</th>
                <th>Descrição da tarefa</th>
                <th>Prazo de conclusão</th>
                <th>Finalizado</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in tasks">
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td>{{ FormatterUtil.formatDate(item.limit_date) }}</td>
                <td>
                    <v-checkbox type="checkbox" v-model="item.finished" @change="fillTask()"></v-checkbox>
                </td>
                <td>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="view(i)" v-on="on" text icon color="blue">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span>Detalhe</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="edit(i)" v-on="on" text icon color="green">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="remove(i)" v-on="on" text icon color="red">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Remover</span>
                    </v-tooltip>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
    `,
    data() {
        return {
            FormatterUtil: FormatterUtil
        }
    },
    methods: {
        findAll() {
            this.tasks = TaskService.findAll();
        },
        fillTask() {
            TaskService.updateList(this.tasks);
            this.findAll();
        },
        view(index: number) {
            this.$router.push({
                name: 'detalhe',
                params: {
                    taskSelected: this.tasks[index]
                }
            });
        },
        edit(index: number) {
            this.$store.dispatch('tasks/edit', index);
            this.$emit('edit');
        },
        remove(index: number) {
            this.$store.dispatch('tasks/remove', index);
            this.$emit('remove');
        }
    },
    mounted() {
        this.$store.dispatch('tasks/loadTasks');
    },
    computed: {
        tasks: function() {
            return this.$store.state.tasks.tasks;
        }
    }
});