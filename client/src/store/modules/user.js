import axios from 'axios';

const state = {
    user: {},
    freelancers: []
};

const getters = {
    userData: state => state.user,
    freelancersData: state => state.freelancers
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
    },
    //funcion que trae los perfiles de los freelancers 
    //para el explorar del cliente
    async filterFreelancers({ commit }, params){
        let config = {
            headers: {
                "x-access-token":  params.token,
            }
        }
        
        let res = await axios.post('/api/filtrarFreelancers', params,config);
        commit('setFreelancers', res.data);
    }
};

const mutations = {
    setUserData: (state, userData) => (state.user = userData),
    setFreelancers: (state, freelancersData) => (state.freelancers = freelancersData)
};

export default {
    state,
    getters,
    actions,
    mutations
};