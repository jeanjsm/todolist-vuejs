import Vue from 'vue';
import Task from '../model/Task';
import FormatterUtil from '../util/FormatterUtil';

export default Vue.component('task-detail', {
    template: 
    /* html */
    `
        <div>
            <h1>Detalhes</h1>
            <div class="row">
                <h2 class="col-sm-2">Título</h2>
                <h2 class="col-sm-10">{{ taskSelected.title }}</h2>
            </div>
            <div class="row">
                <p class="col-sm-2">Descrição</p>
                <p class="col-sm-10">{{ taskSelected.description }}</p>
            </div>
            <div class="row">
                <p class="col-sm-2">Prazo</p>
                <p class="col-sm-10">{{ FormatterUtil.formatDate(taskSelected.limit_date) }}</p>
            </div>
            <div class="row">
                <p class="col-sm-2">Situação</p>
                <p class="col-sm-10">{{ taskSelected.finished ? 'Finalizado' : 'Pendente' }}</p>
            </div>
        </div>
    `,
    props: {
        taskSelected: {}
    },
    data() {
        return {
            
        FormatterUtil: FormatterUtil
        }
    }
});