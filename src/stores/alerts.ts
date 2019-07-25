import { Module } from 'vuex';

const module: Module<any, any> = {
    namespaced: true,
    state: {
        snackbar: {
            message: '',
            show: false,
            color: 'info'
        }
    },
    mutations: {
        mutationOpenSnackbar(state, payload) {
            state.snackbar.message = payload.message;
            state.snackbar.color = payload.color;
            state.snackbar.show = true;
        },
        mutationCloseSnackbar(state) {
            state.snackbar.show = false;
        }
    },
    actions: {
        showSnackbar(context: any, payload) {
            context.commit('mutationOpenSnackbar', payload);
        },
        showSuccessSnackbar(context: any, message) {
            context.commit('mutationOpenSnackbar', { message: message, color: 'success' });
        },
        showErrorSnackbar(context: any, message) {
            context.commit('mutationOpenSnackbar', { message: message, color: 'error' });
        },
        showWarningSnackbar(context: any, message) {
            context.commit('mutationOpenSnackbar', { message: message, color: 'warning' });
        },
        showInfoSnackbar(context: any, message) {
            context.commit('mutationOpenSnackbar', { message: message, color: 'info' });
        },
        closeSnackbar(context: any) {
            context.commit('mutationCloseSnackbar');
        }
    }
}

export default module;