import { Module } from 'vuex';
import TaskService from '../service/TaskService';

const module: Module<any, any> = {
    namespaced: true,
    state: {
        tasks: [],
        indexEdit: null,
    },
    mutations: {
        mutationsTasks(state, payload) {
            state.tasks = payload;
        },
        mutationIndexEdit(state, index) {
            state.indexEdit = index;
        },
        mutationIndexRemove(state, index) {
            state.tasks.splice(state.index, 1);
        },
        mutationSaveTask(state, task) {
            state.tasks[state.indexEdit] = task;
        },
        mutationNewTask(state, task) {
            state.tasks.push(task);
        },
    },
    actions: {
        async loadTasks(context) {
            let tasks = await TaskService.findAll();
            context.commit('mutationsTasks', tasks);
        },
        edit(context, index) {
            context.commit('mutationIndexEdit', index);
        },
        cleanEdit(context) {
            context.commit('mutationIndexEdit', null);
        },
        saveTask(context, task) {
            if (context.state.indexEdit == null) {
                context.commit('mutationNewTask', task);
            } else {
                context.commit('mutationSaveTask', task);
            }
            TaskService.updateList(context.state.tasks);
        },
        remove(context, index) {
            context.commit('mutationIndexRemove', index);
            TaskService.updateList(context.state.tasks);
        },
    },
    getters: {
        getEditTask(state) {
            if(state.indexEdit != null)
                return state.tasks[state.indexEdit];
            return {}
        }
    }
}

export default module;