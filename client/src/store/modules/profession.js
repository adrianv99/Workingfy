import axios from 'axios';

const state = {
    professions: []
};

const getters = {
    professionsData: state => state.professions
};

const actions = {
    //funcion que obtiene los datos del usuario loggeado
    async fetchProfessions({ commit }){
        let res = await axios.get('/api/consultarProfesion');
        commit('setProfessions', res.data);
    }
};

const mutations = {
    setProfessions: (state, professionsData) => (state.professions = professionsData)
};

export default {
    state,
    getters,
    actions,
    mutations
};