import axios from 'axios';

const state = {
    user: {}
};

const getters = {
    userData: state => state.user
};

const actions = {
    //funcion que obtiene los datos del usuario loggeado
    async fetchUser({ commit }, token){
        
        let config = {
            headers: {
                "x-access-token":  token,
            }
        }

        let res = await axios.get('/api/consultarPorId', config);
        commit('setUserData', res.data[0]);
    }
};

const mutations = {
    setUserData: (state, userData) => (state.user = userData)
};

export default {
    state,
    getters,
    actions,
    mutations
};