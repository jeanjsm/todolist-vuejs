import Vue from 'vue';
import VeeValidate  from 'vee-validate';

const dictionary = {
    ptBr: {
        messages: {
            required: () => 'O campo é obrigatório'
        }
    }
}

Vue.use(VeeValidate, {
    locale: 'ptBr',
    dictionary: dictionary
});


